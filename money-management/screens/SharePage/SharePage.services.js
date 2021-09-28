import financeServices from "../../services/financeServices";
import { appVariables } from "../../common/appVariables";

export async function getShareMetrics(symbol) {
  let shareData = [];

  var shareQuote = await financeServices.getShareMetrics(symbol);
  var rates = 1;
  if (shareQuote.financialCurrency !== appVariables.appCurrency) {
    rates = await financeServices.getRatesForCoin(
      shareQuote.financialCurrency,
      appVariables.appCurrency
    );

    rates = rates.rates[appVariables.appCurrency];
  }
  shareData.push({
    key: shareQuote.regularMarketPrice,
    value: (shareQuote.regularMarketPrice * rates).toFixed(2),
    name: "Current price",
  });

  shareData.push({
    key: shareQuote.averageAnalystRating,
    value: shareQuote.averageAnalystRating,
    name: "Average analyst rating",
  });
  shareData.push({
    key: shareQuote.trailingPE,
    value: shareQuote.trailingPE,
    name: "Trailing P/E",
  });
  shareData.push({
    key: shareQuote.forwardPE,
    value: shareQuote.forwardPE,
    name: "Forward P/E",
  });
  shareData.push({
    key: shareQuote.marketCap,
    value: (shareQuote.marketCap * rates).toFixed(2) + " " + appVariables.appCurrency,
    name: "Market cap",
  });
  shareData.push({
    key: shareQuote.fiftyTwoWeekRange,
    value:
      (shareQuote.fiftyTwoWeekRange.low * rates).toFixed(2) +
      " - " +
      (shareQuote.fiftyTwoWeekRange.high * rates).toFixed(2) +
      " " +
      appVariables.appCurrency,
    name: "52 week range",
  });
  shareData.push({
    key: shareQuote.epsCurrentYear,
    value: shareQuote.epsCurrentYear,
    name: "EPS current year",
  });
  shareData.push({
    key: shareQuote.epsForward,
    value: shareQuote.epsForward,
    name: "Forward EPS",
  });
  shareData.push({
    key: shareQuote.epsTrailingTwelveMonths,
    value: shareQuote.epsTrailingTwelveMonths,
    name: "EPS trailing twelve months",
  });
  //return the current share price
  return shareData;
}

export async function getShareEarnings(symbol) {
  let shareEarnings = {
    EPS: {
      actual: [],
      estimate: [],
    },
  };
  // await financeServices.askPermissions();
  // await financeServices.sendNotificationImmediately(symbol);
  let shareEarningsRaw = await financeServices.getShareEarnings(symbol);

  var rates = 1;
  if (shareEarningsRaw.earnings.financialCurrency !== appVariables.appCurrency) {
    rates = await financeServices.getRatesForCoin(
      shareEarningsRaw.earnings.financialCurrency,
      appVariables.appCurrency
    );

    rates = rates.rates[appVariables.appCurrency];
  }

  shareEarningsRaw.earnings.earningsChart.quarterly.map((item) => {
    shareEarnings.EPS.actual.push({
      y: (Number(item.actual)*rates).toFixed(2),
      x: item.date,
      label: (item.actual*rates).toFixed(2),
    });

    shareEarnings.EPS.estimate.push({
      y: (Number(item.estimate)*rates).toFixed(2),
      x: item.date,
      label: (item.estimate*rates).toFixed(2),
    });
  });
  return shareEarnings;
}
