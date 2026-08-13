import type Site from "lume/core/site.ts";

/**
 * Plugin that provides a unique hash from an input string.
 */
export function hash() {
  // No options but leaving this here in case I later want options
  // const options = { ...defaults, ...userOptions };

  return (site: Site) => {
    site.filter("hash", (value: string) => {
      const cyrb53 = (str: string, seed = 0) => {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
          ch = str.charCodeAt(i);
          h1 = Math.imul(h1 ^ ch, 2654435761);
          h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
        h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
        h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
      };
      return cyrb53(value).toString(16);
    });
  };
}

export default hash;
