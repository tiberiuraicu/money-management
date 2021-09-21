import financeServices from "../../services/financeServices";

export async function getShareHistory(symbol) {
  return await financeServices.getShareHistory(symbol);
}

export async function getHistory() {
  return await financeServices.getHistory();
}

