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
      <>
        <div className={profileStyles.cardWrapper}>
          <div>
            {profile.icon}
            <div className={profileStyles.profileName}>{profile.name}</div>
          </div>
          <div className={profileStyles.profileStats}>
            <div className={profileStyles.firstItem}>
              <ArrowDown size={15} className={profileStyles.inComingArrow} />
              <div>{profile?.incoming?.count}</div>
            </div>
            <div className={profileStyles.secondItem}>
              <div>{profile?.outgoing?.count}</div>
              <ArrowUp size={15} className={profileStyles.outGoingArrow} />
            </div>
          </div>
        </div>
      </>
    </ClickableTile>
  );
};
