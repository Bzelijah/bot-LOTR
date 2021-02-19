const {
  connect,
  pluralize,
  Schema,
  model,
} = require('mongoose');

pluralize(null);

const userSchema = new Schema({
  name: String,
  chatID: String,
});

module.exports = {
  connect,
  User: model('users', userSchema),
};
