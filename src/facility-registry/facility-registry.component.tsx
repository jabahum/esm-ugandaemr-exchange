import React from "react";
import Header from "../components/header/header.component";
import Illustration from "./facility-registry-illustration.component";

const FacilityRegistry: React.FC = () => {
  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={`Facility Registry`}
      />
    </>
  );
};

export default FacilityRegistry;
