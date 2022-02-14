import React, { Fragment, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { InfoCircleOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, message } from "antd";
import { updateOffer } from "../service";
import { appConstants } from "../../../common";
import styles from "./css/ChangeOfferStatusModal.module.less";

export default function ChangeOfferStatusModal({
  offerInfo,
  actionType,
  hideModal,
}) {
  const intl = useIntl();
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    setLoading(true);
    if (actionType === appConstants.OFFER_STATUS_ACTION.ARCHIVE) {
      updateOffer(offerInfo.offerId, appConstants.OFFER_STATUS.ARCHIVED)
        .then((response) => {
          setLoading(false);
          if (window.getValue(response, "success")) {
            message.success(
              intl.formatMessage({
                // Matching ID as above
                id: "nemo.archivedOfferSuccessfully!",
                // Default Message in English
              })
            );
            hideModal(true);
            setVisible(false);
          } else {
            if (window.getValue(response, "error.message")) {
              message.error(window.getValue(response, "error.message"));
            } else {
              message.error(
                intl.formatMessage({
                  // Matching ID as above
                  id: "nemo.failedArchiveMsg!",
                  // Default Message in English
                })
              );
            }
          }
        })
        .catch((error) => {
          console.log("error = ", error.toString());
          message.error(
            intl.formatMessage({
              // Matching ID as above
              id: "nemo.unknownError",
              // Default Message in English
            })
          );
        });
    } else if (actionType === appConstants.OFFER_STATUS_ACTION.PUBLISH) {
      updateOffer(offerInfo.offerId, appConstants.OFFER_STATUS.PUBLISHED)
        .then((response) => {
          setLoading(false);
          if (window.getValue(response, "success")) {
            message.success(
              intl.formatMessage({
                // Matching ID as above
                id: "nemo.publishedOfferSuccessfully!",
                // Default Message in English
              })
            );
            hideModal(true);
            setVisible(false);
          } else {
            if (window.getValue(response, "error.message")) {
              message.error(window.getValue(response, "error.message"));
            } else {
              message.error(
                intl.formatMessage({
                  // Matching ID as above
                  id: "nemo.failedToPublishOffer",
                  // Default Message in English
                })
              );
            }
          }
        })
        .catch((error) => {
          console.log("error = ", error.toString());
          message.error(
            intl.formatMessage({
              // Matching ID as above
              id: "nemo.unknownError",
              // Default Message in English
            })
          );
        });
    } else if (actionType === appConstants.OFFER_STATUS_ACTION.UNPUBLISH) {
      updateOffer(offerInfo.offerId, appConstants.OFFER_STATUS.UNPUBLISHED)
        .then((response) => {
          setLoading(false);
          if (window.getValue(response, "success")) {
            message.success(
              intl.formatMessage({
                // Matching ID as above
                id: "nemo.unpublishedOfferSuccessfully!",
                // Default Message in English
              })
            );
            hideModal(true);
            setVisible(false);
          } else {
            if (window.getValue(response, "error.message")) {
              message.error(window.getValue(response, "error.message"));
            } else {
              message.error(
                intl.formatMessage({
                  // Matching ID as above
                  id: "nemo.failedTounpublishOffer",
                  // Default Message in English
                })
              );
            }
          }
        })
        .catch((error) => {
          console.log("error = ", error.toString());
          message.error({
            // Matching ID as above
            id: "nemo.unknownError",
            // Default Message in English
          });
        });
    } else {
      hideModal(false);
      setVisible(false);
    }
  };

  const cancelModal = () => {
    hideModal();
    setVisible(false);
  };

  return (
    <Modal
      title={
        <React.Fragment>
          <InfoCircleOutlined className={styles["cart-popup-info-icon"]} />
          {actionType === appConstants.OFFER_STATUS_ACTION.PUBLISH ? (
            <FormattedMessage id="nemo.titleChangeToPublish" />
          ) : actionType === appConstants.OFFER_STATUS_ACTION.UNPUBLISH ? (
            <FormattedMessage id="nemo.titleChangeToUnPublish" />
          ) : actionType === appConstants.OFFER_STATUS_ACTION.ARCHIVE ? (
            <FormattedMessage id="nemo.titleChangeToArchive" />
          ) : (
            <Fragment></Fragment>
          )}
        </React.Fragment>
      }
      onCancel={cancelModal}
      visible={visible}
      data-testid="confirm-remove-supplier-modal"
      okText={<FormattedMessage id="nemo.yes" />}
      cancelText={<FormattedMessage id="nemo.cancel" />}
      footer={[
        <Button
          key="back"
          onClick={cancelModal}
          data-testid="change-offer-cancel-btn"
        >
          <FormattedMessage id="nemo.cancel" />
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          danger={
            actionType === appConstants.OFFER_STATUS_ACTION.UNPUBLISH ||
            actionType === appConstants.OFFER_STATUS_ACTION.ARCHIVE ||
            offerInfo.status.name === appConstants.OFFER_STATUS.ARCHIVED
          }
          onClick={handleOk}
          data-testid="change-offer-yes-btn"
        >
          <FormattedMessage id="nemo.yes" />
        </Button>,
      ]}
    >
      <Fragment>
        {(offerInfo.status.name === appConstants.OFFER_STATUS.UNPUBLISHED ||
          offerInfo.status.name === appConstants.OFFER_STATUS.ARCHIVED) &&
        actionType === appConstants.OFFER_STATUS_ACTION.PUBLISH ? (
          <p data-testid="publish-offer-change-str">
            <FormattedMessage id="nemo.publishOfferStatusChangeImpact" />
          </p>
        ) : (
          <Fragment />
        )}
        {offerInfo.status.name === appConstants.OFFER_STATUS.PUBLISHED &&
        actionType === appConstants.OFFER_STATUS_ACTION.UNPUBLISH ? (
          <p data-testid="unpublish-offer-change-str">
            <FormattedMessage id="nemo.unpublishOfferStatusChangeImpact" />
          </p>
        ) : (
          <Fragment />
        )}
        {offerInfo.status.name === appConstants.OFFER_STATUS.ARCHIVED &&
        actionType === appConstants.OFFER_STATUS_ACTION.UNPUBLISH ? (
          <p data-testid="archive-unpublish-offer-change-str">
            <FormattedMessage id="nemo.unpublishOfferFromArchiveStatusChangeImpact" />
          </p>
        ) : (
          <Fragment />
        )}
        {offerInfo.status.name === appConstants.OFFER_STATUS.UNPUBLISHED &&
        actionType === appConstants.OFFER_STATUS_ACTION.ARCHIVE ? (
          <p data-testid="unpublish-archive-offer-change-str">
            <FormattedMessage id="nemo.unpublishOfferArchiveImpact" />
          </p>
        ) : (
          <Fragment />
        )}
      </Fragment>
    </Modal>
  );
}
