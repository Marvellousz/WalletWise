import Layout from '../components/Layout';

const Company = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-4">About Our Company</h2>
          <p className="text-gray-700 mb-4">
            We are a leading provider of cryptocurrency wallet solutions, dedicated to making digital assets accessible and secure for everyone.
          </p>
          <p className="text-gray-700 mb-4">
            Our mission is to empower users with the tools they need to manage their crypto assets effectively.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Company;
