"use client";
import { useId, useRef, useState } from "react";

const LIGHT = {
  paper: "#f7f5f0",
  ink: "#16324f",
  graphite: "#3d4450",
  muted: "#6b7280",
  rule: "#cfc9bd",
  accent: "#1d4ed8",
  dot: "#d6d0c4",
};
const W = 1600;
const H = 1200;
const MONO =
  '"SF Mono", "Cascadia Code", "JetBrains Mono", ui-monospace, monospace';

function drawCertificate(ctx, name, criteria, date) {
  ctx.fillStyle = LIGHT.paper;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = LIGHT.dot;
  for (let y = 24; y < H; y += 24) {
    for (let x = 24; x < W; x += 24) {
      ctx.fillRect(x, y, 2, 2);
    }
  }

  const m = 64;
  ctx.strokeStyle = LIGHT.rule;
  ctx.lineWidth = 2;
  ctx.strokeRect(m, m, W - m * 2, H - m * 2);

  ctx.strokeStyle = LIGHT.accent;
  ctx.lineWidth = 4;
  const t = 40;
  for (const [x, y, dx, dy] of [
    [m, m, 1, 1],
    [W - m, m, -1, 1],
    [m, H - m, 1, -1],
    [W - m, H - m, -1, -1],
  ]) {
    ctx.beginPath();
    ctx.moveTo(x + dx * t, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + dy * t);
    ctx.stroke();
  }

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = LIGHT.muted;
  ctx.font = `28px ${MONO}`;
  ctx.fillText("GRAPH ENGINEERING", 140, 210);

  ctx.fillStyle = LIGHT.ink;
  ctx.font = `bold 132px ${MONO}`;
  ctx.fillText("GRAPH READY", 140, 340);

  ctx.strokeStyle = LIGHT.rule;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(140, 400);
  ctx.lineTo(W - 140, 400);
  ctx.stroke();

  ctx.fillStyle = LIGHT.muted;
  ctx.font = `26px ${MONO}`;
  ctx.fillText("AWARDED TO", 140, 470);

  ctx.fillStyle = LIGHT.ink;
  ctx.font = `76px ${MONO}`;
  ctx.fillText(name, 140, 560);

  ctx.fillStyle = LIGHT.muted;
  ctx.font = `26px ${MONO}`;
  ctx.fillText("ALL SEVEN CRITERIA MET", 140, 660);

  ctx.font = `24px ${MONO}`;
  criteria.forEach((item, i) => {
    const y = 710 + i * 44;
    ctx.fillStyle = LIGHT.accent;
    ctx.fillText("✓", 140, y);
    ctx.fillStyle = LIGHT.graphite;
    ctx.fillText(`${i + 1}. ${item}`, 190, y);
  });

  ctx.fillStyle = LIGHT.muted;
  ctx.font = `24px ${MONO}`;
  ctx.fillText(date, 140, H - 130);

  const issuer = "Self-certified · graph-lab";
  ctx.fillText(
    issuer,
    W - 140 - ctx.measureText(issuer).width,
    H - 130
  );
}

export function CertificateGenerator({ criteria }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(null);
  const canvasRef = useRef(null);
  const inputId = useId();
  const hintId = useId();
  const trimmed = name.trim();

  function download() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      setStatus(
        "This browser could not create the certificate image."
      );
      return;
    }
    const date = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    drawCertificate(ctx, trimmed, criteria, date);
    const file = `graph-ready-${trimmed
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "certificate"}.png`;
    canvas.toBlob((blob) => {
      if (!blob) {
        setStatus(
          "This browser could not create the certificate image."
        );
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file;
      a.click();
      URL.revokeObjectURL(url);
      setStatus(`Downloaded ${file}`);
    }, "image/png");
  }

  return (
    <div className="glass-card p-6 border-accent-primary/30">
      <p className="mono text-sm text-accent-primary">
        SEVEN OF SEVEN · CERTIFICATE UNLOCKED
      </p>

      <label
        htmlFor={inputId}
        className="mono mt-4 block text-xs uppercase tracking-wider text-muted"
      >
        Name on the certificate
      </label>
      <input
        id={inputId}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
        className="mono mt-2 w-full max-w-md glass rounded-xl border border-glass-border bg-transparent px-3 py-2 text-sm text-ink"
      />
      <p id={hintId} className="mt-2 text-xs text-muted">
        Typed in here and drawn straight onto the image — no account, and
        nothing leaves this browser.
      </p>

      <button
        type="button"
        onClick={download}
        disabled={trimmed.length === 0}
        aria-describedby={hintId}
        className="mono mt-4 bg-accent-primary px-4 py-2 text-sm text-paper rounded-xl disabled:cursor-not-allowed disabled:opacity-40 hover:bg-accent-secondary transition-colors"
      >
        Download certificate
      </button>
      {trimmed.length === 0 && (
        <p className="mono mt-2 text-xs text-muted">
          Enter a name to enable the download.
        </p>
      )}

      <p className="mono mt-3 text-xs text-graphite" role="status">
        {status}
      </p>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] top-0"
      />
    </div>
  );
}
