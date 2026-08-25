"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Accordion({ items, className = "" }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className="glass-card overflow-hidden"
        >
          <button
            onClick={() =>
              setOpenId(openId === item.id ? null : item.id)
            }
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-glass-bg-hover transition-colors"
          >
            <div className="flex items-center gap-4">
              {item.number !== undefined && (
                <span className="font-mono text-sm font-bold text-accent-primary">
                  {item.number}
                </span>
              )}
              <span className="font-mono font-semibold text-ink">
                {item.title}
              </span>
            </div>
            <motion.svg
              animate={{ rotate: openId === item.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 text-accent-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
          </button>
          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 border-t border-glass-border text-graphite">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
