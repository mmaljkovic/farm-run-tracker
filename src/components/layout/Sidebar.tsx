import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TreeDeciduous, Warehouse, Clock, Settings } from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/patches', icon: TreeDeciduous, label: 'Farming Patches' },
  { path: '/manor-farm', icon: Warehouse, label: 'Manor Farm' },
  { path: '/ranch-out-of-time', icon: Clock, label: 'Ranch Out of Time' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 rs-panel border-t-0 rounded-none min-h-screen">
      <nav className="p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded transition-all ${
                isActive
                  ? 'bg-rs-green border border-rs-border text-rs-gold shadow-rs'
                  : 'text-rs-tan hover:bg-rs-brown-light hover:text-rs-parchment border border-transparent'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Decorative divider */}
      <div className="mx-4 my-4 rs-divider" />

      {/* XP Icon decoration */}
      <div className="px-4 py-2 text-center">
        <p className="text-xs text-rs-tan uppercase tracking-widest">Gielinor</p>
      </div>
    </aside>
  );
}
