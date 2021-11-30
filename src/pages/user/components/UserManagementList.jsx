import React, { Fragment, useEffect, useMemo } from "react";
import { Row, Table, Skeleton, Col } from "antd";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { isEqual } from "lodash";
import { DeleteUserItem } from ".";
import { getUsersList } from "../service";
import { appConstants } from "../../../common";
import styles from './css/UserManagementList.module.less';

export default function UserManagementList() {
  let { userList, loading } = useSelector(
    (state) => window.getValue(state, "usermanagement"),
    isEqual
  );

  useEffect(() => {
    getUsersList();
  }, []);

  const columns = useMemo(
    () => [
      {
        title: <FormattedMessage id="nemo.name" />,
        dataIndex: "",
        width: "20%",
        render: (text, row) => (
          <div>
            {row.name ? (
              row.name
            ) : (
              <FormattedMessage id="nemo.nameNotSpecified" />
            )}
          </div>
        ),
      },
      {
        title: <FormattedMessage id="nemo.userEmailAddress" />,
        dataIndex: "",
        width: "40%",
        render: (row) => <Row>{row.email || "-"}</Row>,
      },
      {
        dataIndex: "",
        title: <FormattedMessage id="nemo.userRole" />,
        width: "40%",
        render: (row) => (
          <Fragment>
            <div>
              {row.userRole && appConstants.DISPLAY_USER_ROLE[`${row.userRole}`]
                ? appConstants.DISPLAY_USER_ROLE[`${row.userRole}`]
                : "-"}
              &nbsp;
              {row.userRole &&
              row.status &&
              row.status !== appConstants.USER_STATUS.ACTIVE
                ? `(${appConstants.USER_STATUS[`${row.status}`]})`
                : ""}
            </div>
          </Fragment>
        ),
      },
      {
        dataIndex: "",
        render: (row) => {
          return (
            <Row justify="end">
              <DeleteUserItem row={row} />
            </Row>
          );
        },
      },
    ],
    []
  );

  return (
    <Fragment>
      <Skeleton loading={loading} active>
        <Table
          dataSource={userList}
          columns={columns}
          data-testid="user-management-list-table"
          pagination={{
            className: styles.userManagementListPagination,
            defaultPageSize: 10,
            onChange: () => window.scrollTo(0,0),
            showSizeChanger: true,
            showTotal: function (total, range) {
              return (
                <Row justify="space-between" className={styles["width-100"]}>
                  <Col>
                    <FormattedMessage id="nemo.displaying" /> &nbsp;
                    {range[0]} - {range[1]}&nbsp;
                    <FormattedMessage id="nemo.of" /> &nbsp;{total}
                  </Col>
                  <Col>
                    <FormattedMessage id="nemo.rowPerPage" /> &nbsp;
                  </Col>
                </Row>
              );
            },
          }}
        />
      </Skeleton>
    </Fragment>
  );
}
