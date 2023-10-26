import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  DataTableSkeleton,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@carbon/react";
import { ChevronLeft, ChevronRight, ChooseItem } from "@carbon/react/icons";
import { ProfileCard } from "../helper-components/profile-card";
import styles from "./hie-dashboard.scss";
import { EmptyStateComponent } from "../../components/empty-state/empty-state.component";
import {
  fetchTransactions,
  fetchTransactionCount,
  getProfiles,
  mapDataElements,
} from "../facility-metrics.resource";
import { DateFilterInput } from "../helper-components/date-filter-section";
import dayjs from "dayjs";
import {
  incomingTransactionsHeaders,
  profileTransactionsHeaders,
} from "../../constants";
import DataList from "../../components/data-table/data-table.component";

const HIEDashboard: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProfileLoader, setShowProfileLoader] = useState(false);
  const [showTransactionLoader, setShowTransactionLoader] = useState(false);
  const [incomingProfileTransactions, setIncomingProfileTransactions] =
    useState<Array<ProfileTransactions>>([]);
  const [outgoingProfileTransactions, setOutgoingProfileTransactions] =
    useState<Array<ProfileTransactions>>([]);
  const [dateArray, setDateArray] = useState([new Date(), new Date()]);
  const [willUpdateTransactions, setWillUpdateTransactions] = useState(true);
  const { exchangeProfiles, maxPosition } = getProfiles();
  const [maxIndex] = useState(maxPosition);
  const [profiles, setProfiles] = useState(exchangeProfiles);
  const moveRight = () => {
    let newIndex: number;
    if (currentIndex + 1 <= maxIndex) {
      newIndex = currentIndex + 1;
    } else {
      newIndex = currentIndex;
    }

    setCurrentIndex(newIndex);
  };

  const moveLeft = () => {
    let newIndex: number;
    if (currentIndex - 1 >= 0) {
      newIndex = currentIndex - 1;
    } else {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
  };

  const handleSelectedProfile = useCallback(
    (profile) => {
      setShowTransactionLoader(true);
      Promise.all([
        fetchTransactions(
          profile.incoming.url,
          dayjs(dateArray[0]).format("YYYY-MM-DD"),
          dayjs(dateArray[1]).format("YYYY-MM-DD"),
          profile.incoming.type
        ),
        fetchTransactions(
          profile.outgoing.url,
          dayjs(dateArray[0]).format("YYYY-MM-DD"),
          dayjs(dateArray[1]).format("YYYY-MM-DD"),
          profile.outgoing.type
        ),
      ])
        .then(([incoming, outgoing]) => {
          const incomingTransactions = mapDataElements(
            incoming?.data["results"]
          );
          const outgoingTransactions = mapDataElements(
            outgoing?.data["results"]
          );
          setIncomingProfileTransactions(incomingTransactions);
          setOutgoingProfileTransactions(outgoingTransactions);
          setSelectedProfile(profile);
          setShowTransactionLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
          setShowTransactionLoader(false);
        });
    },
    [dateArray, setSelectedProfile, setShowTransactionLoader]
  );

  const handleOnChangeRange = (dates: Array<Date>) => {
    setDateArray(dates);
  };

  const updateTransactions = () => {
    setWillUpdateTransactions(true);
    setShowProfileLoader(true);
    setSelectedProfile(null);
  };

  useEffect(() => {
    if (willUpdateTransactions) {
      const updatedProfiles = [...profiles];

      Promise.all(
        updatedProfiles.map(async (profile) => {
          const incomingCount = await fetchTransactionCount(
            profile.incoming?.url,
            dayjs(dateArray[0]).format("YYYY-MM-DD"),
            dayjs(dateArray[1]).format("YYYY-MM-DD"),
            profile.incoming.type
          );
          const outgoingCount = await fetchTransactionCount(
            profile.outgoing?.url,
            dayjs(dateArray[0]).format("YYYY-MM-DD"),
            dayjs(dateArray[1]).format("YYYY-MM-DD"),
            profile.outgoing.type
          );

          profile.incoming.total = incomingCount.total;
          profile.outgoing.total = outgoingCount.total;

          return profile;
        })
      ).then((updatedProfiles) => {
        setProfiles(updatedProfiles);
        setWillUpdateTransactions(false);
        setShowProfileLoader(false);
      });
    }
  }, [willUpdateTransactions, dateArray, profiles]);

  return (
    <>
      <DateFilterInput
        handleOnChangeRange={handleOnChangeRange}
        updateTransactions={updateTransactions}
        dateValue={dateArray}
      />
      {showProfileLoader ? (
        <DataTableSkeleton />
      ) : (
        <div className={styles.fourDivCarousel}>
          <div className={styles.carouselContainer}>
            <Button
              as="div"
              kind="ghost"
              className={styles.carouselLeftControl}
              hasIconOnly
              renderIcon={ChevronLeft}
              onClick={moveLeft}
            />
            <div className={styles.carouselRightControlDiv}>
              <Button
                as="div"
                kind="ghost"
                className={styles.carouselRightControl}
                hasIconOnly
                renderIcon={ChevronRight}
                onClick={moveRight}
              />
            </div>

            <div
              className={styles.carouselContent}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {profiles?.map((fhirProfile, index) => (
                <div className={styles.carouselItem} key={index}>
                  <ProfileCard
                    profile={fhirProfile}
                    onClickHandler={handleSelectedProfile}
                    selectedClass={
                      selectedProfile === fhirProfile ? styles.selected : ""
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showTransactionLoader ? (
        <DataTableSkeleton />
      ) : selectedProfile ? (
        <>
          <div className={styles.profileTransHeading}>
            {selectedProfile.name} Transactions{" ("}
            {dayjs(dateArray[0]).format("DD/MMM/YYYY")} -{" "}
            {dayjs(dateArray[1]).format("DD/MMM/YYYY")}
            {")"}
          </div>
          <Tabs>
            <TabList aria-label="Profile transactions tabs">
              <Tab>Outgoing ({outgoingProfileTransactions.length})</Tab>
              <Tab>Incoming ({incomingProfileTransactions.length})</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {outgoingProfileTransactions.length > 0 ? (
                  <DataList
                    data={outgoingProfileTransactions}
                    columns={profileTransactionsHeaders}
                  />
                ) : (
                  <EmptyStateComponent
                    title={`No outgoing transactions for ${selectedProfile.name}`}
                  />
                )}
              </TabPanel>
              <TabPanel>
                {incomingProfileTransactions.length > 0 ? (
                  <DataList
                    data={incomingProfileTransactions}
                    columns={incomingTransactionsHeaders}
                  />
                ) : (
                  <EmptyStateComponent
                    title={`No incoming transactions for ${selectedProfile.name}`}
                  />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <EmptyStateComponent title={`Click on one of the profiles above`} />
      )}
    </>
  );
};

export default HIEDashboard;

export const TableAction = () => {
  return (
    <Button
      type="button"
      size="sm"
      className="submitButton clear-padding-margin"
      iconDescription={"View Results"}
      kind="ghost"
      renderIcon={ChooseItem}
      hasIconOnly
    />
  );
};
