import { Button, Empty } from "antd";
import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { history } from "../../../helpers";
import styles from "./css/EmptyList.module.less";

export function EmptyList(props) {
  return (
    <div className={styles.emptyList}>
      <div className={styles.screenTitle}>
        <FormattedMessage id="nemo.noResultsForRequest" />
      </div>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 100,
        }}
        description={
          <span className={styles.emptyDescription}>
            <FormattedMessage id="nemo.searchParamCantFoundProperties" />
            <br />
            <FormattedMessage id="nemo.youCouldTryToChangeReq" />
          </span>
        }
      >
        {props.show || props.isEditFlow ? (
          <Fragment />
        ) : (
          <Button
            type="primary"
            className={styles.backBtn}
            data-testid="back-btn"
            onClick={() => {
              if (props.prev) {
                props.prev();
              } else {
                history.goBack();
              }
            }}
          >
            <FormattedMessage id="nemo.backToPropertiesSearch" />
          </Button>
        )}
      </Empty>
    </div>
  );
}
