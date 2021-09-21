import * as storage from "../../services/storageServices";

export async function addToWatchList(symbol) {
  var watchlist = {};
  let watchlistFromStorage = await storage.default.getItem("watchlist");
  watchlistFromStorage = JSON.parse(watchlistFromStorage);
  if (watchlistFromStorage !== null) {
    if (watchlistFromStorage[symbol] !== undefined) {
      delete watchlistFromStorage[symbol];
      storage.default.setItem("watchlist", watchlistFromStorage);
      return alert("Object removed from watchlist");
    } else {
      watchlistFromStorage[symbol] = { symbol: symbol };
      storage.default.setItem("watchlist", watchlistFromStorage);
      return alert(symbol + " added to watchlist");
    }
  } else {
    watchlist[symbol] = { symbol: symbol };
    storage.default.setItem("watchlist", watchlist);
    return alert(symbol + " added to watchlist");
  }
}

export async function getWatchList() {
  let watchList = await storage.default.getItem("watchlist");
  return JSON.parse(watchList);
}
