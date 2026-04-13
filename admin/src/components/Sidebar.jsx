import { NavLink } from "react-router-dom";

const Item = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block rounded-lg px-4 py-2 text-sm hover:bg-white/10 ${
        isActive ? "bg-white/10 font-semibold" : "text-zinc-200"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  return (
    <div className="sticky top-0 h-screen w-[240px] p-4">
      <div className="mb-4 text-xl font-bold">Admin</div>
      <nav className="space-y-2">
        <Item to="/admin">Dashboard</Item>
        <Item to="/admin/slides">Slides</Item>
        <Item to="/admin/sections">Sections</Item>
        <Item to="/admin/overview">Overview</Item>
        <Item to="/admin/sectors">Sectors</Item>
        <Item to="/admin/logos">Clients</Item>
        <Item to="/admin/certifications">Certifications</Item>
        <Item to="/admin/services">ServicePagesManager</Item>
        <Item to="/admin/jobs">Career Page</Item>
        <Item to="/admin/news">News Page</Item>

      </nav>
      <div className="mt-6 text-xs text-zinc-400">v1.0</div>
    </div>
  );
}
