'use client';

interface ImagePreviewModalProps {
  url: string | null;
  onClose: () => void;
}

export function ImagePreviewModal({ url, onClose }: ImagePreviewModalProps) {
  if (!url) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <img src={url} alt="Preview" className="max-w-full max-h-full rounded-lg" />
    </div>
  );
}
