import React from "react";
import Header from "../components/header/header.component";
import Illustration from "./client-registry-illustration.component";

const ClientRegistry: React.FC = () => {
  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={`Client Registry`}
      />
    </>
  );
};

export default ClientRegistry;
