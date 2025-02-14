import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-secondary text-primary p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/heroes" className="hover:text-white transition-colors">
            Heroes
          </Link>
        </li>
        <li>
          <Link href="/units" className="hover:text-white transition-colors">
            Units
          </Link>
        </li>
        <li>
          <Link
            href="/unit-counters"
            className="hover:text-white transition-colors"
          >
            Unit Counters
          </Link>
        </li>
      </ul>
    </nav>
  );
}
