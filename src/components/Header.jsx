export default function Header() {
  return (
    <header className="bg-indigo-700 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">DePINHub.net</h1>
        <nav>
          <a href="/" className="ml-4 hover:underline">
            Home
          </a>
          <a href="/intro" className="ml-4 hover:underline">
            What is DePIN?
          </a>
        </nav>
      </div>
    </header>
  );
}
