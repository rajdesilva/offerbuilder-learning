import { Row, Table } from "antd";
import React, { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styles from './css/UserRoleDescription.module.less';

const columns = [
  {
    title: <FormattedMessage id="nemo.roleTitle" />,
    dataIndex: "",
    width: "30%",
    
    render: (text, row) => <div>{row.role}</div>,
  },
  {
    title: <FormattedMessage id="nemo.definition" />,
    dataIndex: "",
    width: "70%",
    render: (row) => <Row>{row.definition}</Row>,
  },
];

export default function UserRoleDescription() {
  const intl = useIntl();
  const data = useMemo(
    () => [
      {
        key: '1',
        role: intl.formatMessage({
          id: "nemo.admin",
        }),
        definition: intl.formatMessage({
          id: "nemo.adminCanDoThis",
        }),
      },
      {
        key: '2',
        role: intl.formatMessage({
          id: "nemo.editor",
        }),
        definition: intl.formatMessage({
          id: "nemo.editorCanDoThis",
        }),
      },
      {
        key: '3',
        role: intl.formatMessage({
          id: "nemo.viewer",
        }),
        definition: intl.formatMessage({
          id: "nemo.viewerCanDoThis",
        }),
      },
    ],
    [intl]
  );
  return (
    <div className={styles["user-role-description"]}>
      <h3>
        <FormattedMessage id="nemo.userRoleDescription" />
      </h3>
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ y: 340 }}
        data-testid="user-role-list-table"
        pagination={false}
      />
    </div>
  );
}
