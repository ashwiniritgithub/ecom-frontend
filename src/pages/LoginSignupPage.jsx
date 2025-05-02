// // import React, { useState } from 'react';
// // import { auth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, OAuthProvider } from '../firebase'; // Firebase imports
// // import { useNavigate } from 'react-router-dom'; // React Router hook for navigation
// // import Navbar from '../components/Navbar'; // Navbar import

// // const LoginSignupPage = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate(); // Use React Router's useNavigate hook for redirect

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       if (isSignup) {
// //         await createUserWithEmailAndPassword(auth, email, password); // Firebase Sign-Up
// //       } else {
// //         await signInWithEmailAndPassword(auth, email, password); // Firebase Log-In
// //       }
// //       setEmail('');
// //       setPassword('');
// //       navigate('/'); // Redirect to HomePage after successful login/signup
// //     } catch (err) {
// //       setError(err.message); // Show error message if sign-up/login fails
// //     }
// //   };

// //   // Forgot password functionality
// //   const handleForgotPassword = async () => {
// //     try {
// //       await sendPasswordResetEmail(auth, email);  // Send password reset email
// //       alert("Password reset email sent!");
// //     } catch (err) {
// //       setError(err.message); // Handle error if password reset fails
// //     }
// //   };

// //   // Google Sign-In
// //   const handleGoogleSignIn = async () => {
// //     const provider = new GoogleAuthProvider();
// //     try {
// //       const result = await signInWithPopup(auth, provider); // Sign-In with Google
// //       const user = result.user;
// //       alert(`Logged in with Google: ${user.displayName}`);
// //       navigate('/'); // Redirect to HomePage after Google sign-in
// //     } catch (err) {
// //       setError(err.message); // Show error message if Google sign-in fails
// //     }
// //   };

// //   // Apple Sign-In
// //   const handleAppleSignIn = async () => {
// //     const provider = new OAuthProvider('apple.com'); // Correct way to sign in with Apple using Firebase
// //     try {
// //       const result = await signInWithPopup(auth, provider); // Sign-In with Apple
// //       const user = result.user;
// //       alert(`Logged in with Apple: ${user.displayName}`);
// //       navigate('/'); // Redirect to HomePage after Apple sign-in
// //     } catch (err) {
// //       setError(err.message); // Show error message if Apple sign-in fails
// //     }
// //   };

// //   return (
// //     <div>
// //       {/* Add the Navbar to the Login/Signup page */}
// //       <Navbar />

// //       {/* Form Container */}
// //       <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8">
// //         <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
// //           <h2 className="text-3xl font-bold mb-6 text-center">{isSignup ? 'Sign Up' : 'Login'}</h2>
          
// //           {/* Error Message */}
// //           {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

// //           {/* Login/Signup Form */}
// //           <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
// //             <input
// //               type="email"
// //               placeholder="Email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
// //               required
// //             />
// //             <input
// //               type="password"
// //               placeholder="Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
// //               required
// //             />
// //             <button 
// //               type="submit" 
// //               className="py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
// //             >
// //               {isSignup ? 'Sign Up' : 'Log In'}
// //             </button>
// //           </form>

// //           {/* Toggle between Login and Signup */}
// //           <div className="mt-4 text-center">
// //             <button
// //               onClick={() => setIsSignup(!isSignup)}
// //               className="text-blue-600 underline"
// //             >
// //               {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
// //             </button>
// //           </div>

// //           {/* Forgot Password */}
// //           <div className="mt-4 text-center">
// //             <button
// //               onClick={handleForgotPassword} // Referencing the function here
// //               className="text-blue-600 underline"
// //             >
// //               Forgot Password?
// //             </button>
// //           </div>

// //           {/* Button Container for Google and Apple Sign-In */}
// //           <div className="mt-6 flex flex-col gap-4 w-full">
// //             {/* Google Sign In Button */}
// //             <button 
// //               onClick={handleGoogleSignIn} 
// //               className="px-6 py-2 bg-blue-500 text-white rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             >
// //               Sign in with Google
// //             </button>

// //             {/* Apple Sign In Button */}
// //             <button 
// //               onClick={handleAppleSignIn} 
// //               className="px-6 py-2 bg-black text-white rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
// //             >
// //               Sign in with Apple
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginSignupPage;
// import React, { useState } from 'react';
// import { auth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, OAuthProvider } from '../firebase';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// const LoginSignupPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignup, setIsSignup] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isSignup) {
//         await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//       navigate('/'); // Redirect to HomePage after successful login/signup
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleForgotPassword = async () => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       alert("Password reset email sent!");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       alert(`Logged in with Google: ${user.displayName}`);
//       navigate('/');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleAppleSignIn = async () => {
//     const provider = new OAuthProvider('apple.com');
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       alert(`Logged in with Apple: ${user.displayName}`);
//       navigate('/');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-lg shadow-lg">
//           <h2 className="text-2xl sm:text-3xl font-bold text-center">{isSignup ? 'Sign Up' : 'Login'}</h2>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
//             >
//               {isSignup ? 'Sign Up' : 'Log In'}
//             </button>
//           </form>
//           <div className="text-center">
//             <button onClick={() => setIsSignup(!isSignup)} className="text-blue-600 hover:text-blue-800">
//               {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
//             </button>
//           </div>
//           <div className="text-center">
//             <button onClick={handleForgotPassword} className="text-blue-600 hover:text-blue-800">
//               Forgot Password?
//             </button>
//           </div>
//           <div className="space-y-4">
//             <button onClick={handleGoogleSignIn} className="w-full py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
//               Sign in with Google
//             </button>
//             <button onClick={handleAppleSignIn} className="w-full py-2 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-black">
//               Sign in with Apple
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignupPage;
import React, { useState } from 'react';
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  OAuthProvider,
} from '../firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const LoginSignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const saveUserToBackend = async (user) => {
    try {
      await axios.post('http://localhost:5000/api/users/save', {
        userID: user.uid,
        name: name || user.displayName || 'No Name',
        email: user.email,
        address: '',
        phoneNumber: '',
      }, {
        headers: {
          'x-api-key': 'mysecureapikey'
        }
      });
      console.log('✅ User saved to MongoDB');
    } catch (error) {
      console.error('❌ Error saving user:', error.message);
    }
  };
  // const saveUserToBackend = async (user) => {
  //   try {
  //     await axios.post('http://localhost:5000/api/users/save', {
  //       userID: user.uid,
  //       name: user.displayName || '',
  //       email: user.email,
  //       address: '',
  //       phoneNumber: ''
  //     });
      
  //   } catch (error) {
  //     console.error("❌ Failed to save user to backend:", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      await saveUserToBackend(userCredential.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let userCred;
  //     if (isSignup) {
  //       userCred = await createUserWithEmailAndPassword(auth, email, password);
  //     } else {
  //       userCred = await signInWithEmailAndPassword(auth, email, password);
  //     }
  
  //     //  Save to backend
  //     await saveUserToBackend(userCred.user);
  
  //     navigate('/');
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  
  // const handleGoogleSignIn = async () => {
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  
  //     //  Save to backend
  //     await saveUserToBackend(user);
  
  //     navigate('/');
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await saveUserToBackend(user);
      alert(`Logged in with Google: ${user.displayName}`);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAppleSignIn = async () => {
    const provider = new OAuthProvider('apple.com');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await saveUserToBackend(user);
      alert(`Logged in with Apple: ${user.displayName}`);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            {isSignup ? 'Sign Up' : 'Login'}
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>
          </form>
          <div className="text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 hover:text-blue-800"
            >
              {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </div>
          <div className="text-center">
            <button
              onClick={handleForgotPassword}
              className="text-blue-600 hover:text-blue-800"
            >
              Forgot Password?
            </button>
          </div>
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign in with Google
            </button>
            <button
              onClick={handleAppleSignIn}
              className="w-full py-2 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-black"
            >
              Sign in with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
