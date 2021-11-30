import { store } from "../../redux/store";

// check if same channel present for other brands or storefronts
export const checkIfMultipleChannelPresentForTarget = (channelToRemove) => {
  let channelCount = 0;
  try {
    const brands = store.getState().newoffersettingsparam.brands;
    brands &&
      brands.forEach((brand) => {
        brand.storefronts &&
          brand.storefronts.forEach((storefront) => {
            storefront &&
              storefront.suppliers &&
              storefront.suppliers.forEach((supplier) => {
                supplier &&
                  supplier.channels &&
                  supplier.channels.forEach((channel) => {
                    const channelInfo = channel.id
                      ? channel
                      : JSON.parse(channel);
                    if (
                      channelInfo &&
                      channelInfo.id &&
                      channelInfo.id === channelToRemove.id
                    ) {
                      channelCount++;
                    }
                  });
              });
          });
      });
  } catch (error) {
    console.error("error = ", error.toString());
  }

  return channelCount > 1;
};
