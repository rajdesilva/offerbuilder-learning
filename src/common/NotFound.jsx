import React from "react";
import { Row } from "antd";
import { FormattedMessage } from "react-intl";
import styles from './css/NotFound.module.less';

function NotFound() {
  return (
    <Row
      justify="center"
      align="middle"
      className={styles.notFound}
      data-testid="not-found"
    >
      <h1>
        <FormattedMessage id="nemo.urlNotFound" />
      </h1>
    </Row>
  );
}

export default NotFound;
