"use client";
import { useState } from "react";
import { TRACKS } from "@/lib/tracks.js";
import { Panel } from "@/components/ui/Panel";
import { PillButton } from "@/components/ui/PillButton";

export function TrackSelector() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {TRACKS.map((track) => {
        const open = selected === track.id;
        return (
          <Panel
            key={track.id}
            className={open ? "border-accent-primary/30" : ""}
          >
            <button
              type="button"
              aria-pressed={open}
              aria-expanded={open}
              aria-controls={`track-${track.id}`}
              onClick={() => setSelected(open ? null : track.id)}
              className="w-full text-left"
            >
              <span className="mono text-xs tracking-widest text-muted">
                {track.id} · {track.level.toUpperCase()}
              </span>
              <span className="mono mt-1 block text-lg text-ink">
                {track.name}
              </span>
              <span className="mt-2 block text-sm text-graphite">
                {track.covers}
              </span>
            </button>

            <div
              id={`track-${track.id}`}
              hidden={!open}
              className="mt-4 border-t border-glass-border pt-4"
            >
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="mono text-xs uppercase tracking-wider text-muted">
                    You start knowing
                  </dt>
                  <dd className="mt-1 text-graphite">
                    {track.startsKnowing}
                  </dd>
                </div>
                <div>
                  <dt className="mono text-xs uppercase tracking-wider text-muted">
                    You finish able to
                  </dt>
                  <dd className="mt-1 text-graphite">
                    {track.finishesAbleTo}
                  </dd>
                </div>
              </dl>
              <div className="mt-4">
                <PillButton href={track.firstStepRoute} variant="outline">
                  Start {track.id}
                </PillButton>
              </div>
            </div>
          </Panel>
        );
      })}
    </div>
  );
}
