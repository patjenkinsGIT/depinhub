import { Link } from "react-router-dom";

const guideFiles = import.meta.glob("../guides/*.mdx", { eager: true });

function getSlug(path) {
  return path.split("/").pop().replace(".mdx", "");
}

export default function GuidesIndex() {
  const guides = Object.entries(guideFiles).map(([path, module]) => {
    const slug = getSlug(path);
    const metadata = module.metadata || {};

    return {
      slug,
      title: metadata.title || slug.replace(/-/g, " "),
      description: metadata.description || "",
    };
  });

  return (
    <div className="max-w-screen-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">DePINHub Guides</h1>
      <ul className="space-y-6">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              to={`/guides/${guide.slug}`}
              className="text-xl font-semibold text-indigo-600 hover:underline"
            >
              {guide.title}
            </Link>
            {guide.description && (
              <p className="text-gray-600 text-sm">{guide.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
