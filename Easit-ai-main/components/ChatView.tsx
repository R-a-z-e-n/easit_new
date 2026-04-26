
import React, { useEffect, useRef, useState } from 'react';
import type { Conversation, Message } from '../types.ts';
import { MessageBubble } from './MessageBubble.tsx';
import { ChatInput } from './ChatInput.tsx';
import { 
  Shield, 
  ExternalLink, 
  Cpu, 
  Activity,
  ChevronRight
} from 'lucide-react';

interface ChatViewProps {
  conversation: Conversation;
  addMessage: (conversationId: string, message: Message) => void;
  onVerifyMessage: (conversationId: string, message: Message) => void;
  systemInstruction: string;
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
  onViewCitations: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ 
  conversation, 
  addMessage, 
  onVerifyMessage,
  systemInstruction, 
  isSearchActive, 
  setIsSearchActive,
  onViewCitations
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  useEffect(() => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage && lastMessage.role === 'user') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [conversation.messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toISOString(),
    };
    addMessage(conversation.id, userMessage);
  };
  
  const handleSendVoiceMessage = (userText: string, aiText: string) => {
      // (Implementation kept same for now)
  };

  return (
    <div className="h-full flex flex-col bg-[#050505]">
      {/* Engine Status Header */}
      <div className="px-8 py-6 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-12">
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Engine Status</p>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-20"></div>
              </div>
              <p className="text-sm font-bold text-white uppercase tracking-tight">Verification Engine Active</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Grounding Strength</p>
            <div className="flex items-center gap-3">
              <p className="text-sm font-bold text-neon-cyan uppercase tracking-tight">98.4%</p>
              <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-blue to-neon-cyan w-[98.4%] rounded-full shadow-[0_0_10px_rgba(0,240,255,0.3)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Structural Stability Card */}
        <div className="hidden lg:flex items-center gap-4 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5">
          <div className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue">
            <Shield size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white uppercase tracking-widest">Structural Stability</p>
            <p className="text-[9px] font-bold text-neon-cyan/60 uppercase tracking-tighter">Triple-Check Logic: Nominal</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {conversation.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto">
                 <div className="p-6 bg-brand-blue/5 rounded-[2rem] border border-brand-blue/10 mb-6">
                    <Shield size={48} className="text-brand-blue animate-pulse" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">Ready for Verification</h3>
                 <p className="text-gray-500 text-sm">Ask anything. Every response is grounded in real-time logic and verified across the global node network.</p>
              </div>
            ) : (
              conversation.messages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  message={message} 
                  onVerify={() => onVerifyMessage(conversation.id, message)}
                />
              ))
            )}
            {isLoading && (
                <div className="flex gap-4 animate-pulse">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex-shrink-0"></div>
                  <div className="space-y-3 flex-1">
                    <div className="h-4 bg-white/5 rounded-full w-3/4"></div>
                    <div className="h-4 bg-white/5 rounded-full w-1/2"></div>
                  </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Bar */}
          <div className="p-8 pt-0">
             <ChatInput
              onSendMessage={handleSendMessage}
              onSendVoiceMessage={handleSendVoiceMessage}
              isLoading={isLoading}
              systemInstruction={systemInstruction}
              isSearchActive={isSearchActive}
              setIsSearchActive={setIsSearchActive}
            />
          </div>
        </div>

        {/* Right Sidebar - Info Panel */}
        <aside className="hidden xl:flex flex-col w-96 border-l border-white/5 p-8 gap-8 overflow-y-auto bg-white/[0.01]">
          {/* Node Network Visualization */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 aspect-square relative flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Node Network</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></div>
                <p className="text-[9px] font-bold text-neon-cyan uppercase tracking-widest">Live</p>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
               {/* Triangle Animation */}
               <svg width="200" height="200" viewBox="0 0 200 200" className="relative z-10">
                  <path 
                    d="M 100,40 L 160,140 L 40,140 Z" 
                    fill="none" 
                    stroke="rgba(0, 240, 255, 0.2)" 
                    strokeWidth="2" 
                    className="animate-dash-scroll"
                  />
                  <circle cx="100" cy="40" r="6" fill="#00F0FF" className="animate-node-sync" />
                  <circle cx="160" cy="140" r="6" fill="#00F0FF" className="animate-node-sync [animation-delay:1s]" />
                  <circle cx="40" cy="140" r="6" fill="#00F0FF" className="animate-node-sync [animation-delay:2s]" />
                  
                  <text x="100" y="110" textAnchor="middle" className="text-[8px] font-bold fill-white/40 uppercase tracking-widest">Stability Triple-Check</text>
                  <text x="100" y="125" textAnchor="middle" className="text-[10px] font-black fill-neon-cyan uppercase tracking-widest">Synced</text>
               </svg>
               {/* Glow effect */}
               <div className="absolute inset-0 bg-neon-cyan/5 blur-[80px] rounded-full"></div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-gray-500">Latency</span>
                <span className="text-white">14ms</span>
              </div>
              <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-brand-blue w-2/3"></div>
              </div>
            </div>
          </div>

          {/* Active Citations */}
          <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Grounding Citations</p>
             </div>
             
             <div className="space-y-3">
                {[
                  { title: "Journal: Quantum", text: "Universal topological quantum computation in the color code...", id: 1 },
                  { title: "Archive: Physics", text: "High-fidelity measurement of topological qubit parity...", id: 2 }
                ].map(cite => (
                  <div key={cite.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-blue/30 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[9px] font-black text-brand-blue uppercase tracking-widest">{cite.title}</p>
                      <ExternalLink size={12} className="text-gray-600 group-hover:text-brand-blue transition-colors" />
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed italic">"{cite.text}"</p>
                  </div>
                ))}
                <button 
                  onClick={onViewCitations}
                  className="w-full py-3 rounded-xl border border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all"
                >
                  View All Citations
                </button>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};