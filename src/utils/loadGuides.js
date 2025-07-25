// src/utils/loadGuides.js
const guideMap = import.meta.glob("../guides/*.mdx");

export async function loadGuide(slug) {
  const match = Object.entries(guideMap).find(([path]) =>
    path.includes(`${slug}.mdx`)
  );

  if (!match) throw new Error(`Guide not found: ${slug}`);

  const module = await match[1]();
  return {
    default: module.default,
    meta: module.meta || {},
  };
}
