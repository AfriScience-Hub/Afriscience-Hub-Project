'use client';

import { Upload, X, DollarSign, Plus } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/input';
import { INDUSTRIES, COUNTRIES, SPONSORSHIP_TIERS, type CatalogItem } from '../data';

interface SponsorshipFormProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  catalogItems: CatalogItem[];
  addCatalogItem: () => void;
  removeCatalogItem: (index: number) => void;
  updateCatalogItem: (index: number, field: 'name' | 'price', value: string) => void;
  policies: string[];
  setPolicies: React.Dispatch<React.SetStateAction<string[]>>;
  displayPicture: File | null;
  setDisplayPicture: React.Dispatch<React.SetStateAction<File | null>>;
  licenses: File[];
  setLicenses: React.Dispatch<React.SetStateAction<File[]>>;
  mediaGallery: File[];
  setMediaGallery: React.Dispatch<React.SetStateAction<File[]>>;
  isAuthenticated: boolean;
  isSubmitting: boolean;
  onSaveDraft: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SponsorshipForm({
  formData, onInputChange,
  catalogItems, addCatalogItem, removeCatalogItem, updateCatalogItem,
  policies, setPolicies,
  displayPicture, setDisplayPicture,
  licenses, setLicenses,
  mediaGallery, setMediaGallery,
  isAuthenticated, isSubmitting,
  onSaveDraft, onSubmit,
}: SponsorshipFormProps) {

  const handleFileInput = (setter: React.Dispatch<React.SetStateAction<File[]>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setter(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (setter: React.Dispatch<React.SetStateAction<File[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Company Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
            <h2 className="text-xl font-bold text-neutral-black mb-6">Company Information</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Company Name *</label>
                <Input name="companyName" value={formData.companyName} onChange={onInputChange} placeholder="Enter your company name" required />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Industry *</label>
                <select name="industry" value={formData.industry} onChange={onInputChange} className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 bg-white" required>
                  <option value="">Select industry</option>
                  {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Company Motto</label>
                <Input name="motto" value={formData.motto} onChange={onInputChange} placeholder="A short tagline for your company" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Description *</label>
                <textarea name="description" value={formData.description} onChange={onInputChange} rows={4} className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600" placeholder="Describe your company's mission and services" required />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
            <h2 className="text-xl font-bold text-neutral-black mb-6">Contact Details</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Phone *</label>
                <Input name="phone" value={formData.phone} onChange={onInputChange} placeholder="+234 XXX XXX XXXX" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Website</label>
                <Input name="website" value={formData.website} onChange={onInputChange} placeholder="www.example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">LinkedIn</label>
                <Input name="linkedin" value={formData.linkedin} onChange={onInputChange} placeholder="linkedin.com/company/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Twitter</label>
                <Input name="twitter" value={formData.twitter} onChange={onInputChange} placeholder="@username" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Facebook</label>
                <Input name="facebook" value={formData.facebook} onChange={onInputChange} placeholder="facebook.com/..." />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
            <h2 className="text-xl font-bold text-neutral-black mb-6">Location</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Country *</label>
                <select name="country" value={formData.country} onChange={onInputChange} className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 bg-white" required>
                  <option value="">Select country</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">State/Region *</label>
                <Input name="state" value={formData.state} onChange={onInputChange} placeholder="State or region" required />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Address *</label>
                <Input name="address" value={formData.address} onChange={onInputChange} placeholder="Street address" required />
              </div>
            </div>
          </div>

          {/* Sponsorship Tier */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
            <h2 className="text-xl font-bold text-neutral-black mb-6">Sponsorship Tier *</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SPONSORSHIP_TIERS.map(tier => (
                <label key={tier.name} className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${formData.tier === tier.name ? 'border-brand-red-600 bg-brand-red-50' : 'border-neutral-gray-light hover:border-neutral-gray-medium'}`}>
                  <input type="radio" name="tier" value={tier.name} checked={formData.tier === tier.name} onChange={onInputChange} className="sr-only" />
                  <h3 className="font-bold text-neutral-black">{tier.name}</h3>
                  <p className="text-brand-red-600 font-semibold text-sm mt-1">{tier.amount}</p>
                  <p className="text-xs text-neutral-gray-medium mt-1">{tier.benefits}</p>
                </label>
              ))}
            </div>
          </div>

          {/* Catalog Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-black">Products & Services Catalog</h2>
              <Button type="button" variant="outline" size="sm" onClick={addCatalogItem} className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add Item
              </Button>
            </div>
            <div className="space-y-4">
              {catalogItems.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <label className="block text-xs text-neutral-gray-medium mb-1">Service/Product Name</label>
                    <Input value={item.name} onChange={(e) => updateCatalogItem(idx, 'name', e.target.value)} placeholder="e.g. Software Development" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-neutral-gray-medium mb-1">Price</label>
                    <Input value={item.price} onChange={(e) => updateCatalogItem(idx, 'price', e.target.value)} placeholder="e.g. $5,000" />
                  </div>
                  {catalogItems.length > 1 && (
                    <button type="button" onClick={() => removeCatalogItem(idx)} className="mt-5 text-slate-400 hover:text-red-500">
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-black">Business Policies</h2>
              <Button type="button" variant="outline" size="sm" onClick={() => setPolicies([...policies, ''])} className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add Policy
              </Button>
            </div>
            <div className="space-y-3">
              {policies.map((policy, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <Input value={policy} onChange={(e) => {
                      const newPolicies = [...policies];
                      newPolicies[idx] = e.target.value;
                      setPolicies(newPolicies);
                    }} placeholder="Describe a business policy..." />
                  </div>
                  {policies.length > 1 && (
                    <button type="button" onClick={() => setPolicies(policies.filter((_, i) => i !== idx))} className="mt-1 text-slate-400 hover:text-red-500">
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Uploads */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
            <h2 className="text-xl font-bold text-neutral-black mb-6">Media & Documents</h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Display Picture</label>
                <div className="border-2 border-dashed border-neutral-gray-light rounded-xl p-6 text-center hover:border-brand-red-600 transition-colors cursor-pointer">
                  {displayPicture ? (
                    <div className="flex items-center gap-2 justify-center">
                      <span className="text-sm text-neutral-gray-dark truncate">{displayPicture.name}</span>
                      <button type="button" onClick={() => setDisplayPicture(null)} className="text-red-500"><X className="h-4 w-4" /></button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="h-8 w-8 text-neutral-gray-medium mx-auto mb-2" />
                      <p className="text-xs text-neutral-gray-medium">Click to upload</p>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && setDisplayPicture(e.target.files[0])} />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Licenses</label>
                <div className="border-2 border-dashed border-neutral-gray-light rounded-xl p-6 text-center hover:border-brand-red-600 transition-colors cursor-pointer">
                  {licenses.length > 0 ? (
                    <div className="space-y-1">
                      {licenses.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 justify-center text-xs">
                          <span className="truncate">{file.name}</span>
                          <button type="button" onClick={() => removeFile(setLicenses, idx)} className="text-red-500"><X className="h-3 w-3" /></button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="h-8 w-8 text-neutral-gray-medium mx-auto mb-2" />
                      <p className="text-xs text-neutral-gray-medium">Click to upload</p>
                      <input type="file" multiple accept=".pdf,.jpg,.png" className="hidden" onChange={handleFileInput(setLicenses)} />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Media Gallery</label>
                <div className="border-2 border-dashed border-neutral-gray-light rounded-xl p-6 text-center hover:border-brand-red-600 transition-colors cursor-pointer">
                  {mediaGallery.length > 0 ? (
                    <div className="space-y-1">
                      {mediaGallery.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 justify-center text-xs">
                          <span className="truncate">{file.name}</span>
                          <button type="button" onClick={() => removeFile(setMediaGallery, idx)} className="text-red-500"><X className="h-3 w-3" /></button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="h-8 w-8 text-neutral-gray-medium mx-auto mb-2" />
                      <p className="text-xs text-neutral-gray-medium">Click to upload</p>
                      <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileInput(setMediaGallery)} />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button type="button" variant="outline" onClick={onSaveDraft} disabled={isSubmitting} className="h-12 px-8">
              Save as Draft
            </Button>
            <Button type="submit" disabled={!isAuthenticated || isSubmitting} className="h-12 px-8 bg-brand-red-600 hover:bg-brand-red-700">
              {isSubmitting ? 'Submitting...' : isAuthenticated ? 'Submit Application' : 'Log in to Apply'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
