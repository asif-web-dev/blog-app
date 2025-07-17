// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { db } from "../firebase/firebaseConfig";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";

// function EditPost() {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const postRef = doc(db, "posts", id);
//         const postSnap = await getDoc(postRef);

//         if (postSnap.exists()) {
//           const postData = postSnap.data();
//           if (postData.authorId !== user.uid) {
//             alert("Unauthorized access.");
//             navigate("/");
//             return;
//           }
//           setTitle(postData.title);
//           setContent(postData.content);
//         } else {
//           alert("Post not found.");
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching post:", error);
//         alert("Failed to load post.");
//         navigate("/");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id, user, navigate]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const postRef = doc(db, "posts", id);
//       await updateDoc(postRef, {
//         title,
//         content,
//       });
//       navigate(`/post/${id}`);
//     } catch (error) {
//       console.error("Error updating post:", error);
//       alert("Failed to update post.");
//     }
//   };

//   if (loading) return <p className="p-4">Loading post...</p>;

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
//       <form onSubmit={handleUpdate} className="flex flex-col gap-4">
//         <input
//           className="p-2 border rounded"
//           type="text"
//           placeholder="Post Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <textarea
//           className="p-2 border rounded h-40"
//           placeholder="Write your blog content here..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//         />
//         <button className="bg-blue-600 text-white py-2 rounded" type="submit">
//           Update Post
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditPost;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function EditPost() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, "posts", id);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
          const postData = postSnap.data();
          if (postData.authorId !== user.uid) {
            alert("Unauthorized access.");
            navigate("/");
            return;
          }
          setTitle(postData.title);
          setContent(postData.content);
        } else {
          alert("Post not found.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("Failed to load post.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        title,
        content,
      });
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
    }
  };

  if (loading) return <p className="p-4">Loading post...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10">
      <div className="glass-card">
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Update your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
          />
          <button className="button" type="submit">Update Post</button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
