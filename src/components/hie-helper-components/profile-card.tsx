import React from "react";
import { ClickableTile } from "@carbon/react";
import { ArrowUp, ArrowDown } from "@carbon/react/icons";
import profileStyles from "../../hie-dashboard/hie-dashboard.scss";

export const ProfileCard = ({
  id,
  profileName,
  incoming,
  outgoing,
  setSelectedTile,
  color,
}) => {
  return (
    <ClickableTile
      onClick={(e) => {
        e.preventDefault();
        setSelectedTile(profileName);
      }}
      className={profileStyles.cardTile}
      style={{ backgroundColor: color }}
      id={id}
    >
      <p className={profileStyles.profileHeader}>{profileName}</p>
      <section className={profileStyles.section}>
        <div>
          <p className={profileStyles.label}>
            {incoming}
            <ArrowDown size={15} className={profileStyles.inComingArrow} />
          </p>
          <span className={profileStyles.inComingText}>Incoming</span>
        </div>
        <div className={profileStyles.valueContainer}>
          <p className={profileStyles.label}>
            <ArrowUp size={15} className={profileStyles.outGoingArrow} />
            {outgoing}
          </p>
          <span className={profileStyles.outGoingText}>Outgoing</span>
        </div>
      </section>
    </ClickableTile>
  );
};
