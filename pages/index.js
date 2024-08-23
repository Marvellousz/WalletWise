import { useState } from 'react';
import { ethers } from 'ethers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Sentry from '@sentry/react';


export default function Home() {
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    setLoading(true);
    try {
      setError(null);
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const selectedAccount = accounts[0];
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balanceInWei = await provider.getBalance(selectedAccount);
        const balanceInEth = ethers.utils.formatEther(balanceInWei);
  
        setAccount(selectedAccount);
        setBalance(balanceInEth);
  
        toast.success('Wallet connected successfully!');
      } else {
        throw new Error('MetaMask is not installed.');
      }
    } catch (err) {
      console.error('Error connecting to MetaMask:', err.message || err);
      setError('Failed to connect wallet. Error: ' + (err.message || 'Unknown error'));
      toast.error('Failed to connect wallet.');
      Sentry.captureException(err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600">
      <Header />
      <ToastContainer />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center p-8 max-w-lg bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Connect Your Wallet</h1>
          <p className="text-gray-600 mb-4">Please connect your wallet to check your balance.</p>
          {loading ? (
            <ClipLoader size={35} color={"#123abc"} loading={loading} />
          ) : !account ? (
            <>
              <button
                onClick={connectWallet}
                className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
              >
                Connect Wallet
              </button>
              {error && (
                <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
                  <p className="font-bold">Error</p>
                  <p>{error}</p>
                  <button
                    onClick={connectWallet}
                    className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Retry
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">Account:</h2>
              <p className="text-gray-800">{account}</p>
              <h3 className="text-lg font-semibold mt-4">Balance:</h3>
              <p className="text-gray-800">{balance} ETH</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
