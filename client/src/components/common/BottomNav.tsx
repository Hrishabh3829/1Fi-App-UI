import React from 'react';
import { Home, Store, ReceiptIndianRupee, ChartNoAxesCombined, User } from 'lucide-react';

interface BottomNavProps {
  activeTab?: string;
  onTabSelect?: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab = 'shop',
  onTabSelect,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
    { id: 'shop', label: 'Shop', icon: Store, href: '/shop' },
    { id: 'emi-dues', label: 'EMI Dues', icon: ReceiptIndianRupee, href: '/emi-dues' },
    { id: 'limit', label: 'Limit', icon: ChartNoAxesCombined, href: '/pledged-funds' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(12px+env(safe-area-inset-bottom))] pointer-events-none"
    >
      <div className="mx-auto flex max-w-[500px] items-stretch rounded-[28px] bg-white border border-white/40 px-1.5 py-1.5 shadow-[0_8px_32px_rgba(20,14,50,0.12),0_0_0_1px_rgba(255,255,255,0.18)_inset] pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabSelect?.(item.id)}
              className={`group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-2 text-center transition-all duration-200 outline-none ${
                isActive ? 'text-[#712CDC]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {isActive && (
                <>
                  {/* Active top pill indicator */}
                  <span
                    className="absolute left-1/2 -top-[3px] h-[3px] w-8 -translate-x-1/2 rounded-full bg-[#712CDC]"
                    aria-hidden="true"
                  />
                  {/* Subtle radial glow */}
                  <span
                    className="absolute inset-1 rounded-[14px] opacity-50 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at 50% 30%, rgba(113,44,220,0.14) 0%, transparent 70%)',
                    }}
                    aria-hidden="true"
                  />
                </>
              )}

              <Icon
                className={`relative h-[22px] w-[22px] transition-transform duration-200 group-active:scale-90 ${
                  isActive
                    ? 'stroke-[2] drop-shadow-[0_0_6px_rgba(113,44,220,0.3)]'
                    : 'stroke-[1.75]'
                }`}
                aria-hidden="true"
              />

              <span
                className={`relative max-w-full truncate text-[10px] tracking-wide ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

