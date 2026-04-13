import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'


export default function AdminLayout({ onLogout }) {
const navigate = useNavigate()


const handleLogout = async () => {
try { await api.post('/api/auth/logout') } catch {}
onLogout?.()
navigate('/admin/login', { replace: true })
}


return (
<div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
<aside className="hidden md:block bg-zinc-950 text-white">
<Sidebar />
</aside>
<main className="flex min-h-screen flex-col">
<Topbar onLogout={handleLogout} />
<div className="p-6">
<Outlet />
</div>
</main>
</div>
)
}