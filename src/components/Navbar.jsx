

// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom'; // Import Link for navigation
// // import { useNavigate } from 'react-router-dom'; // Use for navigation after login/logout
// // import { signOut } from 'firebase/auth'; // Import signOut from Firebase
// // import { auth } from '../firebase'; // Firebase auth instance
// // import { FaShoppingCart } from 'react-icons/fa'; // Importing cart icon from react-icons

// // const Navbar = () => {
// //   const navigate = useNavigate();

// //   // Cart state
// //   const [cartCount, setCartCount] = useState(0);

// //   // Get cart count from localStorage when the component mounts
// //   useEffect(() => {
// //     const cart = JSON.parse(localStorage.getItem('cart')) || [];
// //     setCartCount(cart.length);  // Update cart count
// //   }, []); // Run only once on component mount

// //   // Handle logout functionality
// //   const handleLogout = async () => {
// //     try {
// //       await signOut(auth); // Log the user out using Firebase
// //       navigate('/'); // Redirect to the home page after logout
// //     } catch (err) {
// //       console.error('Logout error:', err);
// //     }
// //   };

// //   // Redirect to Cart page when cart button is clicked
// //   const handleCartClick = () => {
// //     navigate('/cart');  // Navigate to the Cart page
// //   };

// //   // Toggle the mobile menu
// //   const [menuOpen, setMenuOpen] = useState(false);

// //   return (
// //     <nav className="bg-blue-600 text-white p-4 shadow-md">
// //       <div className="container mx-auto flex justify-between items-center">
// //         {/* Logo Section */}
// //         <div className="text-2xl font-bold">
// //           <Link to="/" className="hover:text-gray-300">
// //             E-Commerce
// //           </Link>
// //         </div>

// //         {/* Links Section for large screens */}
// //         <div className="space-x-4 text-lg hidden sm:flex">
// //           <Link to="/" className="hover:text-gray-200">Home</Link>
// //           <Link to="/profile" className="hover:text-gray-200">Profile</Link>
// //           <Link to="/orders" className="hover:text-gray-200">Orders</Link>

// //           {/* Cart Button */}
// //           <button
// //             onClick={handleCartClick}
// //             className="relative p-2 text-white bg-blue-700 rounded-md hover:bg-blue-500"
// //             style={{ width: '50px' }}  // Setting the width to 50px via inline style
// //           >
// //             <FaShoppingCart size={24} /> {/* Cart Icon */}
// //             {cartCount > 0 && (
// //               <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
// //                 {cartCount}
// //               </span>
// //             )}
// //           </button>

// //           {/* Always Visible Login/Sign Up Button */}
// //           <Link
// //             to="/login-signup"
// //             className="bg-yellow-500 text-white py-2 px-4 rounded-md uppercase font-bold hover:bg-yellow-400 active:bg-yellow-600 transition duration-200"
// //           >
// //             Login/Signup
// //           </Link>

// //           {/* Always Visible Log Out Button */}
// //           <button
// //             onClick={handleLogout}
// //             className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 w-[120px] sm:w-auto ml-[89px] sm:ml-0"
// //           >
// //             Log Out
// //           </button>
// //         </div>

// //         {/* Mobile Hamburger Menu (visible only on small screens) */}
// //         <div className="sm:hidden flex items-center">
// //           <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
// //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
// //             </svg>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile Menu (Visible when menuOpen is true) */}
// //       <div className={`sm:hidden ${menuOpen ? 'block' : 'hidden'}`}>
// //         <div className="flex flex-col items-center space-y-4 p-4 bg-blue-600 ">
// //           <Link to="/" className="text-white hover:text-gray-300 w-full text-center py-2">Home</Link>
// //           <Link to="/profile" className="text-white hover:text-gray-300 w-full text-center py-2">Profile</Link>
// //           <Link to="/orders" className="text-white hover:text-gray-300 w-full text-center py-2">Orders</Link>
          
// //           {/* Cart Button inside the hamburger menu */}
// //           <button
// //             onClick={handleCartClick}
// //             className="relative p-2 text-white bg-blue-700 rounded-md hover:bg-blue-500 w-full text-center py-2"
// //           >
// //             <FaShoppingCart size={24} /> {/* Cart Icon */}
// //             {cartCount > 0 && (
// //               <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
// //                 {cartCount}
// //               </span>
// //             )}
// //           </button>

// //           {/* Login/Signup Button inside the hamburger menu */}
// //           <div className="w-full sm:w-auto">
// //             <Link
// //               to="/login-signup"
// //               className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto ml-[93px] sm:ml-0 mb-4"
// //             >
// //               Login/Signup
// //             </Link>
// //           </div>

// //           {/* Log Out Button inside the hamburger menu */}
// //           <div className="w-full sm:w-auto">
// //             <button
// //               onClick={handleLogout}
// //               className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 w-[127px] sm:w-auto ml-[89px] sm:ml-0 mb-4"
// //             >
// //               Log Out
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Import Link for navigation
// import { useNavigate } from 'react-router-dom'; // Use for navigation after login/logout
// import { signOut } from 'firebase/auth'; // Import signOut from Firebase
// import { auth } from '../firebase'; // Firebase auth instance
// import { FaShoppingCart } from 'react-icons/fa'; // Importing cart icon from react-icons

// const Navbar = () => {
//   const navigate = useNavigate();

//   // Cart state
//   const [cartCount, setCartCount] = useState(0);

