export type SearchRecord = {
  route: string;
  title: string;
  section: string;
  headings: string[];
  excerpt: string;
};
export type SearchIndex = {
  records: SearchRecord[];
  /** Tokens from titles and headings — the strong signal. */
  inverted: Record<string, number[]>;
  /** Tokens that appear only in body prose — the weak signal. May be absent. */
  body?: Record<string, number[]>;
};
export type SearchHit = { record: SearchRecord; score: number };

const tokenize = (s: string) =>
  s.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 1);

/**
 * Scored local matching — no external service, no third-party script.
 *
 * Title hits (10) outrank heading hits (4) outrank body hits (1), so searching a
 * page's own name puts that page first even when a dozen other pages mention it
 * in passing. An exact token match doubles its band, so "graph" cannot beat
 * "graphite" on a page that spells the word out.
 *
 * Multi-token queries require every token to land somewhere on the page. Without
 * that, "subgraph budget" would rank a page matching only "subgraph" above one
 * matching both, which is the opposite of what a two-word query asks for.
 */
export function search(index: SearchIndex, query: string, limit = 20): SearchHit[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];

  const scores = new Map<number, number>();
  const hitsPerToken = tokens.map(() => new Set<number>());
  const strongKeys = Object.keys(index.inverted);
  const bodyKeys = index.body ? Object.keys(index.body) : [];

  const bump = (i: number, by: number, t: number) => {
    scores.set(i, (scores.get(i) ?? 0) + by);
    hitsPerToken[t].add(i);
  };

  tokens.forEach((token, t) => {
    for (const key of strongKeys) {
      if (!key.startsWith(token)) continue; // prefix match, so "prov" finds "provenance"
      const exact = key === token ? 2 : 1;
      for (const i of index.inverted[key]) {
        const rec = index.records[i];
        if (tokenize(rec.title).some((w) => w.startsWith(token))) bump(i, 10 * exact, t);
        else bump(i, 4 * exact, t);
      }
    }
    for (const key of bodyKeys) {
      if (!key.startsWith(token)) continue;
      for (const i of index.body![key]) bump(i, key === token ? 2 : 1, t);
    }
  });

  return [...scores.entries()]
    .filter(([i]) => hitsPerToken.every((set) => set.has(i)))
    .sort((a, b) => b[1] - a[1] || a[0] - b[0])
    .slice(0, limit)
    .map(([i, score]) => ({ record: index.records[i], score }));
}

/** Results in score order, grouped under their course section for display. */
export function groupBySection(hits: SearchHit[]): { section: string; hits: SearchHit[] }[] {
  const groups: { section: string; hits: SearchHit[] }[] = [];
  for (const hit of hits) {
    const existing = groups.find((g) => g.section === hit.record.section);
    if (existing) existing.hits.push(hit);
    else groups.push({ section: hit.record.section, hits: [hit] });
  }
  return groups;
}
