import React from "react";
import { Button, Row, Col, Divider } from "antd";
import { FormattedMessage } from "react-intl";
import { history } from "../../../helpers";
import styles from './css/AddUserHeader.module.less';

export default function AddUserHeader({ checkFormFields, resetForm }) {

  return (
    <React.Fragment>
       <Row justify="space-between">
        <Col>
          <h2>
            <FormattedMessage id="nemo.addUser" />
          </h2>
        </Col>
        <Col>
          <Button
            type="primary"
            size="large"
            ghost
            className={styles.cancelBtn}
            onClick={() => {
              resetForm();
              history.push("/user-management/list");
            }}
            data-testid="user-management-add-user-cancel-btn"
          >
            <FormattedMessage id="nemo.cancel" />
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={checkFormFields}
            data-testid="user-management-add-user-create-btn"
          >
            <FormattedMessage id="nemo.create" />
          </Button>
        </Col>
      </Row>
      <Divider className={styles["divider"]} />
    </React.Fragment>
  );
}
