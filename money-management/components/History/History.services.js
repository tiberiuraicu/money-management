import financeServices from "../../services/financeServices";

export async function getShareHistory(symbol) {
  return await financeServices.getShareHistory(symbol);
}
