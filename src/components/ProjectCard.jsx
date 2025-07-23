export default function ProjectCard({ project }) {
  return (
    <div className="bg-white shadow p-5 rounded border border-gray-200 hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{project.name}</h2>
      <p className="text-gray-600 mb-1">Category: {project.category}</p>
      <p className="text-gray-600 mb-1">Difficulty: {project.difficulty}</p>
      <p className="text-gray-600 mb-3">Estimated ROI: {project.roi}</p>

      <div className="flex gap-3 mt-2 flex-wrap">
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
  );
}
