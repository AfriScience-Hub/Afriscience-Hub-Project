'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Trophy, Calendar, DollarSign, Users, CheckCircle, ShieldCheck,
  FileText, Award, BookOpen, ArrowLeft, Clock, AlertTriangle,
  Video, Image as ImageIcon, ChevronRight, ListChecks, Scale, Gift, ClipboardCheck
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { COMPETITIONS } from '@/app/data/mockData';
import { useAuth } from '@/app/context/AuthContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import PaymentModal from './components/PaymentModal';
import { AfriAnimeDetails } from './components/AfriAnimeDetails';

export default function CompetitionDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [undertakingChecked, setUndertakingChecked] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const comp = COMPETITIONS.find(c => c.id === id);

  if (!comp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-bg-light">
        <h2 className="text-2xl font-bold text-neutral-black">Competition Not Found</h2>
        <Link href="/competitions">
          <Button className="mt-4">Back to Competitions</Button>
        </Link>
      </div>
    );
  }

  const isPresentation = comp.type === 'Afri \u2013 Presentations';
  const hasTopics = comp.topics && comp.topics.length > 0;
  const daysLeft = Math.max(0, Math.ceil((new Date(comp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Afri \u2013 Anime': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Afri \u2013 Presentations': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Afri \u2013 Memes': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Afri \u2013 MySpace': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light';
    }
  };

  const handleApplyClick = (topic?: string) => {
    if (!isAuthenticated) {
      toast.error('Please log in to apply for competitions.');
      router.push('/login');
      return;
    }
    if (!undertakingChecked) {
      toast.error('Please accept the Undertaking Remark before applying.');
      return;
    }
    if (topic) setSelectedTopic(topic);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setShowPaymentModal(false);
      toast.success('Payment successful! Redirecting to application form...');
      const refNo = `ASH-${comp.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
      sessionStorage.setItem('comp_ref', refNo);
      sessionStorage.setItem('comp_topic', selectedTopic || '');
      router.push(`/competitions/${comp.id}/apply`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-bg-light pb-12">
      <div className="relative h-64 md:h-80 bg-brand-navy-900 overflow-hidden">
        <Image src={comp.image} alt={comp.title} fill className="object-cover opacity-30" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-brand-navy-900/70 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
          <Link href="/competitions" className="flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to Competitions
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase border", getTypeColor(comp.type))}>
              {comp.type}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/10 text-white border border-white/20">
              {comp.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{comp.title}</h1>
          <div className="flex flex-wrap items-center gap-5 mt-3 text-white/80 text-sm">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Deadline: {new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {daysLeft} days left</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4" /> {comp.participants} participants</span>
            <span className="flex items-center gap-2"><DollarSign className="h-4 w-4" /> Registration: {comp.registrationFee}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-xl shadow-sm border border-neutral-gray-light overflow-hidden">
              <Image src={comp.image} alt={comp.title} width={0} height={0} sizes="100vw" className="w-full h-64 md:h-80 object-cover" />
            </section>

            {comp.type === 'Afri \u2013 Anime' ? (
              <AfriAnimeDetails
                comp={comp}
                undertakingChecked={undertakingChecked}
                onUndertakingChange={setUndertakingChecked}
                onApply={() => handleApplyClick()}
              />
            ) : (
              <>
                <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
                  <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-brand-navy-900" /> Competition Description
                  </h3>
                  <p className="text-neutral-gray-dark leading-relaxed">{comp.description}</p>
                </section>

                <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
                  <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-brand-red-600" /> Registration Requirements
                  </h3>
                  <ul className="space-y-2">
                    {comp.registrationRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-gray-dark">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
                  <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-brand-navy-900" /> Rules
                  </h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    {comp.rules.map((rule, idx) => (
                      <li key={idx} className="text-sm text-neutral-gray-dark">{rule}</li>
                    ))}
                  </ol>
                </section>

                <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
                  <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-brand-navy-900" /> Selection & Screening
                  </h3>
                  <p className="text-sm text-neutral-gray-dark leading-relaxed">{comp.selectionScreening}</p>
                </section>

                <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
                  <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
                    <Scale className="h-5 w-5 text-neutral-gray-dark" /> Consent
                  </h3>
                  <p className="text-sm text-neutral-gray-dark leading-relaxed">{comp.consent}</p>
                </section>

                <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
                  <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
                    <Gift className="h-5 w-5 text-amber-500" /> Reward
                  </h3>
                  <p className="text-sm text-neutral-gray-dark leading-relaxed">{comp.reward}</p>
                </section>

                <section className="bg-brand-red-50 rounded-xl p-6 shadow-sm border border-brand-red-200">
                  <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-brand-red-600" /> Undertaking Remark
                  </h3>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={undertakingChecked}
                      onChange={(e) => setUndertakingChecked(e.target.checked)}
                      className="mt-1 rounded border-brand-red-300 text-brand-red-600 focus:ring-brand-red-600"
                    />
                    <span className="text-sm text-neutral-gray-dark leading-relaxed">{comp.undertakingRemark}</span>
                  </label>
                </section>

                {hasTopics && (
                  <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
                    <h3 className="text-lg font-bold text-neutral-black mb-2 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-brand-navy-900" /> Topics
                    </h3>
                    <p className="text-xs text-neutral-gray-medium mb-4">Choose one of the following topics to base your presentation on. Maximum 3 topics available.</p>
                    <div className="space-y-4">
                      {comp.topics.map((topic, idx) => (
                        <div key={idx} className="rounded-lg border border-neutral-gray-light p-5 bg-neutral-bg-light/50 hover:border-brand-red-200 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-brand-navy-900 text-white text-sm font-bold flex-shrink-0">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-neutral-black font-medium leading-relaxed">{topic}</p>
                              <Button
                                size="sm"
                                className="mt-3 bg-brand-red-600 hover:bg-brand-red-700"
                                disabled={!undertakingChecked}
                                onClick={() => handleApplyClick(topic)}
                              >
                                Apply for this Topic <ChevronRight className="h-3 w-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {!hasTopics && (
                  <div className="pt-2">
                    <Button
                      size="lg"
                      className="w-full bg-brand-red-600 hover:bg-brand-red-700 py-6 text-lg"
                      disabled={!undertakingChecked}
                      onClick={() => handleApplyClick()}
                    >
                      <Trophy className="h-5 w-5 mr-2" /> Apply Now ({comp.registrationFee})
                    </Button>
                    {!undertakingChecked && (
                      <p className="text-xs text-brand-red-600 text-center mt-2">Please accept the Undertaking Remark above to enable the Apply button.</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light sticky top-24">
              <h3 className="text-sm font-bold text-neutral-gray-dark uppercase tracking-wider mb-4">Competition Info</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-black">Type</span>
                  <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase border", getTypeColor(comp.type))}>{comp.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-black">Category</span>
                  <span className="text-sm text-neutral-gray-dark font-medium">{comp.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-black">Country</span>
                  <span className="text-sm text-neutral-gray-dark font-medium">{comp.country}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-black">Registration</span>
                  <span className="text-sm text-green-700 font-bold">{comp.registrationFee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-black">Deadline</span>
                  <span className="text-sm text-neutral-gray-dark font-medium">
                    {new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-black">Days Left</span>
                  <span className={cn("text-sm font-bold", daysLeft <= 7 ? "text-brand-red-600" : "text-brand-navy-900")}>{daysLeft}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-black">Media Type</span>
                  <span className="flex items-center gap-1.5 text-sm text-neutral-gray-dark font-medium">
                    {comp.mediaType === 'video' ? <Video className="h-3.5 w-3.5" /> : <ImageIcon className="h-3.5 w-3.5" />}
                    {comp.mediaType === 'video' ? 'Video' : 'Image'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-black">Participants</span>
                  <span className="text-sm text-neutral-gray-dark font-medium">{comp.participants}</span>
                </div>

                <div className="pt-4 border-t border-neutral-gray-light">
                  <Button
                    className="w-full mb-2 bg-brand-red-600 hover:bg-brand-red-700"
                    disabled={!undertakingChecked}
                    onClick={() => handleApplyClick()}
                  >
                    Apply Now
                  </Button>
                  {!undertakingChecked && (
                    <p className="text-[10px] text-neutral-gray-medium text-center">Accept the Undertaking Remark first</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <PaymentModal
          compTitle={comp.title}
          registrationFee={comp.registrationFee}
          selectedTopic={selectedTopic}
          paymentProcessing={paymentProcessing}
          onCancel={() => setShowPaymentModal(false)}
          onProceed={handlePayment}
        />
      )}
    </div>
  );
}
