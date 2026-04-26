
import React from 'react';
import type { Message } from '../types.ts';
import { ShieldCheck, User, Sparkles, ExternalLink } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
  onVerify?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLoading = false, onVerify }) => {
  const isUser = message.role === 'user';
  const hasSources = message.groundingMetadata && message.groundingMetadata.length > 0;

  if (isUser) {
    return (
      <div className="flex justify-end animate-slide-up-fade-in">
        <div className="flex flex-col items-end gap-2 max-w-[80%]">
          <div className="px-6 py-4 rounded-[2rem] bg-white/[0.05] border border-white/5 text-gray-200 text-sm leading-relaxed">
            {message.text}
          </div>
          <div className="flex items-center gap-2 px-2">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Sent {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 animate-slide-up-fade-in group">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
          <Sparkles size={18} />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-3">
           <p className="text-xs font-bold text-white uppercase tracking-widest">Easit Intelligence</p>
           {hasSources && (
             <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full text-[9px] font-black text-neon-cyan uppercase tracking-widest">
               <ShieldCheck size={10} />
               Grounding Verified
             </div>
           )}
        </div>

        <div className={`p-6 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden ${hasSources ? 'border-neon-cyan/10 bg-neon-cyan/[0.01]' : ''}`}>
           {isLoading ? (
             <div className="flex gap-1.5 py-2">
               <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
           ) : (
             <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{message.text}</p>
           )}
           
           {/* Visual background node decoration */}
           <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
              <ShieldCheck size={120} className="text-neon-cyan" />
           </div>
        </div>

        {hasSources && !isLoading && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.groundingMetadata?.map((source, index) => (
              <a
                key={index}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-lg text-[10px] font-bold text-brand-blue hover:bg-brand-blue/10 hover:border-brand-blue/30 transition-all group/cite"
              >
                <span className="truncate max-w-[150px]">{source.title || new URL(source.uri).hostname}</span>
                <ExternalLink size={10} className="opacity-40 group-hover/cite:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};