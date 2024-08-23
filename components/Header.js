// components/Header.js
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">WalletWise</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">Contact Us</Link>
            </li>
            <li>
              <Link href="/company" className="hover:text-gray-300">Company</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
