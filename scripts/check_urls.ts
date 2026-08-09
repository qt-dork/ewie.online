const SITE_DIR = "_site";
const SNAPSHOT = "scripts/data/urls.json";
const UPDATE = Deno.args.includes("--update");

function toUrl(path: string): string {
  const pretty = "/" + path.replace(/\\/g, "/");
  if (pretty.endsWith("/index.html")) {
    return pretty.slice(0, -"index.html".length);
  }
  return pretty;
}

async function collectUrls() {
  const urls = new Set<string>();
  async function walk(dir: string) {
    for await (const entry of Deno.readDir(dir)) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory) await walk(path);
        else if (entry.name.endsWith(".html")) {
          urls.add(toUrl(path.slice(SITE_DIR.length + 1)))
        }
    }
  }
  await walk(SITE_DIR);
  return [...urls].sort();
}

const current = await collectUrls();

let snapshot: string[] = [];
try {
  snapshot = JSON.parse(await Deno.readTextFile(SNAPSHOT));
} catch {
  await Deno.writeTextFile(SNAPSHOT, JSON.stringify(current, null, 2) + "\n");
  console.log(`No snapshot found. Wrote ${current.length} urls to ${SNAPSHOT}.`)
  Deno.exit(0);
}

const removed = snapshot.filter((url) => !current.includes(url));
const added = current.filter((url) => !snapshot.includes(url));

if (UPDATE) {
  await Deno.writeTextFile(SNAPSHOT, JSON.stringify(current, null, 2) + "\n");
  console.log(`Updated snapshot with ${current.length} urls.`);
  Deno.exit(0);
}

for (const url of added) {
  console.log(`Added ${url}`);
}

if (removed.length > 0) {
  console.error(`\nERROR: ${removed.length} urls removed or changed:`);
  for (const url of removed) console.error(`  - ${url}`);
  console.error(
    "\nIf this is unintended, please fix this to avoid dead links. Otherwise, run `deno task update-urls` to update the snapshot."
  );
  Deno.exit(1);
}
