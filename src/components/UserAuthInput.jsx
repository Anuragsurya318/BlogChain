import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const UserAuthInput = ({
  label,
  placeHolder,
  isPass,
  setStateFunction,
  Icon,
  setEmailValidationStatus,
}) => {
  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleTextChange = (e) => {
    setValue(e.target.value);
    setStateFunction(e.target.value);

    if (placeHolder === "Email") {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const isValid = emailRegex.test(value);
      setIsEmailValid(isValid);
      setEmailValidationStatus(isValid);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <label className="text-sm text-gray-400 mt-5">{label}</label>
      <div
        className={`flex items-center justify-center gap-3 w-full rounded-md px-4 py-1 bg-gray-100 shadow-md ${
          !isEmailValid && placeHolder === "Email" && value.length > 0 && "border-2 border-red-500"
        }`}
      >
        <Icon className="text-text555" />
        <input
          type={isPass && showPass ? "password" : "text"}
          className="flex-1 h-full py-2 w-full bg-transparent outline-none border-none text-text555"
          placeholder={placeHolder}
          value={value}
          onChange={handleTextChange}
        />

        {isPass && (
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <FaEyeSlash className="text-text555 text-2xl" />
            ) : (
              <FaEye className="text-text555 text-2xl" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAuthInput;
