// src/pages/GuideReader.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadGuide } from "../utils/loadGuides";
import { MDXProvider } from "@mdx-js/react";

export default function GuideReader() {
  const { slug } = useParams();
  const [guide, setGuide] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGuide(slug)
      .then(setGuide)
      .catch(() => setError("Guide not found"));
  }, [slug]);

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!guide) return <div className="text-center mt-10">Loading...</div>;

  const Content = guide.default;

  return (
    <div className="prose prose-lg mx-auto px-4 py-8">
      <MDXProvider>
        <Content />
      </MDXProvider>

      <div className="mt-12 text-center">
        <Link
          to="/guides"
          className="inline-block text-indigo-600 hover:underline text-sm"
        >
          ← Back to Guides
        </Link>
      </div>
    </div>
  );
}
