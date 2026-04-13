export default function Modal({ title, open, onClose, children }) {
if (!open) return null
return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
<div className="card w-full max-w-xl">
<div className="flex items-center justify-between border-b px-4 py-3">
<h3 className="text-base font-semibold">{title}</h3>
<button onClick={onClose} className="rounded p-1 hover:bg-zinc-100">✕</button>
</div>
<div className="p-4">{children}</div>
</div>
</div>
)
}