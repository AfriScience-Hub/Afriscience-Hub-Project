'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import type { AdminScientist } from '../data';
import {
  approveAdminScientistListing,
  setScientistVerification,
  unpublishScientistListing,
} from '../api';

type SetRecords = React.Dispatch<React.SetStateAction<AdminScientist[]>>;

/** Verification, publish-update and unpublish handlers for the all-scientists table. */
export function useScientistRowActions(setRecords: SetRecords, onRecordRemoved?: () => void) {
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [unpublishingId, setUnpublishingId] = useState<string | null>(null);
  const [unpublishTarget, setUnpublishTarget] = useState<AdminScientist | null>(null);
  const [unpublishReason, setUnpublishReason] = useState('');

  const toggleVerify = async (record: AdminScientist) => {
    if (verifyingId) return;
    const nextVerified = record.verification !== 'Verified';
    setVerifyingId(record.id);
    try {
      await setScientistVerification(record.id, nextVerified);
      const verification: AdminScientist['verification'] = nextVerified ? 'Verified' : 'Unverified';
      setRecords((prev) => prev.map((r) => (r.id === record.id ? { ...r, verification } : r)));
      toast.success(nextVerified ? 'Scientist verified' : 'Scientist unverified');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to update verification');
    } finally {
      setVerifyingId(null);
    }
  };

  const publishUpdated = async (record: AdminScientist) => {
    if (approvingId) return;
    setApprovingId(record.id);
    try {
      await approveAdminScientistListing(record.id);
      setRecords((prev) => prev.map((r) => (
        r.id === record.id
          ? { ...r, status: 'Published', listingStatus: 'Published', pendingUpdate: false }
          : r
      )));
      onRecordRemoved?.();
      toast.success('Updated scientist listing published');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to publish updated scientist listing');
    } finally {
      setApprovingId(null);
    }
  };

  const openUnpublishModal = (record: AdminScientist) => {
    setUnpublishReason('');
    setUnpublishTarget(record);
  };

  const closeUnpublishModal = () => {
    if (unpublishingId) return;
    setUnpublishTarget(null);
    setUnpublishReason('');
  };

  const unpublish = async () => {
    if (!unpublishTarget || !unpublishReason.trim() || unpublishingId) return;
    const record = unpublishTarget;
    setUnpublishingId(record.id);
    try {
      await unpublishScientistListing(record.id, unpublishReason);
      // Unpublished records leave the live table and return to the review queue.
      setRecords((prev) => prev.filter((r) => r.id !== record.id));
      onRecordRemoved?.();
      setUnpublishTarget(null);
      setUnpublishReason('');
      toast.success('Scientist listing unpublished');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to unpublish scientist listing');
    } finally {
      setUnpublishingId(null);
    }
  };

  return {
    verifyingId,
    approvingId,
    unpublishingId,
    unpublishTarget,
    unpublishReason,
    setUnpublishReason,
    toggleVerify,
    publishUpdated,
    openUnpublishModal,
    closeUnpublishModal,
    unpublish,
  };
}
