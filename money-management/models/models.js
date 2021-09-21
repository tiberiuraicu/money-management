export default {
  getTransaction: (price, numberOfShares, transactionType) => {
    return {
      price: price,
      numberOfShares: numberOfShares,
      transactionKey: Math.random().toString(),
      transactionType: transactionType,
    };
  },
};
