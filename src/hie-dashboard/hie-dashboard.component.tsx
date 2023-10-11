import React, { useState, useEffect } from "react";
import { Button } from "@carbon/react";
import { ChevronLeft, ChevronRight } from "@carbon/react/icons";
import { ProfileCard } from "../components/hie-helper-components/profile-card";
import styles from "./hie-dashboard.scss";
import { useGetFhirProfiles } from "../fhir/fhir.resource";
import Header from "../components/header/header.component";
import Illustration from "./hie-illustration.component";
import { EmptyStateComponent } from "../components/empty-state/empty-state.component";

const HIEDashboard: React.FC = () => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const { fhirProfiles } = useGetFhirProfiles();
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

  useEffect(() => {
    if (fhirProfiles.length > 0) {
      const index: number = fhirProfiles.length / 4;
      const mod = fhirProfiles.length % 4;
      let newIndex = 0;
      if (mod >= 1 && mod <= 3) {
        newIndex = index;
      } else {
        newIndex = index - 1;
      }

      setMaxIndex(newIndex);
    }
  }, [maxIndex, fhirProfiles]);

  return (
    <>
      <Header
        illustrationComponent={<Illustration />}
        title={`HIE Dashboard`}
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
            {fhirProfiles?.map((fhirProfile, index) => (
              <div className={styles.carouselItem} key={index}>
                <ProfileCard
                  id={fhirProfile.uuid}
                  profileName={fhirProfile.name}
                  incoming={10}
                  outgoing={5}
                  setSelectedTile={setSelectedTile}
                  color={`"#e0e0e0"`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <EmptyStateComponent title={`Click on one of the profiles above`} />
    </>
  );
};

export default HIEDashboard;
