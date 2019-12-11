const { Schema, model } = require('mongoose');

const DevSchema = Schema({
   name: {
      type: String,
      required: true
   },
   user: {
      type: String,
      required: true
   },
   bio: String,
   avatar: {
      type: String,
      required: true
   },
   likes: [{
      type: Schema.Types.ObjectId,
      ref: 'Dev',
   }],
   deslikes: [{
      type: Schema.Types.ObjectId,
      ref: 'Dev',
   }],
}, {
   timestamps: true, //gera os campos createdAt e updatedAt automatico
});

module.exports = model('Dev', DevSchema);