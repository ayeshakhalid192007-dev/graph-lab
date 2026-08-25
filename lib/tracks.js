/**
 * The four skill tracks, from graph-plan.md §12.1.
 *
 * firstStepRoute must be a route getAllDocs() actually returns — a track card
 * linking to a 404 is worse than no card. Task 10 Step 5 asserts all four resolve,
 * and check-links.mjs catches it again against the emitted export.
 */
export const TRACKS = [
    {
        id: "G1",
        name: "Foundations",
        level: "Beginner",
        startsKnowing: "Loop Engineering — heartbeat, spine, maker/checker",
        finishesAbleTo: "explain why one memory file stops working past one loop; tell the two graphs apart",
        covers: "Prerequisites, Foundations, Part 1",
        firstStepRoute: "/docs/01-prerequisites/",
    },
    {
        id: "G2",
        name: "Practitioner",
        level: "Intermediate",
        startsKnowing: "the two-graph split",
        finishesAbleTo: "run a fact through extraction → resolution → provenance; build a subgraph and a grounded checker",
        covers: "Parts 2–4, Projects 2–6",
        firstStepRoute: "/docs/04-part-2-the-dag-of-work/",
    },
    {
        id: "G3",
        name: "Engineer",
        level: "Advanced",
        startsKnowing: "how to build and read one graph",
        finishesAbleTo: "wire multiple loops into a governance graph; name and fix the four failure modes",
        covers: "Part 5, Projects 7–8, the pattern library",
        firstStepRoute: "/docs/07-part-5-the-graph-of-loops/",
    },
    {
        id: "G4",
        name: "Ultra-Pro",
        level: "Expert",
        startsKnowing: "how to ship one graph",
        finishesAbleTo: "decide when not to build one; run graphs at scale; author new patterns",
        covers: "Parts 6–7, advanced tier, certification",
        firstStepRoute: "/docs/08-part-6-one-graph-end-to-end/",
    },
];
