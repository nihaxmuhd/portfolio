import { motion } from 'framer-motion';

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="flex justify-start"
    >
      <div className="flex max-w-[85%] flex-col gap-1.5">
        <div className="rounded-[1.35rem] border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <span>AI is typing...</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2].map(index => (
                <motion.span
                  key={index}
                  animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.85, repeat: Infinity, delay: index * 0.12 }}
                  className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
