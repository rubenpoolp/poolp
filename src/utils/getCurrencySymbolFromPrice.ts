const getCurrencySymbolFromPrice = (priceString: string) => {
  if (priceString[0].match(/\d/)) {
    return priceString[priceString.length - 1];
  } else {
    return priceString[0];
  }
};

export default getCurrencySymbolFromPrice;
