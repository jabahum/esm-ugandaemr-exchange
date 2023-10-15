import React, { useEffect, useState } from "react";
import { Button } from "@carbon/react";
import { ChevronLeft, ChevronRight } from "@carbon/react/icons";
import { ProfileCard } from "../helper-components/profile-card";
import styles from "./hie-dashboard.scss";
import { EmptyStateComponent } from "../../components/empty-state/empty-state.component";
import {
  fetchTransactionCount,
  getProfiles,
} from "../facility-metrics.resource";
import { DateFilterSection } from "../helper-components/date-filter-section";
import dayjs from "dayjs";

const HIEDashboard: React.FC = () => {
  const [dateRangeSelection, setDateRangeSelection] = useState("today");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dateArray, setDateArray] = useState([
    dayjs(new Date()).format("YYYY-MM-DD"),
    dayjs(new Date()).format("YYYY-MM-DD"),
  ]);
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

  const handleSelectedProfile = (profile) => {
    setSelectedProfile(profile);
  };

  const handleOnchangeSelector = (value) => {
    if (value === "today") {
      setDateArray([
        dayjs(new Date()).format("YYYY-MM-DD"),
        dayjs(new Date()).format("YYYY-MM-DD"),
      ]);
      setShowDateFilter(false);
      setWillUpdateTransactions(true);
    } else {
      setShowDateFilter(true);
    }
    setDateRangeSelection(value);
  };

  const handleOnChangeRange = (dates) => {
    setDateArray(dates);
  };

  const useUpdateTransactions = () => {
    const newDates = [
      dayjs(dateArray[0]).format("YYYY-MM-DD"),
      dayjs(dateArray[1]).format("YYYY-MM-DD"),
    ];
    setWillUpdateTransactions(true);
    setDateArray(newDates);
  };

  useEffect(() => {
    if (willUpdateTransactions) {
      const updatedProfiles = [...profiles];

      Promise.all(
        updatedProfiles.map(async (profile) => {
          const incomingCount = await fetchTransactionCount(
            profile.incoming?.url,
            dateArray[0],
            dateArray[1],
            profile.incoming.type
          );
          const outgoingCount = await fetchTransactionCount(
            profile.outgoing?.url,
            dateArray[0],
            dateArray[1],
            profile.outgoing.type
          );

          profile.incoming.count = incomingCount.count;
          profile.outgoing.count = outgoingCount.count;

          return profile;
        })
      ).then((updatedProfiles) => {
        setProfiles(updatedProfiles);
        setWillUpdateTransactions(false);
      });
    }
  }, [willUpdateTransactions, dateArray, profiles]);

  return (
    <>
      <DateFilterSection
        showDateFilter={showDateFilter}
        dateRangeSelection={dateRangeSelection}
        handleOnchangeSelector={handleOnchangeSelector}
        handleOnChangeRange={handleOnChangeRange}
        updateTransactions={useUpdateTransactions}
      />
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
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedProfile ? (
        <div></div>
      ) : (
        <EmptyStateComponent title={`Click on one of the profiles above`} />
      )}
    </>
  );
};

export default HIEDashboard;
