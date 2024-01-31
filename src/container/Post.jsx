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
        console.log("Document data:", docSnap.data());
        setPost(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [slug]);
  console.log(slug);

  function getUsernameFromEmail(email) {
    const parts = email.split("@");
    return parts[0];
  }

  return (
    <div>
      <img
        src={
          post?.image
            ? post?.image
            : `https://placehold.jp/30/000000/ffffff/300x150.png?text=${post?.title}`
        }
        alt=""
      />
      <h2>{post?.title}</h2>
      <div>{typeof post?.content === "string" ? parse(post?.content) : ""}</div>
      <div>Author - {typeof post?.user === "string" ? getUsernameFromEmail(post?.user) : ""}</div>
    </div>
  );
};

export default Post;
