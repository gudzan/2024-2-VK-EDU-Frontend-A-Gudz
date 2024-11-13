const isValidUrl = (str) => {
  try {
    return !!new URL(str);
  }
  catch (error) {
    return false;
  }
}
export default isValidUrl