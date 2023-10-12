import React from "react";
import { ClickableTile } from "@carbon/react";
import { ArrowUp, ArrowDown } from "@carbon/react/icons";
import profileStyles from "../hie-metrics/hie-dashboard.scss";

export const ProfileCard = ({ profile, onClickHandler }) => {
  return (
    <ClickableTile
      onClick={() => onClickHandler(profile)}
      className={profileStyles.cardTile}
      id={profile.uuid}
    >
      <p className={profileStyles.profileHeader}>{profile.name}</p>
      <section className={profileStyles.section}>
        <div>
          <p className={profileStyles.label}>
            {10}
            <ArrowDown size={15} className={profileStyles.inComingArrow} />
          </p>
          <span className={profileStyles.inComingText}>Incoming</span>
        </div>
        <div className={profileStyles.valueContainer}>
          <p className={profileStyles.label}>
            <ArrowUp size={15} className={profileStyles.outGoingArrow} />
            {5}
          </p>
          <span className={profileStyles.outGoingText}>Outgoing</span>
        </div>
      </section>
    </ClickableTile>
  );
};
