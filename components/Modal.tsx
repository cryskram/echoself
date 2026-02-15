"use client";

type ModalProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

export default function Modal({ open, title, message, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
        <p className="mt-2 text-sm text-zinc-600">{message}</p>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-zinc-900 py-2 text-white hover:bg-zinc-800"
        >
          OK
        </button>
      </div>
    </div>
  );
}
