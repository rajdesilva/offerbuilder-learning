import React, { Fragment, useEffect, useCallback, useState } from "react";
import { Form, Switch, Row, Col, InputNumber} from "antd";
import Destination from "../../form/Destination";
import Distance from "../../form/Distance";
import { useDispatch, useSelector } from "react-redux";
import { supplySearchActions } from "../actions/supplySearch";
import {
  HotelName,
  Address,
  Zip,
  Country,
  PropertyType,
} from "../../form";
import { useRouteMatch } from "react-router-dom";
import { SearchBtn } from "./SearchBtn";
import { FormattedMessage, useIntl } from "react-intl";
import {
  checkIfUserHasRole,
  createSearchQueryURL,
} from "../../../helpers/utility";
import { appConstants } from "../../../common";
import { newOfferActions } from "../../offers/actions";
import { store } from "../../../redux/store";

import Select from 'react-select';
import axios from "axios";
import countryvalue from '../countries';



export function BasicSearchAdvanced({ submitForm }) {

  // const searchParamss = store.getState().searchparams;
  // console.log(window.getValue(searchParamss, "destination.lat"));

  const dispatch = useDispatch();
  const intl = useIntl();
  const isBrowseSupplyPage = useRouteMatch({
    path: "/browse-supply/:page?",
    strict: true,
    sensitive: true,
  });
  const [form] = Form.useForm();

  const searchParams = useSelector((state) =>
    window.getValue(state, "searchparams")
  );


  const [countries, setcountries] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);


  

  useEffect(() => {
  setcountries(
    [
      { label: 'Afghanistan', value: 'AF' },
      { label: 'Åland Islands', value: 'AX' },
      { label: 'Albania', value: 'AL' },
      { label: 'Algeria', value: 'DZ' },
      { label: 'American Samoa', value: 'AS' },
      { label: 'AndorrA', value: 'AD' },
      { label: 'Angola', value: 'AO' },
      { label: 'Anguilla', value: 'AI' },
      { label: 'Antarctica', value: 'AQ' },
      { label: 'Antigua and Barbuda', value: 'AG' },
      { label: 'Argentina', value: 'AR' },
      { label: 'Armenia', value: 'AM' },
      { label: 'Aruba', value: 'AW' },
      { label: 'Australia', value: 'AU' },
      { label: 'Austria', value: 'AT' },
      { label: 'Azerbaijan', value: 'AZ' },
      { label: 'Bahamas', value: 'BS' },
      { label: 'Bahrain', value: 'BH' },
      { label: 'Bangladesh', value: 'BD' },
      { label: 'Barbados', value: 'BB' },
      { label: 'Belarus', value: 'BY' },
      { label: 'Belgium', value: 'BE' },
      { label: 'Belize', value: 'BZ' },
      { label: 'Benin', value: 'BJ' },
      { label: 'Bermuda', value: 'BM' },
      { label: 'Bhutan', value: 'BT' },
      { label: 'Bolivia', value: 'BO' },
      { label: 'Bosnia and Herzegovina', value: 'BA' },
      { label: 'Botswana', value: 'BW' },
      { label: 'Bouvet Island', value: 'BV' },
      { label: 'Brazil', value: 'BR' },
      { label: 'British Indian Ocean Territory', value: 'IO' },
      { label: 'Brunei Darussalam', value: 'BN' },
      { label: 'Bulgaria', value: 'BG' },
      { label: 'Burkina Faso', value: 'BF' },
      { label: 'Burundi', value: 'BI' },
      { label: 'Cambodia', value: 'KH' },
      { label: 'Cameroon', value: 'CM' },
      { label: 'Canada', value: 'CA' },
      { label: 'Cape Verde', value: 'CV' },
      { label: 'Cayman Islands', value: 'KY' },
      { label: 'Central African Republic', value: 'CF' },
      { label: 'Chad', value: 'TD' },
      { label: 'Chile', value: 'CL' },
      { label: 'China', value: 'CN' },
      { label: 'Christmas Island', value: 'CX' },
      { label: 'Cocos (Keeling) Islands', value: 'CC' },
      { label: 'Colombia', value: 'CO' },
      { label: 'Comoros', value: 'KM' },
      { label: 'Congo', value: 'CG' },
      { label: 'Congo, The Democratic Republic of the', value: 'CD' },
      { label: 'Cook Islands', value: 'CK' },
      { label: 'Costa Rica', value: 'CR' },
      { label: 'Cote D\'Ivoire', value: 'CI' },
      { label: 'Croatia', value: 'HR' },
      { label: 'Cuba', value: 'CU' },
      { label: 'Cyprus', value: 'CY' },
      { label: 'Czech Republic', value: 'CZ' },
      { label: 'Denmark', value: 'DK' },
      { label: 'Djibouti', value: 'DJ' },
      { label: 'Dominica', value: 'DM' },
      { label: 'Dominican Republic', value: 'DO' },
      { label: 'Ecuador', value: 'EC' },
      { label: 'Egypt', value: 'EG' },
      { label: 'El Salvador', value: 'SV' },
      { label: 'Equatorial Guinea', value: 'GQ' },
      { label: 'Eritrea', value: 'ER' },
      { label: 'Estonia', value: 'EE' },
      { label: 'Ethiopia', value: 'ET' },
      { label: 'Falkland Islands (Malvinas)', value: 'FK' },
      { label: 'Faroe Islands', value: 'FO' },
      { label: 'Fiji', value: 'FJ' },
      { label: 'Finland', value: 'FI' },
      { label: 'France', value: 'FR' },
      { label: 'French Guiana', value: 'GF' },
      { label: 'French Polynesia', value: 'PF' },
      { label: 'French Southern Territories', value: 'TF' },
      { label: 'Gabon', value: 'GA' },
      { label: 'Gambia', value: 'GM' },
      { label: 'Georgia', value: 'GE' },
      { label: 'Germany', value: 'DE' },
      { label: 'Ghana', value: 'GH' },
      { label: 'Gibraltar', value: 'GI' },
      { label: 'Greece', value: 'GR' },
      { label: 'Greenland', value: 'GL' },
      { label: 'Grenada', value: 'GD' },
      { label: 'Guadeloupe', value: 'GP' },
      { label: 'Guam', value: 'GU' },
      { label: 'Guatemala', value: 'GT' },
      { label: 'Guernsey', value: 'GG' },
      { label: 'Guinea', value: 'GN' },
      { label: 'Guinea-Bissau', value: 'GW' },
      { label: 'Guyana', value: 'GY' },
      { label: 'Haiti', value: 'HT' },
      { label: 'Heard Island and Mcdonald Islands', value: 'HM' },
      { label: 'Holy See (Vatican City State)', value: 'VA' },
      { label: 'Honduras', value: 'HN' },
      { label: 'Hong Kong', value: 'HK' },
      { label: 'Hungary', value: 'HU' },
      { label: 'Iceland', value: 'IS' },
      { label: 'India', value: 'IN' },
      { label: 'Indonesia', value: 'ID' },
      { label: 'Iran, Islamic Republic Of', value: 'IR' },
      { label: 'Iraq', value: 'IQ' },
      { label: 'Ireland', value: 'IE' },
      { label: 'Isle of Man', value: 'IM' },
      { label: 'Israel', value: 'IL' },
      { label: 'Italy', value: 'IT' },
      { label: 'Jamaica', value: 'JM' },
      { label: 'Japan', value: 'JP' },
      { label: 'Jersey', value: 'JE' },
      { label: 'Jordan', value: 'JO' },
      { label: 'Kazakhstan', value: 'KZ' },
      { label: 'Kenya', value: 'KE' },
      { label: 'Kiribati', value: 'KI' },
      { label: 'Korea, Democratic People\'S Republic of', value: 'KP' },
      { label: 'Korea, Republic of', value: 'KR' },
      { label: 'Kuwait', value: 'KW' },
      { label: 'Kyrgyzstan', value: 'KG' },
      { label: 'Lao People\'S Democratic Republic', value: 'LA' },
      { label: 'Latvia', value: 'LV' },
      { label: 'Lebanon', value: 'LB' },
      { label: 'Lesotho', value: 'LS' },
      { label: 'Liberia', value: 'LR' },
      { label: 'Libyan Arab Jamahiriya', value: 'LY' },
      { label: 'Liechtenstein', value: 'LI' },
      { label: 'Lithuania', value: 'LT' },
      { label: 'Luxembourg', value: 'LU' },
      { label: 'Macao', value: 'MO' },
      { label: 'Macedonia, The Former Yugoslav Republic of', value: 'MK' },
      { label: 'Madagascar', value: 'MG' },
      { label: 'Malawi', value: 'MW' },
      { label: 'Malaysia', value: 'MY' },
      { label: 'Maldives', value: 'MV' },
      { label: 'Mali', value: 'ML' },
      { label: 'Malta', value: 'MT' },
      { label: 'Marshall Islands', value: 'MH' },
      { label: 'Martinique', value: 'MQ' },
      { label: 'Mauritania', value: 'MR' },
      { label: 'Mauritius', value: 'MU' },
      { label: 'Mayotte', value: 'YT' },
      { label: 'Mexico', value: 'MX' },
      { label: 'Micronesia, Federated States of', value: 'FM' },
      { label: 'Moldova, Republic of', value: 'MD' },
      { label: 'Monaco', value: 'MC' },
      { label: 'Mongolia', value: 'MN' },
      { label: 'Montserrat', value: 'MS' },
      { label: 'Morocco', value: 'MA' },
      { label: 'Mozambique', value: 'MZ' },
      { label: 'Myanmar', value: 'MM' },
      { label: 'Namibia', value: 'NA' },
      { label: 'Nauru', value: 'NR' },
      { label: 'Nepal', value: 'NP' },
      { label: 'Netherlands', value: 'NL' },
      { label: 'Netherlands Antilles', value: 'AN' },
      { label: 'New Caledonia', value: 'NC' },
      { label: 'New Zealand', value: 'NZ' },
      { label: 'Nicaragua', value: 'NI' },
      { label: 'Niger', value: 'NE' },
      { label: 'Nigeria', value: 'NG' },
      { label: 'Niue', value: 'NU' },
      { label: 'Norfolk Island', value: 'NF' },
      { label: 'Northern Mariana Islands', value: 'MP' },
      { label: 'Norway', value: 'NO' },
      { label: 'Oman', value: 'OM' },
      { label: 'Pakistan', value: 'PK' },
      { label: 'Palau', value: 'PW' },
      { label: 'Palestinian Territory, Occupied', value: 'PS' },
      { label: 'Panama', value: 'PA' },
      { label: 'Papua New Guinea', value: 'PG' },
      { label: 'Paraguay', value: 'PY' },
      { label: 'Peru', value: 'PE' },
      { label: 'Philippines', value: 'PH' },
      { label: 'Pitcairn', value: 'PN' },
      { label: 'Poland', value: 'PL' },
      { label: 'Portugal', value: 'PT' },
      { label: 'Puerto Rico', value: 'PR' },
      { label: 'Qatar', value: 'QA' },
      { label: 'Reunion', value: 'RE' },
      { label: 'Romania', value: 'RO' },
      { label: 'Russian Federation', value: 'RU' },
      { label: 'RWANDA', value: 'RW' },
      { label: 'Saint Helena', value: 'SH' },
      { label: 'Saint Kitts and Nevis', value: 'KN' },
      { label: 'Saint Lucia', value: 'LC' },
      { label: 'Saint Pierre and Miquelon', value: 'PM' },
      { label: 'Saint Vincent and the Grenadines', value: 'VC' },
      { label: 'Samoa', value: 'WS' },
      { label: 'San Marino', value: 'SM' },
      { label: 'Sao Tome and Principe', value: 'ST' },
      { label: 'Saudi Arabia', value: 'SA' },
      { label: 'Senegal', value: 'SN' },
      { label: 'Serbia and Montenegro', value: 'CS' },
      { label: 'Seychelles', value: 'SC' },
      { label: 'Sierra Leone', value: 'SL' },
      { label: 'Singapore', value: 'SG' },
      { label: 'Slovakia', value: 'SK' },
      { label: 'Slovenia', value: 'SI' },
      { label: 'Solomon Islands', value: 'SB' },
      { label: 'Somalia', value: 'SO' },
      { label: 'South Africa', value: 'ZA' },
      { label: 'South Georgia and the South Sandwich Islands', value: 'GS' },
      { label: 'Spain', value: 'ES' },
      { label: 'Sri Lanka', value: 'LK' },
      { label: 'Sudan', value: 'SD' },
      { label: 'Surilabel', value: 'SR' },
      { label: 'Svalbard and Jan Mayen', value: 'SJ' },
      { label: 'Swaziland', value: 'SZ' },
      { label: 'Sweden', value: 'SE' },
      { label: 'Switzerland', value: 'CH' },
      { label: 'Syrian Arab Republic', value: 'SY' },
      { label: 'Taiwan, Province of China', value: 'TW' },
      { label: 'Tajikistan', value: 'TJ' },
      { label: 'Tanzania, United Republic of', value: 'TZ' },
      { label: 'Thailand', value: 'TH' },
      { label: 'Timor-Leste', value: 'TL' },
      { label: 'Togo', value: 'TG' },
      { label: 'Tokelau', value: 'TK' },
      { label: 'Tonga', value: 'TO' },
      { label: 'Trinidad and Tobago', value: 'TT' },
      { label: 'Tunisia', value: 'TN' },
      { label: 'Turkey', value: 'TR' },
      { label: 'Turkmenistan', value: 'TM' },
      { label: 'Turks and Caicos Islands', value: 'TC' },
      { label: 'Tuvalu', value: 'TV' },
      { label: 'Uganda', value: 'UG' },
      { label: 'Ukraine', value: 'UA' },
      { label: 'United Arab Emirates', value: 'AE' },
      { label: 'United Kingdom', value: 'GB' },
      { label: 'United States', value: 'US' },
      { label: 'United States Minor Outlying Islands', value: 'UM' },
      { label: 'Uruguay', value: 'UY' },
      { label: 'Uzbekistan', value: 'UZ' },
      { label: 'Vanuatu', value: 'VU' },
      { label: 'Venezuela', value: 'VE' },
      { label: 'Viet Nam', value: 'VN' },
      { label: 'Virgin Islands, British', value: 'VG' },
      { label: 'Virgin Islands, U.S.', value: 'VI' },
      { label: 'Wallis and Futuna', value: 'WF' },
      { label: 'Western Sahara', value: 'EH' },
      { label: 'Yemen', value: 'YE' },
      { label: 'Zambia', value: 'ZM' },
      { label: 'Zimbabwe', value: 'ZW' }
  ]
  );

  }, []);



  const onFinish = useCallback(
    (values) => {
      console.log(values)

      let getCity;
      let str;
      let cityVals;
      let lati;
      let long;

      if(values.city){
        getCity = [values.city.city];
        str = getCity.toString();
        cityVals = str.split(',');
        lati = values.city.lat ? values.city.lat:'';
        long = values.city.lng ? values.city.lng:'';


        let val = {
          'address': values.address,
          'hotelName': values.hotelName,
          'zip': values.zip,
          'distance': values.distance,
          'lat': lati,
          'lan': long,
          'country': values.country?values.country.value:'', 
          'city': cityVals?cityVals[0]:'',
        }
  
        dispatch({
          type: supplySearchActions.SUPPLY_SEARCH_UPDATE_BASIC_REDUX_STATE_ALL,
          payload: val,
        });
      }else{
        alert("city needed")
      }  
    },
    [dispatch]
  );

  useEffect(() => {
    if (submitForm) {
      submitForm(form);
    }
  }, [form, submitForm]);
  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 25 }}
      layout="horizontal"
      onFinish={onFinish}
      initialValues={searchParams}
      scrollToFirstError
      className="custom-form"
      data-testid="search-setting-form">
        <Row style={{ marginBottom: 35 }} gutter={[8, 8]}>
          <Col>
          <b>
            <FormattedMessage id="nemo.search.parameters" />
          </b>
        </Col>
        </Row>
        <Row style={{ marginBottom: 15 }} gutter={[8, 8]}>
        <Col span={4} className="col1-text"style={{fontSize: '14px'}}>
        
          <FormattedMessage id="nemo.hotelName" />
        
        </Col>
        <Col span={8}>
          <Form.Item name="hotelName" data-testid="hotel-name">
            <HotelName
              onHotelChange={(hotel) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_HOTEL_NAMES,
                  payload: hotel,
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginBottom: 15 }} gutter={[8, 8]}>
        <Col span={4} className="col1-text"style={{fontSize: '14px'}}>
         
          <FormattedMessage id="nemo.address" />
          
        </Col>
        <Col span={8}>
          <Form.Item name="address" data-testid="address">
          <Address
              onAddrressChange={(address) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_ADDRESS,
                  payload: address,
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>        
      {/* {checkIfUserHasRole(appConstants.USER_ROLE.ADMIN) ? (
        <Fragment>
          <Row gutter={[8, 8]}>
            <Col span={4} className="col1-text">
              <FormattedMessage id="nemo.propertyType" />
            </Col>
            <Col span={5}>
              <Form.Item name="type" data-testid="property-type">
                <PropertyType
                  onChangeType={(type) => {
                    dispatch({
                      type: supplySearchActions.SUPPLY_SEARCH_UPDATE_PROPERTY_TYPE,
                      payload: type,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col offset={4} span={10} className="top-margin">
              <span>
                <FormattedMessage id="nemo.offerWithDemoPropertyNotPublishedOnProd" />
              </span>
            </Col>
          </Row>
        </Fragment>
      ) : (
        <Fragment />
      )} */}
      <Row style={{ marginBottom: 15 }} gutter={[8, 8]}>
        <Col span={4} className="col1-text"style={{fontSize: '14px'}}>
       
          <FormattedMessage id="nemo.zip" />
        
        </Col>
        <Col span={8}>
          <Form.Item name="zip" data-testid="zip">
          <Zip
              onZipChange={(zip) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_ZIP,
                  payload: zip,
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row  style={{ marginBottom: 15 }} gutter={[8, 8]}>
        <Col span={4} className="col1-text"style={{fontSize: '14px'}}>
       
          <FormattedMessage id="nemo.city" />
        
        </Col>
        <Col span={8}>
          <Form.Item name="city" data-testid="city"
            >
            <Destination
              onChangeDestination={(destination) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_DESTINATION,
                  payload: destination,
                });
                dispatch({
                  type: newOfferActions.NEW_OFFER_DEEPLINK_DESTINATION,
                  payload: destination,
                });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item name="distance" data-testid="distance">
            <Distance
              onChangeDistance={(distance) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_DISTANCE,
                  payload: distance,
                });
              }}
              distance={0}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row  style={{ marginBottom: 15 }} gutter={[8, 8]}>
        <Col span={4} className="col1-text"style={{fontSize: '14px'}}>
        
          <FormattedMessage id="nemo.country" />
        
        </Col>
        <Col span={8}>
          <Form.Item name="country" data-testid="country">
          {/* <Country
              onZipChange={(zip) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_DESTINATION,
                  payload: zip,
                });
              }}
              
            /> */}

          <Select options={countries}
            onChange={(zip) => {
              dispatch({
                type: supplySearchActions.SUPPLY_SEARCH_UPDATE_DESTINATION,
                payload: zip,
              });
            }}
          />
        
          </Form.Item>
        </Col>
      </Row>
      {/* <Row  style={{ marginBottom: 15 }} gutter={[8, 8]}>
        <Col span={4} className="col1-text">
        <b>
          <FormattedMessage id="nemo.lcn" />
        </b>
        </Col>
        <Col span={6}>
          <Form.Item name="lcn" valuePropName="checked">
            <Switch
              data-testid="lcn-switch"
              onChange={(value) => {
                dispatch({
                  type: supplySearchActions.SUPPLY_SEARCH_UPDATE_LCN_FLAG,
                  payload: value,
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginBottom: 15 }} gutter={[8, 8]}>
      </Row>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.lcn !== currentValues.lcn
        }
      >
        {({ getFieldValue }) => {
          return getFieldValue("lcn") ? (
            <Row gutter={[8, 8]}>
              <Col span={4} className="col1-text">
                <FormattedMessage id="nemo.minRemainingCapitalPool" />
              </Col>
              <Col span={6}>
                <Form.Item
                  name="remainingCapitalPool"
                  noStyle
                  preserve={false}
                  data-testid="min-remain-capital-pool"
                >
                  <InputNumber
                    data-testid="min-remaining-capital-pool-input"
                    placeholder={intl.formatMessage({
                      id: "nemo.minimumAmount",
                    })}
                    maxLength={15}
                    className="min-capital-pool"
                    onChange={(value) => {
                      dispatch({
                        type: supplySearchActions.SUPPLY_SEARCH_UPDATE_REMAINING_CAPITAL_POOL,
                        payload: value,
                      });
                    }}
                  />
                </Form.Item>
                <span>
                  &nbsp;&nbsp;
                  {searchParams.currencyCode || (
                    <FormattedMessage id="nemo.eur" />
                  )}
                </span>
              </Col>             
            </Row>
          ) : (
            <Fragment />
          );
        }}      
      </Form.Item> */}
      <Row>
      <Col span={4} className="col1-text">
          <FormattedMessage id="nemo.search.space" />
        </Col>
        <Col span ={4} >
        <SearchBtn isForSearchResultsPage={true} />
        </Col>
        </Row>
    </Form>
  );
}
