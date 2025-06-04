export default function Navbar() {
  return (
    <nav className="bg-white text-black font-semibold px-6 py-4 flex justify-between items-center">
      <ul>
        <li className="flex space-x-20">
          <a href="/">Lovely Home</a>
        </li>
      </ul>
      <ul>
        <li className="flex space-x-20">
          <a href="/products">Management</a>
          <a href="/finance">Finance</a>
        </li>
      </ul>
    </nav>
  );
}
