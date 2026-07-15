'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Calendar, Gift, Linkedin, Twitter, Instagram, Globe, Eye, Play, ZoomIn, Download, X } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { AWARD_WINNERS } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import { getTypeColor, getTypeIcon, getPositionStyle, getPositionLabel, usesMedal, shouldHideSocialHandles, isHighTierSponsor } from '@/app/awards/data';
import PreviewModal from '@/app/awards/components/PreviewModal';
import { toast } from 'sonner';

const PRIMARY_SECONDARY = ['Lower Primary', 'Upper Primary', 'Junior Secondary', 'Senior Secondary'];

function handleDownload(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success(`${filename} download started`);
}

export default function AwardDetail() {
  const { id } = useParams();
  const award = AWARD_WINNERS.find(a => a.id === id);
  const [preview, setPreview] = useState<{ title: string; url: string } | null>(null);

  if (!award) {
    return (
      <div className="min-h-screen bg-neutral-bg-light py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Award not found</h1>
          <Link href="/awards"><Button variant="outline" className="mt-4">Back to Awards</Button></Link>
        </div>
      </div>
    );
  }

  const isCompetition = award.type === 'Competitions Award';
  const isDonation = award.type === 'Donations Award';
  const isSponsor = award.type === 'Sponsorships Award';
  const TypeIcon = getTypeIcon(award.type);
  const isMedal = usesMedal(award.type);
  const hideSocial = shouldHideSocialHandles(award.category || '');

  const showMagazineFeature = isDonation && (award.donationAmount ?? 0) > 500;
  const showDonationAwardPresentation = isDonation && (award.donationAmount ?? 0) > 2500;
  const showAwardPresentation = !isDonation || showDonationAwardPresentation;

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link href="/awards" className="inline-flex items-center gap-1 text-sm text-brand-red-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Awards
        </Link>

        <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-[#d8dfeb] px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-[#172235] lg:text-xl">Award Details</h2>
              <p className="text-xs text-[#97a4b9] lg:text-sm">Winner profile and award information</p>
            </div>
            <Link href="/awards">
              <button type="button" className="cursor-pointer text-[#56657b] transition hover:text-[#172235]">
                <X className="h-8 w-8" />
              </button>
            </Link>
          </div>

          <div className="space-y-6 px-6 py-5">
            {/* Profile section - like ViewWorkModal */}
            <section className="grid gap-5 rounded-lg border border-[#d9e1ec] p-4 md:grid-cols-[180px_1fr]">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={award.image}
                  alt={award.name}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold", getTypeColor(award.type))}>
                    <TypeIcon className="h-3 w-3" />{award.type}
                  </span>
                  {isCompetition && award.position && (
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", getPositionStyle(award.position))}>
                      {getPositionLabel(award.position)}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-[#172235]">{award.name}</h3>
                <div className="mt-3 grid gap-2 text-sm text-[#55657b] sm:grid-cols-2">
                  {isCompetition && award.competition && (
                    <p><span className="font-semibold text-[#172235]">Competition:</span> {award.competition}</p>
                  )}
                  {isCompetition && award.category && (
                    <p><span className="font-semibold text-[#172235]">Category:</span> {award.category}</p>
                  )}
                  <p><span className="font-semibold text-[#172235]">Country:</span> {award.country}</p>
                  <p><span className="font-semibold text-[#172235]">Year:</span> {award.year}</p>
                </div>
              </div>
            </section>

            {/* Rewards */}
            <section className="rounded-lg border border-[#d9e1ec] p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[#ff3b30]">Rewards</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {award.rewards
                  .filter(r => {
                    if (isDonation && r === 'Feature in Annual Donor Magazine') return showMagazineFeature;
                    if (isSponsor && r === 'Homepage Feature') return isHighTierSponsor(award.tier);
                    return true;
                  })
                  .map((r, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full">
                      <Gift className="h-3 w-3" />{r}
                    </span>
                  ))}
              </div>
            </section>

            {/* Honorary Awards - actual pictures of badge/medal/certificate/presentation */}
            <section className="rounded-lg border border-[#d9e1ec] p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[#ff3b30]">Honorary Awards</p>
              <div className="mt-3 grid grid-cols-3 gap-4">
                {award.badgeImage && (
                  <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-neutral-gray-light hover:border-amber-300 hover:bg-amber-50 transition-colors group">
                    <button
                      onClick={() => setPreview({ title: isMedal ? 'Medal' : 'Badge', url: award.badgeImage! })}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <div className="relative w-20 h-20">
                        <Image src={award.badgeImage} alt={isMedal ? 'Medal' : 'Badge'} fill className="rounded-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-xs font-medium text-neutral-gray-dark">{isMedal ? 'Medal' : 'Badge'}</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <ZoomIn className="h-4 w-4 text-amber-500 cursor-pointer" onClick={() => setPreview({ title: isMedal ? 'Medal' : 'Badge', url: award.badgeImage! })} />
                      <Download className="h-4 w-4 text-brand-navy-900 cursor-pointer hover:text-brand-red-600 transition-colors" onClick={() => handleDownload(award.badgeImage!, isMedal ? 'Medal' : 'Badge')} />
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-neutral-gray-light hover:border-amber-300 hover:bg-amber-50 transition-colors group">
                  <button
                    onClick={() => setPreview({ title: 'Certificate of Recognition', url: award.certificate })}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <div className="relative w-20 h-20">
                      <Image src={award.certificate} alt="Certificate" fill className="rounded object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-medium text-neutral-gray-dark">Certificate</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <ZoomIn className="h-4 w-4 text-amber-500 cursor-pointer" onClick={() => setPreview({ title: 'Certificate of Recognition', url: award.certificate })} />
                    <Download className="h-4 w-4 text-brand-navy-900 cursor-pointer hover:text-brand-red-600 transition-colors" onClick={() => handleDownload(award.certificate, 'Certificate')} />
                  </div>
                </div>
                {showAwardPresentation && award.awardPresentation && (
                  <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-neutral-gray-light hover:border-amber-300 hover:bg-amber-50 transition-colors group">
                    <button
                      onClick={() => setPreview({ title: 'Award Presentation', url: award.awardPresentation! })}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <div className="relative w-20 h-20">
                        <Image src={award.awardPresentation} alt="Award Presentation" fill className="rounded object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-xs font-medium text-neutral-gray-dark">Presentation</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <ZoomIn className="h-4 w-4 text-amber-500 cursor-pointer" onClick={() => setPreview({ title: 'Award Presentation', url: award.awardPresentation! })} />
                      <Download className="h-4 w-4 text-brand-navy-900 cursor-pointer hover:text-brand-red-600 transition-colors" onClick={() => handleDownload(award.awardPresentation!, 'Award_Presentation')} />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Work Summary (for competitions) */}
            {award.workSummary && (
              <section className="rounded-lg border border-[#d9e1ec] p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[#ff3b30]">Work Summary</p>
                <p className="mt-2 text-sm leading-6 text-[#55657b]">{award.workSummary}</p>
                {award.workMedia && award.workMedia.length > 0 && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {award.workMedia.map((m, i) => (
                      <div key={i} className="relative aspect-video rounded-xl overflow-hidden group border border-neutral-gray-light">
                        <Image src={m} alt={`Work ${i + 1}`} fill sizes="33vw" className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="sm" className="bg-white/90 text-brand-navy-900 hover:bg-white flex items-center gap-1"><Play className="h-4 w-4" /> View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Social Handles */}
            <section className="rounded-lg border border-[#d9e1ec] p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[#ff3b30]">
                {award.competition === 'Afri \u2013 Presentations' && PRIMARY_SECONDARY.includes(award.category || '')
                  ? 'Social Handles (Guardian)'
                  : 'Social Handles'}
              </p>
              {hideSocial ? (
                <p className="mt-2 text-sm text-neutral-gray-medium">Social handles are not displayed for this category.</p>
              ) : (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: 'LinkedIn', icon: FaLinkedinIn, key: 'linkedin' },
                    { label: 'Twitter', icon: FaTwitter, key: 'twitter' },
                    { label: 'Instagram', icon: FaInstagram, key: 'instagram' },
                    { label: 'Facebook', icon: FaFacebookF, key: 'facebook' },
                  ].map(({ label, icon: Icon, key }) => {
                    const url = (award.socialLinks as Record<string, string> | undefined)?.[key];
                    return url ? (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex cursor-pointer items-center justify-between rounded-lg border border-[#d9e1ec] px-4 py-3 text-sm font-semibold text-[#172235] transition hover:bg-[#f7f9fc]"
                      >
                        <span className="inline-flex items-center gap-3">
                          <Icon className="h-4 w-4 text-[#ff3b30]" />
                          {label}
                        </span>
                        <Globe className="h-4 w-4 text-[#91a3bf]" />
                      </a>
                    ) : null;
                  })}
                  {!award.socialLinks?.linkedin && !award.socialLinks?.twitter && !award.socialLinks?.instagram && !award.socialLinks?.facebook && (
                    <p className="text-sm text-neutral-gray-medium col-span-2">No social handles available.</p>
                  )}
                </div>
              )}
            </section>
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t border-[#d8dfeb] bg-[#f7f9fc] px-6 py-4">
            <Link href="/awards">
              <button type="button" className="cursor-pointer rounded-md border border-[#d8dfeb] bg-white px-4 py-2 text-sm font-semibold text-[#172235]">
                Close
              </button>
            </Link>
          </div>
        </div>
      </div>

      <PreviewModal isOpen={!!preview} onClose={() => setPreview(null)} imageUrl={preview?.url || ''} title={preview?.title || ''} />
    </div>
  );
}
