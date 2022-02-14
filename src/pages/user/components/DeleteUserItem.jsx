import React, { useState, Fragment } from "react";
import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Divider, message, Row, Modal } from "antd";
import { useIntl, FormattedMessage } from "react-intl";
import { deleteUser, getUsersList } from "../service";
import styles from "./css/DeleteUserItem.module.less";

export default function DeleteUserItem({ row }) {
  const intl = useIntl();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const confirm = (e) => {
    e.stopPropagation();
    setLoading(true);
    deleteUser(row.email, row.userRole).then((response) => {
      setLoading(false);
      if (window.getValue(response, "success")) {
        message.success(
          intl.formatMessage({
            id: "nemo.deletedUserSuccess",
          })
        );
        setVisible(false);
        getUsersList();
      } else {
        if (window.getValue(response, "error.message")) {
          message.error(window.getValue(response, "error.message"));
        } else if (window.getValue(response, "message")) {
          message.error(response.message);
        } else {
          message.error(
            intl.formatMessage({
              id: "nemo.failedToRemoveUser",
            })
          );
        }
      }
    });
  };

  return (
    <Fragment>
      <Modal
        data-testid={row.email+"-remove-user-confirm-modal"}
        centered
        destroyOnClose
        maskClosable
        visible={visible}
        key={row.name + row.email + '-modal'}
        onOk={confirm}
        okText={<FormattedMessage id="nemo.removeUser" />}
        confirmLoading={loading}
        onCancel={() => setVisible(false)}
      >
        <div className="ant-modal-confirm-body">
          <ExclamationCircleOutlined className={styles.exclaimation}/>
          <span className="ant-modal-confirm-title">
            <FormattedMessage id="nemo.removeUser" />
          </span>
          <Divider />
          <div className="ant-modal-confirm-content">
            <FormattedMessage id="nemo.wantToDeleteUser" />
            <Row className={styles.dialogText}>
              {row.name ? (
                row.name
              ) : (
                <FormattedMessage id="nemo.nameNotSpecified" />
              )}
            </Row>
            <Row className={styles.dialogText}>{row.email || "-"}</Row>
          </div>
        </div>
      </Modal>

      <Button
        type="text"
        loading={loading}
        data-testid={row.email + "-delete-user-btn"}
        key={row.name + row.email + '-btn'}
        onClick={()=>setVisible(true)}
        icon={<DeleteFilled className={styles["deleted-filled"]} />}
      ></Button>
    </Fragment>
  );
}
