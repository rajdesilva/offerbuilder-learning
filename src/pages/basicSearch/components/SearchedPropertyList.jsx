import React, { Fragment, useEffect, useState } from "react";
import {
  Col,
  Row,
  Rate,
  Table,
  Empty,
  Button,
  Skeleton,
  message,
  Spin,
  Divider,
  Space,
} from "antd";
import moment from "moment/min/moment-with-locales";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import defaultImg from "../../../assets/images/default-img.svg";
import copyIcon from "../../../assets/images/copy-icon.svg";
import {
  browseSupplyActions,
  propertyCartActions,
  supplySearchActions,
} from "../actions";
import { ConfirmAddCartItemModal } from "./ConfirmAddCartItemModal";
import {
  displayMargin,
  getFormattedValue,
  getMarketPriceForPropertyFromList,
  isParentOrChildrenPropertyAdded,
  isPropertySelected,
  getParsedProperty,
} from "../../../helpers/utility";
import { FormattedMessage, useIntl } from "react-intl";
import { appConstants } from "../../../common";
import { EmptyList } from "./EmptyList";
import { store } from "../../../redux/store";
import { isEqual } from "lodash";
import { searchSupply } from "../service";
import { newOfferActions } from "../../offers/actions";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./css/SearchedPropertyList.module.less";

import serviceGlobal from '../api-service';
import { advancedSearch } from '../service';

import SearchResultPagination from './SearchResultPagination';

import heartImg from '../../../assets/images/hrt.svg'
import noImg from '../../../assets/images/no-img.svg'
import star from '../../../assets/images/start.svg'

