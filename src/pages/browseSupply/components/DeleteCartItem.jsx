import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { propertyCartActions } from "../actions";
import { Button } from "antd";
import { newOfferActions } from "../../offers/actions";
import styles from "./css/DeleteCartItem.module.less";

export function DeleteCartItem({ row, isForSettings }) {
  const dispatch = useDispatch();
  return (
    <Button
      type="text"
      key={row ? row.propertyCode + row.supplier + row.channel : false}
      icon={
        <DeleteFilled
          className={styles.deletedFilled}
          data-testid="delete-filled-icon"
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              type: propertyCartActions.DELETE_CART_ITEM,
              payload: row,
            });
            if (isForSettings) {
              dispatch({
                type: newOfferActions.NEW_OFFER_DEEPLINK_INCLUDE_ALL_PROPERTIES,
                payload: true,
              });
            }
          }}
        />
      }
    ></Button>
  );
}
