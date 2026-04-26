
import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Activity, Users, MessageSquare, Code, ArrowRight, Mic, Phone, Play, Terminal, Check, X, Info, Search, Sparkles, Shield, Lock, FileText, Sliders, Mail, Share2, Twitter, Github, Linkedin, MessageCircle } from 'lucide-react';
import { FooterAssistant } from './FooterAssistant.tsx';
import { ComingSoonForm } from './ComingSoonForm.tsx';

interface LandingPageProps {
  onGetStarted: () => void;
  onEnterAsGuest: () => void;
}

// Logo URL representing the 3-node triangle logo provided by the user
const logoUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMTcwIiBzdHJva2U9InVybCgjZ3JhZDEpIiBzdHJva2Utd2lkdGg9IjEyIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjE2MCIgcj0iMzUiIGZpbGw9IiM4QjVDRjYiLz4KPGNpcmNsZSBjeD0iMTcwIiBjeT0iMzAwIiByPSIzNSIgZmlsbD0iIzNCODJGNiIvPgo8Y2lyY2xlIGN4PSIzMzAiIGN5PSIzMDAiIHI9IjM1IiBmaWxsPSIjMDBGMEY2Ii8+CjxsaW5lIHgxPSIyNTAiIHkxPSIxNjAiIHgyPSIxNzAiIHkyPSIzMDAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjMiIHN0cm9rZS13aWR0aD0iMyIvPgo8bGluZSB4MT0iMjUwIiB5MT0iMTYwIiB4Mj0iMzMwIiB5Mj0iMzAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjMiLz4KPGxpbmUgeDE9IjE3MCIgeTE9IjMwMCIgeDI9IjMzMCIgeTI9IjMwMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMyIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQxIiB4MT0iODAiIHkxPSI4MCIgeDI9IjQyMCIgeTI9IjQyMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjOEI1Q0Y2Ii8+CjxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjM0I4MkY2Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwRjBGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==';

interface DocsGuideProps {
    onClose: () => void;
}

