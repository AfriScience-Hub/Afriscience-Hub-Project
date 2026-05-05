'use client';

import { useState } from 'react';
import { Check, Edit, Plus, Trash2, X } from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'Solar Irrigation Consultation',
    description: 'Expert advice on solar-powered irrigation systems for African farms.',
    price: '₦100 - ₦150',
    bookings: '12 bookings',
    views: '340 views',
    status: 'Active',
  },
  {
    id: 2,
    name: 'AgriTech Workshop Training',
    description: 'Hands-on training sessions for modern agricultural technology adoption.',
    price: '₦150 - ₦200',
    bookings: '8 bookings',
    views: '215 views',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Innovation Mentorship Program',
    description: 'One-on-one mentorship for aspiring innovators and entrepreneurs.',
    price: '₦50 - ₦100',
    bookings: '0 bookings',
    views: '45 views',
    status: 'Draft',
  },
];

export default function MyServicesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-8 flex flex-col lg:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-950 lg:text-xl">My Services</h1>
          <p className="mt-0 lg:mt-2 text-xs text-gray-400 lg:text-base">Manage the services you offer across your listings.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-red-500 px-2 py-2 lg:py-3 text-xs font-bold text-white hover:bg-red-600 lg:px-4 lg:text-sm"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      {showForm && (
        <div className="mb-7 rounded-2xl border-2 border-dashed border-gray-950 p-5 lg:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-950 lg:text-2xl">Add New Service</h2>
            <button onClick={() => setShowForm(false)} className="cursor-pointer text-gray-400 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4">
            <input className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm text-black outline-none placeholder:text-gray-400 lg:h-14 lg:text-base" placeholder="Service Name *" />
            <textarea className="h-24 w-full resize-none rounded-xl border border-gray-200 px-4 py-4 text-sm text-black outline-none placeholder:text-gray-400 lg:text-base" placeholder="Describe this service..." />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
              <select defaultValue="" className="h-12 cursor-pointer rounded-xl border border-gray-200 px-4 text-sm text-black outline-none lg:h-14 lg:text-base">
                <option value="">Cost Range</option>
                <option>₦50 - ₦100</option>
                <option>₦100 - ₦150</option>
                <option>₦150 - ₦200</option>
              </select>
              <button className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#082947] px-6 py-3 text-sm font-bold text-white hover:bg-slate-900 lg:text-base">
                <Check size={18} />
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {services.map((service) => (
          <article key={service.id} className="rounded-xl border border-gray-200 p-5 lg:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#082947] text-sm font-bold text-white">
                  {service.id}
                </span>
                <div>
                  <h2 className="text-lg font-bold text-gray-950 lg:text-xl">{service.name}</h2>
                  <p className="mt-2 text-sm text-gray-400 lg:text-base">{service.description}</p>
                  <div className="mt-3 flex flex-wrap gap-5 text-sm lg:text-base">
                    <span className="font-bold text-red-500">{service.price}</span>
                    <span className="text-gray-400">{service.bookings}</span>
                    <span className="text-gray-400">{service.views}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:shrink-0">
                <span className={`rounded-full px-4 py-2 text-sm font-bold ${service.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                  {service.status}
                </span>
                <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50">
                  <Edit size={17} /> Edit
                </button>
                <button className="cursor-pointer p-2 text-red-400 hover:text-red-600" aria-label="Delete service">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
