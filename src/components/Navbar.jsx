// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { auth } from "../firebase/firebaseConfig";
// import { signOut } from "firebase/auth";

// function Navbar() {
//   const { user } = useAuth();

//   const handleLogout = () => {
//     signOut(auth);
//   };

//   return (
//     <nav className="flex justify-between items-center p-4 shadow">
//       <Link to="/" className="font-bold text-xl text-blue-700">My Blog</Link>

//       <div className="flex gap-4 items-center">
//         {user ? (
//           <>
//           <Link
//               to="/create"
//               className=" text-white px-3 py-1 rounded hover:bg-green-700"
//             >
//               + Create
//             </Link>
           

//             <span className="text-gray-700">Hi, {user.displayName || user.email}</span>
//             <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
//             <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

function Navbar() {
  const { user } = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="w-full bg-white/70 backdrop-blur-md shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          📝 MyBlog
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/create"
                className="button "
              >
                + Create
              </Link>
              <span className="text-sm text-gray-800 font-medium">
                {user.displayName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link to="/signup" className="text-blue-600 hover:underline">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
