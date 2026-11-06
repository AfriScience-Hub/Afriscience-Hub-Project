'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  ArrowLeft, Users, Search, Plus, LayoutGrid, GraduationCap,
  Briefcase, Wrench, Globe, Tag, Loader2,
} from 'lucide-react';
import OptionDialog from '../../special-centres/manage-options/components/OptionDialog';
import PriceSideDialog from '../../special-centres/manage-options/components/PriceSideDialog';
import SplitPricingTable from './components/SplitPricingTable';
import {
  MANAGE_TABS, TAB_DESCRIPTIONS, TAB_SINGULAR, TABS_WITHOUT_NOTE,
  type ManageTab,
} from './data';
import { useScientistOptions } from './useScientistOptions';
import OptionsContent from './components/OptionsContent';

const TAB_ICONS: Record<ManageTab, React.ComponentType<{ className?: string }>> = {
  Fields: LayoutGrid,
  Profession: Wrench,
  Degree: GraduationCap,
  Services: Briefcase,
  Price: Tag,
  Country: Globe,
};

export default function ScientistManageOptionsPage() {
  const s = useScientistOptions();
  const showNote = !TABS_WITHOUT_NOTE.includes(s.activeTab);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-4">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link>
            <span>›</span>
            <Link href="/admin/categories/scientists-technologies" className="hover:underline">Scientists &amp; Technologists</Link>
            <span>›</span>
            <span className="text-neutral-black font-medium">Manage Options</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Manage Scientist Options
          </h1>
          <p className="text-xs text-neutral-black mt-1 max-w-2xl">
            Add, edit and organize the options that users will see when submitting a scientist or technologist listing and in filters on the public site.
          </p>
        </div>
        <Link
          href="/admin/categories/scientists-technologies"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light shrink-0 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="border-b border-neutral-gray-light overflow-x-auto">
          <div className="flex gap-0 px-2">
            {MANAGE_TABS.map((tab) => {
              const Icon = TAB_ICONS[tab.id];
              const isActive = s.activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => s.changeTab(tab.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer',
                    isActive ? 'border-[#453DD8] text-[#453DD8]' : 'border-transparent text-neutral-gray-medium hover:text-neutral-black'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-xs text-neutral-black mb-4">
            <span className="font-semibold text-neutral-black">{s.activeTab}</span> — {TAB_DESCRIPTIONS[s.activeTab]}
          </p>

          {s.activeTab === 'Price' ? (
            s.isLoading ? (
              <div className="flex items-center justify-center gap-2 py-12 text-xs text-neutral-gray-medium">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading prices…
              </div>
            ) : (
              <SplitPricingTable
                price={s.professionPrice}
                itemNoun="profession"
                itemNounPlural="professions"
                africanTitle="African Scientists"
                nonAfricanTitle="Non-African Scientists"
                footnote="Non-African scientist and technologist listings also add the Country fee."
                onEditAfrican={() => s.setPriceSide('african')}
                onEditNonAfrican={() => s.setPriceSide('nonAfrican')}
              />
            )
          ) : (
          <div className="rounded-xl border border-neutral-gray-light bg-white overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 py-3 border-b border-neutral-gray-light bg-neutral-bg-light/40">
              <button
                onClick={s.openCreate}
                disabled={s.addDisabled}
                title={s.addDisabled ? 'Add a field first' : undefined}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-3.5 w-3.5" /> Add {TAB_SINGULAR[s.activeTab]}
              </button>
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium" />
                <input
                  value={s.search}
                  onChange={(e) => s.setSearch(e.target.value)}
                  placeholder={`Search ${s.activeTab.toLowerCase()}...`}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs focus:ring-2 focus:ring-[#453DD8] focus:border-[#453DD8] outline-none"
                />
              </div>
            </div>

            <OptionsContent
              activeTab={s.activeTab}
              isLoading={s.isLoading}
              isFieldScoped={s.isFieldScoped}
              professionFields={s.professionFields}
              availableFields={s.availableFields}
              filtered={s.filtered}
              total={s.rows.length}
              showNote={showNote}
              onEdit={s.openEdit}
              onToggleStatus={s.handleToggleStatus}
              onAddUnder={s.openCreateUnder}
            />
          </div>
          )}
        </div>
      </div>

      <OptionDialog
        open={s.dialogOpen}
        onClose={s.closeDialog}
        onSave={s.handleSave}
        initial={s.dialogInitial}
        tabLabel={s.activeTab}
        singular={TAB_SINGULAR[s.activeTab]}
        fieldOptions={s.isFieldScoped ? s.availableFields.map((f) => f.name) : undefined}
        showNote={showNote}
        showIsActive
        saving={s.saving}
        error={s.saveError}
      />

      <PriceSideDialog
        open={s.priceSide !== null}
        side={s.priceSide}
        one={s.priceSide === 'nonAfrican' ? s.professionPrice.nonAfricaOne : s.professionPrice.africaOne}
        twoOrMore={s.priceSide === 'nonAfrican' ? s.professionPrice.nonAfricaTwoOrMore : s.professionPrice.africaTwoOrMore}
        itemNoun="profession"
        onClose={() => s.setPriceSide(null)}
        onSave={s.handleSidePriceSave}
      />
    </div>
  );
}
