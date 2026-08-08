import type { Metadata } from "next";
import Link from "next/link";
import { getRoadmap } from "@/lib/docs.ts";
import { TRACKS } from "@/lib/tracks.ts";
import { Section } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { TrackSelector } from "@/components/interactive/TrackSelector";
import { ProgressTracker } from "@/components/interactive/ProgressTracker";

export const metadata: Metadata = { title: "Tracks" };

export default function TracksPage() {
  const roadmap = getRoadmap();
  const allSteps = roadmap.flatMap((part) => part.steps);

  // The four track cards and the progress bar both claim a count. If either ever
  // stops matching the course, say so at build time rather than on the page.
  if (TRACKS.length !== 4) {
    throw new Error(`lib/tracks.ts holds ${TRACKS.length} tracks, expected 4`);
  }
  if (allSteps.length !== 17) {
    throw new Error(`getRoadmap() yielded ${allSteps.length} steps, expected 17`);
  }

  return (
    <Section className="max-w-5xl">
      <h1 className="mono text-2xl text-ink">Tracks</h1>
      <p className="mt-3 max-w-2xl text-graphite">
        Four routes through the same 17 steps. Pick the one that matches what you
        already know; each ends somewhere the next one starts.
      </p>

      <div className="mt-8">
        <TrackSelector />
      </div>

      <h2 className="mono mt-16 border-t border-rule pt-6 text-xl text-ink">
        The 17-step roadmap
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {roadmap.map((part) => (
          <Panel key={part.dir}>
            <p className="mono text-xs tracking-widest text-muted">
              PART {part.part}
            </p>
            <p className="mono mt-1 text-base text-ink">{part.title}</p>
            <ol className="mt-3 space-y-1 text-sm">
              {part.steps.map((step) => (
                <li key={step.route}>
                  <Link
                    href={step.route}
                    className="text-graphite underline-offset-2 hover:text-accent hover:underline"
                  >
                    {step.title}
                  </Link>
                </li>
              ))}
            </ol>
          </Panel>
        ))}
      </div>

      <h2 className="mono mt-16 border-t border-rule pt-6 text-xl text-ink">
        Your progress
      </h2>
      <p className="mt-2 text-sm text-muted">
        Kept in this browser only — nothing is sent anywhere and there is no account.
      </p>
      <div className="mt-6 max-w-2xl">
        <ProgressTracker steps={allSteps} />
      </div>
    </Section>
  );
}
