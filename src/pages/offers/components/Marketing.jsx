import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Form, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import OfferDescriptions from "./DescriptionTabs";
import LanguageSettingsModal from "./LanguageSettingsModal";
import PropertyMarketingInfoList from "./PropertyMarketingInfoList";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { marketingActions } from "../actions";
import OfferImages from "./OfferImages";
import styles from "./css/Marketing.module.less";
import isEqual from "lodash.isequal";

function Marketing({ submitForm }) {
  const dispatch = useDispatch();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const newOfferMarketingInfo = useSelector(
    (state) => window.getValue(state, "newoffermarketinginfo.marketingInfo"),
    isEqual
  );

  useEffect(() => {
    form1.setFieldsValue(newOfferMarketingInfo);
  }, [form1, newOfferMarketingInfo]);

  useEffect(() => {
    if (submitForm) {
      submitForm(form1, form2);
    }
  }, [form1, form2, submitForm]);
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <Fragment>
      <Form
        form={form1}
        initialValues={newOfferMarketingInfo}
        scrollToFirstError
        className={styles["marketing-form"]}
        data-testid="marketing-description-form"
      >
        <Row justify="space-between">
          <Col>
            <h3>
              <FormattedMessage id="nemo.offerMarketingAssets" />
            </h3>
          </Col>
          <Col>
            <div className={styles["ml-auto"]}>
              <Button
                ghost
                type="primary"
                data-testid="marketing-description-lang-settings-btn"
                icon={<SettingOutlined />}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                &nbsp;
                <FormattedMessage id="nemo.languageSettings" />
              </Button>
            </div>
          </Col>
        </Row>
        <OfferDescriptions />
        <Form.Item valuePropName="images" name="images">
          <OfferImages
            type="offer"
            onChange={(images) => {
              dispatch({
                type: marketingActions.SET_OFFER_IMAGE_ARRAY,
                payload: images,
              });
            }}
          />
        </Form.Item>
      </Form>
      <PropertyMarketingInfoList form={form2} />
      {showModal ? (
        <LanguageSettingsModal hideModal={hideModal} />
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
}

export default Marketing;
