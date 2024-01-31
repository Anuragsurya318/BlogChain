import React, { useState } from "react";
import { UserAuthInput } from "../components/index";
import { FaEnvelope } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png";
import { useCreateNewUserWithEmailAndPassword, useLoginWithEmailAndPassword } from "../hooks/index";
import { signInWithGoogle } from "../utils/helpers";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  //custom hooks
  const { createNewUser } = useCreateNewUserWithEmailAndPassword(
    email,
    password,
    getEmailValidationStatus
  );

  const { loginWithEmailAndPasswordHandler, alert, alertMessage } = useLoginWithEmailAndPassword(
    email,
    password,
    getEmailValidationStatus
  );

  return (
    <div className="flex flex-col">
      <img src={logo} alt="logo" className="w-20 md:relative md:left-16" />
      <div className="w-11/12 md:w-3/4 m-auto py-3 bg-gray-50 shadow-md shadow-gray-300 flex flex-col items-center">
        <p className="">Join with Us!</p>
        <div className="w-4/5 md:w-1/2">
          {/* {/_ email _/} */}
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setEmailValidationStatus={setGetEmailValidationStatus}
          />

          {/* password */}
          <UserAuthInput
            label="Password"
            placeHolder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

          {/* alert section  */}
          <AnimatePresence>
            {alert && (
              <motion.div key={"AlertMessage"} className="text-red-500">
                {alertMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* login button */}
          {isLogin ? (
            <motion.div
              whileHover={{ scale: 0.9 }}
              onClick={loginWithEmailAndPasswordHandler}
              className="flex items-center my-2 justify-center w-full py-3 rounded-xl hover:bg-slate-800 cursor-pointer bg-slate-900  shadow-md"
            >
              <p className="text-xl text-white">Login</p>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 0.9 }}
              onClick={createNewUser}
              className="flex items-center my-2 justify-center w-full py-3 rounded-xl hover:bg-slate-800 cursor-pointer bg-slate-900 shadow-md"
            >
              <p className="text-xl text-white">Sign Up</p>
            </motion.div>
          )}

          {isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Doesn't have an account?
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-500 border-b border-gray-500  cursor-pointer"
              >
                Create Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already Have an Account?
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-500 border-b border-gray-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          )}

          {/* account text section */}

          {/* or section */}
          <div className="flex items-center justify-center mt-3 gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24 "></div>
            <p className="">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24 "></div>
          </div>

          {/* sign in with google */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-3 bg-gray-100 border border-gray-200 hover:bg-gray-200 shadow-md w-full py-3 rounded-xl cursor-pointer"
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-black">Sign in with Google</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
