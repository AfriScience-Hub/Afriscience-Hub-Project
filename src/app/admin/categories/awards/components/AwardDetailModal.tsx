'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Trophy, Tag, Folder, Layers, Calendar, Users, Mail, Flag, Award as AwardIcon, Link2, Linkedin, Instagram, Facebook } from 'lucide-react';
import { getRewardIcon, getRewardIconCls, rewardLabel, type AdminAward } from '../data';

interface AwardDetailModalProps {
  award: AdminAward | null;
  open: boolean;
  onClose: () => void;
}

/** Numbered section header matching the create-award form. */
function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-6 h-6 rounded-full bg-[#453DD8] text-white text-[11px] font-bold grid place-items-center flex-shrink-0">{number}</span>
        <h3 className="text-sm font-bold text-neutral-black">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="h-4 w-4 text-neutral-gray-medium mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] text-neutral-gray-medium">{label}</p>
        <p className="text-xs font-medium text-neutral-black break-words">{value}</p>
      </div>
    </div>
  );
}

function RewardLines({ items, emptyText }: { items: { type: string; detail: string }[]; emptyText: string }) {
  if (items.length === 0) return <p className="text-xs text-neutral-gray-medium">{emptyText}</p>;
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => {
        const Icon = getRewardIcon(item.type);
        return (
          <li key={`${item.type}-${i}`} className="flex items-start gap-2.5 rounded-lg border border-neutral-gray-light px-3 py-2">
            <span className={`w-6 h-6 rounded grid place-items-center flex-shrink-0 ${getRewardIconCls(item.type)}`}>
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-neutral-black">{item.type}</p>
              <p className="text-[11px] text-neutral-gray-dark break-words">{item.detail || '—'}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * "View" modal for the All Awards table: every detail of the award laid
 * out in the same numbered sections as the create-award form.
 */
export default function AwardDetailModal({ award, open, onClose }: AwardDetailModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !award) return null;

  const socials = [
    { label: 'LinkedIn', href: award.socials.linkedin, icon: Linkedin, cls: 'text-blue-600' },
    { label: 'Twitter / X', href: award.socials.twitter, icon: null, cls: 'text-black' },
    { label: 'Instagram', href: award.socials.instagram, icon: Instagram, cls: 'text-pink-600' },
    { label: 'Facebook', href: award.socials.facebook, icon: Facebook, cls: 'text-blue-500' },
  ].filter((s) => s.href.trim() !== '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[88vh]">
        <div className="px-5 py-4 border-b border-neutral-gray-light flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Trophy className="h-5 w-5 text-amber-500" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-neutral-black leading-tight">{award.type}</h2>
              <p className="text-xs text-neutral-gray-medium truncate">{award.recipient} &middot; {award.year}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="h-9 w-9 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer flex-shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <Section number={1} title="Basic Information">
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
              <Field icon={Tag} label="Award Type" value={award.type} />
              <Field icon={Folder} label="Category" value={award.category} />
              <Field icon={Layers} label="Level" value={award.level} />
              <Field icon={Calendar} label="Year" value={award.year} />
            </div>
          </Section>

          <Section number={2} title="Recipient Information">
            <div className="flex items-start gap-3">
              <Image src={award.avatar} alt={award.recipient} width={56} height={56} className="h-14 w-14 rounded-xl object-cover flex-shrink-0" />
              <div className="min-w-0 space-y-2">
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700">{award.recipientType}</span>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-black break-all">
                  <Users className="h-3.5 w-3.5 text-neutral-gray-medium flex-shrink-0" /> {award.recipient}
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-gray-dark break-all">
                  <Mail className="h-3.5 w-3.5 text-neutral-gray-medium flex-shrink-0" /> {award.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-gray-dark">
                  <Flag className="h-3.5 w-3.5 text-neutral-gray-medium flex-shrink-0" /> {award.country}
                </div>
              </div>
            </div>
          </Section>

          <Section number={3} title="Award Details">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <AwardIcon className="h-4 w-4 text-neutral-gray-medium mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-neutral-gray-medium">Award Level or Position</p>
                  {award.position ? (
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-700">{award.position}</span>
                  ) : (
                    <p className="text-xs font-medium text-neutral-gray-medium">Not position-based</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[10px] text-neutral-gray-medium mb-1">Work Summary</p>
                <p className="text-xs text-neutral-gray-dark leading-relaxed">{award.summary || '—'}</p>
              </div>

              <Field icon={Link2} label="Work Link" value={award.workLink || '—'} />

              <div>
                <p className="text-[10px] text-neutral-gray-medium mb-1.5">Social Media</p>
                {socials.length === 0 ? (
                  <p className="text-xs text-neutral-gray-medium">No social links added.</p>
                ) : (
                  <ul className="space-y-1.5">
                    {socials.map((s) => {
                      const Icon = s.icon;
                      return (
                        <li key={s.label} className="flex items-center gap-2 text-xs text-neutral-gray-dark min-w-0">
                          {Icon ? <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${s.cls}`} /> : <span className={`text-[11px] font-bold flex-shrink-0 ${s.cls}`}>X</span>}
                          <span className="text-neutral-gray-medium flex-shrink-0">{s.label}:</span>
                          <span className="truncate">{s.href}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </Section>

          <Section number={4} title="Rewards">
            <RewardLines items={award.rewards} emptyText="No rewards listed." />
          </Section>

          <Section number={5} title="Honorary Awards">
            <RewardLines items={award.honorary ?? []} emptyText="No honorary awards listed." />
          </Section>
        </div>

        <div className="px-5 py-3 border-t border-neutral-gray-light flex justify-end shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
