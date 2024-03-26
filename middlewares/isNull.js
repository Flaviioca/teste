const isNull = (input = null) => {
  if (!input || typeof input === 'undefined' || input === null) {
    return true;
  }

  return false;
};

module.exports = isNull;