export function SearchedPropertyList({ prev, show, isEditFlow }) {
  const intl = useIntl();
  const {
    selectedProperties,
    loading,
    marketPriceLoading,
    includeMarketPrice,
  } = useSelector((state) => ({
    selectedProperties: window.getValue(state, "propertycart.cartItems"),
    loading: window.getValue(state, "searchedproperties.loading"),
    marketPriceLoading: window.getValue(state, "marketprice.loading"),
    includeMarketPrice: window.getValue(
      state,
      "marketprice.includeMarketPrice"
    ),
  }));
  let properties = useSelector((state) =>
    window.getValue(state, "searchedproperties.properties")
  );
  const currencyCode = useSelector(
    (state) => window.getValue(state, "searchparams.currencyCode"),
    isEqual
  );
  const lastSearchedDistance = useSelector(
    (state) => window.getValue(state, "searchparams.distance"),
    isEqual
  );
  const destination = useSelector(
    (state) => window.getValue(state, "searchparams.destination"),
    isEqual
  );
  const [modalInfo, setModalInfo] = useState({});
  const dispatch = useDispatch();
  const match = useRouteMatch({
    path: "/offers/create-new-offer/:step?",
    strict: true,
    sensitive: true,
  });
  const [expandedRows, setExpandedRows] = useState([]);


  useEffect(() => {
    dispatch({
      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_BASIC_REDUX_STATE_ALL,
      payload: {},
    });
  }, [])


  const [htName, sethtName] = useState("");
  const [haddress, setaddress] = useState("");
  const [hzip, setzip] = useState("");
  const [hcity, setCity] = useState("");
  const [hdistance, setdistance] = useState("");
  const [hcountry, setcountry] = useState("");
  const [hlatitude, setlatitude] = useState("");
  const [hlongitude, setlongitude] = useState("");
  const [hgroupType, setgroupType] = useState("ALL");
  const [hsearchType, setsearchType] = useState("");
  const [hpage, setpage] = useState(0);
  const [hpagesize, setpageSize] = useState(10);
  const [sortCriteria, setsortCriteria] = useState("");
  const [sortOrder, setsortOrder] = useState("");

  const [resultvalue, setResultValue] = useState([]);
  const [loadspinner, setloadsppinner] = useState(false);
  const [pagin, setpagin] = useState(false);
  const [showftr, setftr] = useState(false);




  const searchParamsbasic = useSelector((state) =>
    state.searchParamsBasic
  );

  useEffect(() => {
    if (searchParamsbasic) {

      let params = {};
      let propertyType = "ALL";
      let pageSizes = 10;
      let srchType = "BASIC";
      let pageOff = 0;

      if (searchParamsbasic.Address) {
        params["address"] = searchParamsbasic.Address;
      }
      if (searchParamsbasic.distance) {
        params["distance"] = searchParamsbasic.distance;
      }
      if (searchParamsbasic.countryCode) {
        params["countryCode"] = searchParamsbasic.countryCode;
      }
      if (searchParamsbasic.hotelName) {
        params["hotelName"] = searchParamsbasic.hotelName;
      }
      if (searchParamsbasic.latitude) {
        params["latitude"] = searchParamsbasic.latitude;
      }
      if (searchParamsbasic.longitude) {
        params["longitude"] = searchParamsbasic.longitude;
      }
      if (searchParamsbasic.zip) {
        params["zip"] = searchParamsbasic.zip;
      }
      if (searchParamsbasic.city) {
        params["city"] = searchParamsbasic.city;
      }
      if (searchParamsbasic.propertyGroupType) {
        propertyType = searchParamsbasic.propertyGroupType;
      }
      if (searchParamsbasic.pageSize) {
        pageSizes = searchParamsbasic.pageSize;
      }
      if (searchParamsbasic.globalSearchType) {
        srchType = searchParamsbasic.globalSearchType;
      }
      // if (searchParamsbasic.pageOffset) {
      //   pageOff = searchParamsbasic.pageOffset;
      // }

      retrievList(params, propertyType, pageSizes, srchType)
    }
  }, [searchParamsbasic]);


  const retrievList = (params, prType, prSize, srType) => {
    if (Object.keys(params).length > 0) {
      setloadsppinner(true);
      setftr(false)
      advancedSearch(params, srType, hpage, prSize, sortCriteria, sortOrder, prType)
        .then((response) => {
          store.dispatch({
            type: browseSupplyActions.BROWSE_SUPPLY_SEARCH_LOADING,
            payload: false,
          });
          console.log(response);

          if (response) {
            response.result.hasNext ? setpagin(true) : setpagin(false)
          }
          if (response.success) {
            setftr(true)
          }

          setResultValue(response.result.result)
          setloadsppinner(false);
        })
        .catch((e) => {
          console.log(e);
          setloadsppinner(false);
        });
    }
  };

  return (
    <Fragment>
      {
        loadspinner
          ? <Skeleton loading={loadspinner} active></Skeleton>
          :
          <div className={styles.wrapW}>

                {resultvalue &&
                  resultvalue.map((item) => {
                    const { id, name, address } = item;
                    let supplyName = [];
                    let imgLink = [];
                    let isImage = false;
                    let rating = [];
                    let isRate = false;
                    let imgStar = [];
                    return (
                      <Fragment>
                        {
                          item.knownIds &&
                          item.knownIds.map((subitem) => {
                            supplyName.unshift(subitem.idScheme.split(','));
                            if (subitem.property && subitem.property.info && subitem.property.info.images) {
                              imgLink.unshift(subitem.property.info.images);

                              subitem.property.info.images
                                ? isImage = true
                                : isImage = false
                            }
                            if (subitem.property && subitem.property.info && subitem.property.info.award) {
                                subitem.property.info.award
                                ? isRate = true
                                : isRate = false

                                rating.unshift(subitem.property.info.award.value);

                                // for(let i =0; i<=0; rating){
                                //   imgStar.push(`<img src=${star}/>`)
                                // }
                            }
                          })
                        }
                        <div key={id} className={styles.trWrap}>
                          <div className={styles.imgwrap}>
                            {/* {console.log(name, imgLink)} */}
                            {isImage ? <img src={imgLink[0][0]} alt="" width="121" /> :
                              <div className={styles.noImg}>
                                <img src={noImg} alt="pic" />
                              </div>
                            }
                          </div>
                          <div className={styles.trp}>
                          <div className={styles.nm} style={{fontSize: '16px'}}>
                            <h >{name}</h>  <br />
                            <div className={styles.adr}style={{fontSize: '14px'}}>
                              {address}
                            </div>
                          </div>
                          <div>
                            <span className={styles.sr}style={{fontSize: '12px'}}>Start Ratings</span>  <br />
                            <div className={styles.adr}>
                              {
                                isRate 
                                ? 
                                <img src={star} alt=""/>
                                : 'N/A'
                              }
                             
                              </div>
                          </div>
                          <div className={styles.adw}>
                            <span className={styles.sr}style={{fontSize: '12px'}}>Suppliers</span>
                            <div className={styles.adr}style={{fontSize: '14px'}}>
                                {
                                  supplyName.slice(0, 2).join(", ")
                                }
                            </div>
                          </div>
                          <div>
                            <button className={styles.btn}>
                              <img src={heartImg} alt="Heart" />
                              Add To Wishlist</button>
                          </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
          </div>
      }
      {
        showftr
          ?
          <div className={styles.pageWrap}>
            <div className={styles.selectWrap}>

              <span>Rows Per Page</span>
              <select
                onChange={(e) => {
                  console.log(e.target.value)
                  dispatch({
                    type: supplySearchActions.SUPPLY_SEARCH_UPDATE_PSIZE,
                    payload: e.target.value,
                  });
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            <div className={styles.pageNum}>
              <button
                disabled={hpage < 1}
                onClick={() => {
                  setpage(hpage - 1)
                  dispatch({
                    type: supplySearchActions.SUPPLY_SEARCH_UPDATE_PNUM,
                    payload: hpage,
                  });
                }}
              >
                <svg viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
              </button>
              <div className={styles.textNum}>
                {hpage + 1}
              </div>
              <button
                disabled={!pagin}
                onClick={() => {
                  setpage(hpage + 1)
                  dispatch({
                    type: supplySearchActions.SUPPLY_SEARCH_UPDATE_PNUM,
                    payload: hpage,
                  });
                }}
              >
                <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
              </button>
            </div>
          </div>
          : ''
      }
    </Fragment>
  );
}
