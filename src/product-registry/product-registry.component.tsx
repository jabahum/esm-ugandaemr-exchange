import React from "react";
import Header from "../components/header/header.component";
import Illustration from "./product-registry-illustration.component";

const ProductRegistry: React.FC = () => {
  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={`Product Registry`}
      />
    </>
  );
};

export default ProductRegistry;
