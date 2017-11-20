'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ItemSchema = new Schema({
  batchNo: {
    type: String,
    required: true,
    unique: true
  },
  active: {
    type: Boolean,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  warehouse: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  manufacturedDate: {
    type: Number,
    required: true
  },
  expiredDate: {
    timestamp: {
      type: Number,
      default: Date.now()
    },
    time_zone: {
      type: Number,
      default: (new Date()).getTimezoneOffset() / -0.6
    }
  },
  quantity: {
    type: Number,
    required: true
  },
  historyExport: [{
    exportTime: Number,
    quantity: Number,
    isConfirm: Boolean,
    reason: String,
    issusedBy: String
  }],
  historyImport: [{
    importTime: Number,
    quantity: Number,
    isConfirm: Boolean,
    reason: String,
    issusedBy: String
  }],
  createdAT: {
    timestamp: {
      type: Number,
      default: Date.now()
    },
    time_zone: {
      type: Number,
      default: (new Date()).getTimezoneOffset() / -0.6
    }
  },
  update: [{
    timestamp: {
      type: Number,
      default: Date.now()
    },
    time_zone: {
      type: Number,
      default: (new Date()).getTimezoneOffset() / -0.6
    },
    updateBy: {
      type: String
    }
  }]
});

mongoose.model('Item', ItemSchema);
