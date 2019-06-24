exports.formatDate = list => {
  const newArray = list.map(item => {
    const { created_at, ...restOfContent } = item;
    return { created_at: new Date(item.created_at), ...restOfContent };
  });
  return newArray;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
