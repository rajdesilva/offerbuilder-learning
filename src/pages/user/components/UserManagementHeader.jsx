import React, { Fragment } from "react";
import { Button, Row, Col, Divider } from "antd";
import { Link, useRouteMatch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { checkIfUserHasRole } from "../../../helpers/utility";
import { appConstants } from "../../../common";
import styles from './css/UserManagementHeader.module.less';

export default function UserManagementHeader() {
  const isUsermanagementList = useRouteMatch({
    path: "/user-management/list",
    strict: true,
    sensitive: true,
  });
  return (
    <React.Fragment>
      <Row justify="space-between" className={styles["bs-header"]}>
        <Col>
          <h2>
            <FormattedMessage id="nemo.userManagement" />
          </h2>
        </Col>
        {isUsermanagementList && checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) ? (
          <Col>
              <Button
                type="primary"
                size="large"
                data-testid="user-management-add-user-btn"
              >
                <Link
                  to={{
                    pathname: "/user-management/add-user",
                  }}
                >
                  <FormattedMessage id="nemo.addUser" />
                </Link>
              </Button>
          </Col>
        ) : (
          <Fragment />
        )}
      </Row>
    {isUsermanagementList ? <Divider className={styles["divider"]} /> : <Fragment />}
    </React.Fragment>
  );
}
