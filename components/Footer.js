// components/Footer.js
export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white mt-10">
        <div className="container mx-auto py-4 text-center">
          <p>&copy; {new Date().getFullYear()} WalletWise. All rights reserved.</p>
          <p className="text-gray-400 text-sm">Created with ❤️ by Pranav Murali</p>
        </div>
      </footer>
    );
  }
  