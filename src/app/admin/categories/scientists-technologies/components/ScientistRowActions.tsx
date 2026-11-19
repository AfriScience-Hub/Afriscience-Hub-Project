'use client';

import {
  MoreVertical, Eye, EyeOff, CheckCircle, BadgeCheck, Loader2, MessageSquare,
} from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import type { AdminScientist } from '../data';

interface ScientistRowActionsProps {
  record: AdminScientist;
  view: 'Live' | 'Updated';
  verifyingId: string | null;
  approvingId: string | null;
  unpublishingId: string | null;
  onView: () => void;
  onMessages: () => void;
  onVerify: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
}

/** Row action menu with the same options as the Afro-Innovations tables. */
export default function ScientistRowActions({
  record,
  view,
  verifyingId,
  approvingId,
  unpublishingId,
  onView,
  onMessages,
  onVerify,
  onPublish,
  onUnpublish,
}: ScientistRowActionsProps) {
  return (
    <TableActionMenu
      triggerIcon={verifyingId === record.id || approvingId === record.id || unpublishingId === record.id
        ? <Loader2 className="h-4 w-4 animate-spin text-neutral-gray-dark" />
        : <MoreVertical className="h-4 w-4 text-neutral-gray-dark" />}
      items={[
        { label: 'View Details', icon: <Eye className="h-3.5 w-3.5" />, onClick: onView },
        { label: 'View Messages', icon: <MessageSquare className="h-3.5 w-3.5" />, onClick: onMessages },
        {
          label: verifyingId === record.id
            ? 'Updating...'
            : record.verification === 'Verified' ? 'Unverify' : 'Verify',
          icon: verifyingId === record.id
            ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
            : <BadgeCheck className="h-3.5 w-3.5" />,
          onClick: onVerify,
        },
        ...(view === 'Updated'
          ? [{
            label: approvingId === record.id ? 'Publishing...' : 'Publish Update',
            icon: approvingId === record.id
              ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
              : <CheckCircle className="h-3.5 w-3.5" />,
            onClick: onPublish,
          }]
          : [{
            label: unpublishingId === record.id ? 'Unpublishing...' : 'Unpublish',
            icon: unpublishingId === record.id
              ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
              : <EyeOff className="h-3.5 w-3.5" />,
            onClick: onUnpublish,
            danger: true,
          }]),
      ]}
    />
  );
}
