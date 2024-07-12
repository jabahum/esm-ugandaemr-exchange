import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePatients } from "../client-registry.resource";
import { DataTableSkeleton } from "@carbon/react";
import {
  ExtensionSlot,
  formatDate,
  parseDate,
  usePagination,
} from "@openmrs/esm-framework";
import {
  DataTable,
  TableContainer,
  Pagination,
  Tile,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
} from "@carbon/react";
import styles from "./client-registry-data.scss";
import { Button } from "@carbon/react";
import { OverflowMenuVertical } from "@carbon/react/icons";

import OrderCustomOverflowMenuComponent from "../../ui-components/overflow-menu.component";

const ClientRegistryData: React.FC = () => {
  const { t } = useTranslation();

  const { patients, isLoading, isError, mutate } = usePatients("sarah", false);

  const pageSizes = [10, 20, 30, 40, 50];
  const [currentPageSize, setPageSize] = useState(10);
  const {
    goTo,
    results: paginatedPatientEntries,
    currentPage,
  } = usePagination(patients, currentPageSize);

  const tableHeaders = useMemo(
    () => [
      { id: 0, header: t("name", "Name"), key: "name" },
      { id: 1, header: t("identifiers", "Identifiers"), key: "identifiers" },
      { id: 2, header: t("gender", "Gender"), key: "gender" },
      { id: 3, header: t("age", "Age"), key: "age" },
      { id: 4, header: t("birthdate", "Birthdate"), key: "birthdate" },
      {
        id: 5,
        header: t("maritalStatus", "Marital Status"),
        key: "maritalStatus",
      },
      { id: 6, header: t("occupation", "Occupation"), key: "occupation" },
      { id: 7, header: t("nationality", "Nationality"), key: "nationality" },
      { id: 8, header: t("dead", "Dead"), key: "dead" },
      { id: 9, actions: t("actions", "Actions"), key: "actions" },
    ],
    [t]
  );

  const tableRows = useMemo(() => {
    return patients?.map((patient, index) => ({
      ...patient,
      id: patient?.uuid,
      name: patient?.person?.display,
      identifiers: patient.identifiers
        .map((identifier) => identifier.display)
        .join(", "),
      gender: patient?.person?.gender,
      age: patient?.person?.age,
      birthdate: formatDate(parseDate(patient?.person?.birthdate)),
      maritalStatus:
        patient.attributes.find(
          (attribute) =>
            attribute.attributeType?.uuid ===
            "8d871f2a-c2cc-11de-8d13-0010c6dffd0f"
        )?.value?.display || "",
      occupation:
        patient.attributes.find(
          (attribute) =>
            attribute.attributeType?.uuid ===
            "b0868a16-4f8e-43da-abfc-6338c9d8f56a"
        )?.value || "",
      nationality:
        patient.attributes.find(
          (attribute) =>
            attribute.attributeType?.uuid ===
            "dec484be-1c43-416a-9ad0-18bd9ef28929"
        )?.value?.display || "",
      dead: patient?.person?.dead ? "true" : "false",
      actions: (
        <OrderCustomOverflowMenuComponent
          menuTitle={
            <>
              <OverflowMenuVertical
                size={16}
                style={{ marginLeft: "0.3rem" }}
              />
            </>
          }
        >
          <ExtensionSlot
            className={styles.menuLink}
            state={{ patient: patients[index] }}
            name="cr-patients-actions-slot"
          />
        </OrderCustomOverflowMenuComponent>
      ),
    }));
  }, [paginatedPatientEntries]);

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  return (
    <div style={{ margin: "1rem" }}>
      <Button
        style={{ marginLeft: "1rem", marginBottom: "1rem" }}
        onClick={() => mutate()}
        kind="primary"
      >
        Send All to CR
      </Button>
      <DataTable rows={tableRows} headers={tableHeaders} useZebraStyles>
        {({
          rows,
          headers,
          getHeaderProps,
          getTableProps,
          getRowProps,
          getTableContainerProps,
        }) => (
          <TableContainer
            {...getTableContainerProps}
            className={styles.tableContainer}
          >
            <Table {...getTableProps()} aria-label="patients">
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id} className={styles.testCell}>
                        {cell.value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {rows.length === 0 ? (
              <div className={styles.tileContainer}>
                <Tile className={styles.tile}>
                  <div className={styles.tileContent}>
                    <p className={styles.content}>
                      {t("noPatientsToDisplay", "No patients to display")}
                    </p>
                  </div>
                </Tile>
              </div>
            ) : null}
            <Pagination
              forwardText="Next page"
              backwardText="Previous page"
              page={currentPage}
              pageSize={currentPageSize}
              pageSizes={pageSizes}
              totalItems={paginatedPatientEntries?.length}
              className={styles.pagination}
              onChange={({ pageSize, page }) => {
                if (pageSize !== currentPageSize) {
                  setPageSize(pageSize);
                }
                if (page !== currentPage) {
                  goTo(page);
                }
              }}
            />
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
};

export default ClientRegistryData;
