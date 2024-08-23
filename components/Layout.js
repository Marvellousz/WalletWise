import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white bg-opacity-80 p-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
