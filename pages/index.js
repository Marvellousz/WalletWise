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
  const [betAmount, setBetAmount] = useState('');
  const [side, setSide] = useState('heads');
  const [gameResult, setGameResult] = useState(null);

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

  const handleCoinFlip = async () => {
    if (!account || !betAmount || isNaN(betAmount) || betAmount <= 0) {
      toast.error('Please enter a valid bet amount and connect your wallet.');
      return;
    }

    setLoading(true);
    try {
      const coinResult = Math.random() < 0.5 ? 'heads' : 'tails';

      if (coinResult === side) {
        const winAmount = ethers.utils.parseEther((betAmount * 2).toString());
        // Simulate sending tokens back to the user (this part would require a smart contract to be truly functional)
        setBalance((prevBalance) => (parseFloat(prevBalance) + parseFloat(ethers.utils.formatEther(winAmount))).toFixed(4));
        setGameResult('win');
        toast.success(`You won! The coin landed on ${coinResult}.`);
      } else {
        const loseAmount = ethers.utils.parseEther(betAmount.toString());
        setBalance((prevBalance) => (parseFloat(prevBalance) - parseFloat(ethers.utils.formatEther(loseAmount))).toFixed(4));
        setGameResult('lose');
        toast.error(`You lost! The coin landed on ${coinResult}.`);
      }
    } catch (err) {
      console.error('Error during coin flip:', err.message || err);
      setError('Failed to flip the coin. Error: ' + (err.message || 'Unknown error'));
      Sentry.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <Header />
      <ToastContainer />
      <main className="flex-grow flex items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-6">WalletWise - Coin Flipper</h1>
          <p className="text-gray-300 mb-4">Connect your wallet and flip a coin!</p>
          {loading ? (
            <ClipLoader size={35} color={"#ffffff"} loading={loading} />
          ) : !account ? (
            <>
              <button
                onClick={connectWallet}
                className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
              >
                Connect Wallet
              </button>
              {error && (
                <div className="mt-6 p-4 bg-red-500 text-white rounded-lg">
                  <p className="font-bold">Error</p>
                  <p>{error}</p>
                  <button
                    onClick={connectWallet}
                    className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Retry
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Account:</h2>
              <p className="text-gray-300 mt-2">{account}</p>
              <h3 className="text-xl font-semibold mt-4">Balance:</h3>
              <p className="text-gray-300 mt-2">{balance} ETH</p>

              <div className="mt-6">
                <input
                  type="number"
                  placeholder="Bet Amount"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md mb-4"
                />
                <select
                  value={side}
                  onChange={(e) => setSide(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md mb-4"
                >
                  <option value="heads">Heads</option>
                  <option value="tails">Tails</option>
                </select>
                <button
                  onClick={handleCoinFlip}
                  className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200 ease-in-out"
                >
                  Flip Coin
                </button>
              </div>

              {gameResult && (
                <div className={`mt-6 p-4 rounded-lg ${gameResult === 'win' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  <p className="font-bold">{gameResult === 'win' ? 'Congratulations!' : 'Sorry!'}</p>
                  <p>{gameResult === 'win' ? 'You won the bet!' : 'You lost the bet!'}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
