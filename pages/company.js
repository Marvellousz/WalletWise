import Layout from '../components/Layout';

const Company = () => {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">About Our Company</h2>
            <p className="text-gray-700 mb-4">
              We are a leading provider of cryptocurrency wallet solutions, dedicated to making digital assets accessible and secure for everyone.
            </p>
            <p className="text-gray-700">
              Our mission is to empower users with the tools they need to manage their crypto assets effectively.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Company;
