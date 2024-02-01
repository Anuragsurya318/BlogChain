import React, { useEffect, useState } from "react";
import { Navbar, CreateBlog, Spinner } from "../src/components/index";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config";
import { SignUp, Blogs, Post, MyBlogs } from "./container";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { setBlogs } from "./utils/blogSlice";

function App() {
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCredentials) => {
      setIsLoading(false);
      if (userCredentials) {
        // console.log(userCredentials);
        navigate("/home");
        setDoc(doc(db, "users", userCredentials?.uid), userCredentials?.providerData[0]).then(
          () => {
            dispatch(addUser(userCredentials?.providerData[0]));
            // console.log("Document successfully written!");
          }
        );
      }
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });

    //clean up function
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const blogQuery = query(collection(db, "Blogs"), orderBy("id", "desc"));

    const unsubscribe = onSnapshot(blogQuery, (querySnaps) => {
      const blogList = querySnaps.docs.map((doc) => doc.data());
      dispatch(setBlogs(blogList));
      // console.log(blogList);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {isloading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div>
          <Navbar />
          <Routes>
            <Route path="/home/*" element={<Blogs />} />
            <Route path="/createBlog/*" element={<CreateBlog />} />
            <Route path="/home/auth" element={<SignUp />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/home/myBlogs" element={<MyBlogs />} />

            {/* if the route not matching */}
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
