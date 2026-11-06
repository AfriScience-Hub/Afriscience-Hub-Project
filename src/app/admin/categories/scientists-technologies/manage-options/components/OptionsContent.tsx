'use client';

import { Loader2 } from 'lucide-react';
import FieldSections from '../../../special-centres/manage-options/components/FieldSections';
import OptionsTable from '../../../special-centres/manage-options/components/OptionsTable';
import { TAB_SINGULAR, type ManageTab, type ManagedOption } from '../data';

interface Props {
  activeTab: ManageTab;
  isLoading: boolean;
  isFieldScoped: boolean;
  professionFields: string[];
  availableFields: ManagedOption[];
  filtered: ManagedOption[];
  total: number;
  showNote: boolean;
  onEdit: (opt: ManagedOption) => void;
  onToggleStatus: (id: string, currentStatus: string) => void;
  onAddUnder: (field: string) => void;
}

/** The tab table area: loader, field-grouped professions, or a flat table. */
export default function OptionsContent({
  activeTab, isLoading, isFieldScoped, professionFields, availableFields,
  filtered, total, showNote, onEdit, onToggleStatus, onAddUnder,
}: Props) {
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-xs text-neutral-gray-medium">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading {activeTab.toLowerCase()}…
        </div>
      ) : isFieldScoped ? (
        professionFields.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p className="text-sm text-neutral-gray-medium">
              {filtered.length === 0 && total > 0
                ? 'No professions match your search.'
                : availableFields.length === 0
                  ? 'No fields yet. Add a field first, then you can add professions under it.'
                  : 'No professions yet. Add a profession under a field to see it here.'}
            </p>
          </div>
        ) : (
          <div className="p-3.5">
            <FieldSections
              fields={professionFields}
              options={filtered}
              showNote={showNote}
              singular={TAB_SINGULAR[activeTab]}
              emptyHint={`No ${activeTab.toLowerCase()} added under this field yet.`}
              onEdit={onEdit}
              onToggleStatus={onToggleStatus}
              onAddUnder={onAddUnder}
            />
          </div>
        )
      ) : (
        <OptionsTable
          options={filtered}
          showNote={showNote}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
        />
      )}

      <div className="px-4 py-2.5 border-t border-neutral-gray-light bg-neutral-bg-light/30">
        <p className="text-[11px] text-neutral-black">
          Showing {filtered.length} of {total} {activeTab.toLowerCase()}
        </p>
      </div>
    </>
  );
}
