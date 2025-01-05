import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User Info:', user);
      console.log('User ID:', user?.displayName);   
      // Navigate to the profile page
      navigate('/profile');
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className="text-2xl font-bold m-2 flex justify-between">
      <h1 className="m-2">Streaky 🔥</h1>
      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default Navbar;
