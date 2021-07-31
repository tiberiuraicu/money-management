import financeServices from "../../services/financeServices";

export async function getShareMetrics(symbol) {
  return await financeServices.getShareMetrics(symbol);
}

export async function getShareEarnings(symbol) {
  return await financeServices.getShareEarnings(symbol);
}
