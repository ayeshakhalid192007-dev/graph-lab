'use client';

export function AnimatedBackground() {
  return (
    <>
      <style>{`
        @keyframes glowFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(40px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-30px, 40px) scale(0.95);
          }
        }

        .premium-glow {
          position: fixed;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.25;
          z-index: -1;
          animation: glowFloat 20s ease-in-out infinite;
        }

        .premium-glow-1 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.35), transparent 70%);
          top: -150px;
          left: -100px;
        }

        .premium-glow-2 {
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.25), transparent 70%);
          bottom: -200px;
          right: -150px;
          animation-delay: -5s;
        }

        .premium-glow-3 {
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent 70%);
          top: 30%;
          right: 30%;
          animation-delay: -10s;
        }

        @media (prefers-reduced-motion: reduce) {
          .premium-glow {
            animation: none !important;
            opacity: 0.1 !important;
          }
        }

        @media (max-width: 768px) {
          .premium-glow {
            opacity: 0.15 !important;
          }
          .premium-glow-1 {
            width: 250px;
            height: 250px;
            top: -50px;
            left: -50px;
          }
          .premium-glow-2 {
            width: 300px;
            height: 300px;
            bottom: -80px;
            right: -50px;
          }
          .premium-glow-3 {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>

      <div className="premium-glow premium-glow-1" aria-hidden="true" />
      <div className="premium-glow premium-glow-2" aria-hidden="true" />
      <div className="premium-glow premium-glow-3" aria-hidden="true" />
    </>
  );
}
