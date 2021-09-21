import { Alert } from "react-native";
import * as storage from "../../services/storageServices";
import financeServices from "../../services/financeServices";

// add a new transaction
export async function addTransaction(transaction, symbol) {
  try {
    var portofolio = { shares: {} };
    var share = {
      symbol: symbol,
      transactions: [],
      pieChartColor: "",
    };
    var portofolioFromStorage = await storage.default.getItem("portofolio");

    if (transaction.transactionType === "SELL")
      // will throw an error if the number of shares sold
      // is bigger than the number of shares owned
      checkIfTheNumberOfSharesSoldIsSmallerThanNumberOfSharesOwned(
        transaction,
        symbol,
        portofolioFromStorage
      );
    // if the protofolio object already exists
    if (portofolioFromStorage !== null) {
      // convert it into json (it is stored as string)
      portofolioFromStorage = JSON.parse(portofolioFromStorage);
      // if the share already exists in protfolio
      if (portofolioFromStorage.shares[symbol] !== undefined) {
        // add a new transaction to it
        portofolioFromStorage.shares[symbol].transactions.push(transaction);
      } else {
        // add transaction to the share object
        share.transactions.push(transaction);
        // add the share object to portfolio
        portofolioFromStorage.shares[symbol] = share;
      }
      //update the portfolio object in storage
      storage.default.updateItem("portofolio", portofolioFromStorage);
      // if portfolio object doesn't exist
    } else if (portofolioFromStorage === null) {
      // add transaction to the share object
      share.transactions.push(transaction);
      // add share to the shares object from portfolio
      portofolio.shares[symbol] = share;
      // create protfolio object in storage
      storage.default.setItem("portofolio", portofolio);
    }
    Alert.alert("", "Transaction added");
  } catch (exception) {
    Alert.alert("", exception);
  }
}

let checkIfTheNumberOfSharesSoldIsSmallerThanNumberOfSharesOwned = (
  transaction,
  symbol,
  portofolioFromStorage
) => {
  portofolioFromStorage = JSON.parse(portofolioFromStorage);
  if (portofolioFromStorage === null) throw "You don't own any shares";

  var numberOfSharesOwned = 0;
  portofolioFromStorage.shares[symbol].transactions.map((transaction) => {
    if (transaction.transactionType === "BUY") {
      // add the transaction invested amount to the total money invested in the current share

      numberOfSharesOwned += Number(transaction.numberOfShares);
    } else if (transaction.transactionType === "SELL") {
      // substract the transaction sold amount from the total money invested in the current share

      numberOfSharesOwned -= Number(transaction.numberOfShares);
    }
  });
  if (numberOfSharesOwned < transaction.numberOfShares)
    throw "You cannot sell more shares than you own";
};

export function clearAllData() {
  storage.default.clearAllData();
}

export async function getAutoCompleteData(searchTerm) {
  return await financeServices.getAutoCompleteData(searchTerm);
}

export async function editHoldings(symbol, transaction) {
  console.log(transaction)
  // get portfolio
  var portofolioFromStorage = await storage.default.getItem("portofolio");
  portofolioFromStorage = JSON.parse(portofolioFromStorage);

  // delete all transactions
  portofolioFromStorage.shares[symbol].transactions = [];

  // set the new portfolio variable
  portofolioFromStorage.shares[symbol].transactions.push(transaction);

  storage.default.setItem("portofolio", portofolioFromStorage);
}
