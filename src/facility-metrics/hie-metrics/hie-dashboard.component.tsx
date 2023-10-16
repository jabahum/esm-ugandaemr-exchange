import React, { useEffect, useState, useCallback } from "react";
import { Button, DataTableSkeleton } from "@carbon/react";
import { ChevronLeft, ChevronRight } from "@carbon/react/icons";
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
import { profileTransactionsHeaders } from "../../constants";
import DataList from "../../components/data-table/data-table.component";

const HIEDashboard: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProfileLoader, setShowProfileLoader] = useState(false);
  const [showTransactionLoader, setShowTransactionLoader] = useState(false);
  const [profileTransactions, setProfileTransactions] = useState<
    Array<ProfileTransactions>
  >([]);
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

      fetchTransactions(
        profile.outgoing.url,
        dayjs(dateArray[0]).format("YYYY-MM-DD"),
        dayjs(dateArray[1]).format("YYYY-MM-DD"),
        profile.outgoing.type
      )
        .then((response) => {
          const transactions = mapDataElements(response?.data["results"]);
          setProfileTransactions(transactions);
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

          profile.incoming.count = incomingCount.count;
          profile.outgoing.count = outgoingCount.count;

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
        profileTransactions.length > 0 ? (
          <DataList
            data={profileTransactions}
            columns={profileTransactionsHeaders}
          />
        ) : (
          <EmptyStateComponent
            title={`No data found for the selected period`}
          />
        )
      ) : (
        <EmptyStateComponent title={`Click on one of the profiles above`} />
      )}
    </>
  );
};

export default HIEDashboard;
