import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebase.config";
import { v4 as uuidv4 } from "uuid";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, googleProvider).then((userCredentials) => {
    window.location.reload();
    // console.log(userCredentials);
  });
};

export const signOutAction = async () => {
  await auth.signOut().then(() => {
    window.location.reload();
  });
};

export const Menus = [
  { id: uuidv4(), name: "Home", uri: "/home" },
  { id: uuidv4(), name: "Create Blog", uri: "/createBlog" },
  { id: uuidv4(), name: "My Blogs", uri: "/home/myBlogs" },
];
