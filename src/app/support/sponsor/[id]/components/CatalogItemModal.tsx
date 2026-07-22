'use client';

import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { CatalogItem } from '../data';

interface CatalogItemModalProps {
  item: CatalogItem;
  onClose: () => void;
}

export function CatalogItemModal({ item, onClose }: CatalogItemModalProps) {
  const [imgIndex, setImgIndex] = useState(0);

  const prevImage = () => setImgIndex(i => (i > 0 ? i - 1 : item.images.length - 1));
  const nextImage = () => setImgIndex(i => (i < item.images.length - 1 ? i + 1 : 0));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black truncate pr-4">{item.productName}</h3>
          <button type="button" onClick={onClose} className="cursor-pointer text-slate-400 hover:text-neutral-black transition-colors flex-shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {item.images.length > 0 && (
            <div>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-bg-light">
                <img
                  src={item.images[imgIndex]}
                  alt={item.productName}
                  className="w-full h-full object-cover"
                />
                {item.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-neutral-black" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-neutral-black" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {item.images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setImgIndex(i)}
                          className={`cursor-pointer h-2 rounded-full transition-all ${i === imgIndex ? 'w-6 bg-white' : 'w-2 bg-white/60'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {item.images.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                  {item.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImgIndex(i)}
                      className={`cursor-pointer flex-shrink-0 h-14 w-14 rounded-lg overflow-hidden border-2 transition-colors ${i === imgIndex ? 'border-brand-red-600' : 'border-transparent'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-neutral-bg-light rounded-xl p-4">
              <p className="text-xs text-neutral-gray-medium mb-1">Price</p>
              <p className="text-xl font-bold text-neutral-black">
                {item.currency === 'USD' ? '$' : '₦'}{Number(item.price).toLocaleString()}
                <span className="text-xs text-neutral-gray-medium font-normal ml-1">
                  {item.currency === 'USD' ? 'USD' : 'Local Currency'}
                </span>
              </p>
            </div>
            <div className="bg-neutral-bg-light rounded-xl p-4">
              <p className="text-xs text-neutral-gray-medium mb-1">ASH Discount Price</p>
              {item.ashDiscountPrice === 'N/A' ? (
                <p className="text-sm font-semibold text-neutral-gray-medium">N/A</p>
              ) : (
                <p className="text-xl font-bold text-brand-red-600">
                  {item.currency === 'USD' ? '$' : '₦'}{Number(item.ashDiscountPrice).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {item.specifications.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-neutral-black mb-3">Specifications</h4>
              <ul className="space-y-2">
                {item.specifications.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-gray-dark">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-red-600 flex-shrink-0 mt-2" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
