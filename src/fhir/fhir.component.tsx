import React from "react";
import Header from "../components/header/header.component";
import Illustration from "./fhir-illustration.component";
import fhirStyles from "./fhir.scss";
import { Button, Layer, Tile } from "@carbon/react";
import { Add, Edit, View } from "@carbon/react/icons";
import { useGetFhirProfiles } from "./fhir.resource";
import { fhirTableHeaders } from "../constants";
import DataList from "../components/data-table/data-table.component";
import EmptyStateIllustration from "../components/empty-state/empty-state-illustration.component";

const Fhir: React.FC = () => {
  const { fhirProfiles } = useGetFhirProfiles();

  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={`FHIR Profiles`}
      />

      <div className={fhirStyles.createIcon}>
        <Button size="md" kind="primary">
          <Add />
          <span> Create profile</span>
        </Button>
      </div>

      {fhirProfiles.length > 0 ? (
        <div className={fhirStyles.fhirContainer}>
          <DataList data={fhirProfiles} columns={fhirTableHeaders} />
        </div>
      ) : (
        <Layer className={fhirStyles.layer}>
          <Tile className={fhirStyles.tile}>
            <EmptyStateIllustration />
            <p className={fhirStyles.content}>No data to display</p>
            <p className={fhirStyles.explainer}>
              Use the create button to add new profiles
            </p>
          </Tile>
        </Layer>
      )}
    </>
  );
};

export default Fhir;

export const EditAction = () => {
  return (
    <>
      <Button
        type="button"
        size="sm"
        className="submitButton clear-padding-margin"
        iconDescription={"Edit"}
        kind="ghost"
        renderIcon={Edit}
        hasIconOnly
      />
      <Button
        type="button"
        size="sm"
        className="submitButton clear-padding-margin"
        iconDescription={"View"}
        kind="ghost"
        renderIcon={View}
        hasIconOnly
      />
    </>
  );
};
