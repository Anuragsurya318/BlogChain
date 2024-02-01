import { db } from "../../firebase.config";
import { collection, onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const myBlogs = () => {
  const user = useSelector((state) => state.user);
  const [myBlogs, setmyBlogs] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "Blogs"), where("user", "==", user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogs = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        blogs.push({ ...doc.data(), id: doc.id }); // also include the document ID
      });

      setmyBlogs(blogs);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full py-6 flex items-center justify-center gap-6 flex-wrap">
      {myBlogs &&
        myBlogs.map((myBlogs, index) => (
          <BlogCard key={myBlogs.id} blogs={myBlogs} index={index} />
        ))}
    </div>
  );
};

const BlogCard = ({ blogs, index }) => {
  const deleteBlog = async (id) => {
    const blogRef = doc(db, "Blogs", id);

    try {
      await deleteDoc(blogRef);
      // console.log(`Blog with ID ${id} has been deleted.`);
    } catch (error) {
      // console.error("Error deleting blog: ", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        key={index}
        className="w-4/5 cursor-pointer md:w-[350px] h-auto overflow-hidden bg-gray-50 border border-gray-100 rounded-md p-4 flex flex-col justify-center items-center gap-4 shadow-md hover:border-gray-300 hover:shadow-lg"
      >
        <div
          className="bg-gray-50 w-full h-full rounded-md overflow-hidden"
          style={{ overflow: "hidden", height: "100%" }}
        >
          <div className="w-full flex justify-end">
            <button onClick={() => deleteBlog(blogs.id)}>
              <FaTrashAlt className="text-gray-500 text-lg hover:text-gray-600" />
            </button>
          </div>
          <Link to={`/post/${blogs.id}`}>
            <div className="w-full rounded-xl p-4">
              <div className="w-full justify-center mb-4">
                <img
                  src={
                    blogs?.image
                      ? blogs.image
                      : `https://placehold.jp/30/000000/ffffff/300x150.png?text=${blogs.title}`
                  }
                  alt={blogs.title}
                  className="rounded-xl border-2 border-gray-100 hover:shadow-md"
                />
              </div>
              <div className="border border-gray-200 relative -top-2"></div>
              <h2 className="text-xl mx-5 text-gray-800 underline font-bold">{blogs.title}</h2>
            </div>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default myBlogs;
