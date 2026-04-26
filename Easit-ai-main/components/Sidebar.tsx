
import React from 'react';
import type { Conversation, User } from '../types.ts';
import { 
  MessageSquarePlus, 
  ShieldCheck, 
  Network, 
  Activity, 
  Cpu, 
  Lock, 
  Settings, 
  BarChart3, 
  X,
  Plus
} from 'lucide-react';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  isMobileOpen: boolean;
  onClose: () => void;
  user: User;
  currentView: string;
  onNavigate: (view: string) => void;
}

const logoUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMTcwIiBzdHJva2U9InVybCgjZ3JhZDEpIiBzdHJva2Utd2lkdGg9IjEyIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjE2MCIgcj0iMzUiIGZpbGw9IiM4QjVDRjYiLz4KPGNpcmNsZSBjeD0iMTcwIiBjeT0iMzAwIiByPSIzNSIgZmlsbD0iIzNCODJGNiIvPgo8Y2lyY2xlIGN4PSIzMzAiIGN5PSIzMDAiIHI9IjM1IiBmaWxsPSIjMDBGMEY2Ii8+CjxsaW5lIHgxPSIyNTAiIHkxPSIxNjAiIHgyPSIxNzAiIHkyPSIzMDAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjMiIHN0cm9rZS13aWR0aD0iMyIvPgo8bGluZSB4MT0iMjUwIiB5MT0iMTYwIiB4Mj0iMzMwIiB5Mj0iMzAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjMiLz4KPGxpbmUgeDE9IjE3MCIgeTE9IjMwMCIgeDI9IjMzMCIgeTI9IjMwMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMyIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQxIiB4MT0iODAiIHkxPSI4MCIgeDI9IjQyMCIgeTI9IjQyMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjOEI1Q0Y2Ii8+CjxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjM0I4MkY2Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwRjBGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==';

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  isMobileOpen,
  onClose,
  user,
  currentView,
  onNavigate
}) => {
  const navItems = [
    { id: 'chat', label: 'Verified Threads', icon: <ShieldCheck size={18} /> },
    { id: 'maps', label: 'Source Maps', icon: <Network size={18} /> },
    { id: 'history', label: 'Analytic History', icon: <Activity size={18} /> },
    { id: 'network', label: 'Node Network', icon: <Cpu size={18} /> },
    { id: 'vault', label: 'Security Vault', icon: <Lock size={18} /> },
  ];

  return (
    <>
      {isMobileOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden" onClick={onClose}></div>}
      <aside className={`fixed top-0 left-0 h-full z-40 w-72 bg-[#050505] border-r border-white/5 flex flex-col transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Header */}
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-brand-blue/10 rounded-xl cursor-pointer" onClick={() => onNavigate('chat')}>
              <img src={logoUrl} alt="Easit.ai Logo" className="h-8 w-8" />
            </div>
            <div className="cursor-pointer" onClick={() => onNavigate('chat')}>
              <h1 className="text-lg font-bold tracking-tight">EASIT.AI</h1>
              <p className="text-[10px] font-bold text-neon-cyan uppercase tracking-widest">Verification Engine Active</p>
            </div>
            <button onClick={onClose} className="ml-auto md:hidden text-gray-500 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <button
            onClick={() => {
              onNavigate('chat');
              onNewConversation();
            }}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-brand-blue/20 to-brand-blue/10 border border-brand-blue/30 text-brand-blue hover:from-brand-blue/30 hover:to-brand-blue/20 transition-all duration-300 shadow-lg shadow-brand-blue/5 mb-8"
          >
            <Plus size={18} strokeWidth={3} />
            NEW VERIFIED THREAD
          </button>

          {/* Nav Items */}
          <nav className="space-y-2 mb-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentView === item.id 
                    ? 'bg-brand-blue/10 text-brand-blue border-r-2 border-brand-blue' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Footer Nav */}
          <div className="mt-auto space-y-2">
            <button 
              onClick={() => onNavigate('status')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentView === 'status' ? 'bg-brand-blue/10 text-brand-blue border-r-2 border-brand-blue' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <BarChart3 size={18} />
              System Status
            </button>
            <button 
              onClick={() => onNavigate('settings')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentView === 'settings' ? 'bg-brand-blue/10 text-brand-blue border-r-2 border-brand-blue' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <Settings size={18} />
              Settings
            </button>
            <div className="pt-4 mt-4 border-t border-white/5 flex flex-col gap-1">
               <button onClick={() => onNavigate('Terms of Service')} className="text-[10px] text-left px-4 font-bold text-gray-600 uppercase tracking-widest hover:text-brand-blue transition-colors">Terms of Service</button>
               <button onClick={() => onNavigate('Privacy Policy')} className="text-[10px] text-left px-4 font-bold text-gray-600 uppercase tracking-widest hover:text-brand-blue transition-colors">Privacy Policy</button>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="mt-auto p-4 mb-2">
          <div 
            onClick={() => onNavigate('profile')}
            className={`p-4 rounded-2xl border flex items-center gap-3 group cursor-pointer transition-all ${
              currentView === 'profile' ? 'bg-brand-blue/10 border-brand-blue/20' : 'bg-white/[0.03] border-white/5 hover:bg-white/5'
            }`}
          >
            <div className="relative">
              <img 
                src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff`} 
                alt={user.name} 
                className="w-10 h-10 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" 
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#050505] rounded-full"></div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Admin Node</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
