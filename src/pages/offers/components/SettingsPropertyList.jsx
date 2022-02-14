import React, { Fragment, useMemo } from "react";
import { Row, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCartItem } from "../../browseSupply/components/DeleteCartItem";
import { displayMargin, getFormattedValue } from "../../../helpers/utility";
import { FormattedMessage } from "react-intl";
import { sortableElement, sortableContainer, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import { propertyCartActions } from "../../browseSupply/actions";
import styles from './css/SettingsPropertyList.module.less';

const DragHandle = sortableHandle(() => (
  <div className={styles.dragDiv}>
    <MenuOutlined className={styles.menuColor} />
  </div>
  
));

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);

export function SettingsPropertyList(props) {
  const dispatch = useDispatch();
  const selectedProperties = useSelector((state) =>
    window.getValue(state, "propertycart.cartItems")
  );
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(selectedProperties), oldIndex, newIndex).filter(el => !!el);
      console.log('Sorted items: ', newData);
      dispatch({
        type: propertyCartActions.UPDATE_ENTIRE_CART_LIST,
        payload: newData,
      })
    }
  };

  const DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass={styles["row-dragging"]}
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = selectedProperties ? selectedProperties.findIndex(x => x.key === restProps['data-row-key']) : 0;
    return <SortableItem index={index} {...restProps} />;
  };
  
  const columns = useMemo(
    () => [
      {
        title: '',
        width: "6%",
        className: styles['drag-visible'],
        render: () => <DragHandle />,
      },
      {
        title: <FormattedMessage id="nemo.properties" />,
        width: "25%",
        className: styles['drag-visible'],
        render: (text, row) => <div>{row.hotelName}</div>,
      },
      {
        title: <FormattedMessage id="nemo.location" />,
        className: "settings-property-list-item",
        width: "15%",
        render: (row) => (
          <Row>
            {row.city},&nbsp;
            {row.country} &nbsp;
          </Row>
        ),
      },
      {
        title: <FormattedMessage id="nemo.margin" />,
        dataIndex: "",
        className: styles["fs-fw-600"],
        width: "10%",
        render: (row) => (
          <Row>
            {displayMargin(row.lowestMargin, row.highestMargin) || (
              <FormattedMessage id="nemo.n/a" />
            )}
          </Row>
        ),
      },
      {
        title: <FormattedMessage id="nemo.supplier" />,
        className: "settings-property-list-item",
        width: "14%",
        render: (row) => (
          <Row>
            {row.supplier ? row.supplier.toUpperCase() : ""}-{row.channel}
          </Row>
        ),
      },

      {
        title: <FormattedMessage id="nemo.lcn" />,
        className: "settings-property-list-item",
        width: "8%",
        render: (row) => (
          <Row>{row.lcn ? <FormattedMessage id="nemo.yes" /> : ""}</Row>
        ),
      },
      {
        title: <FormattedMessage id="nemo.capitalPool" />,
        className: "settings-property-list-item",
        width: "17%",
        render: (row) => (
          <Fragment>
            {row.lcn ? (
              <Row>
                {row.remainingCapital ? (
                  getFormattedValue(row.remainingCapital)
                ) : (
                  <Fragment />
                )}{" "}
                <FormattedMessage id="nemo.eur" />
              </Row>
            ) : (
              <Fragment />
            )}
          </Fragment>
        ),
      },
      {
        width: "5%",
        render: (row) =>
          props.isForViewOnly ? (
            ""
          ) : (
            <Row justify="end">
              <DeleteCartItem row={row} isForSettings={true} />
            </Row>
          ),
      },
    ],
    [props.isForViewOnly]
  );

  return (
    <Table
      dataSource={selectedProperties}
      columns={columns}
      scroll={{ y: 340 }}
      className="settings-property-list"
      data-testid="property-list-table"
      pagination={false}
      rowKey="key"
      expandable={{
        expandIcon: () => <Fragment />,
      }}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
}
