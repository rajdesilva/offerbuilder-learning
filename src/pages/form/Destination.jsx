import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { Input, AutoComplete, message } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { getCityFromLatLong } from "../offers/service";
import styles from "./css/Destination.module.less";

export function Destination(props) {
  const intl = useIntl();
  let cityVal = props.value ? props.value.city : "";
  const [city, setCity] = useState(cityVal || "");
  const handleChange = (cityName) => {
    if (cityName.length === 0) {
      if (props.onChangeDestination) {
        props.onChangeDestination(null);
      }
      if (props.onChange) {
        props.onChange(null);
      }
    }
    setCity(cityName);
  };

  useEffect(() => {
    if (window.getValue(props, "value.lat") && !props.value.city && !city) {
      (async () => {
        try {
          const response = await getCityFromLatLong({
            lat: props.value.lat,
            lng: props.value.lng,
          });
          if (window.getValue(response, "plus_code.compound_code")) {
            // "GVC4+5M Pune, Maharashtra, India";
            const cityName = response.plus_code.compound_code.substring(8);
            if (props.onChangeDestination) {
              props.onChangeDestination({
                city: cityName,
                lat: props.value.lat,
                lng: props.value.lng,
              });
            }
            if (props.onChange) {
              props.onChange({
                city: cityName,
                lat: props.value.lat,
                lng: props.value.lng,
              });
            }

            setCity(cityName);
          } else {
            console.error("Map error", response);
          }
        } catch (e) {
          message.error(e.toString());
        }
      })();
    }
  }, [props, props.value, city]);

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        setCity(address);
        cityVal = address;
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        if (props.onChangeDestination) {
          props.onChangeDestination({
            city: cityVal,
            ...latLng,
          });
        }

        if (props.onChange) {
          props.onChange({
            city: cityVal,
            ...latLng,
          });
        }
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <PlacesAutocomplete
      data-testid="auto-complete"
      value={city}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={{
        types: ["(cities)"],
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        let options = [];
        options = loading
          ? [
              {
                value: "",
                label: (
                  <div className={styles["destination-loading"]}>
                    <FormattedMessage id="nemo.loading" />
                  </div>
                ),
              },
            ]
          : suggestions.map((suggestion) => {
              return {
                value: suggestion.description,
                label: (
                  <div
                    {...getSuggestionItemProps(suggestion)}
                    className={styles["destination-suggestion"]}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                ),
              };
            });
        return (
          <AutoComplete
            options={options}
            defaultValue={city}
            value={city}
            disabled={props.disabled}
          >
            <Input
              allowClear
              disabled={props.disabled}
              {...getInputProps({
                placeholder: props.placeholder
                  ? props.placeholder
                  : intl.formatMessage({
                      id: "nemo.searchCity",
                    }),
              })}
              data-testid="search-city-input"
            />
          </AutoComplete>
        );
      }}
    </PlacesAutocomplete>
  );
}

export default Destination;
