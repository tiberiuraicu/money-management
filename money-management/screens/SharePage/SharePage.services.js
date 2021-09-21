import financeServices from "../../services/financeServices";

export async function getShareMetrics(symbol) {
  let shareData = [];

  var shareQuote = await financeServices.getShareMetrics(symbol);

  shareData.push({
    key: shareQuote.regularMarketPrice,
    value: shareQuote.regularMarketPrice,
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
    value: shareQuote.marketCap + " " + shareQuote.financialCurrency,
    name: "Market cap",
  });
  shareData.push({
    key: shareQuote.fiftyTwoWeekRange,
    value:
      shareQuote.fiftyTwoWeekRange.low +
      " - " +
      shareQuote.fiftyTwoWeekRange.high +
      " " +
      shareQuote.financialCurrency,
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

  shareEarningsRaw.earnings.earningsChart.quarterly.map((item) => {
    shareEarnings.EPS.actual.push({
      y: Number(item.actual),
      x: item.date,
      label: item.actual,
    });

    shareEarnings.EPS.estimate.push({
      y: Number(item.estimate),
      x: item.date,
      label: item.estimate,
    });
  });
  return shareEarnings;
}
