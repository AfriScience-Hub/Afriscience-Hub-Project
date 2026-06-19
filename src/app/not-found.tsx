import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-brand-red-600 mb-4">404</h1>
      <p className="text-xl text-neutral-gray-dark mb-8">Page not found</p>
      <Link
        href="/"
        className="rounded-md bg-brand-red-600 px-6 py-3 text-white hover:bg-brand-red-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}
