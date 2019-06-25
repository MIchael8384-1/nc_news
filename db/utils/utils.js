exports.formatDate = list => {
  const newArray = list.map(item => {
    const { created_at, ...restOfContent } = item;
    return { created_at: new Date(item.created_at), ...restOfContent };
  });
  return newArray;
};

exports.makeRefObj = (list, paramOne, paramTwo) => {
  const result = {};

  for (let i = 0; i < list.length; i++) {
    result[list[i][paramOne]] = list[i][paramTwo];
  }
  return result;
};

exports.formatComments = (comments, articleRef) => {};
