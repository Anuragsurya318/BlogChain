import React from "react";
import { DNA } from "react-loader-spinner";

const Spinner = () => {
  return (
    <DNA
      visible={true}
      height="100"
      width="100"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
};

export default Spinner;
