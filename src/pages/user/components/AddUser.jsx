import React, { Fragment, useState } from "react";
import { Row, Col, Input, Radio, Switch, Form, message } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import AddUserHeader from "./AddUserHeader";
import TextArea from "antd/lib/input/TextArea";
import { appConstants, Loader } from "../../../common";
import { addNewUser } from "../service";
import { history } from "../../../helpers";
import styles from "./css/AddUser.module.less";

export default function AddUser() {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const checkFormFields = () => {
    setLoading(true);
    form
      .validateFields()
      .then((formValues) => {
        setLoading(true);

        addNewUser({
          email: formValues.email,
          name: formValues.name,
          userRole: formValues.userRole,
          customText: formValues.customText,
          inviteEmail: formValues.inviteEmail,
        }).then((response) => {
          setLoading(false);
          if (window.getValue(response, "success")) {
            message.success(
              intl.formatMessage({
                id: "nemo.createUserSuccess",
              })
            );
            history.push("/user-management/list");
          } else {
            if (window.getValue(response, "error.message")) {
              message.error(window.getValue(response, "error.message"));
            } else {
              message.error(
                intl.formatMessage({
                  id: "nemo.failedToCreateUser",
                })
              );
            }
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log("form error", error);
        message.error(error.toString());
      });
  };

  return (
    <React.Fragment>
      <AddUserHeader
        checkFormFields={checkFormFields}
        resetForm={() => form.resetFields()}
      />
      <Loader spinning={loading}>
        <Form
          form={form}
          scrollToFirstError
          initialValues={{
            inviteEmail: true,
            userRole: appConstants.USER_ROLE.ADMIN,
          }}
          className={styles["add-user-form"]}
          data-testid="add-user-management-form"
        >
          <Row gutter={[8, 8]} className={styles["form-row"]}>
            <Col span={6} className={styles["col-1-text"]}>
              <FormattedMessage id="nemo.name" />
            </Col>
            <Col span={6}>
              <Form.Item
                name="name"
                data-testid="add-user-name-form-item"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="nemo.pleaseEnterName" />,
                  },
                  {
                    min: 5,
                    message: (
                      <FormattedMessage id="nemo.nameMustBeMinimum5Characters." />
                    ),
                  },
                  {
                    max: 30,
                    message: (
                      <FormattedMessage id="nemo.nameCanBe30CharactersLong" />
                    ),
                  },
                ]}
              >
                <Input
                  data-testid="add-user-name"
                  maxLength={30}
                  placeholder={intl.formatMessage({
                    id: "nemo.userName",
                  })}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[8, 8]} className={styles["form-row"]}>
            <Col span={6} className={styles["col-1-text"]}>
              <FormattedMessage id="nemo.email" />
            </Col>
            <Col span={6}>
              <Form.Item
                name="email"
                data-testid="add-user-email-form-item"
                rules={[
                  {
                    required: true,
                    pattern:
                      /^[a-zA-Z-0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
                    message: (
                      <FormattedMessage id="nemo.pleaseEnterValidEmail" />
                    ),
                  },
                ]}
              >
                <Input
                  data-testid="add-user-email"
                  type="email"
                  placeholder={intl.formatMessage({
                    id: "nemo.emailAddress",
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]} className={styles["form-row"]}>
            <Col span={6} className={styles["col-1-text"]}>
              <FormattedMessage id="nemo.userRole" />
            </Col>
            <Col span={6}>
              <Form.Item
                name="userRole"
                data-testid="add-user-role-form-item"
                initialValue="admin"
              >
                <Radio.Group>
                  <Radio
                    className={styles.radioBtn}
                    data-testid="admin-radio-btn"
                    value={appConstants.USER_ROLE.ADMIN}
                  >
                    <span className={styles.radioTextSpan}>
                      <b>
                        <FormattedMessage id="nemo.admin" />
                      </b>
                      <FormattedMessage id="nemo.adminCanDoThis" />
                    </span>
                  </Radio>
                  <Radio
                    className={styles.radioBtn}
                    data-testid="editor-radio-btn"
                    value={appConstants.USER_ROLE.EDITOR}
                  >
                    <span className={styles.radioTextSpan}>
                      <b>
                        <FormattedMessage id="nemo.editor" />
                      </b>
                      <FormattedMessage id="nemo.editorCanDoThis" />
                    </span>
                  </Radio>
                  <Radio
                    className={styles.radioBtn}
                    data-testid="viewer-radio-btn"
                    value={appConstants.USER_ROLE.VIEWER}
                  >
                    <span className={styles.radioTextSpan}>
                      <b>
                        <FormattedMessage id="nemo.viewer" />
                      </b>
                      <FormattedMessage id="nemo.viewerCanDoThis" />
                    </span>
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]} className={styles["form-row"]}>
            <Col span={6} className={styles["col-1-text"]}>
              <FormattedMessage id="nemo.sendAnInviteEmail" />
            </Col>
            <Col span={6}>
              <Form.Item
                name="inviteEmail"
                valuePropName="checked"
                data-testid="add-user-send-invite-form-item"
              >
                <Switch data-testid="add-user-send-invite-switch" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.inviteEmail !== currentValues.inviteEmail
            }
          >
            {({ getFieldValue }) => {
              return getFieldValue("inviteEmail") ? (
                <Row gutter={[8, 8]} className={styles["form-row"]}>
                  <Col span={6} className={styles["col-1-text"]}>
                    <FormattedMessage id="nemo.emailContent" />
                  </Col>
                  <Col span={14}>
                    <Row>
                      <FormattedMessage id="nemo.customTextAddedAndWillBeListedBelow" />
                    </Row>
                    <Form.Item
                      name="customText"
                      className={styles.textFormItem}
                      data-testid="add-user-email-content-form-item"
                    >
                      <TextArea
                        data-testid="add-user-email-invite-textarea"
                        rows={6}
                        allowClear
                        placeholder={intl.formatMessage({
                          id: "nemo.textareaPlaceholder",
                        })}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                <Fragment />
              );
            }}
          </Form.Item>
        </Form>
      </Loader>
    </React.Fragment>
  );
}
