import React, { Fragment, useMemo } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { isEqual } from "lodash";

export default function ViewTarget() {
  const brands = useSelector(
    (state) => window.getValue(state, "newoffersettingsparam.brands"),
    isEqual
  );
  const columns = useMemo(
    () => [{
        title: <FormattedMessage id="nemo.supplier" />,
        className: "settings-property-list-item",
        width: "20%",
        render: (row) => {
          const supplierList = [];
          row.storefronts.forEach((storefront) => {
            storefront.suppliers.forEach((supplier) => {
              supplierList.push(supplier.name);
            });
          });
          return supplierList.join();
        },
      },

      {
        title: <FormattedMessage id="nemo.channels" />,
        className: "settings-property-list-item",
        width: "35%",
        render: (row) => {
          const channelsList = [];
          row.storefronts.forEach((storefront) => {
            storefront.suppliers.forEach((supplier) => {
              supplier.channels.forEach((channel) => {
                channelsList.push(channel.name);
              });
            });
          });
          return channelsList.join();
        },
      },
    ],
    []
  );

  return (
    <Table
      dataSource={brands}
      columns={columns}
      scroll={{ y: 340 }}
      className="settings-property-list"
      data-testid="property-list-table"
      pagination={false}
      expandable={{
        expandIcon: () => <Fragment />,
      }}
    />
  );
}
