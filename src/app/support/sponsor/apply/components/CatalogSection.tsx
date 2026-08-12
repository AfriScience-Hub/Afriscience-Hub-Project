'use client';

import { Plus, X, Upload } from 'lucide-react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/Button';
import type { CatalogEntry } from '../data';

interface CatalogSectionProps {
  industries: string[];
  catalogByIndustry: Record<string, CatalogEntry[]>;
  onAddCatalogItem: (industry: string) => void;
  onRemoveCatalogItem: (industry: string, index: number) => void;
  onUpdateCatalogItem: (industry: string, index: number, field: keyof CatalogEntry, value: any) => void;
  onAddSpecification: (industry: string, itemIndex: number) => void;
  onRemoveSpecification: (industry: string, itemIndex: number, specIndex: number) => void;
  onUpdateSpecification: (industry: string, itemIndex: number, specIndex: number, value: string) => void;
  onAddCatalogImage: (industry: string, itemIndex: number, files: FileList) => void;
  onRemoveCatalogImage: (industry: string, itemIndex: number, imageIndex: number) => void;
  maxIndustries: number;
  tier: string;
}

export function CatalogSection({
  industries, catalogByIndustry,
  onAddCatalogItem, onRemoveCatalogItem, onUpdateCatalogItem,
  onAddSpecification, onRemoveSpecification, onUpdateSpecification,
  onAddCatalogImage, onRemoveCatalogImage,
}: CatalogSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
      <h2 className="text-xl font-bold text-neutral-black mb-2">Product &amp; Service Catalog</h2>
      <p className="text-xs text-neutral-gray-medium mb-6">Publish your product/service catalog under selected industries for potential users to access.</p>
      {industries.length === 0 ? (
        <p className="text-sm text-neutral-gray-medium italic">Select industries in the Company Information section above to start adding your product/service catalog.</p>
      ) : industries.map(industry => (
        <div key={industry} className="mb-8 last:mb-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-black bg-brand-red-50 px-3 py-1 rounded-lg text-sm">{industry}</h3>
            <Button type="button" variant="outline" size="sm" onClick={() => onAddCatalogItem(industry)} className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Entry
            </Button>
          </div>

          {(!catalogByIndustry[industry] || catalogByIndustry[industry].length === 0) ? (
            <p className="text-sm text-neutral-gray-medium italic">No catalog entries yet. Click "Add Entry" to add products or services.</p>
          ) : (
            <div className="space-y-4">
              {catalogByIndustry[industry].map((item, idx) => (
                <div key={idx} className="border border-neutral-gray-light rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-semibold text-neutral-gray-medium uppercase">Entry {idx + 1}</span>
                    <button type="button" onClick={() => onRemoveCatalogItem(industry, idx)} className="cursor-pointer text-slate-400 hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-neutral-gray-medium mb-1">Product/Service Name *</label>
                      <Input
                        value={item.productName}
                        onChange={e => onUpdateCatalogItem(industry, idx, 'productName', e.target.value)}
                        placeholder="Enter product or service name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-gray-medium mb-1">Currency *</label>
                      <select
                        value={item.currency}
                        onChange={e => onUpdateCatalogItem(industry, idx, 'currency', e.target.value)}
                        className="cursor-pointer w-full rounded-lg border border-neutral-gray-light px-3 py-2 text-sm bg-white"
                      >
                        <option value="local">Local Currency</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-gray-medium mb-1">Price *</label>
                      <Input
                        value={item.price}
                        onChange={e => onUpdateCatalogItem(industry, idx, 'price', e.target.value)}
                        placeholder="Enter price"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-gray-medium mb-1">ASH Discount Price</label>
                      <div className="flex gap-2">
                        <Input
                          value={item.ashDiscountPrice === 'N/A' ? '' : item.ashDiscountPrice}
                          onChange={e => onUpdateCatalogItem(industry, idx, 'ashDiscountPrice', e.target.value)}
                          placeholder="Discount price"
                          disabled={item.ashDiscountPrice === 'N/A'}
                          className="flex-1"
                        />
                        <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium cursor-pointer whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={item.ashDiscountPrice === 'N/A'}
                            onChange={e => onUpdateCatalogItem(industry, idx, 'ashDiscountPrice', e.target.checked ? 'N/A' : '')}
                            className="rounded"
                          />
                          N/A
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-gray-medium mb-1">Images ({item.images.length}/5 max.)</label>
                      <div className="border border-dashed border-neutral-gray-light rounded-lg p-3 text-center hover:border-brand-red-600 transition-colors">
                        <label className="cursor-pointer">
                          <Upload className="h-5 w-5 text-neutral-gray-medium mx-auto mb-1" />
                          <p className="text-xs text-neutral-gray-medium">Upload</p>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={e => e.target.files && onAddCatalogImage(industry, idx, e.target.files)}
                            disabled={item.images.length >= 5}
                          />
                        </label>
                      </div>
                      {item.images.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.images.map((img, imgIdx) => (
                            <div key={imgIdx} className="relative group">
                              <img src={URL.createObjectURL(img)} alt="" className="h-10 w-10 object-cover rounded" />
                              <button type="button" onClick={() => onRemoveCatalogImage(industry, idx, imgIdx)} className="cursor-pointer absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-neutral-gray-medium mb-1">Specifications ({item.specifications.length}/10 max.)</label>
                      <div className="space-y-2">
                        {item.specifications.map((spec, specIdx) => (
                          <div key={specIdx} className="flex gap-2 items-center">
                            <Input
                              value={spec}
                              onChange={e => onUpdateSpecification(industry, idx, specIdx, e.target.value)}
                              placeholder={`Specification ${specIdx + 1}`}
                            />
                            <button type="button" onClick={() => onRemoveSpecification(industry, idx, specIdx)} className="cursor-pointer text-slate-400 hover:text-red-500 flex-shrink-0">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        {item.specifications.length < 10 && (
                          <button
                            type="button"
                            onClick={() => onAddSpecification(industry, idx)}
                            className="cursor-pointer text-xs text-brand-red-600 hover:underline flex items-center gap-1"
                          >
                            <Plus className="h-3 w-3" /> Add specification
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
