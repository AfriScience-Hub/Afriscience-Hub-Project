'use client';

import React from 'react';
import { Settings, Shield, Bell, Globe, Database, Palette } from 'lucide-react';

const settingsSections = [
  { title: 'General Settings', description: 'Platform name, logo, and basic configuration', icon: Settings },
  { title: 'Security', description: 'Authentication, passwords, and access controls', icon: Shield },
  { title: 'Notifications', description: 'Email templates and notification preferences', icon: Bell },
  { title: 'Integrations', description: 'Third-party services and API connections', icon: Globe },
  { title: 'Database', description: 'Backups, maintenance, and data management', icon: Database },
  { title: 'Appearance', description: 'Themes, branding, and customisation', icon: Palette },
];

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-black">System Settings</h1>
        <p className="text-sm text-neutral-gray-dark mt-1">Configure platform settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingsSections.map((section) => (
          <div key={section.title} className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-2 bg-neutral-bg-light rounded-lg w-fit mb-3">
              <section.icon className="h-5 w-5 text-neutral-gray-dark" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-black">{section.title}</h3>
            <p className="text-xs text-neutral-gray-dark mt-1">{section.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-neutral-black mb-4">Platform Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-neutral-gray-medium">Platform Name</label>
            <p className="text-sm font-medium text-neutral-black">AFRISCIENCE HUB</p>
          </div>
          <div>
            <label className="text-xs text-neutral-gray-medium">Version</label>
            <p className="text-sm font-medium text-neutral-black">v2.1.0</p>
          </div>
          <div>
            <label className="text-xs text-neutral-gray-medium">Environment</label>
            <p className="text-sm font-medium text-neutral-black">Production</p>
          </div>
          <div>
            <label className="text-xs text-neutral-gray-medium">Last Updated</label>
            <p className="text-sm font-medium text-neutral-black">2026-01-15</p>
          </div>
        </div>
      </div>
    </div>
  );
}
