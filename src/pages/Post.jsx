// import { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { db } from "../firebase/firebaseConfig";
// import { doc, getDoc, deleteDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";

// function Post() {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const isAuthor = user && post?.authorId === user.uid;

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const docRef = doc(db, "posts", id);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setPost({ id: docSnap.id, ...docSnap.data() });
//         } else {
//           setPost(null);
//         }
//       } catch (error) {
//         console.error("Error getting post:", error);
//         setPost(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   const handleDelete = async () => {
//     const confirm = window.confirm("Are you sure you want to delete this post?");
//     if (!confirm) return;

//     try {
//       await deleteDoc(doc(db, "posts", id));
//       navigate("/");
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       alert("Failed to delete post.");
//     }
//   };

//   if (loading) return <p className="p-4">Loading post...</p>;
//   if (!post) return <p className="p-4 text-red-500">Post not found.</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
//       <p className="text-gray-600 mb-4">
//         by {post.authorName || "Unknown"} on{" "}
//         {post.createdAt?.toDate().toLocaleDateString()}
//       </p>
//       <p className="text-lg whitespace-pre-wrap mb-6">{post.content}</p>

//       {isAuthor && (
//         <div className="flex gap-4">
//           <Link
//             to={`/edit/${post.id}`}
//             className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//           >
//             Edit
//           </Link>
//           <button
//             onClick={handleDelete}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Post;

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function Post() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthor = user && post?.authorId === user.uid;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error getting post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "posts", id));
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  if (loading) return <p className="p-4">Loading post...</p>;
  if (!post) return <p className="p-4 text-red-500">Post not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10">
      <div className="glass-card">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-600 mb-4">
          by {post.authorName || "Unknown"} on{" "}
          {post.createdAt?.toDate().toLocaleDateString()}
        </p>
        <p className="text-lg whitespace-pre-wrap mb-6">{post.content}</p>

        {isAuthor && (
          <div className="flex gap-4">
            <Link to={`/edit/${post.id}`} className="button bg-yellow-500 hover:bg-yellow-600">
              Edit
            </Link>
            <button onClick={handleDelete} className="button bg-red-600 hover:bg-red-700">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
