import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

export const useLoginWithEmailAndPassword = (email, password, getEmailValidationStatus) => {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const loginWithEmailAndPasswordHandler = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          if (userCredentials) {
            // console.log(userCredentials);
          }
        })
        .catch((error) => {
          // console.log(error.message);
          if (error.code === "auth/user-not-found") {
            setAlert(true);
            setAlertMessage("Invalid Id : User Not Found");
          } else if (error.code === "auth/wrong-password") {
            setAlert(true);
            setAlertMessage("Invalid Password");
          } else if (error.code === "auth/invalid-credential") {
            setAlert(true);
            setAlertMessage("Invalid Credential");
          } else if (error.code === "auth/missing-password") {
            setAlert(true);
            setAlertMessage("Please enter your password");
          } else {
            setAlert(true);
            setAlertMessage("Temporarily disabled due to many failed attempts");
          }
        });

      let timeoutId = null;

      // Inside loginWithEmailAndPasswordHandler
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setAlert(false);
      }, 4000);
    }
  };

  return { loginWithEmailAndPasswordHandler, alert, alertMessage };
};
