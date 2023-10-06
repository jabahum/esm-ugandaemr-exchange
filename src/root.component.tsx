import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setLeftNav, unsetLeftNav } from "@openmrs/esm-framework";
import LeftPanel from "./components/left-panel/left-panel.component";
import styles from "./root.scss";
import Home from "./hie-dashboard/hie-dashboard.component";

const Root: React.FC = () => {
  const spaBasePath = window.spaBase;

  useEffect(() => {
    setLeftNav({
      name: "health-exchange-left-panel-slot",
      basePath: spaBasePath,
    });
    return () => unsetLeftNav("health-exchange-left-panel-slot");
  }, [spaBasePath]);

  return (
    <BrowserRouter basename={`${window.getOpenmrsSpaBase()}health-exchange`}>
      <LeftPanel />
      <main className={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/fhir-profile"
            element={<div> Home for FHIR Profile </div>}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Root;
