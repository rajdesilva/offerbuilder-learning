import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  browseSupplyActions,
  propertyCartActions,
  supplySearchActions,
} from "../actions";
import Modal from "antd/lib/modal/Modal";
import { InfoCircleOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { store } from "../../../redux/store";
import { isEqual } from "lodash";
import { newOfferActions } from "../../offers/actions";
import styles from "./css/ConfirmAddCartItemModal.module.less";

export function ConfirmAddCartItemModal({ row, hideModal, isEditFlow }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const currencyCode = useSelector(
    (state) => window.getValue(state, "searchparams.currencyCode"),
    isEqual
  );
  const destination = useSelector(
    (state) => window.getValue(state, "searchparams.destination"),
    isEqual
  );
  const lastSearchedDistance = useSelector(
    (state) => window.getValue(state, "searchparams.distance"),
    isEqual
  );
  const handleOk = () => {
    dispatch({
      type: newOfferActions.NEW_OFFER_DEEPLINK_DESTINATION,
      payload: destination,
    });
    dispatch({
      type: supplySearchActions.SET_SELECTED_CURRENCY,
      payload: currencyCode,
    });
    dispatch({
      type: newOfferActions.NEW_OFFER_LAST_SEARCH_DISTANCE,
      payload: lastSearchedDistance,
    });
    dispatch({
      type: browseSupplyActions.ADD_TEMP_EDITED_BRANDS,
      payload: {
        key: row ? row.propertyCode + row.supplier + row.channel : "",
        brands: store.getState().searchparams.brands,
      },
    });
    dispatch({
      type: propertyCartActions.ADD_PROPERTY_TO_CART,
      payload: row,
    });
    hideModal();
    setVisible(false);
  };

  const cancelModal = () => {
    hideModal();
    setVisible(false);
  };

  return (
    <Modal
      title={
        <div>
          <InfoCircleOutlined className={styles.cartPopupInfoIcon} />
          <FormattedMessage id="nemo.property.was.already.added" />
        </div>
      }
      visible={visible}
      destroyOnClose
      data-testid="property-already-added-modal"
      onOk={handleOk}
      onCancel={cancelModal}
    >
      <p>
        <FormattedMessage id="nemo.already.added.msg" />
      </p>
    </Modal>
  );
}
