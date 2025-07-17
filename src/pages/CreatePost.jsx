// import { useState } from "react";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../firebase/firebaseConfig";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function CreatePost() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !content) {
//       return alert("Please fill in all fields.");
//     }

//     try {
//       await addDoc(collection(db, "posts"), {
//         title,
//         content,
//         createdAt: serverTimestamp(),
//         authorId: user.uid,
//         authorName: user.displayName || user.email,
//       });

//       navigate("/");
//     } catch (error) {
//       console.error("Error adding post: ", error);
//       alert("Failed to create post.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
//           Publish Post
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreatePost;

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      return alert("Please fill in all fields.");
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: serverTimestamp(),
        authorId: user.uid,
        authorName: user.displayName || user.email,
      });

      navigate("/");
    } catch (error) {
      console.error("Error adding post: ", error);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10">
      <div className="glass-card">
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
          />
          <button className="button" type="submit">Publish Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
