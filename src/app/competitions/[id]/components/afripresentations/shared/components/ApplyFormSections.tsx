'use client';

import {
  User, Hash, FileText, Calendar, MapPin, Globe, BookOpen, Edit3,
  Link as LinkIcon, School, ChevronDown
} from 'lucide-react';
import type { Competition } from '@/app/competitions/data';

interface AutoFieldsSectionProps {
  user: { name: string; email: string };
  idTag: string;
  comp: Competition;
  topic: string;
}

export function AutoFieldsSection({ user, idTag, comp, topic }: AutoFieldsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div>
        <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
          <User className="h-3.5 w-3.5" /> Name
        </label>
        <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
          {user.name}
        </div>
        <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
          <Hash className="h-3.5 w-3.5" /> ID Tag
        </label>
        <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium font-mono">
          {idTag}
        </div>
        <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
          <FileText className="h-3.5 w-3.5" /> Competition Type
        </label>
        <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
          {comp.type}
        </div>
        <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
          <FileText className="h-3.5 w-3.5" /> Category
        </label>
        <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
          {comp.category}
        </div>
        <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
          <Calendar className="h-3.5 w-3.5" /> Application Date
        </label>
        <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
          {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
          <Calendar className="h-3.5 w-3.5" /> Submission Deadline
        </label>
        <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
          {new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
          <MapPin className="h-3.5 w-3.5" /> Country
        </label>
        <div className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm bg-neutral-bg-light text-neutral-black font-medium">
          {comp.country}
        </div>
        <p className="text-[10px] text-neutral-gray-medium mt-1">Automatically filled by platform</p>
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
          <BookOpen className="h-3.5 w-3.5" /> Topic
        </label>
        <div className="w-full rounded-lg border border-blue-200 p-3 text-sm bg-blue-50 text-blue-800 font-medium">
          {topic || 'No topic selected'}
        </div>
        <p className="text-[10px] text-blue-600 mt-1">Automatically filled by platform</p>
      </div>
    </div>
  );
}

interface LanguageSectionProps {
  language: string;
  otherLanguage: string;
  onLanguageChange: (v: string) => void;
  onOtherLanguageChange: (v: string) => void;
}

export function LanguageSection({ language, otherLanguage, onLanguageChange, onOtherLanguageChange }: LanguageSectionProps) {
  const LANGUAGES = ['English', 'French', 'Arabic', 'Portuguese', 'Spanish', 'Afrikaans', 'Other'];
  return (
    <div className="border-t border-neutral-gray-light pt-6">
      <div>
        <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
          <Globe className="h-3.5 w-3.5" /> Language
        </label>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm appearance-none bg-white focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          >
            <option value="">Select Language</option>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
        </div>
        {language === 'Other' && (
          <input
            type="text"
            value={otherLanguage}
            onChange={(e) => onOtherLanguageChange(e.target.value)}
            placeholder="Specify your preferred presentation language..."
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm mt-2 focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          />
        )}
      </div>
    </div>
  );
}

interface SchoolInfoSectionProps {
  schoolName: string;
  schoolAddress: string;
  onSchoolNameChange: (v: string) => void;
  onSchoolAddressChange: (v: string) => void;
}

export function SchoolInfoSection({ schoolName, schoolAddress, onSchoolNameChange, onSchoolAddressChange }: SchoolInfoSectionProps) {
  return (
    <>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
          <School className="h-3.5 w-3.5" /> Name of School/Institute
        </label>
        <input
          type="text"
          value={schoolName}
          onChange={(e) => onSchoolNameChange(e.target.value)}
          placeholder="Enter your school or institute name..."
          className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
        />
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
          <MapPin className="h-3.5 w-3.5" /> School Address
        </label>
        <input
          type="text"
          value={schoolAddress}
          onChange={(e) => onSchoolAddressChange(e.target.value)}
          placeholder="Enter the address of your school/institute..."
          className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
        />
      </div>
    </>
  );
}

interface ParentNameSectionProps {
  parentName: string;
  onParentNameChange: (v: string) => void;
}

export function ParentNameSection({ parentName, onParentNameChange }: ParentNameSectionProps) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
        <User className="h-3.5 w-3.5" /> Name of Parent/Guardian
      </label>
      <input
        type="text"
        value={parentName}
        onChange={(e) => onParentNameChange(e.target.value)}
        placeholder="Enter your parent or guardian&apos;s name..."
        className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
      />
      <p className="text-[10px] text-neutral-gray-medium mt-1">Enter the name of the person that guided you through this competition</p>
    </div>
  );
}

interface SummarySectionProps {
  summary: string;
  wordCount: number;
  wordLimit: number;
  onSummaryChange: (v: string) => void;
}

export function SummarySection({ summary, wordCount, wordLimit, onSummaryChange }: SummarySectionProps) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
        <Edit3 className="h-3.5 w-3.5" /> Presentation Summary
      </label>
      <textarea
        value={summary}
        onChange={(e) => onSummaryChange(e.target.value)}
        placeholder="Give a brief summary of the presentation points mentioned..."
        rows={5}
        className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-y"
      />
      <p className="text-[10px] text-neutral-gray-medium mt-1 text-right">{wordCount}/{wordLimit} words max.</p>
    </div>
  );
}

interface SocialHandlesSectionProps {
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
  onLinkedinChange: (v: string) => void;
  onTwitterChange: (v: string) => void;
  onInstagramChange: (v: string) => void;
  onFacebookChange: (v: string) => void;
}

export function SocialHandlesSection({ linkedin, twitter, instagram, facebook, onLinkedinChange, onTwitterChange, onInstagramChange, onFacebookChange }: SocialHandlesSectionProps) {
  return (
    <div className="border-t border-neutral-gray-light pt-6">
      <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-3">
        <LinkIcon className="h-3.5 w-3.5" /> Parent/Guardian&apos;s Social Handles
      </label>
      <p className="text-[10px] text-neutral-gray-medium mb-3">Only the parent&apos;s or guardian&apos;s social media handles are needed</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-neutral-gray-medium mb-1 block">LinkedIn</label>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => onLinkedinChange(e.target.value)}
            placeholder="https://linkedin.com/in/..."
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-gray-medium mb-1 block">Twitter</label>
          <input
            type="url"
            value={twitter}
            onChange={(e) => onTwitterChange(e.target.value)}
            placeholder="https://twitter.com/..."
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-gray-medium mb-1 block">Instagram</label>
          <input
            type="url"
            value={instagram}
            onChange={(e) => onInstagramChange(e.target.value)}
            placeholder="https://instagram.com/..."
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-gray-medium mb-1 block">Facebook</label>
          <input
            type="url"
            value={facebook}
            onChange={(e) => onFacebookChange(e.target.value)}
            placeholder="https://facebook.com/..."
            className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          />
        </div>
      </div>
    </div>
  );
}
