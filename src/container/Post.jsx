import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "Blogs", slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setPost(docSnap.data());
      } else {
        // console.log("No such document!");
      }
    };

    fetchData();
  }, [slug]);
  // console.log(slug);

  function getUsernameFromEmail(email) {
    const parts = email.split("@");
    return parts[0];
  }

  return (
    <div className="w-4/5 p-5 md:px-20 my-5 m-auto border border-gray-100 shadow-md">
      <img
        src={
          post?.image
            ? post?.image
            : `https://placehold.jp/30/000000/ffffff/300x150.png?text=${post?.title}`
        }
        alt=""
        className="m-auto"
      />
      {/* <div className="border border-gray-200 mt-5"></div> */}
      <h2 className="py-3 font-bold text-2xl underline">{post?.title}</h2>
      {/* <div className="border border-gray-200 mb-3"></div> */}
      <div>{typeof post?.content === "string" ? parse(post?.content) : ""}</div>
      <div>
        <b>Author</b> - {typeof post?.user === "string" ? getUsernameFromEmail(post?.user) : ""}
      </div>
    </div>
  );
};

export default Post;
