import React from "react";
import Header from "../components/header/header.component";
import Illustration from "./fhir-illustration.component";
import fhirStyles from "./fhir.scss";

const Fhir: React.FC = () => {
  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={`FHIR Exchange`}
      />
      <div className={fhirStyles.fhirHeading}> FHIR Profile </div>

      <div className={fhirStyles.fhirHeading}> FHIR Statistics </div>
    </>
  );
};

export default Fhir;
