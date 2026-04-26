
import React from 'react';
import { 
  Search, 
  Bell, 
  Compass, 
  ChevronDown,
  ShieldCheck,
  PanelLeft
} from 'lucide-react';
import type { User, ConnectionStatus } from '../types.ts';

interface TopBarProps {
    user: User;
    onSignOut: () => void;
    onToggleSidebar: () => void;
    onNewConversation: () => void;
    onShowModal: (modal: string) => void;
    onShowSettings: () => void;
    onSaveConversation: () => void;
    conversationTitle?: string;
    connectionStatus: ConnectionStatus;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  user, 
  onToggleSidebar,
  onNewConversation,
  onShowModal,
  onShowSettings,
  onSaveConversation,
  connectionStatus
}) => {
  return (
    <header className="flex-shrink-0 h-20 flex items-center justify-between px-8 bg-[#050505] border-b border-white/5">
      <div className="flex items-center gap-6 flex-1">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl hover:bg-white/5 transition-colors md:hidden text-gray-400"
        >
          <PanelLeft size={20} />
        </button>

        {/* Search Knowledge Graph */}
        <div className="hidden md:flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-2.5 w-full max-w-md group focus-within:border-brand-blue/30 transition-all">
          <Search size={18} className="text-gray-500 group-focus-within:text-brand-blue transition-colors" />
          <input 
            type="text" 
            placeholder="SEARCH KNOWLEDGE GRAPH..." 
            className="bg-transparent border-none outline-none text-xs font-bold tracking-widest text-gray-300 placeholder:text-gray-600 w-full"
          />
        </div>

        {/* Tabs */}
        <nav className="hidden lg:flex items-center gap-8 ml-4">
          <button className="text-[10px] font-bold text-neon-cyan uppercase tracking-widest border-b-2 border-neon-cyan pb-1 transition-all">Verification</button>
          <button onClick={() => onShowModal('Grounding Protocol')} className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-gray-300 transition-all">Grounding</button>
          <button onClick={() => onShowModal('Node Network')} className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-gray-300 transition-all">Nodes</button>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {/* Verified Seal */}
        <button onClick={() => onShowModal('Security Protocol')} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-[10px] font-bold text-brand-blue uppercase tracking-widest hover:bg-brand-blue/20 transition-all">
          <ShieldCheck size={14} />
          Verified Seal
        </button>

        {/* Icons */}
        <div className="flex items-center gap-4 text-gray-500 border-l border-white/5 pl-6">
          <button onClick={() => onShowModal('Explorer')} className="hover:text-white transition-colors">
            <Compass size={20} />
          </button>
          <button onClick={() => onShowModal('Notifications')} className="relative hover:text-white transition-colors">
            <Bell size={20} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-blue rounded-full"></div>
          </button>
          <button onClick={() => onShowModal('Account')} className="flex items-center gap-2 group">
            <img 
              src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff`} 
              alt="User" 
              className="w-8 h-8 rounded-xl border border-white/10 group-hover:border-brand-blue/50 transition-all" 
            />
            <ChevronDown size={14} className="group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};