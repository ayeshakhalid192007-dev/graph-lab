'use client';

export function AnimatedBackground() {
  return (
    <>
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          25% { transform: translate(20px, -30px) scale(1.1); opacity: 0.6; }
          50% { transform: translate(-10px, 20px) scale(0.9); opacity: 0.4; }
          75% { transform: translate(-30px, -10px) scale(1.05); opacity: 0.5; }
        }

        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(-25px, 25px) scale(1.08); opacity: 0.5; }
          66% { transform: translate(15px, -20px) scale(0.95); opacity: 0.35; }
        }

        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
          40% { transform: translate(30px, 15px) scale(1.05); opacity: 0.5; }
          80% { transform: translate(-20px, -25px) scale(0.9); opacity: 0.3; }
        }

        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(65, 105, 225, 0.2)); }
          50% { filter: drop-shadow(0 0 8px rgba(65, 105, 225, 0.4)); }
        }

        .animated-node {
          position: fixed;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(1px);
        }

        .node-1 {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle at 30% 30%, rgba(65, 105, 225, 0.6), rgba(65, 105, 225, 0.1));
          top: 5%;
          left: 10%;
          animation: float1 15s ease-in-out infinite;
        }

        .node-2 {
          width: 120px;
          height: 120px;
          background: radial-gradient(circle at 40% 40%, rgba(212, 175, 55, 0.4), rgba(212, 175, 55, 0.05));
          top: 60%;
          right: 5%;
          animation: float2 20s ease-in-out infinite;
        }

        .node-3 {
          width: 100px;
          height: 100px;
          background: radial-gradient(circle at 35% 35%, rgba(65, 105, 225, 0.5), rgba(65, 105, 225, 0.05));
          bottom: 10%;
          left: 5%;
          animation: float3 18s ease-in-out infinite;
        }

        .node-4 {
          width: 90px;
          height: 90px;
          background: radial-gradient(circle at 30% 30%, rgba(226, 232, 240, 0.3), rgba(226, 232, 240, 0.02));
          top: 25%;
          right: 15%;
          animation: float1 16s ease-in-out infinite reverse;
        }

        @media (prefers-reduced-motion: reduce) {
          .animated-node {
            animation: none !important;
            opacity: 0.2 !important;
          }
        }

        @media (max-width: 768px) {
          .animated-node {
            opacity: 0.3 !important;
          }
          .node-1 { width: 60px; height: 60px; }
          .node-2 { width: 80px; height: 80px; }
          .node-3 { width: 70px; height: 70px; }
          .node-4 { width: 65px; height: 65px; }
        }
      `}</style>

      <div className="animated-node node-1" aria-hidden="true" />
      <div className="animated-node node-2" aria-hidden="true" />
      <div className="animated-node node-3" aria-hidden="true" />
      <div className="animated-node node-4" aria-hidden="true" />
    </>
  );
}
