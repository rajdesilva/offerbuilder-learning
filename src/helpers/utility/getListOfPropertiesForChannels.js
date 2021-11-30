import { store } from "../../redux/store";

export const getListOfPropertiesForChannels = (channelToBeRemoved) => {
  let filteredProperties = [];
  if(channelToBeRemoved) {
    try {
      filteredProperties = store.getState().propertycart.cartItems;
      filteredProperties =
        filteredProperties &&
        filteredProperties.filter(
          (property) => channelToBeRemoved.id === property.channel
        );
    } catch (error) {
      console.error(error.toString());
    }
  }
  return filteredProperties;
};
