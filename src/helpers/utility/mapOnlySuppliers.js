export const mapOnlySuppliers = (formValues) => {
  const channels =
    formValues && formValues.channels
      ? formValues.channels.map((channel) =>
          channel.id ? { ...channel } : JSON.parse(channel)
        )
      : [];
  let finalMappedSupplier = [];
  try {
    finalMappedSupplier =
      formValues && formValues.suppliers
        ? formValues.suppliers.map((supplier) => {
            const mappedSupplier = supplier.id
              ? { ...supplier }
              : JSON.parse(supplier);
            return {
              ...mappedSupplier,
              channels,
            };
          })
        : [];
  } catch (error) {
    console.log(error.toString());
  }

  return finalMappedSupplier;
};
