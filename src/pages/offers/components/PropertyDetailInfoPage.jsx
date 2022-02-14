import React, { Fragment, useState } from "react";
import { Row, Col, Button, Divider, Rate, Image, Empty } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import defaultImg from "../../../assets/images/default-img.svg";
import styles from "./css/PropertyDetailInfoPage.module.less";
import { history } from "../../../helpers";
import PropertyImageCarousel from "./PropertyImageCarousel";
import PropertyDetailsImageModal from "./PropertyDetailsImageModal";

function PropertyDetailInfoPage() {
  const [displayCarousel, setDisplayCarousel] = useState({
    display: false,
    startIndex: 0,
  });
  const [displayGallery, setDisplayGallery] = useState(false);
  let property = {};
  try {
    property = JSON.parse(sessionStorage.getItem("property-info"));
  } catch (e) {
    console.log(e.toString());
  }

  const hideCarousel = () =>
    setDisplayCarousel({
      display: false,
      startIndex: 0,
    });
  const hideModal = () => setDisplayGallery(false);
  const imagesLength = window.getValue(property, "images.length");
  return (
    <Fragment>
      <Row className={styles.nameRow}>
        <Col span={24}>
          <Button
            type="text"
            data-testid="property-info-back-btn"
            className={styles["back-arrow-btn"]}
            onClick={() => {
              sessionStorage.removeItem("property-info");
              history.goBack();
            }}
          >
            <ArrowLeftOutlined />
          </Button>
          <span className={styles["property-name"]}>{property.hotelName}</span>
        </Col>
      </Row>
      <Row
        gutter={[8, 8]}
        className={styles.propertyImagesRow}
      >
        {property.images && property.images.length > 0 ? (
          <Fragment>
            <Col span={imagesLength === 1 ? 24 : 12}>
              <Image
                src={window.getValue(property, "images[0]")}
                className={styles["property-big-img"]}
                data-testid="property-image-0"
                preview={false}
                onClick={() => {
                  setDisplayCarousel({
                    display: true,
                    startIndex: 0,
                  });
                }}
                onError={(ev) => (ev.target.src = defaultImg)}
              ></Image>
            </Col>
            {imagesLength > 1 ? <Col span={imagesLength === 1 ? 0 : 12}>
              <Row gutter={[8, 8]}>
                <Col span={imagesLength === 2 ? 24 : 12}>
                  <Image
                    src={window.getValue(property, "images[1]")}
                    className={styles["property-other-imgs"]}
                    data-testid='property-image-1'
                    preview={false}
                    onClick={() => {
                      setDisplayCarousel({
                        display: true,
                        startIndex: 1,
                      });
                    }}
                    onError={(ev) => (ev.target.src = defaultImg)}
                  ></Image>
                </Col>
                <Col span={imagesLength === 2 ? 0 : 12} className={styles.imgCol}>
                  <Image
                    src={window.getValue(property, "images[2]")}
                    className={styles["property-other-imgs"]}
                    onClick={() => {
                      setDisplayCarousel({
                        display: true,
                        startIndex: 2,
                      });
                    }}
                    data-testid='property-image-2'
                    preview={false}
                    onError={(ev) => (ev.target.src = defaultImg)}
                  ></Image>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={imagesLength > 3 ? 8 : 0} className={styles.imgCol}>
                  <Image
                    src={window.getValue(property, "images[3]")}
                    className={styles["property-other-imgs"]}
                    onClick={() => {
                      setDisplayCarousel({
                        display: true,
                        startIndex: 3,
                      });
                    }}
                    preview={false}
                    data-testid='property-image-3'
                    onError={(ev) => (ev.target.src = defaultImg)}
                  ></Image>
                </Col>
                <Col span={imagesLength > 4 ? 8 : 0} className={styles.imgCol}>
                  <Image
                    src={window.getValue(property, "images[4]")}
                    className={styles["property-other-imgs"]}
                    onClick={() => {
                      setDisplayCarousel({
                        display: true,
                        startIndex: 4,
                      });
                    }}
                    preview={false}
                    data-testid='property-image-4'
                    onError={(ev) => (ev.target.src = defaultImg)}
                  ></Image>
                </Col>
                <Col span={imagesLength > 5 ? 8 : 0} className={styles.imgCol}>
                  <Image
                    src={window.getValue(property, "images[5]")}
                    className={imagesLength > 6 ? styles.blurrImage : styles.lastImg}
                    data-testid='property-image-5'
                    preview={false}
                    onClick={() => {
                      if(imagesLength === 6) {
                        setDisplayCarousel({
                          display: true,
                          startIndex: 5,
                        });
                      } else {
                        setDisplayGallery(true);
                      }
                    }}
                    onError={(ev) => (ev.target.src = defaultImg)}
                  ></Image>
                  {imagesLength > 6 ? (
                    <Button
                      data-testid="property-img-show-more-btn"
                      type="link"
                      className={styles["property-img-show-more-btn"]}
                      onClick={() => setDisplayGallery(true)}
                    >
                      {imagesLength - 5}&nbsp;
                      <FormattedMessage id="nemo.more" />
                    </Button>
                  ) : (
                    <Fragment />
                  )}
                </Col>
              </Row>
            </Col>
            : <Fragment />}
         </Fragment>
        ) : (
          <Col span={24} className={styles.emptyCol}>
            <Empty
              data-testid={property.propertyCode + "-property-empty-image"}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              className={styles["empty-img"]}
              description={
                <span>
                  <FormattedMessage id="nemo.noImages" />
                  &nbsp;
                </span>
              }
            />
          </Col>
        )}
      </Row>

      <Row className={styles.rowLCN}>
        <Col span={5}>
          {property.lcn ? (
            <Fragment>
              <div
                className={styles["lcn-text"]}
                data-testid="property-details-lcn"
              >
                <FormattedMessage id="nemo.localCapitalNetwork" />
              </div>
            </Fragment>
          ) : (
            <Fragment />
          )}
          <div className={styles["address-title"]}>
            <FormattedMessage id="nemo.address" />
          </div>

          {property.city ? (
            <div
              className={styles["address"]}
              data-testid="property-details-address"
            >
              {property.city},&nbsp;{property.country}
            </div>
          ) : (
            <FormattedMessage id="nemo.n/a" />
          )}
          <div className={styles["star-rating"]}>
            <FormattedMessage id="nemo.starRating" />
          </div>
          {property.rating ? (
            <Rate
              disabled
              defaultValue={property.rating}
              data-testid="property-details-star-rating"
            />
          ) : (
            <FormattedMessage id="nemo.n/a" />
          )}
          <div className={styles["trust-you-title"]}>
            "<FormattedMessage id="nemo.trustYou" />"{" "}
            <FormattedMessage id="nemo.rating" />
          </div>

          <Row className={styles["trust-you"]}>
            {window.getValue(property, "trustyou.info.reviews_count") ? (
              <Fragment>
                <span
                  className={styles["trust-you-grade"]}
                  data-testid="property-details-trust-you"
                >
                  {window.getValue(property, "trustyou.info.score_description")}
                </span>
                <span className={styles["trust-you-score"]}>
                  {window.getValue(property, "trustyou.info.score")}
                </span>
              </Fragment>
            ) : (
              <FormattedMessage id="nemo.n/a" />
            )}
          </Row>

          {window.getValue(property, "trustyou.info.reviews_count") ? (
            <Row
              className={styles["trust-you-review"]}
              data-testid="property-trust-you-review"
            >
              <FormattedMessage id="nemo.basedOn" />
              &nbsp;{window.getValue(property, "trustyou.info.reviews_count")}
              &nbsp;
              <FormattedMessage id="nemo.reviews" />
            </Row>
          ) : (
            <Fragment />
          )}
        </Col>
        <Col span={1}></Col>
        <Col span={18}>
          <div className={styles["property-description"]}>
            {property.description ? (
              property.description
            ) : (
              <FormattedMessage id="nemo.n/a" />
            )}
          </div>
        </Col>
      </Row>
      <Divider className={styles["description-divider"]} />
      {displayCarousel.display ? (
        <PropertyImageCarousel
          images={property.images}
          hideCarousel={hideCarousel}
          startIndex={displayCarousel.startIndex}
        />
      ) : (
        <Fragment />
      )}
      {displayGallery ? (
        <PropertyDetailsImageModal 
          images={property.images}
          hideModal={hideModal}
        />
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
}

export default PropertyDetailInfoPage;
