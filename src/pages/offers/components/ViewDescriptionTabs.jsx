import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import ViewDescriptions from "./ViewDescriptions";
const { TabPane } = Tabs;

function ViewDescriptionTabs(props) {
  const selectedLanguages = useSelector((state) =>
    window.getValue(state, "newoffermarketinginfo.selectedLanguages"),
    isEqual
  );
  const newOfferMarketingInfo = useSelector((state) =>
  window.getValue(state, "newoffermarketinginfo.marketingInfo")
);
  return (
    <Tabs defaultActiveKey="EN" data-testid="description-tab">
      {selectedLanguages.map((language) => (
        <TabPane tab={language.name} key={language.id} forceRender>
          <ViewDescriptions
            data-testid="descriptions"
            language={language}
            propertyIndex={props.index}
            languageId={language.id}
            description={newOfferMarketingInfo[`${language.id}`]}
            isForProperty={props.isForProperty}
          />
        </TabPane>
      ))}
    </Tabs>
  );
}

export default ViewDescriptionTabs;
