'use client';

import { useState } from 'react';
import { X, Share2, Link as LinkIcon, Check, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../../lib/utils';
import { toast } from 'sonner';

interface Contestant {
  id: string;
  name: string;
  country: string;
  image: string;
  competition: string;
  category: string;
}

interface ShareVotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  contestants: Contestant[];
  pageUrl: string;
}

export function ShareVotingModal({ isOpen, onClose, contestants, pageUrl }: ShareVotingModalProps) {
  const [shareMode, setShareMode] = useState<'page' | 'contestant' | null>(null);
  const [selectedContestant, setSelectedContestant] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = (link: string) => {
    // Fallback method for when Clipboard API is blocked
    const fallbackCopy = (text: string) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      } catch (err) {
        document.body.removeChild(textArea);
        return false;
      }
    };

    // Try modern clipboard API first, then fallback
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link)
        .then(() => {
          setCopied(true);
          toast.success('Link copied to clipboard!');
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          // If modern API fails, use fallback
          const success = fallbackCopy(link);
          if (success) {
            setCopied(true);
            toast.success('Link copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
          } else {
            toast.error('Failed to copy link. Please copy manually.');
          }
        });
    } else {
      // Use fallback directly if modern API not available
      const success = fallbackCopy(link);
      if (success) {
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } else {
        toast.error('Failed to copy link. Please copy manually.');
      }
    }
  };

  const getContestantShareUrl = (contestantId: string) => {
    return `${window.location.origin}/voting/contestant/${contestantId}`;
  };

  const shareUrl = shareMode === 'contestant' && selectedContestant
    ? getContestantShareUrl(selectedContestant)
    : pageUrl;

  const shareText = shareMode === 'contestant' && selectedContestant
    ? `Vote for ${contestants.find(c => c.id === selectedContestant)?.name} on AfriScience Hub!`
    : 'Check out the voting page on AfriScience Hub and cast your vote!';

  const handleSocialShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-gray-light">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-brand-red-50">
              <Share2 className="h-5 w-5 text-brand-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-black">Share Voting</h2>
              <p className="text-xs text-neutral-gray-medium">Spread the word and encourage voting</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-neutral-bg-light transition-colors"
          >
            <X className="h-5 w-5 text-neutral-gray-dark" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!shareMode ? (
            /* Initial Selection */
            <div className="space-y-4">
              <p className="text-sm text-neutral-gray-dark mb-6">Choose what you'd like to share:</p>
              
              <button
                onClick={() => setShareMode('page')}
                className="w-full flex items-start gap-4 p-5 rounded-xl border-2 border-neutral-gray-light hover:border-brand-red-600 hover:bg-brand-red-50 transition-all group"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-brand-red-600 group-hover:text-white transition-colors flex-shrink-0">
                  <LinkIcon className="h-6 w-6" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-neutral-black mb-1">Share Entire Page</h3>
                  <p className="text-sm text-neutral-gray-dark">Share the voting page link to promote voting generally</p>
                </div>
              </button>

              <button
                onClick={() => setShareMode('contestant')}
                className="w-full flex items-start gap-4 p-5 rounded-xl border-2 border-neutral-gray-light hover:border-brand-red-600 hover:bg-brand-red-50 transition-all group"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-brand-red-600 group-hover:text-white transition-colors flex-shrink-0">
                  <Share2 className="h-6 w-6" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-neutral-black mb-1">Share Contestant</h3>
                  <p className="text-sm text-neutral-gray-dark">Select a specific contestant to share their work</p>
                </div>
              </button>
            </div>
          ) : shareMode === 'contestant' && !selectedContestant ? (
            /* Contestant Selection */
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-neutral-black">Select a Contestant</h3>
                <button
                  onClick={() => setShareMode(null)}
                  className="text-sm text-brand-red-600 hover:underline"
                >
                  Back
                </button>
              </div>
              <div className="grid gap-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                {contestants.map((contestant) => (
                  <button
                    key={contestant.id}
                    onClick={() => setSelectedContestant(contestant.id)}
                    className="flex items-center gap-4 p-4 rounded-xl border border-neutral-gray-light hover:border-brand-red-600 hover:bg-brand-red-50 transition-all text-left"
                  >
                    <img
                      src={contestant.image}
                      alt={contestant.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-neutral-black truncate">{contestant.name}</h4>
                      <p className="text-sm text-neutral-gray-medium">{contestant.country}</p>
                      <p className="text-xs text-neutral-gray-medium mt-0.5">{contestant.competition} • {contestant.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Share Options */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-neutral-black">Share Link</h3>
                <button
                  onClick={() => {
                    setShareMode(null);
                    setSelectedContestant(null);
                  }}
                  className="text-sm text-brand-red-600 hover:underline"
                >
                  Start Over
                </button>
              </div>

              {/* Copy Link */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">
                  Share URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-4 py-3 rounded-lg border border-neutral-gray-light bg-neutral-bg-light text-sm"
                  />
                  <Button
                    onClick={() => handleCopyLink(shareUrl)}
                    variant="outline"
                    className="flex items-center gap-2 px-4"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <LinkIcon className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Social Media Sharing */}
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-3">
                  Share on Social Media
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleSocialShare('facebook')}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-gray-light hover:border-blue-600 hover:bg-blue-50 transition-all group"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Facebook className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-neutral-black">Facebook</span>
                  </button>

                  <button
                    onClick={() => handleSocialShare('twitter')}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-gray-light hover:border-sky-500 hover:bg-sky-50 transition-all group"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                      <Twitter className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-neutral-black">Twitter</span>
                  </button>

                  <button
                    onClick={() => handleSocialShare('linkedin')}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-gray-light hover:border-blue-700 hover:bg-blue-50 transition-all group"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                      <Linkedin className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-neutral-black">LinkedIn</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-gray-light bg-neutral-bg-light">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}