// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Navbar from "./components/Navbar";
// import { useAuth } from "./context/AuthContext";
// import CreatePost from "./pages/CreatePost";
// import { useEffect, useState } from "react";
// import { db } from "./firebase/firebaseConfig";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import PrivateRoute from "./components/PrivateRoute";
// import Post from "./pages/Post";
// import { Link } from "react-router-dom";
// import EditPost from "./pages/EditPost";


// function Home() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const getPosts = async () => {
//       const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
//       const snapshot = await getDocs(q);
//       const postList = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setPosts(postList);
//     };

//     getPosts();
//   }, []);

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">All Blog Posts</h2>
//       {posts.length === 0 ? (
//         <p>No posts yet.</p>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {posts.map((post) => (
//             <div key={post.id} className="border p-4 rounded shadow">
//           <Link to ={`/post/${post.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
//               {post.title}
//               </Link>

//               <p className="text-gray-700 mb-2">{post.content.slice(0, 100)}...</p>
//               <p className="text-sm text-gray-500">
//                 by {post.authorName || "Unknown"} on{" "}
//                 {post.createdAt?.toDate().toLocaleDateString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/create" element={
//           <PrivateRoute>
//           <CreatePost/>
//           </PrivateRoute>
//           }/>
//           <Route path="/post/:id" element={<Post/>}/>
//           <Route path="/edit/:id" element={<EditPost/>}/>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { db } from "./firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import  './App.css'
import MyPosts from "./pages/Myposts"
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    };

    getPosts();
  }, []);

  return (
 <div className="p-6 max-w-4xl mx-auto mt-10 glass-card">
  <h2 className="text-3xl font-bold mb-6">All Blog Posts</h2>
  {posts.length === 0 ? (
    <p>No posts yet.</p>
  ) : (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <div key={post.id} className="border-b pb-4">
          <Link
            to={`/post/${post.id}`}
            className="text-2xl font-semibold text-blue-700 hover:underline"
          >
            {post.title}
          </Link>
          <p className="text-gray-600 mt-1 mb-1">
            by {post.authorName || "Unknown"} on{" "}
            {post.createdAt?.toDate().toLocaleDateString()}
          </p>
          <p className="text-gray-800">{post.content.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  )}
</div>

  );
}

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={
          <PrivateRoute>
          <CreatePost/>
          </PrivateRoute>
          }/>
        <Route path="/my-posts" element={
          <PrivateRoute>
            <MyPosts/>
          </PrivateRoute>
        }/>
          <Route path="/post/:id" element={<Post/>}/>
          <Route path="/edit/:id" element={<EditPost/>}/>
      </Routes>
    </Router>
    <Footer/>
    </AuthProvider>
  );
}


export default App