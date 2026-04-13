export default function Topbar({ onLogout }) {
return (
<header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur">
<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
<h1 className="text-lg font-semibold">Calmstone Admin</h1>
<div className="flex items-center gap-3">
<button className="btn" onClick={onLogout}>Logout</button>
</div>
</div>
</header>
)
}