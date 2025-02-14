import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-primary p-4 mt-8">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </li>
      </ul>
    </footer>
  );
}
