export const getImageName = (image) => {
  try {
    const t = image.split("/");
    if (t.length === 1) {
      return "";
    }
    return t[t.length - 1];
  } catch (e) {
    console.log(e.toString());
  }
  return "";
};
