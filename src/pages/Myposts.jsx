import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";


function MyPosts() {
  const { user, loading: authLoading } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const currentUser = user ?? auth.currentUser;
    if (!currentUser) return;

    const q = query(
      collection(db, "posts"),
      where("authorId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(userPosts);
      setLoading(false); // ✅ set regardless of snapshot size
    });

    return () => unsubscribe();
  }, [user]);

if (authLoading) return <p className="p-6">Checking authentication...</p>;
if (loading) return <p className="p-6">Loading your posts...</p>;


  if (!currentUser) {
    return <p className="p-6">Please log in to view your posts.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 glass-card">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">My Posts</h2>

      {posts.length === 0 ? (
        <p>
          You haven’t written anything yet.
          <Link to="/create" className="text-blue-600 underline ml-1">
            Write one?
          </Link>
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <div key={post.id} className="border-b pb-4">
              <Link
                to={`/post/${post.id}`}
                className="text-xl font-semibold text-blue-700 hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-500 mb-1">
                {post.createdAt?.toDate().toLocaleDateString()}
              </p>
              <div className="flex gap-4">
                <Link
                  to={`/edit/${post.id}`}
                  className="button bg-yellow-500 hover:bg-yellow-600"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPosts;
