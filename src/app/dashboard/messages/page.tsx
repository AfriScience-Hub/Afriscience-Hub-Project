'use client';

import Image from 'next/image';

const messages = [
  {
    name: 'Dr. Wanjiku Muthoni',
    subject: 'Partnership Inquiry',
    preview: 'Hi, I came across your innovation and would love to discuss a potential collaboration...',
    time: '2 hours ago',
    unread: true,
    avatar: 'from-rose-100 to-cyan-100',
  },
  {
    name: 'Kwame Asante',
    subject: 'EcoBrick Materials',
    preview: 'Could you share more details about the recycled plastic sourcing process?',
    time: '1 day ago',
    unread: true,
    avatar: 'from-slate-800 to-slate-500',
  },
  {
    name: 'AfriScience Hub Team',
    subject: 'Welcome to the Platform!',
    preview: 'Thank you for joining AfriScience Hub. Here are some tips to get started...',
    time: '2 days ago',
    unread: false,
    avatar: null,
  },
];

export default function MessagesPage() {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 max-w-fit bg-white shadow-sm">
      <div className="border-b border-gray-200 p-5">
        <h1 className="text-xl font-bold text-gray-950 lg:text-2xl">Messages</h1>
        <p className="mt-0 lg:mt-2 text-xs text-gray-400 lg:text-base">View and manage your conversations</p>
      </div>

      <div>
        {messages.map((message) => (
          <button
            key={message.name}
            className="flex lg:w-full cursor-pointer items-center gap-4 border-b border-gray-200 px-3 py-4 text-left last:border-b-0 hover:bg-gray-50"
          >
            {message.avatar ? (
              <span className={`h-12 lg:h-14 w-12 lg:w-14 shrink-0 rounded-fullbg-linear-to-br ${message.avatar}`} />
            ) : (
              <Image
                src="/dashboard-avatar.png"
                alt="AfriScience Hub Team"
                width={56}
                height={56}
                className="h-12 lg:h-14 w-12 lg:w-14 shrink-0 rounded-full object-cover grayscale"
              />
            )}
            <span className="min-w-0 flex-1">
              <span className="text-sm font-bold text-gray-950 lg:text-lg">{message.name}</span>
              <span className="mt-1 block text-xs font-semibold text-gray-950 lg:text-md">{message.subject}</span>
              <span className="mt-1 block lg:truncate text-xs text-gray-400 lg:text-sm">{message.preview}</span>
            </span>
            <span className="flex shrink-0 items-center gap-3 lg:gap-6">
              <span className="text-xs text-gray-400 lg:text-sm">{message.time}</span>
              {message.unread && <span className="h-3 w-3 rounded-full bg-red-500" />}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
