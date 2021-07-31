import yahooFinance from "yahoo-finance2";
import * as storage from "../services/storageServices";

export default {
  async getShareHistory(symbol) {
    var shareHistory = await storage.default.getItem(symbol);
    shareHistory = JSON.parse(shareHistory);

    //return the current share transactions
    return shareHistory.transactions;
  },
  async getShareEarnings(symbol) {
    let shareEarnings = {
      EPS: {
        actual: [],
        date: [],
        estimate: [],
      },
    };
    let shareEarningsRaw = await yahooFinance.quoteSummary(symbol, {
      modules: ["earnings"],
    });
    shareEarningsRaw.earnings.earningsChart.quarterly.map((item) => {
      shareEarnings.EPS.date.push(item.date + " " + item.actual);
      shareEarnings.EPS.actual.push(item.actual);

      shareEarnings.EPS.estimate.push(item.estimate);
    });
    return shareEarnings;
  },
  async getShareMetrics(symbol) {
    let shareData = [];
    var shareQuote = await yahooFinance.quote(symbol);

    // console.log(shareQuote);
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
  },

  async getAllSharesPrices() {
    let symbolList = [];
    // get all shares purchased

    var list = await storage.default.getAllItems();
    for (var listItem in list) {
      listItem = JSON.parse(list[listItem]);
      symbolList.push(listItem.symbol);
    }

    var shareQuote = await yahooFinance.quote(symbolList);
    symbolList = {};

    for (var item in shareQuote) {
      symbolList[shareQuote[item].symbol] = {
        price: shareQuote[item].regularMarketPrice,
        shortName: shareQuote[item].shortName,
      };
    }

    return symbolList;
  },

  // get symbol, average entry price, profit and total value for all shares
  async getAnalyticsForAllShares() {
    try {
      let sharesNameAndPrice = await this.getAllSharesPrices();
      // array for placing the results
      var sharesAnalyticsList = [];

      // get all shares purchased
      var list = await storage.default.getAllItems();

      // iterate trough every share object
      for (var listItem in list) {
        listItem = JSON.parse(list[listItem]);

        // create share analytics object
        var shareAnalytics = {
          symbol: listItem.symbol,
          companyName: sharesNameAndPrice[listItem.symbol].shortName,
          pieChartColor: listItem.pieChartColor,
          currentPrice: sharesNameAndPrice[listItem.symbol].price,
          shareTotalValue: 0,
          shareTotalProfit: 0,
          averageEntryPrice: 0,
        };

        var totalMoneyInvested = 0;
        var totalNumberOfSharesOwned = 0;

        listItem.transactions.map((transaction) => {
          // divide invested amount to the inserted price
          var numberOfSharesPerTransaction =
            transaction.investedAmount / transaction.priceAtBuy;

          totalNumberOfSharesOwned += Number(numberOfSharesPerTransaction);
          totalMoneyInvested += Number(transaction.investedAmount);

          //calculate the transaction value
          var currentTransactionValue =
            shareAnalytics.currentPrice * numberOfSharesPerTransaction;

          // add value to the total portofolio value
          shareAnalytics.shareTotalValue += currentTransactionValue;

          // subtract the invested amount from the result
          var currentTransactionProfit =
            currentTransactionValue - transaction.investedAmount;

          // add the result to the profit value
          shareAnalytics.shareTotalProfit += currentTransactionProfit;

          //calculate average entry price
          shareAnalytics.averageEntryPrice =
            totalMoneyInvested / totalNumberOfSharesOwned;
        });

        sharesAnalyticsList.push(shareAnalytics);
      }
      return sharesAnalyticsList;
    } catch (exception) {}
  },

  async getAutoCompleteData(text) {
    // create array for storing suggestions for autocomplete
    var suggestions = [];
    try {
      const result = await yahooFinance.autoc(text /* queryOptions */);

      //get the suggested symbols
      result.Result.map((item) => {
        if (item["symbol"] !== undefined)
          suggestions.push({ id: item["symbol"], name: item["symbol"] });
      });
    } catch (error) {
      console.log(error);
    }
    return suggestions;
  },
};
