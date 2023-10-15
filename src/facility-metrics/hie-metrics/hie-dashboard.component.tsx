import React, { useState } from "react";
import { Button } from "@carbon/react";
import { ChevronLeft, ChevronRight } from "@carbon/react/icons";
import { ProfileCard } from "../helper-components/profile-card";
import styles from "./hie-dashboard.scss";
import { EmptyStateComponent } from "../../components/empty-state/empty-state.component";
import { useGetProfiles } from "../facility-metrics.resource";
import { DateFilterSection } from "../helper-components/date-filter-section";

const HIEDashboard: React.FC = () => {
  const { exchangeProfiles, maxPosition } = useGetProfiles();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex] = useState(maxPosition);
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

  return (
    <>
      <DateFilterSection />
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
            {exchangeProfiles?.map((fhirProfile, index) => (
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
