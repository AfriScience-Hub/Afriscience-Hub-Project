import React, { useState } from 'react';
import { MessageSquarePlus, X, Send } from 'lucide-react';
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

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [section, setSection] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log({
        email,
        type,
        section,
        feedback,
        referenceNo: type === 'Report' ? referenceNo : undefined,
      });

      toast.success('Feedback submitted successfully!', {
        description: 'Thank you for helping us improve AfriScience Hub.',
      });

      // Reset form
      setEmail('');
      setType('');
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
          <MessageSquarePlus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Feedback</DialogTitle>
          <DialogDescription>
            We value your input. Please share your thoughts, suggestions, or report issues.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Suggestion">Suggestion</SelectItem>
                  <SelectItem value="Report">Report</SelectItem>
                  <SelectItem value="Sponsorship and Partnership">Sponsorship & Partnership</SelectItem>
                  <SelectItem value="Complaint">Complaint</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Select value={section} onValueChange={setSection} required>
                <SelectTrigger id="section">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Institutes">Institutes</SelectItem>
                  <SelectItem value="Scientists & Technologists">Scientists & Technologists</SelectItem>
                  <SelectItem value="Specialist Centers">Specialist Centers</SelectItem>
                  <SelectItem value="Afro-Innovations">Afro-Innovations</SelectItem>
                  <SelectItem value="Competitions">Competitions</SelectItem>
                  <SelectItem value="Voting">Voting</SelectItem>
                  <SelectItem value="Awards">Awards</SelectItem>
                  <SelectItem value="Sponsors">Sponsors</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {type === 'Report' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label htmlFor="referenceNo">Booking Reference No. or ID Tag</Label>
              <Input
                id="referenceNo"
                placeholder="e.g. REF-12345"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you think..."
              className="min-h-[100px]"
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