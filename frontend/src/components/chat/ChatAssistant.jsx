import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  ChevronDown,
  Maximize2,
  MessageSquare,
  Minimize2,
  Send,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import { api } from '../../api';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

const STORAGE_KEY = 'portfolio_chat_messages_v1';
const OPENED_KEY = 'portfolio_chat_opened_v1';
const QUICK_PROMPTS = ['About You', 'Skills', 'Projects', 'Contact', 'Experience'];

const promptToMessage = {
  'About You': 'Tell me about Nihad and what kind of developer he is.',
  Skills: "What are Nihad's strongest technical skills?",
  Projects: 'Show me the kinds of projects Nihad has built.',
  Contact: 'How can I contact Nihad for work or collaboration?',
  Experience: 'What experience does Nihad have?',
};

const createMessage = (role, text) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  text,
  timestamp: new Date().toISOString(),
});

const getStoredMessages = () => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const defaultWelcomeMessage = () =>
  createMessage(
    'assistant',
    "Hi, I'm Nihad's AI assistant. I can help you explore his skills, projects, experience, and the best way to get in touch.",
  );

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => getStoredMessages());
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading, isOpen, isMinimized]);

  const ensureWelcomeMessage = () => {
    setMessages(prev => {
      if (prev.length > 0) return prev;
      return [defaultWelcomeMessage()];
    });
  };

  const openChat = () => {
    ensureWelcomeMessage();
    setErrorMessage('');
    setIsOpen(true);
    setIsMinimized(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(OPENED_KEY, '1');
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setErrorMessage('');
  };

  const clearChat = () => {
    const welcome = defaultWelcomeMessage();
    setMessages([welcome]);
    setErrorMessage('');
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([welcome]));
    }
  };

  const submitMessage = async rawMessage => {
    const trimmed = rawMessage.trim();
    if (!trimmed || isLoading) return;

    const userMessage = createMessage('user', trimmed);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await api.chat({
        message: trimmed,
        history: nextMessages.slice(-8).map(message => ({
          role: message.role,
          text: message.text,
        })),
      });

      setMessages(prev => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: response.reply,
          timestamp: response.timestamp || new Date().toISOString(),
        },
      ]);
    } catch (err) {
      const fallback = err?.errors?.reply
        || "I'm having trouble responding right now. You can still explore the portfolio sections or use the contact area to reach Nihad directly.";

      setErrorMessage(err?.message || 'The assistant is temporarily unavailable.');
      setMessages(prev => [
        ...prev,
        createMessage('assistant', fallback),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await submitMessage(input);
  };

  const handleQuickPrompt = async prompt => {
    await submitMessage(promptToMessage[prompt] || prompt);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-[24rem] sm:right-6 sm:max-w-[25rem] lg:max-w-[26rem]"
          >
            <div className="rounded-[1.9rem] bg-gradient-to-r from-violet-500/45 via-fuchsia-500/35 to-cyan-400/35 p-[1px] shadow-[0_22px_80px_-32px_rgba(76,29,149,0.8)]">
              <div className="relative overflow-hidden rounded-[1.85rem] border border-white/8 bg-slate-950/92 backdrop-blur-xl">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-violet-500/12 via-cyan-400/10 to-transparent" />

                <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-5">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-500/25">
                      <Sparkles className="h-5 w-5" />
                      <motion.span
                        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.9, repeat: Infinity }}
                        className="absolute inset-0 rounded-2xl border border-white/30"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight text-white">AI Portfolio Assistant</h3>
                      <p className="text-xs text-slate-400">Ask about Nihad&apos;s work, skills, or contact details</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsMinimized(true)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/6 hover:text-white"
                      aria-label="Minimize chat"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={clearChat}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/6 hover:text-white"
                      aria-label="Clear chat"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={closeChat}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/6 hover:text-white"
                      aria-label="Close chat"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="border-b border-white/10 px-4 py-3 sm:px-5">
                  <div className="flex flex-wrap gap-2">
                    {QUICK_PROMPTS.map(prompt => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleQuickPrompt(prompt)}
                        className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="max-h-[24rem] overflow-y-auto px-4 py-4 sm:px-5">
                  <div className="space-y-3">
                    {messages.map(message => (
                      <ChatMessage key={message.id} message={message} />
                    ))}

                    <AnimatePresence>
                      {isLoading && <TypingIndicator />}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="border-t border-white/10 px-4 py-4 sm:px-5">
                  {errorMessage && (
                    <div className="mb-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-2 transition-colors focus-within:border-violet-400/40">
                      <textarea
                        value={input}
                        onChange={event => setInput(event.target.value)}
                        onKeyDown={event => {
                          if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault();
                            void submitMessage(input);
                          }
                        }}
                        rows={2}
                        placeholder="Ask about projects, skills, experience..."
                        className="max-h-28 min-h-[3.5rem] w-full resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] text-slate-500">Press `Enter` to send</span>
                      <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
                      >
                        <Send className="h-4 w-4" />
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => {
          if (isOpen && isMinimized) {
            setIsMinimized(false);
            return;
          }
          if (isOpen) {
            closeChat();
            return;
          }
          openChat();
        }}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-4 py-3 text-white shadow-[0_20px_50px_-16px_rgba(76,29,149,0.6)] sm:bottom-6 sm:right-6"
        aria-label={isOpen ? 'Toggle AI assistant' : 'Open AI assistant'}
      >
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/14">
          {isOpen && isMinimized ? <Maximize2 className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
          <motion.span
            animate={{ scale: [1, 1.22, 1], opacity: [0.22, 0.45, 0.22] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-white/45"
          />
        </div>
        <div className="hidden text-left sm:block">
          <p className="text-sm font-bold leading-5">{isOpen && isMinimized ? 'Resume chat' : 'Ask AI Assistant'}</p>
          <p className="text-xs text-white/80">Projects, skills, contact, experience</p>
        </div>
        {isOpen && !isMinimized && <ChevronDown className="hidden h-4 w-4 sm:block" />}
        {!isOpen && <MessageSquare className="hidden h-4 w-4 sm:block" />}
      </motion.button>
    </>
  );
}
