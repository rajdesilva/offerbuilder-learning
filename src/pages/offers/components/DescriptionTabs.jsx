import React from "react";
import { Tabs } from "antd";
import Descriptions from "./Descriptions";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
const { TabPane } = Tabs;

function DescriptionTabs(props) {
  const selectedLanguages = useSelector((state) =>
    window.getValue(state, "newoffermarketinginfo.selectedLanguages"),
    isEqual
  );
  const newOfferMarketingInfo = useSelector((state) =>
  window.getValue(state, "newoffermarketinginfo.marketingInfo"))
  return (
    <Tabs defaultActiveKey="EN" data-testid="description-tab" destroyInactiveTabPane>
      {selectedLanguages.map((language) => (
        <TabPane tab={language.name} key={language.id} forceRender destroyInactiveTabPane>
          <Descriptions
            data-testid="descriptions"
            language={language}
            propertyIndex={props.index}
            languageId={language.id}
            isForProperty={props.isForProperty}
            description={newOfferMarketingInfo[`${language.id}`]}
          />
        </TabPane>
      ))}
    </Tabs>
  );
}

export default DescriptionTabs;
