import { Alert } from "react-native";
import * as storage from "../../services/storageServices";

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export async function addTransaction(transaction, symbol) {
  try {
    var share = {
      symbol: symbol.name,
      transactions: [],
      pieChartColor: "",
    };
    var shareList = await storage.default.getAllItems();
    var symbolExists = false;
    if (shareList.length != 0)
      for (var i in shareList) {
        if (JSON.parse(shareList[i]).symbol === symbol.name) {
          symbolExists = true;
          break;
        }
      }
    if (symbolExists) {
      share = await storage.default.getItem(symbol.name);
      share = JSON.parse(share);
      share.transactions.push(transaction);
      storage.default.updateItem(symbol.name, share);
    } else {
      share.pieChartColor = getRandomColor();
      share.transactions.push(transaction);
      storage.default.setItem(symbol.name, share);
    }
    Alert.alert("", "Transaction added");
  } catch (exception) {
    console.log(exception.message);
    Alert.alert("", "Error in adding share");
  }
}
