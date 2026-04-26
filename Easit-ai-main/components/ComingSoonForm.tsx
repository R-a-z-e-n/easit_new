import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const ComingSoonForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        
        // Mock API call
        setTimeout(() => {
            // Save to localStorage for demo persistence
            const waitlist = JSON.parse(localStorage.getItem('easit-waitlist') || '[]');
            waitlist.push({ email, timestamp: new Date().toISOString() });
            localStorage.setItem('easit-waitlist', JSON.stringify(waitlist));
            
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-brand-blue/10 border border-brand-blue/30 rounded-3xl animate-fade-in">
                <CheckCircle2 size={48} className="text-brand-blue mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                <p className="text-gray-400 text-center">We'll notify you as soon as we're ready for more users.</p>
                <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-brand-blue hover:underline"
                >
                    Add another email
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="relative group">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={status === 'loading'}
                    className="w-full bg-glass-black border border-white/10 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-2 top-2 bottom-2 bg-brand-blue text-white px-6 rounded-full font-bold hover:bg-brand-blue/90 transition-all flex items-center justify-center gap-2 group-hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                    {status === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <span>Join Waitlist</span>
                            <Send size={18} />
                        </>
                    )}
                </button>
            </div>
            <p className="text-[10px] text-gray-500 mt-4 text-center px-4">
                By joining the waitlist, you agree to receive updates about Easit.ai. No spam, ever.
            </p>
        </form>
    );
};
