import React, { Fragment, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  checkIfPropertiesHaveMultipleLocations,
  removePropertyForSelectedChannels,
  removePropertyForSelectedStorefront,
} from "../../helpers/utility";
import { removePropertyForSelectedSuppliers } from "../../helpers/utility";
import { FormattedMessage } from "react-intl";
import { List, Modal } from "antd";
import { useDispatch } from "react-redux";
import { newOfferActions } from "../offers/actions";
import { removePropertyForBrand } from "../../helpers/utility/removePropertyForBrand";
import styles from "./css/ConfirmRemoveSupplierModal.module.less";

export default function ConfirmRemoveSupplierModal({
  removedObjectInfo,
  hideModal,
}) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const handleOk = () => {
    if (removedObjectInfo.isBrand) {
      removedObjectInfo.removeBrand();
      removePropertyForBrand(
        removedObjectInfo.value,
        removedObjectInfo.brandIndex
      );
      dispatch({
        type: newOfferActions.NEW_OFFER_REMOVE_BRAND,
        payload: removedObjectInfo.brandIndex,
      });
    } else if (removedObjectInfo.isSupplier) {
      removePropertyForSelectedSuppliers(removedObjectInfo.value);
      dispatch({
        type: newOfferActions.NEW_OFFER_REMOVE_SUPPLIER,
        payload: removedObjectInfo,
      });
    } else if (removedObjectInfo.isStorefront) {
      removedObjectInfo.removeStoreFront();
      removePropertyForSelectedStorefront(removedObjectInfo.value);
      dispatch({
        type: newOfferActions.NEW_OFFER_REMOVE_STOREFRONT,
        payload: removedObjectInfo,
      });
    } else {
      removePropertyForSelectedChannels(removedObjectInfo.value);
      dispatch({
        type: newOfferActions.NEW_OFFER_REMOVE_CHANNEL,
        payload: removedObjectInfo,
      });
    }
    if (checkIfPropertiesHaveMultipleLocations()) {
      dispatch({
        type: newOfferActions.NEW_OFFER_DEEPLINK_DESTINATION,
        payload: null,
      });
    }
    hideModal();
    setVisible(false);
  };

  const cancelModal = () => {
    if (removedObjectInfo.onCancelRemove) {
      removedObjectInfo.onCancelRemove();
    }
    hideModal();
    setVisible(false);
  };

  return (
    <Modal
      title={
        <div>
          <InfoCircleOutlined className={styles["cart-popup-info-icon"]} />
          <FormattedMessage id="nemo.removingProperties" />
        </div>
      }
      visible={visible}
      onOk={handleOk}
      onCancel={cancelModal}
      data-testid="confirm-remove-supplier-modal"
      okText={<FormattedMessage id="nemo.ok" />}
      cancelText={<FormattedMessage id="nemo.cancel" />}
    >
      <Fragment>
        <p>
          <FormattedMessage id="nemo.warningMsgForPropertyRemoval" />
        </p>
        <List
          data-testid="confirm-remove-properties-list"
          dataSource={removedObjectInfo.properties}
          renderItem={(item) => (
            <List.Item
              className={styles.removePropertyListItem}
            >
              <div>
                {item.hotelName}, {item.city}, {item.country}
              </div>
            </List.Item>
          )}
        />
        <p className={styles["proceed-msg"]}>
          <FormattedMessage id="nemo.doYouWantToProceed?" />
        </p>
      </Fragment>
    </Modal>
  );
}
