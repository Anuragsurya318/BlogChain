import React, { useEffect, useState } from "react";
import { Navbar, CreateBlog, Spinner } from "../src/components/index";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config";
import { SignUp, Blogs, Post, MyBlogs } from "./container";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { setBlogs } from "./utils/blogSlice";

function App() {
  const [isloading, setIsLoading] = useState(true);
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //dark mode functionality
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    console.log(theme);
  }, [theme]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCredentials) => {
      setIsLoading(false);
      if (userCredentials) {
        // console.log(userCredentials);
        navigate("/");
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
        <div className="w-screen h-screen flex items-center justify-center dark:bg-dark-bg">
          <Spinner />
        </div>
      ) : (
        <div className="dark:bg-dark-bg h-full">
          <Navbar />
          <Routes>
            <Route path="/*" element={<Blogs />} />
            <Route path="/createBlog/*" element={<CreateBlog />} />
            <Route path="/auth" element={<SignUp />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/myBlogs" element={<MyBlogs />} />

            {/* if the route not matching */}
            {/* <Route path="*" element={<Navigate to={"/home"} />} /> */}
          </Routes>
        </div>
      )}
    </>
  );
}
export default App;
