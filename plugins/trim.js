module.exports = function (params, callback) {
  params.content = params.content.trim() + '\n';
  callback();
};

module.exports.options = {
  stage: 'render:post:page'
};
