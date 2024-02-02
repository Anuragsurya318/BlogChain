import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

const Post = () => {
  const [post, setPost] = useState(null);
  const [newPost, setNewPost] = useState(null);
  const iframeRef = useRef(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "Blogs", slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPost(docSnap.data());
      } else {
        // console.log("No such document!");
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    const handleResize = (event) => {
      if (event.data?.frameHeight) {
        iframeRef.current.style.height = `${event.data.frameHeight}px`;
      }
    };

    window.addEventListener("message", handleResize);

    return () => {
      window.removeEventListener("message", handleResize);
    };
  }, []);

  useEffect(() => {
    updateOutput();
  }, [newPost, post?.content]);

  const updateOutput = () => {
    const combinedOutput = `
    <html>
        <head>  
        </head> 
        <body>
        ${post?.content}
        </body>
    </html>
    `;
    setNewPost(combinedOutput);
  };

  function getUsernameFromEmail(email) {
    const parts = email.split("@");
    return parts[0];
  }

  return (
    <div className="w-4/5 h-full p-5 md:px-20 my-5 m-auto border border-gray-100 shadow-md">
      <img
        src={
          post?.image
            ? post?.image
            : `https://placehold.jp/30/000000/ffffff/300x150.png?text=${post?.title}`
        }
        alt=""
        className="m-auto"
      />
      <h2 className="py-3 font-bold text-2xl underline">{post?.title}</h2>
      <iframe
        ref={iframeRef}
        title="Post Content"
        srcDoc={newPost}
        className="w-full h-96 border border-gray-100 shadow-md"
      />
      {console.log(newPost)}
      <div>
        <b>Author</b> - {typeof post?.user === "string" ? getUsernameFromEmail(post?.user) : ""}
      </div>
    </div>
  );
};

export default Post;
