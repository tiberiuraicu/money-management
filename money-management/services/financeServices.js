import yahooFinance from "yahoo-finance2";
import * as storage from "../services/storageServices";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export default {
  async getShareHistory(symbol) {
    var shareHistory = await storage.default.getItem("portofolio");
    shareHistory = JSON.parse(shareHistory[symbol]);
    //return the current share transactions
    // return shareHistory.transactions;
  },
  async getShareEarnings(symbol) {
    return await yahooFinance.quoteSummary(symbol, {
      modules: ["earnings"],
    });
  },

  async getHistory() {
    var portfolio = await storage.default.getItem("portofolio");
    var shareHistory = JSON.parse(portfolio);
    //return the current share transactions
    // return shareHistory.transactions;
  },

  async getShareEarnings(symbol) {
    return await yahooFinance.quoteSummary(symbol, {
      modules: ["earnings"],
    });
  },

  async getSharePrice(symbol) {
    return await yahooFinance.quoteSummary(symbol, {
      modules: ["price"],
    });
  },

  async getShareMetrics(symbol) {
    return await yahooFinance.quote(symbol);
  },

  async getAutoCompleteData(text) {
    const host = "api.frankfurter.app";

  
    // create array for storing suggestions for autocomplete
    var suggestions = [];
    try {
      const result = await yahooFinance.search(text /* queryOptions */);

      //get the suggested symbols
      result.quotes.map((item) => {
        if (item["symbol"] !== undefined)
          suggestions.push({
            id: item["symbol"],
            symbol: (() => {
              if (item["symbol"].length > 7)
                return String(item["symbol"]).substring(0, 7) + "...";
              else return String(item["symbol"]);
            })(),
            name: (() => {
              if (item["shortname"].length > 30)
                return String(item["shortname"]).substring(0, 35) + "...";
              else return String(item["shortname"]);
            })(),
          });
      });
    } catch (error) {}
    return suggestions;
  },

  async getAvailableCurrencies(){
    const host = "api.frankfurter.app";

    const  res= await fetch(
      `https://${host}/currencies?`
    )
    return res.json();
  },

  async getRatesForCoin(fromCoin, toCoin) {
    const host = "api.frankfurter.app";
    const response = await fetch(
      `https://${host}/latest?amount=1&from=${fromCoin}&to=${toCoin}`
    );
    return response.json();
  },

  // test notifications
  async askPermissions() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return false;
    }
    return true;
  },
  async sendNotificationImmediately(symbol) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got " + symbol,
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 1 },
    });
  },
};
