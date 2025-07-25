import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="bg-indigo-700 text-white py-4 px-6 flex justify-between items-center">
      <Link
        to="/"
        className="flex items-center space-x-2 hover:text-indigo-200 transition-colors"
      >
        <img src={Logo} alt="DePINHub Logo" className="h-8 w-8" />
        <span className="text-2xl font-extrabold tracking-tight">
          DePINHub.net
        </span>
      </Link>
      <nav className="space-x-6 text-base font-medium">
        <Link to="/" className="hover:underline hover:text-indigo-200">
          Home
        </Link>
        <Link to="/guides" className="hover:underline hover:text-indigo-200">
          Guides
        </Link>
        <Link to="/intro" className="hover:underline hover:text-indigo-200">
          What is DePIN?
        </Link>
      </nav>
    </header>
  );
}
