const logger = require('../utils/logger');
const AWS = require('aws-sdk');
const config = require('../config/default');
const { v1: uuidv1 } = require('uuid');

AWS.config.update(config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient();

const getGetData = function (req, res) {
  if (req.query.id == null) {
    logger.error('No id param in query');
    res.status(400).send();
    return;
  }
  const params = {
    TableName: config.aws_table_name,
    Key: {
      id: req.query.id,
    },
  };

  docClient.get(params, function (err, data) {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        message: err,
      });
    } else {
      logger.info(data);
      const { Item } = data;
      res.send({
        success: true,
        item: Item,
      });
    }
  });
};

const getPostData = function (req, res) {
  const Item = { ...req.body };
  logger.info(Item);
  Item.id = uuidv1();
  var params = {
    TableName: config.aws_table_name,
    Item: Item,
  };

  // Call DynamoDB to add the item to the table
  docClient.put(params, function (err, data) {
    if (err) {
      res.send({
        success: false,
        message: err,
      });
    } else {
      res.send({
        success: true,
        message: 'Added Item',
        item: data,
      });
    }
  });
};

module.exports = {
  getGetData,
  getPostData,
};
