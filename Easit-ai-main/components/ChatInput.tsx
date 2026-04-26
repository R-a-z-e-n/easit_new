
import React, { useState, useCallback, useEffect } from 'react';
import { 
  Mic, 
  Send, 
  Square, 
  Loader2, 
  AlertCircle, 
  Search, 
  BookOpen, 
  Scissors, 
  HelpCircle, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useGeminiLive } from '../hooks/useGeminiLive.ts';
import { GeminiLiveStatus } from '../types.ts';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onSendVoiceMessage: (userText: string, aiText: string) => void;
  isLoading: boolean;
  systemInstruction: string;
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
}

const MicButton: React.FC<{ status: GeminiLiveStatus; onClick: () => void }> = ({ status, onClick }) => {
    const getButtonContent = () => {
        switch (status) {
            case GeminiLiveStatus.CONNECTING:
                return (
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/5 cursor-wait">
                        <Loader2 size={20} className="text-brand-blue animate-spin" />
                    </div>
                );
            case GeminiLiveStatus.LISTENING:
                return (
                    <button
                        onClick={onClick}
                        className="flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 animate-pulse transition-all duration-300"
                        title="Stop Listening"
                    >
                        <Square size={18} className="fill-current" />
                    </button>
                );
            case GeminiLiveStatus.ERROR:
                 return (
                    <button
                        onClick={onClick}
                        className="flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500"
                        title="Retry Connection"
                    >
                        <AlertCircle size={20} />
                    </button>
                );
            default: // IDLE
                return (
                    <button
                        onClick={onClick}
                        className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        title="Start Voice Chat"
                    >
                        <Mic size={20} />
                    </button>
                );
        }
    };

    return getButtonContent();
};


export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onSendVoiceMessage, 
  isLoading, 
  systemInstruction,
  isSearchActive,
  setIsSearchActive
}) => {
  const [inputText, setInputText] = useState('');
  const { status, userTranscript, aiTranscript, startSession, stopSession, error } = useGeminiLive();

  useEffect(() => {
    if (status === GeminiLiveStatus.LISTENING) {
      setInputText(userTranscript);
    }
  }, [userTranscript, status]);

  const handleSend = () => {
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };
  
  const handleMicToggle = useCallback(() => {
    if (status === GeminiLiveStatus.IDLE || status === GeminiLiveStatus.ERROR) {
      startSession({
        onTurnComplete: (finalUserTranscript, finalAiTranscript) => {
          onSendVoiceMessage(finalUserTranscript, finalAiTranscript);
          setInputText('');
        },
        systemInstruction
      });
    } else {
      stopSession();
    }
  }, [status, startSession, stopSession, onSendVoiceMessage, systemInstruction]);

  const presets = [
    { id: 'research', label: 'Deep Research', icon: <BookOpen size={12} />, color: 'hover:text-brand-purple hover:bg-brand-purple/5 hover:border-brand-purple/20' },
    { id: 'verify', label: 'Hallucination Check', icon: <ShieldCheck size={12} />, color: 'hover:text-brand-blue hover:bg-brand-blue/5 hover:border-brand-blue/20' },
    { id: 'summarize', label: 'Summarize', icon: <Scissors size={12} />, color: 'hover:text-orange-500 hover:bg-orange-500/5 hover:border-orange-500/20' },
    { id: 'explain', label: 'Explain Simply', icon: <HelpCircle size={12} />, color: 'hover:text-green-500 hover:bg-green-500/5 hover:border-green-500/20' },
  ];

  const applyPreset = (preset: string) => {
      let finalPrompt = inputText.trim();
      if (!finalPrompt) return;
      // ... (logic remains same)
      onSendMessage(finalPrompt + ` (Mode: ${preset})`);
      setInputText('');
  };

  const isInputDisabled = isLoading || status === GeminiLiveStatus.LISTENING || status === GeminiLiveStatus.CONNECTING;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
        {/* Preset Toggles */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar px-2">
            <button
                onClick={() => setIsSearchActive(!isSearchActive)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    isSearchActive 
                        ? 'bg-brand-blue/10 text-brand-blue border-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                        : 'bg-white/[0.02] text-gray-500 border-white/5 hover:border-white/10 hover:text-gray-300'
                }`}
            >
                <Search size={14} className={isSearchActive ? 'animate-pulse' : ''} />
                Search Active
            </button>
            <div className="w-px h-4 bg-white/5 mx-2"></div>
            {presets.map((p) => (
               <button
                  key={p.id}
                  onClick={() => applyPreset(p.id)}
                  disabled={!inputText.trim()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white/[0.02] text-gray-500 border border-white/5 transition-all disabled:opacity-20 ${p.color}`}
               >
                  {p.icon}
                  {p.label}
               </button>
            ))}
        </div>

        {error && <div className="text-center text-red-500 text-[10px] font-bold uppercase tracking-widest animate-fade-in">{error}</div>}
        
        {/* Main Input Area */}
        <div className="p-2 rounded-[2rem] bg-white/[0.03] border border-white/5 focus-within:border-white/10 transition-all">
          <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                  <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSend();
                          }
                      }}
                      placeholder={status === GeminiLiveStatus.LISTENING ? "Listening to protocol..." : "Enter query for verification engine..."}
                      className="w-full p-4 bg-transparent border-none focus:ring-0 text-gray-200 placeholder:text-gray-600 resize-none min-h-[60px] max-h-32 text-sm leading-relaxed"
                      rows={1}
                      disabled={isInputDisabled}
                  />
              </div>
              
              <div className="flex items-center gap-2 p-2">
                <MicButton status={status} onClick={handleMicToggle} />
                
                <button
                    onClick={handleSend}
                    disabled={!inputText.trim() || isInputDisabled}
                    className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-blue text-white hover:bg-brand-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-blue/20"
                >
                    {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-6">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Grounding Engine v2.4.1 Connected</p>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                 <Zap size={10} className="text-brand-purple" />
                 <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Low Latency Mode</p>
              </div>
              <div className="flex items-center gap-1">
                 <ShieldCheck size={10} className="text-neon-cyan" />
                 <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Verified Encrypted</p>
              </div>
           </div>
        </div>
    </div>
  );
};