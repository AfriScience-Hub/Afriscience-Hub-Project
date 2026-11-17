'use client';

import React, { useState, useEffect } from 'react';
import {
  Send, CheckCircle2, Lightbulb, AlertTriangle, Handshake, MessageSquareWarning, PenLine,
  GraduationCap, Beaker, Microscope, Trophy, Vote, Award, HeartHandshake, Users,
} from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';
import { OPEN_FEEDBACK_EVENT, type FeedbackPrefill } from '@/lib/feedback';
import { useAuth } from '../context/AuthContext';
import { useAppSelector } from '@/store/hooks';

const FEEDBACK_TYPES = [
  { value: 'Suggestion', label: 'Suggestion', icon: Lightbulb },
  { value: 'Report', label: 'Report', icon: AlertTriangle },
  { value: 'Sponsorship and Partnership', label: 'Sponsorship & Partnership', icon: Handshake },
  { value: 'Complaint', label: 'Complaint', icon: MessageSquareWarning },
  { value: 'Other', label: 'Other', icon: PenLine },
];

const FEEDBACK_SECTIONS = [
  { value: 'Educational Institutes', label: 'Educational Institutes', icon: GraduationCap },
  { value: 'Scientists & Technologists', label: 'Scientists & Technologists', icon: Beaker },
  { value: 'Specialist Centers', label: 'Specialist Centers', icon: Microscope },
  { value: 'Afro-Innovations', label: 'Afro-Innovations', icon: Lightbulb },
  { value: 'Competitions', label: 'Competitions', icon: Trophy },
  { value: 'Voting', label: 'Voting', icon: Vote },
  { value: 'Awards', label: 'Awards', icon: Award },
  { value: 'Sponsors', label: 'Sponsors', icon: Handshake },
  { value: 'Donate', label: 'Donate', icon: HeartHandshake },
  { value: 'Volunteer', label: 'Volunteer', icon: Users },
];

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [customType, setCustomType] = useState('');
  const [section, setSection] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const profileUsername = useAppSelector((s) => s.profile.personal?.username);
  const resolvedUsername = profileUsername || (user?.email ? user.email.split('@')[0] : '');

  // Keep the username in sync with the signed-in account until the user edits it.
  useEffect(() => {
    if (!username && resolvedUsername) setUsername(resolvedUsername);
  }, [resolvedUsername, username]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<FeedbackPrefill>).detail || {};
      if (detail.email !== undefined) setEmail(detail.email);
      if (detail.type !== undefined) setType(detail.type);
      if (detail.section !== undefined) setSection(detail.section);
      if (resolvedUsername) setUsername((prev) => prev || resolvedUsername);
      setOpen(true);
    };
    window.addEventListener(OPEN_FEEDBACK_EVENT, handler);
    return () => window.removeEventListener(OPEN_FEEDBACK_EVENT, handler);
  }, [resolvedUsername]);

  const referenceIsValid = /^[A-Za-z0-9-]{5,}$/.test(referenceNo.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log({
        email,
        username,
        type: type === 'Other' ? customType : type,
        section,
        feedback,
        referenceNo: type === 'Report' ? referenceNo : undefined,
      });

      toast.success('Feedback submitted successfully!', {
        description: 'Thank you for helping us improve AfriScience Hub.',
      });

      setEmail('');
      setUsername('');
      setType('');
      setCustomType('');
      setSection('');
      setFeedback('');
      setReferenceNo('');
      setOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-brand-red-600 hover:bg-brand-red-700 text-white"
          size="icon"
          aria-label="Submit Feedback"
        >
          <Send className="h-6 w-6" fill="white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Feedback</DialogTitle>
          <DialogDescription className="text-md text-neutral-black">
            We value your input. Please share your thoughts, suggestions, or report issues.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="your username"
                className="bg-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger id="type" className="bg-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {FEEDBACK_TYPES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      <span className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-brand-red-600" />
                        {item.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Select value={section} onValueChange={setSection} required>
                <SelectTrigger id="section" className="bg-white">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {FEEDBACK_SECTIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      <span className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-brand-red-600" />
                        {item.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {type === 'Other' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label htmlFor="customType">Please specify</Label>
              <Input
                id="customType"
                placeholder="Tell us the type of feedback"
                className="bg-white"
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                required
              />
            </div>
          )}

          {type === 'Report' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label htmlFor="referenceNo">Booking Reference No. or Username</Label>
              <div className="relative">
                <Input
                  id="referenceNo"
                  placeholder="e.g. REF-12345 or @username"
                  className="bg-white pr-10"
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  required
                />
                {referenceIsValid && (
                  <CheckCircle2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />
                )}
              </div>
              {referenceIsValid ? (
                <p className="flex items-center gap-1 text-xs font-medium text-green-600">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Entry confirmed.
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  Enter the booking reference or username so we can locate the entry.
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you think..."
              className="min-h-[100px] bg-white"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Feedback
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
