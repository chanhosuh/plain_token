const displayDecimals = (amount, decimals) => {
  const _amount = parseInt(amount.toString()) / 10 ** parseInt(decimals);
  return _amount.toString();
};

export { displayDecimals };
