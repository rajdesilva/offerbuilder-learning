import React, { Fragment } from "react";
import { Collapse, Form } from "antd";
import { useSelector } from "react-redux";
import { parsePropertyMarketingInfoToFormData } from "../../../helpers/utility";
import ViewDescriptionTabs from "./ViewDescriptionTabs";
import ViewImages from "./ViewImages";

const { Panel } = Collapse;
function ViewPropertyMarketingInfoList(props) {
  const { selectedProperties } = useSelector((state) => ({
    selectedProperties: window.getValue(state, "propertycart.cartItems"),
  }));
  return selectedProperties && selectedProperties.length > 0 ? (
    <Collapse
      data-testid="collapse"
      defaultActiveKey={
        "panel-" +
        selectedProperties[0].supplier +
        "-" +
        selectedProperties[0].channel +
        "-" +
        selectedProperties[0].propertyCode
      }
    >
      {selectedProperties.map((property, index) => (
        <Panel
          forceRender
          header={property.hotelName}
          key={
            "panel-" +
            property.supplier +
            "-" +
            property.channel +
            "-" +
            property.propertyCode
          }
        >
          <Fragment>
            <fieldset disabled={true}>
              <Form
                scrollToFirstError
                name={[
                  property.propertyCode,
                  property.supplier,
                  property.channel,
                  "propertyDescription",
                ]}
                initialValues={parsePropertyMarketingInfoToFormData(
                  selectedProperties
                )}
                form={props.form}
              >
                <ViewDescriptionTabs
                  isForProperty={true}
                  property={property}
                  index={index}
                />
                <Form.Item
                  valuePropName="images"
                  name={[index, "images"]}
                  required
                >
                  <ViewImages isForProperty={true} property={property} />
                </Form.Item>
              </Form>
            </fieldset>
          </Fragment>
        </Panel>
      ))}
    </Collapse>
  ) : (
    <Fragment />
  );
}

export default ViewPropertyMarketingInfoList;
