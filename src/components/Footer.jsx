// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="w-full bg-white/30 backdrop-blur text-center text-sm text-gray-800 py-4 mt-10 shadow-md">
      <p>
        © {new Date().getFullYear()} <span className="font-bold text-blue-600">MyBlog</span>. All rights reserved.
      </p>
      <p className="text-gray-600 mt-1">
        Built with ❤️ using React & Firebase
      </p>
    </footer>
  );
}