//   // Get cart count from localStorage when the component mounts
//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartCount(cart.length);  // Update cart count
//   }, []); // Run only once on component mount

//   // Handle logout functionality
//   const handleLogout = async () => {
//     try {
//       await signOut(auth); // Log the user out using Firebase
//       navigate('/'); // Redirect to the home page after logout
//     } catch (err) {
//       console.error('Logout error:', err);
//     }
//   };

//   // Redirect to Cart page when cart button is clicked
//   const handleCartClick = () => {
//     navigate('/cart');  // Navigate to the Cart page
//   };

//   // Toggle the mobile menu
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="bg-blue-600 text-white p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo Section */}
//         <div className="text-2xl font-bold">
//           <Link to="/" className="hover:text-gray-300">
//             E-Commerce
//           </Link>
//         </div>

//         {/* Links Section for large screens */}
//         <div className="space-x-4 text-lg hidden sm:flex items-center">
//           <Link to="/" className="hover:text-gray-200">Home</Link>
//           <Link to="/profile" className="hover:text-gray-200">Profile</Link>
//           <Link to="/orders" className="hover:text-gray-200">Orders</Link>

//           {/* Cart Button with Inline styling for fixed width */}
//           <button
//             onClick={handleCartClick}
//             className="relative p-2 text-white bg-red-600 rounded-md hover:bg-red-500"
//             style={{ width: '50px' }}  // Setting the width to 50px via inline style
//           >
//             <FaShoppingCart size={24} /> {/* Cart Icon */}
//             {cartCount > 0 && (
//               <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </button>

//           {/* Always Visible Login/Sign Up Button */}
//           <Link
//             to="/login-signup"
//             className="bg-yellow-500 text-white py-2 px-4 rounded-md uppercase font-bold hover:bg-yellow-400 active:bg-yellow-600 transition duration-200"
//           >
//             Login/Signup
//           </Link>

//           {/* Always Visible Log Out Button */}
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 w-[120px] sm:w-auto ml-[89px] sm:ml-0"
//           >
//             Log Out
//           </button>
//         </div>

//         {/* Mobile Hamburger Menu (visible only on small screens) */}
//         <div className="sm:hidden flex items-center">
//           <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu (Visible when menuOpen is true) */}
//       <div className={`sm:hidden ${menuOpen ? 'block' : 'hidden'}`}>
//         <div className="flex flex-col items-center space-y-4 p-4 bg-blue-600 ">
//           <Link to="/" className="text-white hover:text-gray-300 w-full text-center py-2">Home</Link>
//           <Link to="/profile" className="text-white hover:text-gray-300 w-full text-center py-2">Profile</Link>
//           <Link to="/orders" className="text-white hover:text-gray-300 w-full text-center py-2">Orders</Link>
          
//           {/* Cart Button inside the hamburger menu with inline style */}
//           <button
//             onClick={handleCartClick}
//             className="relative p-2 text-white bg-red-600 rounded-md hover:bg-red-500 w-full text-center py-2"
//             style={{ width: '50px' }}  // Set the width to 50px inside hamburger menu
//           >
//             <FaShoppingCart size={24} /> {/* Cart Icon */}
//             {cartCount > 0 && (
//               <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </button>

//           {/* Login/Signup Button inside the hamburger menu */}
//           <div className="w-full sm:w-auto">
//             <Link
//               to="/login-signup"
//               className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto ml-[93px] sm:ml-0 mb-4"
//             >
//               Login/Signup
//             </Link>
//           </div>

//           {/* Log Out Button inside the hamburger menu */}
//           <div className="w-full sm:w-auto">
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 w-[127px] sm:w-auto ml-[89px] sm:ml-0 mb-4"
//             >
//               Log Out
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">E-Commerce</Link>
        </div>

        {/* Main nav links */}
        <div className="space-x-4 text-lg hidden sm:flex items-center">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/profile" className="hover:text-gray-200">Profile</Link>
          <Link to="/orders" className="hover:text-gray-200">Orders</Link>

          {/* Cart button */}
          <button
            onClick={handleCartClick}
            className="relative p-2 text-white bg-red-600 rounded-md hover:bg-red-500"
            style={{ width: '50px' }}
          >
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth buttons */}
          <Link
            to="/login-signup"
            className="bg-yellow-500 text-white py-2 px-4 rounded-md uppercase font-bold hover:bg-yellow-400 active:bg-yellow-600 transition duration-200"
          >
            Login/Signup
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 w-[120px] sm:w-auto ml-[89px] sm:ml-0"
          >
            Log Out
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-center space-y-4 p-4 bg-blue-600">
          <Link to="/" className="text-white hover:text-gray-300 w-full text-center py-2">Home</Link>
          <Link to="/profile" className="text-white hover:text-gray-300 w-full text-center py-2">Profile</Link>
          <Link to="/orders" className="text-white hover:text-gray-300 w-full text-center py-2">Orders</Link>

          <button
            onClick={handleCartClick}
            className="relative p-2 text-white bg-red-600 rounded-md hover:bg-red-500 w-full text-center py-2"
            style={{ width: '50px' }}
          >
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <Link
            to="/login-signup"
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-400 w-full sm:w-auto ml-[93px] sm:ml-0 mb-4"
          >
            Login/Signup
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 w-[127px] sm:w-auto ml-[89px] sm:ml-0 mb-4"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
