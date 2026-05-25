'use client';

import { useState } from 'react';
import { FileText, Images, Plus } from 'lucide-react';
import { dimensionUnits, weightUnits } from './constants';

export function SpecificationsFields() {
  const [materials, setMaterials] = useState(['']);
  const [dimensions, setDimensions] = useState([
    { length: '', width: '', height: '', unit: 'cm' },
  ]);
  const [weights, setWeights] = useState([{ value: '', unit: 'kg' }]);

  return (
    <div className="space-y-5 rounded-md border border-dashed border-gray-300 p-4">
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="block text-[11px] font-semibold text-gray-700 lg:text-xs">
            Materials <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setMaterials((current) => [...current, ''])}
            className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50"
          >
            <Plus size={12} />
            Add
          </button>
        </div>
        <div className="space-y-2">
          {materials.map((material, index) => (
            <input
              key={index}
              value={material}
              onChange={(event) =>
                setMaterials((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? event.target.value : item
                  )
                )
              }
              placeholder="State some materials used in the innovation"
              required
              className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="block text-[11px] font-semibold text-gray-700 lg:text-xs">
            Dimensions <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() =>
              setDimensions((current) => [
                ...current,
                { length: '', width: '', height: '', unit: 'cm' },
              ])
            }
            className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50"
          >
            <Plus size={12} />
            Add
          </button>
        </div>
        <div className="space-y-3">
          {dimensions.map((dimension, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_1fr_1fr_84px]">
              {(['length', 'width', 'height'] as const).map((key) => (
                <input
                  key={key}
                  value={dimension[key]}
                  onChange={(event) =>
                    setDimensions((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, [key]: event.target.value } : item
                      )
                    )
                  }
                  placeholder={`State ${key}`}
                  required
                  className="h-10 rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
                />
              ))}
              <select
                value={dimension.unit}
                onChange={(event) =>
                  setDimensions((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, unit: event.target.value } : item
                    )
                  )
                }
                className="h-10 rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none"
              >
                {dimensionUnits.map((unit) => (
                  <option key={unit}>{unit}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-gray-400">State the measurements of innovation.</p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="block text-[11px] font-semibold text-gray-700 lg:text-xs">
            Weight <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setWeights((current) => [...current, { value: '', unit: 'kg' }])}
            className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50"
          >
            <Plus size={12} />
            Add
          </button>
        </div>
        <div className="space-y-2">
          {weights.map((weight, index) => (
            <div key={index} className="grid grid-cols-[1fr_84px] gap-2">
              <input
                value={weight.value}
                onChange={(event) =>
                  setWeights((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, value: event.target.value } : item
                    )
                  )
                }
                placeholder="State innovation weight"
                required
                className="h-10 rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
              />
              <select
                value={weight.unit}
                onChange={(event) =>
                  setWeights((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, unit: event.target.value } : item
                    )
                  )
                }
                className="h-10 rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none"
              >
                {weightUnits.map((unit) => (
                  <option key={unit}>{unit}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BulletListInput({
  label,
  placeholder,
  maxEntries,
}: {
  label: string;
  placeholder: string;
  maxEntries?: number;
}) {
  const [entries, setEntries] = useState(['']);
  const limitReached = typeof maxEntries === 'number' && entries.length >= maxEntries;

  return (
    <div className="rounded-md border border-dashed border-gray-300 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="block text-[11px] font-semibold text-gray-700 lg:text-xs">
          {label} <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          onClick={() => {
            if (!limitReached) setEntries((current) => [...current, '']);
          }}
          disabled={limitReached}
          className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-white"
        >
          <Plus size={12} />
          Add
        </button>
      </div>
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <div key={index} className="grid grid-cols-[auto_1fr] items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
            <input
              value={entry}
              onChange={(event) =>
                setEntries((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? event.target.value : item
                  )
                )
              }
              placeholder={placeholder}
              required
              className="h-10 rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
            />
          </div>
        ))}
      </div>
      {maxEntries ? (
        <p className="mt-2 text-[10px] text-gray-400">
          {entries.length}/{maxEntries} entries
        </p>
      ) : null}
    </div>
  );
}

export function DocumentUploadList({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  const [documents, setDocuments] = useState([{ title: '' }]);

  return (
    <div className="rounded-md border border-dashed border-gray-300 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-gray-700 lg:text-xs">
            {label} <span className="text-red-500">*</span>
          </label>
          <p className="mt-1 max-w-2xl text-[10px] leading-4 text-gray-400">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => setDocuments((current) => [...current, { title: '' }])}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50"
        >
          <Plus size={12} />
          Add
        </button>
      </div>
      <div className="space-y-3">
        {documents.map((document, index) => (
          <div key={index} className="rounded-md border border-gray-200 p-3">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto]">
              <input
                value={document.title}
                onChange={(event) =>
                  setDocuments((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { title: event.target.value } : item
                    )
                  )
                }
                placeholder="Document title caption"
                required
                className="h-10 rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
              />
              <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed border-red-500 px-4 text-xs font-semibold text-red-500 hover:bg-red-50">
                <FileText size={13} className="mr-2" />
                Upload Document
                <input
                  type="file"
                  accept="image/*,.txt,.rtf,.doc,.docx,.pdf"
                  required
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryUploadGroup({ label, description }: { label: string; description: string }) {
  const [uploads, setUploads] = useState([{ title: '' }]);
  const limitReached = uploads.length >= 3;

  return (
    <div className="rounded-md border border-gray-200 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-gray-700 lg:text-xs">
            {label} <span className="text-red-500">*</span>
          </label>
          <p className="mt-1 text-[10px] leading-4 text-gray-400">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (!limitReached) setUploads((current) => [...current, { title: '' }]);
          }}
          disabled={limitReached}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-white"
        >
          <Plus size={12} />
          Add
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {uploads.map((upload, index) => (
          <div key={index} className="rounded-md border border-gray-200 p-3">
            <input
              value={upload.title}
              onChange={(event) =>
                setUploads((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? { title: event.target.value } : item
                  )
                )
              }
              placeholder="Media title caption"
              required
              className="mb-3 h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-xs text-black outline-none placeholder:text-gray-400"
            />
            <label className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-red-500 px-4 text-center text-[10px] font-semibold text-red-500 hover:bg-red-50">
              <Images size={16} className="mb-2" />
              Upload Image or Video
              <input type="file" accept="image/*,video/*" required className="sr-only" />
            </label>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-gray-400">{uploads.length}/3 uploads</p>
    </div>
  );
}

export function MediaGalleryUploads() {
  return (
    <div className="space-y-3 rounded-md border border-dashed border-gray-300 p-4">
      <div className="flex items-center gap-2">
        <Images size={14} className="text-red-500" />
        <p className="text-[11px] font-semibold text-gray-700 lg:text-xs">
          Media Gallery <span className="text-red-500">*</span>
        </p>
      </div>
      <GalleryUploadGroup
        label="Working Materials"
        description="Upload media files showing the work materials used in building innovation."
      />
      <GalleryUploadGroup
        label="Work-In-Progress"
        description="Upload media files showing the building process of innovation."
      />
      <GalleryUploadGroup
        label="Finished Work"
        description="Upload media files showing the completed/built innovation."
      />
    </div>
  );
}
