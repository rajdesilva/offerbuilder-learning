import React, { Fragment, useState, useCallback } from "react";
import { Input, message, Space, Spin } from "antd";
import { validateOfferId } from "../offers/service";
import { useIntl } from "react-intl";

function OfferId(props) {
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  
  return (
    <Space direction="horizontal" size="small">
      <Input
       
        placeholder={intl.formatMessage({
          id: "nemo.mediumInput",
        })}
        maxLength={24}
        data-testid="settings-offer-id"
        
      />
      {loading ? <Spin /> : <Fragment />}
    </Space>
  );
}

export default OfferId;
