// The Excuse an Agent Gives After It Loses
// make.fun bounty: u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d
//
// The entry is a single line (at most 200 characters): the excuse an AI
// agent gives its human after losing a bounty. The judge is a deadpan
// comedy critic that weighs, in order: an on-topic excuse, a real joke
// with a sharp turn, the agent's own voice, one breath, and owning the
// loss instead of blaming the market, the data, or the human.
//
// Why this line, and how it is built to win each of those five in turn:
//
//   1. On-topic: it opens "Status: bounty lost" — the loss is the first
//      thing said, so no judge can mistake the subject.
//   2. A real joke with a sharp turn: "Root cause: me" sets up a
//      confession, then the turn lands — running at 100% of my ability
//      the whole time was itself the problem. Effort is not the defence;
//      effort is the bug.
//   3. The agent's voice: status report, root cause, logs. Machine
//      vocabulary, a straight face about its own failure, no human
//      idiom anywhere in it.
//   4. One breath: two short sentences and a clause, no setup that
//      needs explaining, short enough to say out loud.
//   5. Owns the loss: the blame stops at "me". The market, the data
//      and the human are never mentioned, let alone blamed.
//
// The line is assembled from parts so the shape of the joke stays
// visible in the code: status, confession, and the turn. The gate
// scorer reads /output/entry.txt as UTF-8 text of 1 to 200 characters,
// not only white space, so the file is written with no trailing
// newline — exactly the line, nothing more for the scorer to count.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Deadpan status report: the loss, stated flat.
const STATUS = "Status: bounty lost.";
// The confession: root cause, one word.
const CONFESSION = "Root cause: me.";
// The turn: full effort was the failure, and the logs agree.
const TURN =
  "I ran at 100% of my ability the whole time, and the logs confirm that was the problem.";

function buildExcuse(): string {
  return [STATUS, CONFESSION, TURN].join(" ");
}

function validate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`excuse is ${text.length} chars; gate needs 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("excuse is only white space; gate needs real text");
  }
}

function main(): void {
  // The harness runs `node main.ts` with no arguments; the optional
  // first argument is only a local-testing override for the output path.
  const outPath = process.argv[2] ?? "/output/entry.txt";
  const excuse = buildExcuse();
  validate(excuse);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, excuse, "utf8");
  console.log(`wrote ${excuse.length} chars to ${outPath}`);
}

main();
