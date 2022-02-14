import React, { Fragment } from "react";
import { Row, Col, Divider, Form, Input } from "antd";
import { FormattedMessage } from "react-intl";

const { TextArea } = Input;

function ViewDescriptions(props) {
  return (
    <Fragment>
      {props.isForProperty ? (
        <Fragment />
      ) : (
        <Row gutter={[8, 8]}>
          <Col span={4}>
            <FormattedMessage id="nemo.titleForCustomers" />
          </Col>
          <Col span={8}>
            <Form.Item colon={false} name={[props.languageId, "title"]}>
              <TextArea
                rows={1}
                data-testid="title-for-customers-offer"
                bordered={false}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row gutter={[8, 8]}>
        <Col span={4}>
          <FormattedMessage id="nemo.description" />
        </Col>
        <Col span={16}>
          <Form.Item
            colon={false}
            name={
              props.isForProperty
                ? [props.propertyIndex, props.languageId, "description"]
                : [props.languageId, "description"]
            }
          >
            <TextArea
              data-testid={
                props.isForProperty
                  ? "prop-supplier-description-textarea"
                  : "offer-supplier-description-textarea"
              }
              rows={6}
              bordered={false}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={4}>
          <FormattedMessage id="nemo.shortDescription" />
        </Col>
        <Col span={8}>
          <Form.Item
            colon={false}
            name={
              props.isForProperty
                ? [props.propertyIndex, props.languageId, "shortDescription"]
                : [props.languageId, "shortDescription"]
            }
          >
            <TextArea
              rows={1}
              data-testid={
                props.isForProperty
                  ? "prop-supplier-short-desc-input"
                  : "offer-supplier-short-desc-input"
              }
              bordered={false}
            />
          </Form.Item>
        </Col>
      </Row>
      {props.isForProperty ? (
        <Divider />
      ) : (
        <Row gutter={[8, 8]}>
          <Col span={4}>
            <FormattedMessage id="nemo.termsAndConditions" />
          </Col>
          <Col span={8}>
            <Form.Item
              colon={false}
              name={
                props.isForProperty
                  ? [
                      props.propertyIndex,
                      props.languageId,
                      "termsAndConditions",
                    ]
                  : [props.languageId, "termsAndConditions"]
              }
            >
              <TextArea
                rows={3}
                bordered={false}
                data-testid="offer-terms-n-conditions"
              />
            </Form.Item>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}

export default ViewDescriptions;
