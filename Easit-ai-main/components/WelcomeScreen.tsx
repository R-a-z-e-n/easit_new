
import React from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Zap, 
  Database,
  ArrowRight,
  MessageSquarePlus
} from 'lucide-react';

interface WelcomeScreenProps {
  onNewConversation: () => void;
}

const logoUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMTcwIiBzdHJva2U9InVybCgjZ3JhZDEpIiBzdHJva2Utd2lkdGg9IjEyIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjE2MCIgcj0iMzUiIGZpbGw9IiM4QjVDRjYiLz4KPGNpcmNsZSBjeD0iMTcwIiBjeT0iMzAwIiByPSIzNSIgZmlsbD0iIzNCODJGNiIvPgo8Y2lyY2xlIGN4PSIzMzAiIGN5PSIzMDAiIHI9IjM1IiBmaWxsPSIjMDBGMEY2Ii8+CjxsaW5lIHgxPSIyNTAiIHkxPSIxNjAiIHgyPSIxNzAiIHkyPSIzMDAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjMiIHN0cm9rZS13aWR0aD0iMyIvPgo8bGluZSB4MT0iMjUwIiB5MT0iMTYwIiB4Mj0iMzMwIiB5Mj0iMzAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjMiLz4KPGxpbmUgeDE9IjE3MCIgeTE9IjMwMCIgeDI9IjMzMCIgeTI9IjMwMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMyIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQxIiB4MT0iODAiIHkxPSI4MCIgeDI9IjQyMCIgeTI9IjQyMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjOEI1Q0Y2Ii8+CjxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjM0I4MkY2Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwRjBGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNewConversation }) => {
  const stats = [
    { label: 'Active Nodes', value: '4,281', icon: <Globe size={16} />, color: 'text-brand-blue' },
    { label: 'Verification rate', value: '99.9%', icon: <ShieldCheck size={16} />, color: 'text-neon-cyan' },
    { label: 'System Latency', value: '14ms', icon: <Zap size={16} />, color: 'text-brand-purple' },
    { label: 'Data Grounded', value: '1.2PB', icon: <Database size={16} />, color: 'text-white' },
  ];

  const quickStarts = [
    { title: 'Technical Verification', desc: 'Cross-check architecture & whitepapers.', category: 'Engineering' },
    { title: 'Market Sentiment', desc: 'Real-time analysis of global trends.', category: 'Finance' },
    { title: 'Hallucination Check', desc: 'Verify AI responses for factual errors.', category: 'Intelligence' },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#050505] p-10 flex flex-col items-center">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-cyan/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        {/* Logo Section */}
        <div className="relative mb-12 group animate-slide-up-fade-in">
           <div className="absolute inset-0 bg-brand-blue/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
           <img src={logoUrl} alt="Easit.ai Logo" className="relative h-32 w-32 rounded-[2.5rem] border border-white/10 shadow-2xl" />
           <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#050505] border border-white/10 rounded-full">
              <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest whitespace-nowrap">Engine v2.4 Active</p>
           </div>
        </div>

        {/* Hero Text */}
        <div className="text-center mb-16 animate-slide-up-fade-in [animation-delay:0.2s]">
          <h1 className="text-6xl font-black text-white mb-6 tracking-tight">
            THE WORLD'S FIRST<br />
            <span className="premium-gradient-text">HALLUCINATION-FREE</span> ASSISTANT
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Easit.ai is grounded in real-time global data nodes, ensuring every response is verified, attributed, and structurally stable.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-16 animate-slide-up-fade-in [animation-delay:0.4s]">
          {stats.map((s, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col gap-3">
              <div className={`${s.color} bg-white/5 w-fit p-2 rounded-xl`}>
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{s.value}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Starts */}
        <div className="w-full animate-slide-up-fade-in [animation-delay:0.6s]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Protocol Quick-Start</h3>
            <button onClick={onNewConversation} className="text-xs font-bold text-brand-blue hover:underline">View All Protocols</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStarts.map((q, i) => (
              <button 
                key={i} 
                onClick={onNewConversation}
                className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-left group hover:bg-white/[0.04] hover:border-brand-blue/30 transition-all duration-500 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-3">{q.category}</p>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-brand-blue transition-colors">{q.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{q.desc}</p>
                  <ArrowRight size={20} className="text-gray-700 group-hover:text-white transition-all transform translate-x-0 group-hover:translate-x-2" />
                </div>
                {/* Decorative node */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl group-hover:bg-brand-blue/10 transition-all"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-20 mb-10">
          <button
            onClick={onNewConversation}
            className="group relative px-12 py-5 rounded-2xl bg-brand-blue text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-brand-blue/90 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-brand-blue/50 transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <MessageSquarePlus size={18} />
              Initialize Engine Interaction
            </span>
            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </div>
  );
};
