import { db } from "@/config/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const myBlogs = () => {
  const user = useSelector((state) => state.user);
  const [myBlogs, setmyBlogs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "Blogs"), where("user", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const blogs = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        blogs.push(doc.data()); // push to blogs, not myBlogs
      });

      setmyBlogs(blogs);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full py-6 flex items-center justify-center gap-6 flex-wrap">
      {myBlogs &&
        myBlogs.map((myBlogs, index) => (
          <BlogCard key={myBlogs.id} myBlogs={myBlogs} index={index} />
        ))}
    </div>
  );
};

const BlogCard = ({ myBlogs, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      key={index}
      className="w-4/5 cursor-pointer md:w-[450px] h-[375px] overflow-hidden bg-secondary rounded-md p-4 flex flex-col justify-center items-center gap-4"
    >
      <div
        className="bg-primary w-full h-full rounded-md overflow-hidden"
        style={{ overflow: "hidden", height: "100%" }}
      >
        <Link to={`/post/${myBlogs.id}`}>
          <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className="w-full justify-center mb-4">
              <img src={myBlogs.image} alt={myBlogs.title} className="rounded-xl" />
            </div>
            <h2 className="text-xl font-bold">{myBlogs.title}</h2>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default myBlogs;
