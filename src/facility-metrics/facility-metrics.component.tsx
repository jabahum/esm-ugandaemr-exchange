import React from "react";
import Header from "../components/header/header.component";
import Illustration from "./facility-metrics-illustration.component";
import TabBuilder from "./helper-components/tab-builder";

const FacilityMetrics: React.FC = () => {
  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={`Facility Metrics`}
      />
      <TabBuilder />
    </>
  );
};

export default FacilityMetrics;
