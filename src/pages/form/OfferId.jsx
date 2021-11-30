import React, { Fragment, useState, useCallback } from "react";
import { Input, message, Space, Spin } from "antd";
import { validateOfferId } from "../offers/service";
import { useIntl } from "react-intl";

function OfferId(props) {
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const checkOfferId = useCallback(
    (offerId) => {
      if (/^[A-Za-z0-9_]{3,100}$/.test(offerId)) {
        setLoading(true);
        try {
          validateOfferId(offerId).then((response) => {
            if (response.success && response.data && response.data.available) {
              setLoading(false);
              if (props.onChange) {
                props.onChange(offerId);
              }
            } else {
              setLoading(false);
              if (props.onChange) {
                props.onChange("error");
              }
            }
          });
        } catch (e) {
          message.error(e.toString());
          return null;
        }
      } else {
        if (props.onChange) {
          props.onChange(offerId);
        }
      }
    },
    [props]
  );
  return (
    <Space direction="horizontal" size="small">
      <Input
        defaultValue={props.value}
        placeholder={intl.formatMessage({
          id: "nemo.mediumInput",
        })}
        maxLength={24}
        data-testid="settings-offer-id"
        onChange={(event) => checkOfferId(event.target.value)}
      />
      {loading ? <Spin /> : <Fragment />}
    </Space>
  );
}

export default OfferId;
