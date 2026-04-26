
import React from 'react';
import { 
  Smile, 
  Briefcase, 
  Ghost, 
  Heart,
  RotateCcw,
  Shield,
  Zap,
  Cpu
} from 'lucide-react';
import type { PersonaSettings } from '../types.ts';

interface SettingsModalProps {
  settings: PersonaSettings;
  onUpdate: (settings: PersonaSettings) => void;
  onClose: () => void;
  customApiKey: string;
  onApiKeyUpdate: (key: string) => void;
}

export function SettingsModal({ settings, onUpdate, onClose, customApiKey, onApiKeyUpdate }: SettingsModalProps) {
  const personas = [
    { id: 'friendly', label: 'Friendly', desc: 'Casual, supportive, and approachable language with an emphasis on clarity.', icon: <Smile size={24} /> },
    { id: 'professional', label: 'Professional', desc: 'Concise, data-driven, and strictly objective. Optimized for enterprise environments.', icon: <Briefcase size={24} /> },
    { id: 'humorous', label: 'Humorous', desc: 'Witty, engaging, and uses analogies to simplify complex technical nodes.', icon: <Ghost size={24} /> },
    { id: 'empathetic', label: 'Empathetic', desc: 'Attuned to user sentiment, providing reassurance throughout verification processes.', icon: <Heart size={24} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] w-full max-w-5xl shadow-2xl overflow-hidden relative animate-slide-up-fade-in my-auto">
        
        {/* Header */}
        <div className="p-10 pb-6">
           <h2 className="text-3xl font-bold text-white mb-2">Intelligence & Persona Settings</h2>
           <p className="text-gray-500 text-sm">Configure the core cognitive behavior and communication protocols of the Easit engine.</p>
        </div>

        <div className="px-10 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Persona Selection */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-6 bg-brand-blue rounded-full"></div>
                <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Cognitive Persona Selection</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personas.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onUpdate({ ...settings, tone: p.id as any })}
                    className={`p-6 rounded-3xl border transition-all duration-300 text-left relative group ${
                      settings.tone === p.id 
                        ? 'bg-brand-blue/5 border-brand-blue shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                        : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl mb-4 w-fit transition-all ${
                      settings.tone === p.id ? 'bg-brand-blue text-white' : 'bg-white/5 text-gray-500 group-hover:text-gray-300'
                    }`}>
                      {p.icon}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{p.label}</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{p.desc}</p>
                    
                    {settings.tone === p.id && (
                      <div className="absolute bottom-6 right-6 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                        <span className="text-[9px] font-bold text-brand-blue uppercase tracking-widest">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* API Key Configuration */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-6 bg-neon-cyan rounded-full"></div>
                <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">API Protocol Configuration</h3>
              </div>
              
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Zap size={80} className="text-brand-blue" />
                </div>
                <h4 className="text-sm font-bold text-white mb-2">Gemini API Key</h4>
                <p className="text-[11px] text-gray-500 mb-6 leading-relaxed">By providing your own API key, you enable unrestricted usage of the Easit Intelligence Protocol. Your key is stored locally in your browser and is never sent to our servers.</p>
                
                <div className="relative">
                  <input 
                    type="password"
                    value={customApiKey}
                    onChange={(e) => onApiKeyUpdate(e.target.value)}
                    placeholder="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-gray-700 focus:border-brand-blue/50 focus:outline-none transition-all pr-12 font-mono"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-brand-blue/10 rounded-lg text-brand-blue">
                    <Shield size={16} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${customApiKey ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                   <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{customApiKey ? 'API Protocol Active' : 'Waiting for Key Connection'}</p>
                </div>
              </div>
            </div>

            {/* Intensity Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                        <h4 className="text-sm font-bold text-white mb-1">Grounding Intensity</h4>
                        <p className="text-[10px] text-gray-500 leading-relaxed">Controls the strictness of fact-checking against verified data nodes.</p>
                     </div>
                     <div className="px-3 py-1.5 bg-brand-blue/10 border border-brand-blue/20 rounded-xl">
                        <p className="text-[9px] font-black text-brand-blue uppercase tracking-widest">Strict: 85%</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-3">
                        <span>Generative Freedom</span>
                        <span>Strict Logic</span>
                      </div>
                      <div className="relative h-1.5 bg-white/5 rounded-full">
                        <div className="absolute top-0 left-0 h-full bg-brand-blue rounded-full w-[85%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <div className="absolute top-1/2 left-[85%] -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-brand-blue shadow-lg"></div>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-neon-cyan/10 rounded-lg text-neon-cyan">
                        <Shield size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-tight">Real-time Cross-check</p>
                        <p className="text-[9px] text-gray-500">Validate every claim in &lt;150ms.</p>
                      </div>
                    </div>
                    <div className="w-10 h-5 bg-brand-blue rounded-full relative">
                      <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between opacity-50 group">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-brand-purple/10 rounded-lg text-brand-purple">
                        <RotateCcw size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-tight">Source Attribution</p>
                        <p className="text-[9px] text-gray-500">Force detailed citations for every claim.</p>
                      </div>
                    </div>
                    <div className="w-10 h-5 bg-white/10 rounded-full relative">
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white/40 rounded-full"></div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Verification Integrity Column */}
          <div className="lg:col-span-4 space-y-6">
             <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 h-full flex flex-col items-center text-center">
                <div className="relative mb-8">
                   {/* Animated Logic Orb */}
                   <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center relative">
                      <div className="absolute inset-2 border border-brand-blue/30 rounded-full animate-spin [animation-duration:10s]"></div>
                      <div className="absolute inset-4 border-t-2 border-neon-cyan rounded-full animate-spin [animation-duration:3s]"></div>
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse [animation-delay:0.4s]"></div>
                      </div>
                   </div>
                   <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#050505] px-4 py-1 border border-white/10 rounded-full text-[8px] font-black text-neon-cyan uppercase tracking-[0.2em]">
                      Engine Logic Sync
                   </div>
                </div>

                <h4 className="text-lg font-bold text-white mb-2">Verification Integrity</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-10">
                  The current configuration provides a 99.9% accuracy rating against documented source materials.
                </p>

                <div className="w-full space-y-6">
                  <div>
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest mb-2">
                      <span className="text-gray-600">System Latency</span>
                      <span className="text-neon-cyan">142ms</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full">
                      <div className="h-full bg-neon-cyan w-1/4"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest mb-2">
                      <span className="text-gray-600">Cognitive Load</span>
                      <span className="text-brand-purple">64%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full">
                      <div className="h-full bg-brand-purple w-[64%]"></div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-10 pt-0 flex justify-between items-center">
           <button 
             onClick={onClose}
             className="px-8 py-3 rounded-2xl bg-white/5 border border-white/5 text-gray-400 font-bold text-sm hover:bg-white/10 hover:text-white transition-all"
           >
             Discard Changes
           </button>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                 <Cpu size={14} />
                 Settings Synced with Cloud Nodes
              </div>
              <button 
                onClick={onClose}
                className="px-10 py-4 rounded-2xl bg-brand-blue text-white font-bold text-sm hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20 transition-all"
              >
                Synchronize Engine
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}