import React, { useState, Fragment } from "react";
import { Modal } from "antd";
import NavigationPrompt from "react-router-navigation-prompt";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import styles from "./css/UserConfirmation.module.less";

export const showDialog = (currentLocation, nextLocation) => {
  /* define your routes here when u need Modal*/
  const nextValidLocations = [
    "/browse-supply/",
    "/user-management/list",
    "/logout",
    "/refresh",
    "/offers",
  ];
  const currentValidLocation = ["create-new-offer", "edit", "property"];
  if (!currentLocation || !nextLocation) {
    return false;
  }
  for (let i = 0; i < currentValidLocation.length; i++) {
    if (currentLocation.pathname.indexOf(currentValidLocation[i]) !== -1) {
      if (nextLocation.pathname === "/" && nextLocation.state === undefined) {
        return true;
      }
      for (let j = 0; j < nextValidLocations.length; j++) {
        if (nextLocation.pathname === nextValidLocations[j]) {
          if (currentLocation.pathname !== nextLocation.pathname) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

export function UserConfirmation() {
  const [isCreateFlow, setCreateFlow] = useState(false);

  return (
    <NavigationPrompt
      renderIfNotActive={true}
      disableNative={true}
      // Confirm navigation logic
      when={(currentLocation, nextLocation) => {
        let showPrompt = false;
        if (currentLocation.pathname && nextLocation.pathname) {
          if (currentLocation.pathname.indexOf("create-new-offer") !== -1) {
            setCreateFlow(true);
          }
          showPrompt = showDialog(currentLocation, nextLocation);
        }
        return showPrompt;
      }}
    >
      {({ isActive, onCancel, onConfirm }) => {
        if (isActive) {
          return (
            <Modal
              data-testid="userconfirmation-modal"
              centered
              closable={false}
              destroyOnClose
              visible
              onOk={onConfirm}
              onCancel={onCancel}
            >
              <div className="ant-modal-confirm-body">
                <ExclamationCircleOutlined className={styles.exclamation} />
                <span className="ant-modal-confirm-title">
                  {isCreateFlow === true ? (
                    <FormattedMessage id="nemo.leavingOfferCreation" />
                  ) : (
                    <FormattedMessage id="nemo.leavingOfferEdit" />
                  )}
                </span>
                <div className="ant-modal-confirm-content">
                  <FormattedMessage id="nemo.unsavedDiscard" />
                </div>
              </div>
            </Modal>
          );
        }
        return <Fragment />;
      }}
    </NavigationPrompt>
  );
}
