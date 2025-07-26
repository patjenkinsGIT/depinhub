import { useLocation, Link } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isOnGuidesIndex = location.pathname === "/guides";

  return (
    <footer className="bg-black text-white text-center py-6 mt-10">
      <p className="text-lg font-medium opacity-60">
        © {new Date().getFullYear()} DePINHub
      </p>
      <p className="text-base opacity-50 mt-1">
        Your gateway to decentralized infrastructure.
      </p>
    </footer>
  );
}
