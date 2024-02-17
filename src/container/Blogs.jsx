import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const Blogs = useSelector((state) => state.blog);
  const searchTerm = useSelector((state) => (state.search ? state.search : ""));
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setFiltered(
        Blogs?.filter((blog) => {
          const lowerCaseItem = blog?.title.toLowerCase();
          return searchTerm.split("").every((letter) => lowerCaseItem.includes(letter));
        })
      );
    } else {
      setFiltered(null);
    }
  }, [searchTerm]);

  return (
    <div className="w-full py-6 flex items-center justify-center gap-6 flex-wrap">
      {filtered ? (
        <>
          {filtered &&
            filtered.map((blogs, index) => <BlogCard key={blogs.id} blogs={blogs} index={index} />)}
        </>
      ) : (
        <>
          {Blogs &&
            Blogs.map((blogs, index) => <BlogCard key={blogs.id} blogs={blogs} index={index} />)}
        </>
      )}
    </div>
  );
};

const BlogCard = ({ blogs, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      key={index}
      className="w-4/5 cursor-pointer md:w-[350px] h-auto overflow-hidden dark:bg-little-dark-bg bg-gray-50 border border-gray-100 rounded-md p-4 flex flex-col justify-center items-center gap-4 shadow-md hover:border-gray-300 hover:shadow-lg dark:border-less-dark dark:hover:border-little-dark-bg dark:shadow-dark-shadow"
    >
      <div
        className="bg-gray-50 w-full h-full rounded-md overflow-hidden dark:bg-little-dark-bg"
        style={{ overflow: "hidden", height: "100%" }}
      >
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
                className="rounded-xl border-2 border-gray-100 dark:border-little-dark-bg hover:shadow-md"
              />
            </div>
            <div className="border border-gray-200 dark:border-less-dark relative -top-2"></div>
            <h2 className="text-xl mx-5 text-gray-800 dark:text-dark-text underline font-bold">
              {blogs.title}
            </h2>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default Blogs;
