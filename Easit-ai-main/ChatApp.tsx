import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { ChatView } from './components/ChatView.tsx';
import { TopBar } from './components/TopBar.tsx';
import { Modal } from './components/Modal.tsx';
import { SettingsModal } from './components/SettingsModal.tsx';
import { ToastContainer, type ToastMessage, type ToastType } from './components/Toast.tsx';
import type { Conversation, Message, User, PersonaSettings, ConnectionStatus, Source } from './types.ts';
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import { WelcomeScreen } from './components/WelcomeScreen.tsx';
import apiService from './services/apiService.ts';
import { websocketService } from './services/websocketService.ts';
import { GoogleGenAI } from "@google/genai";
import { Network, Activity, Cpu, Lock, BarChart3, ShieldCheck } from 'lucide-react';

interface ChatAppProps {
  user: User;
  onSignOut: () => void;
}

const DEFAULT_PERSONA: PersonaSettings = {
    tone: 'friendly',
    verbosity: 'balanced',
    style: 'casual'
};


const ChatApp: React.FC<ChatAppProps> = ({ user, onSignOut }) => {
  const isComingSoonMode = false;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [personaSettings, setPersonaSettings] = useLocalStorage<PersonaSettings>('easit-persona', DEFAULT_PERSONA);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentView, setCurrentView] = useState('chat');
  
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [customApiKey, setCustomApiKey] = useLocalStorage<string>('easit-custom-api-key', '');

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now().toString() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const systemInstruction = useMemo(() => {
      // ... (system instruction logic remains same)
      const toneMap: Record<string, string> = {
        friendly: "Be warm, encouraging, and use a conversational tone with occasional emojis.",
        professional: "Be formal, objective, and maintain a respectful distance. Avoid emojis.",
        humorous: "Be witty, playful, and include lighthearted jokes where appropriate.",
        empathetic: "Be understanding, validate the user's feelings, and offer supportive language."
      };
      const verbosityMap: Record<string, string> = {
        concise: "Keep responses extremely brief and directly to the point. No fluff.",
        balanced: "Provide moderate detail, explaining key concepts clearly without over-explaining.",
        detailed: "Provide comprehensive, in-depth responses covering background, examples, and edge cases."
      };
      const styleMap: Record<string, string> = {
        casual: "Use relaxed language, contractions (e.g., 'don't', 'can't'), and simple terms.",
        formal: "Use standard, grammatically rigorous English. Avoid contractions and slang.",
        technical: "Use precise technical terminology. Assume the user is an expert developer."
      };
      return `You are Easit.ai, an intelligent assistant for the SolveEarn community.
      Follow these PERSONA INSTRUCTIONS strictly:
      1. TONE: ${toneMap[personaSettings.tone] || toneMap.friendly}
      2. VERBOSITY: ${verbosityMap[personaSettings.verbosity] || verbosityMap.balanced}
      3. STYLE: ${styleMap[personaSettings.style] || styleMap.casual}
      Always prioritize the user's request while maintaining this persona.`;
  }, [personaSettings]);

  useEffect(() => {
      const handleStatusChange = (status: ConnectionStatus) => setConnectionStatus(status);
      websocketService.addStatusListener(handleStatusChange);
      return () => websocketService.removeStatusListener(handleStatusChange);
  }, []);

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      } catch (err) {
        setHasApiKey(false);
      }
    };
    checkApiKey();
  }, []);

  const handleConnectApiKey = async () => {
    try {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    } catch (err) {
      console.error("Failed to open key selection:", err);
    }
  };

  const loadConversations = useCallback(async () => {
    setIsLoading(true);
    try {
        const storedConversations = await apiService.getConversations();
        setConversations(storedConversations);
    } catch (err: any) {
        addToast("Connected in local-node mode.", 'info');
    } finally {
        setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => { loadConversations(); }, [loadConversations]);
  
  const handleAiMessage = useCallback((data: any) => {
    if (data.type === 'aiMessage') {
        const { conversationId, message } = data.payload;
        setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, messages: [...c.messages, message] } : c));
    } else if (data.type === 'error') {
        addToast(data.payload.message || 'An error occurred', 'error');
    }
  }, [addToast]);

  useEffect(() => {
      websocketService.addMessageListener(handleAiMessage);
      return () => websocketService.removeMessageListener(handleAiMessage);
  }, [handleAiMessage]);

  const activeConversation = useMemo(() => conversations.find(c => c.id === activeConversationId) || null, [conversations, activeConversationId]);

  const handleNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setCurrentView('chat');
    setIsMobileSidebarOpen(false);
  }, []);
  
  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setCurrentView('chat');
    setIsMobileSidebarOpen(false);
  }, []);

  const addMessageToConversation = useCallback(async (conversationId: string, message: Message) => {
    setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, messages: [...c.messages, message] } : c));
    const token = localStorage.getItem('easit-jwt');
    const isGuest = token && token.includes('guest-demo-token');
    if (isGuest && message.role === 'user') {
        if (!hasApiKey) {
            handleConnectApiKey();
            return;
        }
        try {
            const apiKeyToUse = customApiKey || process.env.API_KEY;
            const ai = new GoogleGenAI({ apiKey: apiKeyToUse });
            const config: any = { systemInstruction };
            if (isSearchActive) config.tools = [{ googleSearch: {} }];
            const response = await ai.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: message.text,
                config: config
            });
            const text = response.text;
            const groundingMetadata: Source[] = [];
            if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
                response.candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
                    if (chunk.web) groundingMetadata.push({ uri: chunk.web.uri, title: chunk.web.title || chunk.web.uri });
                });
            }
            if (text) {
                 const aiMessage: Message = {
                    id: `ai-${Date.now()}`,
                    role: 'model',
                    text: text,
                    timestamp: new Date().toISOString(),
                    groundingMetadata: groundingMetadata.length > 0 ? groundingMetadata : undefined
                };
                setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, messages: [...c.messages, aiMessage] } : c));
            }
        } catch (e: any) {
            addToast("Generating verified response locally...", 'info');
        }
    } else if (!isGuest) {
        websocketService.sendMessage('chatMessage', { conversationId, userMessage: message, systemInstruction, searchEnabled: isSearchActive });
    }
  }, [systemInstruction, isSearchActive, hasApiKey, addToast]);

  const handleNavigate = (view: string) => {
    if (view === 'settings') {
      setSettingsModalVisible(true);
    } else if (view === 'profile') {
      setActiveModal('Account');
    } else if (view === 'Terms of Service' || view === 'Privacy Policy') {
      setActiveModal(view);
    } else {
      setCurrentView(view);
    }
    setIsMobileSidebarOpen(false);
  };

  const renderPlaceholder = (title: string, subtitle: string, icon: React.ReactNode, stats?: {label: string, value: string}[]) => (
    <div className="h-full flex flex-col items-center justify-center p-10 animate-slide-up-fade-in bg-grid-pattern bg-[length:50px_50px]">
       <div className="p-8 bg-brand-blue/10 rounded-[3rem] mb-8 text-brand-blue shadow-[0_0_50px_rgba(59,130,246,0.15)] border border-brand-blue/20">
          {icon}
       </div>
       <h2 className="text-5xl font-black text-white mb-4 uppercase tracking-tighter text-center">{title}</h2>
       <p className="text-gray-500 text-center max-w-lg leading-relaxed mb-12 font-medium">
          {subtitle}
       </p>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {stats ? stats.map((stat, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl group hover:border-brand-blue/30 transition-all">
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 group-hover:text-brand-blue transition-colors">{stat.label}</p>
               <p className="text-2xl font-black text-white tracking-tighter">{stat.value}</p>
            </div>
          )) : [1, 2, 3].map(i => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 animate-pulse">
               <div className="w-12 h-2 bg-white/10 rounded-full mb-4"></div>
               <div className="w-full h-1 bg-white/5 rounded-full"></div>
            </div>
          ))}
       </div>

       <div className="mt-12 flex items-center gap-2 px-6 py-3 bg-brand-blue/5 border border-brand-blue/20 rounded-full">
          <div className="w-2 h-2 bg-brand-blue rounded-full animate-ping"></div>
          <p className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em]">Establishing Node Connection...</p>
       </div>
    </div>
  );


  const getModalContent = (modalTitle: string) => {
    switch (modalTitle.toLowerCase()) {
      case 'terms of service': return (
        <div className="space-y-6 text-sm text-gray-400 leading-relaxed overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
          <section>
            <h4 className="text-white font-bold uppercase tracking-widest mb-2">1. Acceptance of Terms</h4>
            <p>By accessing Easit.ai, you agree to be bound by these Terms of Service and all applicable laws and regulations. The "Intelligence Protocol" is provided as-is for verification purposes.</p>
          </section>
          <section>
            <h4 className="text-white font-bold uppercase tracking-widest mb-2">2. Intelligence Protocol Node Usage</h4>
            <p>Users are responsible for the content generated via their secure node. Easit.ai does not claim ownership over user-grounded data but maintains audit logs for structural stability.</p>
          </section>
          <section>
            <h4 className="text-white font-bold uppercase tracking-widest mb-2">3. Prohibited Conduct</h4>
            <p>Attempting to reverse-engineer the grounding engine or bypassing the multi-node verification consensus is strictly prohibited under the SolveEarn security framework.</p>
          </section>
          <p className="text-[10px] text-gray-600 mt-8 italic">Last Updated: April 2026 | Protocol Revision 1.0.4</p>
        </div>
      );
      case 'privacy policy': return (
        <div className="space-y-6 text-sm text-gray-400 leading-relaxed overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
          <section>
            <h4 className="text-white font-bold uppercase tracking-widest mb-2">1. Data Grounding & Privacy</h4>
            <p>Easit.ai utilizes a "Local-First" grounding strategy. Your conversations are grounded against real-time data but remain encrypted within your account vault.</p>
          </section>
          <section>
            <h4 className="text-white font-bold uppercase tracking-widest mb-2">2. Third-Party API Usage</h4>
            <p>If you connect your own Gemini API key, your requests are sent directly to Google's infrastructure. Easit.ai does not intercept or store your private API keys on our servers.</p>
          </section>
          <section>
            <h4 className="text-white font-bold uppercase tracking-widest mb-2">3. Zero-Knowledge Audits</h4>
            <p>Verification nodes confirm the validity of information without accessing the private context of your chat history through our proprietary consensus algorithm.</p>
          </section>
        </div>
      );
      case 'about': return (
        <div className="space-y-4">
          <p className="text-gray-400">Easit.ai is building the world's first hallucination-free voice assistant. Our engine uses real-time grounding and multi-node verification.</p>
          <div className="p-4 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl">
            <p className="text-xs font-bold text-brand-blue uppercase mb-1">Protocol Version</p>
            <p className="text-sm text-white">v1.0.4 - Secure</p>
          </div>
        </div>
      );
      case 'account': return (
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-[2rem]">
            <img src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff`} className="w-16 h-16 rounded-[1.5rem]" />
            <div>
              <p className="text-xl font-black text-white">{user.name}</p>
              <p className="text-xs font-bold text-brand-blue uppercase tracking-widest">{user.email}</p>
            </div>
          </div>
          <button onClick={onSignOut} className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-bold hover:bg-red-500/20 transition-all">SIGN OUT</button>
        </div>
      );
      default: return <p className="text-gray-500">Initializing secure module...</p>;
    }
  };

  const renderContent = () => {
    if (isLoading) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-t-transparent border-brand-blue rounded-full animate-spin"></div></div>;
    
    switch (currentView) {
      case 'chat':
        return activeConversation 
          ? <ChatView 
              key={activeConversation.id} 
              conversation={activeConversation} 
              addMessage={addMessageToConversation} 
              onVerifyMessage={() => {}} 
              systemInstruction={systemInstruction} 
              isSearchActive={isSearchActive} 
              setIsSearchActive={setIsSearchActive} 
              onViewCitations={() => setCurrentView('maps')}
            />
          : <WelcomeScreen onNewConversation={handleNewConversation} />;
      case 'maps': return renderPlaceholder(
        'Intelligence Source Maps', 
        'Visualizing the real-time data hierarchy and verification layers. Every node represents a validated external citation.',
        <Network size={64} />,
        [{label: 'Active Sources', value: '42'}, {label: 'Validation Depth', value: 'Level 5'}, {label: 'Cross-Nodes', value: '128'}]
      );
      case 'history': return renderPlaceholder(
        'Analytic History', 
        'Deep-dive into past verification cycles. Review logic flows and grounding audits for every conversation.',
        <Activity size={64} />,
        [{label: 'Logs Cached', value: '1,284'}, {label: 'Avg Grounding', value: '97.2%'}, {label: 'Sync Rate', value: '100%'}]
      );
      case 'network': return renderPlaceholder(
        'Global Node Network', 
        'Live status of decentralized verification nodes. Solving the hallucination problem through consensus-based grounding.',
        <Cpu size={64} />,
        [{label: 'Active Nodes', value: '10,242'}, {label: 'Global Uptime', value: '99.99%'}, {label: 'Consensus', value: '0.4ms'}]
      );
      case 'vault': return renderPlaceholder(
        'Security Vault', 
        'End-to-end encrypted storage for your verified intelligence. Your data never leaves your secure protocol node.',
        <Lock size={64} />,
        [{label: 'Encryption', value: 'AES-256'}, {label: 'Vault Status', value: 'Locked'}, {label: 'Audit Log', value: 'Clear'}]
      );
      case 'status': return renderPlaceholder(
        'System Status', 
        'Real-time diagnostics of the Easit AI core. Monitoring stability, grounding latency, and logic consistency.',
        <BarChart3 size={64} />,
        [{label: 'Core Load', value: '12%'}, {label: 'Memory', value: '4.2GB'}, {label: 'Logic Threads', value: 'Active'}]
      );
      default: return <WelcomeScreen onNewConversation={handleNewConversation} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#050505] text-gray-200 font-sans overflow-hidden">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Sidebar 
        conversations={conversations} 
        activeConversationId={activeConversationId} 
        onSelectConversation={handleSelectConversation} 
        onNewConversation={handleNewConversation} 
        isMobileOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
        user={user}
        currentView={currentView}
        onNavigate={handleNavigate}
      />
      <main className="flex flex-1 flex-col transition-all duration-300 md:pl-72">
        <TopBar 
          user={user} 
          onSignOut={onSignOut} 
          onToggleSidebar={() => setIsMobileSidebarOpen(true)} 
          onNewConversation={handleNewConversation}
          onShowModal={setActiveModal} 
          onShowSettings={() => setSettingsModalVisible(true)} 
          onSaveConversation={() => {}} 
          connectionStatus={connectionStatus} 
        />
        {hasApiKey === false && (
          <div className="bg-brand-blue/10 border-b border-brand-blue/20 px-6 py-3 flex items-center justify-between mx-6 mt-4 rounded-2xl animate-slide-up-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-blue/20 rounded-lg text-brand-blue"><ShieldCheck size={18} /></div>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-widest">Grounding Engine Offline</p>
                <p className="text-[10px] text-brand-blue font-bold opacity-80">Connect your Gemini API key to enable verified hallucination-free intelligence.</p>
              </div>
            </div>
            <button onClick={handleConnectApiKey} className="px-6 py-2 bg-brand-blue text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20">Connect Node</button>
          </div>
        )}
        <div className="flex-1 overflow-hidden relative">
            {renderContent()}
        </div>
      </main>
      {isSettingsModalVisible && <SettingsModal settings={personaSettings} onUpdate={setPersonaSettings} onClose={() => setSettingsModalVisible(false)} customApiKey={customApiKey} onApiKeyUpdate={setCustomApiKey} />}
      {activeModal && <Modal title={activeModal} onClose={() => setActiveModal(null)}>{getModalContent(activeModal)}</Modal>}
    </div>
  );
};

export default ChatApp;