import React, { Fragment, useEffect } from "react";
import { Row, Col, Form } from "antd";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import ViewDescriptionTabs from "./ViewDescriptionTabs";
import ViewImages from "./ViewImages";
import ViewPropertyMarketingInfoList from "./ViewPropertyMarketingInfoList";
import isEqual from "lodash.isequal";

function ViewMarketing({ submitForm }) {
  console.log("ViewMarketing", submitForm);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const newOfferMarketingInfo = useSelector((state) =>
    window.getValue(state, "newoffermarketinginfo.marketingInfo"),
    isEqual
  );

  useEffect(() => {
    form1.setFieldsValue(newOfferMarketingInfo);
  }, [form1, newOfferMarketingInfo]);

  return (
    <Fragment>
      <fieldset disabled={true} >
      <Form
        form={form1}
        name="offerInfo"
        initialValues={newOfferMarketingInfo}
        scrollToFirstError
        className="custom-form"
        data-testid="view-marketing-description-form"
      >
      <Row justify="space-between">
        <Col>
          <h3>
            <FormattedMessage id="nemo.offerMarketingAssets" />
          </h3>
        </Col>
      </Row>
      <ViewDescriptionTabs />
      </Form>
      </fieldset>
      <ViewImages images={newOfferMarketingInfo.images} />
      <ViewPropertyMarketingInfoList form={form2} />
    </Fragment>
  );
}

export default ViewMarketing;
