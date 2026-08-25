const SECTION = /^## (\d+)\.\s+(.+)$/gm;
const DETAILS = /<details>\s*<summary>\s*Reveal the answer\s*<\/summary>([\s\S]*?)<\/details>/;
/**
 * Splits a quiz.md into its numbered questions.
 *
 * Everything between a `## N. Title` heading and its <details> block is the
 * question; the <details> body is the answer. A section with no <details> is a
 * parse failure, not an empty question — check-content-shape.mjs fails the build
 * on it rather than shipping a quiz that silently stops after item two.
 */
export function parseQuiz(body) {
    const starts = [...body.matchAll(SECTION)];
    return starts.map((match, i) => {
        const from = match.index + match[0].length;
        const to = i + 1 < starts.length ? starts[i + 1].index : body.length;
        const block = body.slice(from, to);
        const details = block.match(DETAILS);
        if (!details) {
            throw new Error(`Quiz section "${match[2]}" has no <details>…</details> answer block`);
        }
        return {
            n: Number(match[1]),
            title: match[2].trim(),
            question: block.slice(0, details.index).trim(),
            answer: details[1].trim(),
        };
    });
}
/**
 * Reads the single `| Term | Definition |` table out of a flashcards.md.
 *
 * Term cells are bold in the source (`**Node**`); the asterisks are markup, not
 * part of the term, so they are stripped here rather than in the component.
 */
export function parseFlashcards(body) {
    const cards = [];
    for (const line of body.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("|") || !trimmed.endsWith("|"))
            continue;
        const cells = trimmed.slice(1, -1).split("|").map((c) => c.trim());
        if (cells.length !== 2)
            continue;
        if (/^-+$/.test(cells[0].replace(/[\s:]/g, "")))
            continue; // separator row
        if (cells[0] === "Term" && cells[1] === "Definition")
            continue; // header row
        const term = cells[0].replace(/^\*\*|\*\*$/g, "").trim();
        if (!term || !cells[1])
            continue;
        cards.push({ term, definition: cells[1] });
    }
    return cards;
}
