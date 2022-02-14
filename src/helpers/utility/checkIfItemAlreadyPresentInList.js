export const checkIfItemAlreadyPresentInList = (
  itemToCheck,
  itemList
) => {
  if(itemList && itemToCheck && itemToCheck.id) {
    return (
      itemList.findIndex(
        (item) => item.id === itemToCheck.id
      ) !== -1
    );
  }
  return false;
};
