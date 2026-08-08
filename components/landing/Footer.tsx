import { getSource } from "@/lib/content.ts";

/**
 * The provenance line is the point of this footer.
 *
 * content/ is pinned to one commit, so the site can lag the course repo's main.
 * The spec's risk section asks for that gap to be visible rather than hidden, so
 * the sha and sync date are printed where every page carries them.
 */
export function Footer() {
  const { repo, commit, syncedAt } = getSource();
  const synced = new Date(syncedAt).toISOString().slice(0, 10);

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-8 sm:px-8">
        <a
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mono text-xs text-graphite hover:text-accent"
        >
          {repo}
        </a>
        <span className="mono text-xs text-muted">MIT</span>
        <p className="mono ml-auto text-xs text-muted">
          Content synced from{" "}
          <a
            href={`https://github.com/${repo}/tree/${commit}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-graphite hover:text-accent"
          >
            {commit.slice(0, 8)}
          </a>{" "}
          on {synced}
        </p>
      </div>
    </footer>
  );
}
