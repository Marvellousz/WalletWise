import Layout from '../components/Layout';

const Contact = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions, feel free to reach out to us via email at <a href="mailto:info@walletwise.com" className="text-blue-500">info@walletwise.com</a>.
          </p>
          <p className="text-gray-700">
            Follow us on social media for updates and news!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
