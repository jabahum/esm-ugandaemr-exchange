import React from "react";
import Header from "../components/header/header.component";
import Illustration from "./client-registry-illustration.component";
import ClientRegistrySummaryTiles from "./client-registry-tiles/client-registry-summary-tiles.component";
import ClientRegistryData from "./client-registry-data/client-registry-data.component";

const ClientRegistry: React.FC = () => {
  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={`Client Registry`}
      />
      <ClientRegistrySummaryTiles />
      <ClientRegistryData />
    </>
  );
};

export default ClientRegistry;
