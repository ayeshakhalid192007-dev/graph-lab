"use client";

const styles = `
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
  filter: blur(80px);
  opacity: 0.2;
  z-index: -1;
  animation: glowFloat 25s ease-in-out infinite;
}

.premium-glow-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(245, 197, 24, 0.15), transparent 70%);
  top: -150px;
  left: -100px;
}

.premium-glow-2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(58, 211, 122, 0.1), transparent 70%);
  bottom: -200px;
  right: -150px;
  animation-delay: -8s;
}

.premium-glow-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(245, 197, 24, 0.08), transparent 70%);
  top: 35%;
  right: 25%;
  animation-delay: -15s;
}

:root .premium-glow-1 {
  background: radial-gradient(circle, rgba(212, 160, 23, 0.1), transparent 70%);
}

:root .premium-glow-2 {
  background: radial-gradient(circle, rgba(26, 157, 92, 0.07), transparent 70%);
}

:root .premium-glow-3 {
  background: radial-gradient(circle, rgba(212, 160, 23, 0.06), transparent 70%);
}

@media (prefers-reduced-motion: reduce) {
  .premium-glow {
    animation: none !important;
    opacity: 0.1 !important;
  }
}

@media (max-width: 768px) {
  .premium-glow {
    opacity: 0.12 !important;
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
`;

export function AnimatedBackground() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="premium-glow premium-glow-1" aria-hidden="true" />
      <div className="premium-glow premium-glow-2" aria-hidden="true" />
      <div className="premium-glow premium-glow-3" aria-hidden="true" />
    </>
  );
}
