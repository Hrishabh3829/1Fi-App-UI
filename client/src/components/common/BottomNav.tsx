import React from 'react';
import { Home, ShoppingBag, Receipt, TrendingUp, User } from 'lucide-react';

interface BottomNavProps {
  activeTab?: string;
  onTabSelect?: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab = 'shop',
  onTabSelect,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'emi-dues', label: 'EMI Dues', icon: Receipt },
    { id: 'limit', label: 'Limit', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-nav max-w-md mx-auto"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabSelect?.(item.id)}
              className="flex flex-col items-center justify-center flex-1 py-1 text-center transition-colors group"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform group-active:scale-90 ${
                    isActive ? 'text-fi-purple stroke-[2.5]' : 'text-gray-400 stroke-[1.75]'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] mt-1 font-medium transition-colors ${
                  isActive ? 'text-fi-purple font-semibold' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-5 h-0.5 bg-fi-purple rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
