import React, { Fragment } from "react";
import { Collapse, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Images from "./Images";
import DescriptionTabs from "./DescriptionTabs";
import { parsePropertyMarketingInfoToFormData } from "../../../helpers/utility";
import { propertyCartActions } from "../../browseSupply/actions";

const { Panel } = Collapse;
function PropertyMarketingInfoList(props) {
  const dispatch = useDispatch();
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
              <DescriptionTabs
                isForProperty={true}
                property={property}
                index={index}
              />
              <Form.Item
                valuePropName="images"
                name={[index, "images"]}
                required
              >
                <Images
                  property={property}
                  onChange={(images) => {
                    dispatch({
                      type: propertyCartActions.UPDATE_IMAGES_FOR_CART_ITEM,
                      payload: {
                        images,
                        index,
                      },
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </Fragment>
        </Panel>
      ))}
    </Collapse>
  ) : (
    <Fragment />
  );
}

export default PropertyMarketingInfoList;
