const baseAPI =
  "https://your-api-g-endpoint-here.execute-api.us-east-1.amazonaws.com/dev";

module.exports = {
  baseAPI,
  dynamoDB_GET: baseAPI + "/dynamodb-get"
};
