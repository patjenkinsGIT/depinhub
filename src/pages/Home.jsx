import { useState } from "react";

const projects = [
  {
    name: "Helium",
    category: "IoT / Wireless",
    difficulty: "Medium",
    estimatedROI: "Varies by location",
    affiliateLinks: {
      buyHardware: "https://example.com/helium-hardware",
      getCrypto: "https://example.com/helium-crypto",
    },
  },
  {
    name: "Dabba",
    category: "Decentralized ISP",
    difficulty: "Advanced",
    estimatedROI: "Potentially high in underserved areas",
    affiliateLinks: {
      buyHardware: "https://example.com/dabba-hardware",
      getCrypto: "https://example.com/dabba-crypto",
    },
  },
];

export default function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Name A–Z");
  const [submitted, setSubmitted] = useState(false);

  const difficulties = ["All", "Beginner", "Medium", "Advanced"];
  const categories = ["All", "IoT / Wireless", "Decentralized ISP"];

  const filteredProjects = projects
    .filter(
      (project) =>
        selectedDifficulty === "All" ||
        project.difficulty === selectedDifficulty
    )
    .filter(
      (project) =>
        selectedCategory === "All" || project.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortOption === "Name A–Z") return a.name.localeCompare(b.name);
      if (sortOption === "Name Z–A") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Explore Top DePIN Projects</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <label className="mr-2 font-medium">Difficulty:</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {difficulties.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option>Name A–Z</option>
            <option>Name Z–A</option>
          </select>
        </div>
      </div>

      {/* Email Signup */}
      <div className="bg-white shadow rounded-lg p-6 mb-8 text-center">
        <h2 className="text-xl font-semibold mb-2">
          Stay Updated on Top DePIN Projects
        </h2>
        <p className="text-gray-600 mb-4">
          Sign up to receive alerts, guides, and ROI updates directly to your
          inbox.
        </p>
        <form
          action="https://formspree.io/f/xnnzpebe" // <-- Replace with your Formspree ID
          method="POST"
          onSubmit={() => setSubmitted(true)}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="px-4 py-2 w-full sm:w-auto rounded border border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Subscribe
          </button>
        </form>
        {submitted && (
          <p className="text-green-600 mt-4">✅ Thank you for subscribing!</p>
        )}
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.name}
            className="border rounded-lg p-6 shadow bg-white"
          >
            <h2 className="text-xl font-bold mb-2">{project.name}</h2>
            <p className="text-gray-700 mb-1">
              <strong>Category:</strong> {project.category}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Difficulty:</strong> {project.difficulty}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Estimated ROI:</strong> {project.estimatedROI}
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href={project.affiliateLinks.buyHardware}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Buy Hardware
              </a>
              <a
                href={project.affiliateLinks.getCrypto}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Get Crypto
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
