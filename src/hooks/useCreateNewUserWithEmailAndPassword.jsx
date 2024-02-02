import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useState } from "react";

export const useCreateNewUserWithEmailAndPassword = (email, password, getEmailValidationStatus) => {
  //   const [alert, setAlert] = useState(false);
  //   const [alertMessage, setAlertMessage] = useState("");
  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredentials) {
          console.log(userCredentials);
        }
      } catch (err) {
        console.log(err);
        if (err.code === "auth/missing-password") {
          //   setAlert(true);
          //   setAlertMessage("Please enter your password");
        }
      }
    }
  };
  return { createNewUser };
};
