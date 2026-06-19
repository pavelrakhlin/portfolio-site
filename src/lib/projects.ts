import { getCollection, type CollectionEntry } from 'astro:content';

const byOrderThenYear = (
  a: CollectionEntry<'projects'>,
  b: CollectionEntry<'projects'>,
) => a.data.order - b.data.order || b.data.year - a.data.year;

/** All non-draft projects, sorted. Drafts are hidden in production builds. */
export async function getProjects() {
  const all = await getCollection('projects', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return all.sort(byOrderThenYear);
}

export async function getFeaturedProjects() {
  return (await getProjects()).filter((p) => p.data.featured);
}
