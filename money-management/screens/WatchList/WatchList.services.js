import storageServices from "../../services/storageServices";
import financeServices from "../../services/financeServices";
import { appVariables } from "../../common/appVariables";

export async function getWatchList() {
  var watchList = await storageServices.getItem("watchlist");
  if (watchList) {
    watchList = JSON.parse(watchList);
    for (let item in watchList) {
      let quote = await financeServices.getSharePrice(item);
      var rates = 1;
      if (quote.price.currency !== appVariables.appCurrency) {
        rates = await financeServices.getRatesForCoin(
          quote.price.currency,
          appVariables.appCurrency
        );
        rates = rates.rates[appVariables.appCurrency]
      }
      watchList[item]["regularMarketPrice"] = (
        quote.price.regularMarketPrice * rates
      ).toFixed(2);
      watchList[item]["regularMarketChange"] = (
        quote.price.regularMarketChange.toFixed(2) * rates
      ).toFixed(2);

      watchList[item]["regularMarketChangePercent"] = (
        Number(quote.price.regularMarketChangePercent) * 100
      ).toFixed(2);
      watchList[item]["regularMarketVolume"] = quote.price.regularMarketVolume;
      watchList[item]["marketState"] = quote.price.marketState;
      if (quote.price.marketState === "PRE") {
        watchList[item]["extendedHoursPrice"] = (
          quote.price.preMarketPrice * rates
        ).toFixed(2);
        if (quote.price.preMarketChange)
          watchList[item]["extendedHoursChange"] = (
            quote.price.preMarketChange * rates
          ).toFixed(2);
        watchList[item]["extendedHoursChangePercent"] = Number(
          quote.price.preMarketChangePercent * 100
        ).toFixed(2);
      } else if (quote.price.marketState === "POST") {
        watchList[item]["extendedHoursPrice"] = (
          quote.price.postMarketPrice * rates
        ).toFixed(2);
        watchList[item]["extendedHoursChange"] = (
          quote.price.postMarketChange * rates
        ).toFixed(2);
        watchList[item]["extendedHoursChangePercent"] = Number(
          quote.price.postMarketChangePercent * 100
        ).toFixed(2);
      }
    }

    return Object.values(watchList);
  }
}
