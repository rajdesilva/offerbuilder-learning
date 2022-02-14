import React, { Fragment } from "react";
import { Row, Col, Input, Divider, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { marketingActions } from "../actions";
import { propertyCartActions } from "../../browseSupply/actions";

function Descriptions(props) {
  const intl = useIntl();
  const dispatch = useDispatch();
  return (
    <Fragment>
      {props.isForProperty ? (
        <Fragment />
      ) : (
        <Row gutter={[8, 8]} >
          <Col span={4}>
            <FormattedMessage id="nemo.titleForCustomers" />
          </Col>
          <Col span={8}>
            <Form.Item
              colon={false}
              name={[props.languageId, "title"]}
            >
              <Input
                data-testid={props.languageId + "-offer-title"}
                rows={1}
                maxLength={5000}
                onChange={(e) => {
                  dispatch({
                    type: marketingActions.SET_OFFER_TITLE,
                    payload: {
                      title: e.target.value,
                      languageId: props.languageId,
                    },
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row gutter={[8, 8]} >
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
              data-testid="supplier-description-textarea"
              rows={6}
              maxLength={50000}
              onChange={(e) => {
                dispatch(
                  props.isForProperty
                    ? {
                        type:
                          propertyCartActions.UPDATE_DESCRIPTION_FOR_CART_ITEM,
                        payload: {
                          description: e.target.value,
                          index: props.propertyIndex,
                          languageId: props.languageId,
                        },
                      }
                    : {
                        type: marketingActions.SET_OFFER_DESCRIPTION,
                        payload: {
                          description: e.target.value,
                          languageId: props.languageId,
                        },
                      }
                );
              }}
              placeholder={
                props.isForProperty
                  ? intl.formatMessage({
                      id: "nemo.supplierDidNotProvideDescription",
                      
                    })
                  : ""
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]} >
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
            <Input
              data-testid="supplier-desc-input"
              rows={1}
              maxLength={5000}
              onChange={(e) => {
                dispatch(
                  props.isForProperty
                    ? {
                        type:
                          propertyCartActions.UPDATE_SHORT_DESCRIPTION_FOR_CART_ITEM,
                        payload: {
                          shortDescription: e.target.value,
                          index: props.propertyIndex,
                          languageId: props.languageId,
                        },
                      }
                    : {
                        type: marketingActions.SET_OFFER_SHORT_DESCRIPTION,
                        payload: {
                          shortDescription: e.target.value,
                          languageId: props.languageId,
                        },
                      }
                );
              }}
              placeholder={
                props.isForProperty
                  ? intl.formatMessage({
                      id: "nemo.supplierDidNotProvideDescription",
                      
                    })
                  : ""
              }
            />
          </Form.Item>
        </Col>
      </Row>
      {props.isForProperty ? (
        <Divider />
      ) : (
        <Row gutter={[8, 8]} >
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
                maxLength={10000}
                onChange={(e) => {
                  dispatch({
                    type: marketingActions.SET_OFFER_TERMS_AND_CONDITION,
                    payload: {
                      termsAndConditions: e.target.value,
                      languageId: props.languageId,
                    },
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}

export default Descriptions;
