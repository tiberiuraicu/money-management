import * as financeServices from "../../services/financeServices";
import * as storageServices from "../../services/storageServices";

export async function getAllSharesPrices(portofolio) {
  let symbolList = [];
  if (Object.keys(portofolio.shares).length !== 0) {
    // get all shares purchased
    for (var listItem in portofolio.shares) {
      listItem = portofolio.shares[listItem];
      symbolList.push(listItem.symbol);
    }

    var shareQuote = await financeServices.default.getShareMetrics(symbolList);
    symbolList = {};

    for (var item in shareQuote) {
      symbolList[shareQuote[item].symbol] = {
        price: shareQuote[item].regularMarketPrice,
        shortName: shareQuote[item].shortName,
      };
    }
  }
  return symbolList;
}

// get symbol, average entry price, profit and total value for all shares
export async function getAnalyticsForAllShares() {
  try {
    var portofolio = await storageServices.default.getItem("portofolio");
    if (portofolio) {
      portofolio = JSON.parse(portofolio);

      let sharesNameAndPrice = await getAllSharesPrices(portofolio);

      // array for placing the results
      var sharesAnalyticsList = [];

      let portofolioValue = 0;

      // iterate trough every share object
      for (var listItem in portofolio.shares) {
        listItem = portofolio.shares[listItem];
        // create share analytics object
        var shareAnalytics = {
          symbol: listItem.symbol,
          companyName: sharesNameAndPrice[listItem.symbol].shortName,
          currentPrice: sharesNameAndPrice[listItem.symbol].price,
          shareTotalValue: 0,
          shareTotalProfit: 0,
          averageEntryPrice: 0,
          totalSharesOwned: 0,
        };

        var totalMoneyInvested = 0;

        listItem.transactions.map((transaction) => {
          //calculate the amount invested per transaction
          var transactionInvestedAmount =
            Number(transaction.numberOfShares) * Number(transaction.price);

          if (transaction.transactionType === "BUY") {
            // add the transaction invested amount to the total money invested in the current share
            totalMoneyInvested += transactionInvestedAmount;
            shareAnalytics.totalSharesOwned += Number(
              transaction.numberOfShares
            );
          } else if (transaction.transactionType === "SELL") {
            // substract the transaction sold amount from the total money invested in the current share
            totalMoneyInvested -= transactionInvestedAmount;
            shareAnalytics.totalSharesOwned -= Number(
              transaction.numberOfShares
            );
          }
          //calculate average entry price
          shareAnalytics.averageEntryPrice =
            totalMoneyInvested / shareAnalytics.totalSharesOwned;
        });
        shareAnalytics.shareTotalValue =
          shareAnalytics.totalSharesOwned * shareAnalytics.currentPrice;

        // add the result to the profit value
        shareAnalytics.shareTotalProfit +=
          shareAnalytics.shareTotalValue - totalMoneyInvested;

        if (shareAnalytics.shareTotalValue > 0) {
          sharesAnalyticsList.push(shareAnalytics);
          portofolioValue = portofolioValue + shareAnalytics.shareTotalValue;
        } else {
          storageServices.default.setItem("portofolio", portofolio);
        }
      }
      return [portofolioValue, sharesAnalyticsList];
    } else return [0, []];
  } catch (exception) {
    console.log(exception);
  }
}

export async function deleteShareData(symbol) {
  // get protfolio data
  var portofolio = await storageServices.default.getItem("portofolio");
  portofolio = JSON.parse(portofolio);
  var shares = portofolio.shares;
  // delete share entry
  delete shares[symbol];
  portofolio.shares = shares;
  // update protfolio
  storageServices.default.setItem("portofolio", portofolio);
}
