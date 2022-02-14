import React, { Fragment } from "react";
import { Button, Result } from "antd";
import { useParams, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { resetApplicationReduxAndStorage } from "../../../helpers/utility";
import styles from "./css/OfferCreatedSuccess.module.less";

function OfferCreatedSuccess() {
  const { offerId } = useParams();
  return (
    <div
      className={styles.offerCreateSuccess}
      data-testid="offer-created-success"
    >
      <Result
        status="success"
        title={<FormattedMessage id="nemo.offerWasCreatedSuccessfully" />}
        subTitle={
          <Fragment>
            <FormattedMessage id="nemo.offerId" /> <b>{offerId}</b>.&nbsp;
            <FormattedMessage id="nemo.offerIsReady" />
          </Fragment>
        }
        extra={[
          <Button
            data-testid="back-to-overview-btn"
            onClick={resetApplicationReduxAndStorage}
          >
            <Link to="/">
              <FormattedMessage id="nemo.backToOverview" />
            </Link>
          </Button>,
        ]}
      />
    </div>
  );
}

export default OfferCreatedSuccess;
