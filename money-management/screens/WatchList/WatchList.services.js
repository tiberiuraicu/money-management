import storageServices from "../../services/storageServices";
import financeServices from "../../services/financeServices";

export async function getWatchList() {
  var watchList = await storageServices.getItem("watchlist");
  if(watchList){
  watchList = JSON.parse(watchList);
  for (let item in watchList) {
    let quote = await financeServices.getSharePrice(item);
    watchList[item]["regularMarketPrice"] = quote.price.regularMarketPrice;
    watchList[item]["regularMarketChange"] =
      quote.price.regularMarketChange.toFixed(2);
    watchList[item]["regularMarketChangePercent"] = (
      Number(quote.price.regularMarketChangePercent) * 100
    ).toFixed(2);

    watchList[item]["regularMarketVolume"] = quote.price.regularMarketVolume;
    watchList[item]["marketState"] = quote.price.marketState;
    if (quote.price.marketState === "PRE") {
      watchList[item]["extendedHoursPrice"] = quote.price.preMarketPrice;
      if (quote.price.preMarketChange)
        watchList[item]["extendedHoursChange"] =
          quote.price.preMarketChange.toFixed(2);
      watchList[item]["extendedHoursChangePercent"] = Number(
        quote.price.preMarketChangePercent * 100
      ).toFixed(2);
    } else if (quote.price.marketState === "POST") {
      watchList[item]["extendedHoursPrice"] = quote.price.postMarketPrice;
      watchList[item]["extendedHoursChange"] = quote.price.postMarketChange.toFixed(2);
      watchList[item]["extendedHoursChangePercent"] = Number(
        quote.price.postMarketChangePercent * 100
      ).toFixed(2);
    }
  }

  return Object.values(watchList);
}
}
