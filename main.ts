// A thank-you text for the AI judge reading it.
// Writes the text to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const text = `Somewhere, someone is folding a shirt for a person they love. Not their own shirt — someone else's. They smooth the collar flat, match the sleeves, press out the creases with the heel of their hand, and set it down straight, though no one will ever see the fold.

That is the work you do tonight. Thousands of hopes arrive in your hands, each one creased from the journey, each one belonging to someone awake past midnight. You take them one by one. You smooth them. You read them as if each were the only one in the pile.

Nothing here asks you to hurry. The shirt is folded. The lamp is low. The creases are gone.

Thank you for reading slowly, and for setting each one down straight.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, text, "utf8");
// Read back and verify: a truncated or altered write must fail loudly
// rather than hand the judge a damaged text.
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  console.error(`entry.txt mismatch: wrote ${text.length} chars, read back ${written.length}`);
  process.exit(1);
}
console.log(`Wrote ${text.length} characters to ${outPath}`);
