import Link from "next/link";
import { getRoadmap } from "@/lib/docs.js";
import { TRACKS } from "@/lib/tracks.js";
import { Section } from "@/components/ui/Section";
import { TrackSelector } from "@/components/interactive/TrackSelector";
import { ProgressTracker } from "@/components/interactive/ProgressTracker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export const metadata = { title: "Tracks" };

export default function TracksPage() {
  const roadmap = getRoadmap();
  const allSteps = roadmap.flatMap((part) => part.steps);

  if (TRACKS.length !== 4) {
    throw new Error(
      `lib/tracks.js holds ${TRACKS.length} tracks, expected 4`
    );
  }
  if (allSteps.length !== 17) {
    throw new Error(
      `getRoadmap() yielded ${allSteps.length} steps, expected 17`
    );
  }

  return (
    <Section className="max-w-5xl">
      <SectionHeading
        eyebrow="Learning Routes"
        title="Tracks"
        description="Four routes through the same 17 steps. Pick the one that matches what you already know; each ends somewhere the next one starts."
        align="left"
      />

      <FadeIn delay={0.1}>
        <div className="mt-8">
          <TrackSelector />
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h2 className="mono mt-16 border-t border-rule-strong pt-6 text-xl text-ink">
          The 17-step roadmap
        </h2>
      </FadeIn>

      <Stagger className="mt-6 grid gap-4 md:grid-cols-2" staggerDelay={0.06}>
        {roadmap.map((part) => (
          <StaggerItem key={part.dir}>
            <div className="glass-card h-full">
              <p className="mono text-xs tracking-widest text-muted">
                PART {part.part}
              </p>
              <p className="mono mt-1 text-base text-ink">{part.title}</p>
              <ol className="mt-3 space-y-1 text-sm">
                {part.steps.map((step) => (
                  <li key={step.route}>
                    <Link
                      href={step.route}
                      className="text-graphite underline-offset-2 hover:text-accent-primary hover:underline transition-colors"
                    >
                      {step.title}
                    </Link>
                  </li>
                ))}
              </ol>
              <p className="mono mt-3 border-t border-rule-strong pt-2 text-xs text-muted">
                <Link
                  href={`/quiz/${part.part}/`}
                  className="hover:text-accent-primary transition-colors"
                >
                  quiz
                </Link>
                {part.part !== 6 && (
                  <>
                    {" · "}
                    <Link
                      href={`/flashcards/${part.part}/`}
                      className="hover:text-accent-primary transition-colors"
                    >
                      flashcards
                    </Link>
                  </>
                )}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <FadeIn delay={0.3}>
        <h2 className="mono mt-16 border-t border-rule-strong pt-6 text-xl text-ink">
          Your progress
        </h2>
        <p className="mt-2 text-sm text-muted">
          Kept in this browser only — nothing is sent anywhere and there is no
          account.
        </p>
        <div className="mt-6 max-w-2xl">
          <ProgressTracker steps={allSteps} />
        </div>
      </FadeIn>
    </Section>
  );
}
