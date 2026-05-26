import { motion } from 'framer-motion';

const formatTime = timestamp => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
};

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
        <div
          className={`rounded-[1.35rem] px-4 py-3 text-sm leading-7 shadow-sm ${
            isUser
              ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white'
              : 'border border-white/10 bg-slate-900/80 text-slate-100'
          }`}
        >
          {message.text}
        </div>
        <span className={`px-1 text-[11px] text-slate-400 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}