const DocsGuide: React.FC<DocsGuideProps> = ({ onClose }) => {
    const steps = [
        {
            title: "Phase 1: Verification Engine",
            icon: <Lock size={24} />,
            content: "We are perfecting the Gemini grounding engine to ensure every AI response is verified against real-time data.",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Phase 2: Voice Integration",
            icon: <Mic size={24} />,
            content: "Real-time, ultra-low latency voice communication is currently in internal testing. Stay tuned.",
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "Join the Waitlist",
            icon: <Users size={24} />,
            content: "Early adopters get priority access and special 'Founding Member' status. Sign up today.",
            color: "text-neon-cyan",
            bg: "bg-neon-cyan/10"
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-deep-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-glass-black border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up-fade-in relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-brand-blue/20 rounded-2xl text-brand-blue">
                            <Sparkles size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Easit.ai Roadmap</h2>
                            <p className="text-gray-400">What we're building behind the scenes.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {steps.map((step, i) => (
                            <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${step.bg} ${step.color} group-hover:scale-110 transition-transform`}>
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{step.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 border border-brand-blue/20 text-center">
                        <h3 className="text-xl font-bold text-white mb-3">Want early access?</h3>
                        <p className="text-gray-400 mb-6 max-w-lg mx-auto">Be the first to know when we launch our beta program.</p>
                        <button 
                            onClick={onClose}
                            className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-brand-blue/20"
                        >
                            Return to Waitlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LegalModal = ({ title, content, onClose }: { title: string, content: React.ReactNode, onClose: () => void }) => (
    <div className="fixed inset-0 z-[110] bg-deep-black/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative shadow-2xl">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">{title}</h2>
            <div className="text-gray-400 text-sm space-y-4 leading-relaxed">
                {content}
            </div>
            <button onClick={onClose} className="mt-8 w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl border border-white/10 transition-all">Close</button>
        </div>
    </div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onEnterAsGuest }) => {
    const [showDocs, setShowDocs] = useState(false);
    const [activeLegal, setActiveLegal] = useState<{ title: string, content: React.ReactNode } | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-deep-black text-white font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden">
            {/* Navbar */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-deep-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src={logoUrl} alt="Easit.ai Logo" className="w-8 h-8 rounded-full" />
                        <span className="text-xl font-bold tracking-tight text-white">Easit.ai</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <button onClick={() => scrollTo('vision')} className="text-sm font-medium text-gray-400 hover:text-white transition">Vision</button>
                        <button onClick={() => setShowDocs(true)} className="text-sm font-medium text-gray-400 hover:text-white transition">Roadmap</button>
                        <div className="relative group">
                            <button className="text-sm font-medium text-gray-500 cursor-not-allowed flex items-center gap-1">
                                Pricing <Lock size={12} />
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Coming Soon</div>
                        </div>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="text-sm font-bold text-gray-400 hover:text-white transition" onClick={onGetStarted}>Log In</button>
                        <button className="bg-brand-blue text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-blue/90 transition shadow-lg shadow-brand-blue/20" onClick={onGetStarted}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-20 min-h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 grid-bg pointer-events-none"></div>
                    <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center space-y-12">
                        <div className="space-y-6 max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-[10px] font-bold uppercase tracking-widest text-brand-blue animate-pulse">
                                <Sparkles size={14} />
                                The Future of Verified Intelligence
                            </div>
                            <h1 className="text-6xl md:text-9xl font-bold text-white leading-[0.9] tracking-tighter">
                                Don't just ask. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-neon-cyan animate-gradient-x">
                                    Trust the answer.
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                                Easit.ai is building the world's first hallucination-free voice assistant. Grounded in real-time data, verified by logic.
                            </p>
                        </div>

                        <div id="waitlist" className="w-full max-w-xl mx-auto space-y-6 pt-4">
                            <ComingSoonForm />
                            <div className="flex justify-center items-center gap-6 text-gray-500">
                                <span className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-500" /> 100% Free Signup</span>
                                <span className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-500" /> Exclusive Beta Access</span>
                            </div>
                        </div>

                        {/* Blurred Preview Element */}
                        <div className="relative w-full max-w-5xl mt-12 group">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-deep-black z-10 pointer-events-none"></div>
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className="bg-glass-black/80 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full text-white font-bold flex items-center gap-3 shadow-2xl animate-bounce">
                                    <Lock size={20} className="text-brand-blue" />
                                    <span>Experience Under Development</span>
                                </div>
                            </div>
                            <div className="bg-glass-black border border-white/5 rounded-3xl p-8 blur-2xl opacity-40 transition-all group-hover:blur-3xl group-hover:opacity-30">
                                <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-4 bg-white/10 rounded w-1/3"></div>
                                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                                    <div className="h-4 bg-white/10 rounded w-1/4"></div>
                                    <div className="h-20 bg-white/5 rounded w-full mt-8"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="vision" className="py-32 bg-deep-black relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24 max-w-3xl mx-auto space-y-4">
                            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">Why Easit.ai?</h2>
                            <p className="text-gray-400 text-xl leading-relaxed">
                                We're solving the biggest problem in AI today: <strong>Hallucinations.</strong>
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard icon={<ShieldCheck size={26} />} title="Real-time Verification">
                                Every claim is cross-referenced against multiple live web sources before it reaches you.
                            </FeatureCard>
                            <FeatureCard icon={<Mic size={26} />} title="Natural Voice">
                                Talk to your AI like a human. Ultra-low latency ensures a fluid, interruptible conversation.
                            </FeatureCard>
                            <FeatureCard icon={<Zap size={26} />} title="Smart Grounding">
                                Powered by advanced Gemini models, optimized for factual accuracy and technical depth.
                            </FeatureCard>
                        </div>
                    </div>
                </section>

                {/* Proof Section (Hype builder) */}
                <section className="py-20 bg-gradient-to-b from-deep-black to-brand-blue/5">
                    <div className="container mx-auto px-6 text-center">
                        <div className="bg-glass-black border border-white/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <MessageCircle size={300} className="text-brand-blue" />
                            </div>
                            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight italic">
                                    "People desperately want this product to exist."
                                </h3>
                                <p className="text-gray-400 text-lg">
                                    Join hundreds of forward-thinking researchers, developers, and creators who are waiting for a verified AI experience.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-sm font-medium">Coming to iOS</div>
                                    <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-sm font-medium">Coming to Android</div>
                                    <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-sm font-medium">Desktop Alpha Soon</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-black py-20 border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 space-y-6">
                            <div className="flex items-center gap-2">
                                <img src={logoUrl} alt="Easit.ai Logo" className="w-10 h-10 rounded-full" />
                                <span className="text-lg font-bold text-white">Easit.ai</span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Building the world's most reliable voice assistant grounded in real-time information.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Waitlist</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><button onClick={() => scrollTo('waitlist')} className="hover:text-brand-blue transition">Join Now</button></li>
                                <li><button onClick={() => setShowDocs(true)} className="hover:text-brand-blue transition">Roadmap</button></li>
                                <li><button className="text-gray-600 cursor-not-allowed">Beta Test Request</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
                            <div className="flex gap-4">
                                <button className="p-2 bg-white/5 rounded-full hover:bg-brand-blue transition text-gray-400 hover:text-white"><Twitter size={20} /></button>
                                <button className="p-2 bg-white/5 rounded-full hover:bg-brand-blue transition text-gray-400 hover:text-white"><Github size={20} /></button>
                                <button className="p-2 bg-white/5 rounded-full hover:bg-brand-blue transition text-gray-400 hover:text-white"><Linkedin size={20} /></button>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Legal</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><button onClick={() => setActiveLegal({ 
                                    title: "Privacy Policy", 
                                    content: (
                                        <div className="space-y-4">
                                            <p className="font-bold text-white">1. Data Grounding & Privacy</p>
                                            <p>Easit.ai utilizes a "Local-First" grounding strategy. Your conversations are grounded against real-time data but remain encrypted within your account vault.</p>
                                            <p className="font-bold text-white">2. Third-Party API Usage</p>
                                            <p>If you connect your own Gemini API key, your requests are sent directly to Google's infrastructure. Easit.ai does not intercept or store your private API keys on our servers.</p>
                                            <p className="font-bold text-white">3. Zero-Knowledge Audits</p>
                                            <p>Verification nodes confirm the validity of information without accessing the private context of your chat history through our proprietary consensus algorithm.</p>
                                        </div>
                                    ) 
                                })} className="hover:text-brand-blue transition">Privacy Policy</button></li>
                                <li><button onClick={() => setActiveLegal({ 
                                    title: "Terms of Service", 
                                    content: (
                                        <div className="space-y-4">
                                            <p className="font-bold text-white">1. Acceptance of Terms</p>
                                            <p>By accessing Easit.ai, you agree to be bound by these Terms of Service and all applicable laws and regulations. The "Intelligence Protocol" is provided as-is for verification purposes.</p>
                                            <p className="font-bold text-white">2. Intelligence Protocol Node Usage</p>
                                            <p>Users are responsible for the content generated via their secure node. Easit.ai does not claim ownership over user-grounded data but maintains audit logs for structural stability.</p>
                                            <p className="font-bold text-white">3. Prohibited Conduct</p>
                                            <p>Attempting to reverse-engineer the grounding engine or bypassing the multi-node verification consensus is strictly prohibited under the SolveEarn security framework.</p>
                                        </div>
                                    ) 
                                })} className="hover:text-brand-blue transition">Terms of Service</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
                        <p>© 2024 Easit.ai Inc. All rights reserved.</p>
                        <p className="font-mono text-[10px] tracking-widest opacity-50 uppercase">Demand-Driven Strategy Enabled</p>
                    </div>
                </div>
            </footer>

            <FooterAssistant />
            {showDocs && <DocsGuide onClose={() => setShowDocs(false)} />}
            {activeLegal && <LegalModal title={activeLegal.title} content={activeLegal.content} onClose={() => setActiveLegal(null)} />}
        </div>
    );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-all group">
        <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
    </div>
);
