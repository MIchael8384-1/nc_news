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

exports.renameKeys = input => {
  const newComments = input.map(item => {
    const { belongs_to, created_by, ...restOfContents } = item;
    return { article_id: belongs_to, author: created_by, ...restOfContents };
  });

  return newComments;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    const result = {};
    Object.keys(comment).forEach(key => {
      const value = comment[key];
      if (key === "belongs_to") {
        result["article_id"] = articleRef[comment.belongs_to];
      } else {
        result[key] = value;
      }
    });
    console.log(result);
    return result;
  });
};
