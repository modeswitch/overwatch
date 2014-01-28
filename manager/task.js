var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var async = require('../common/async');

function Task(id, job) {
  var task = this;
  var result = null;

  this.id = function id() {
    return id;
  };

  this.job = function job() {
    return job;
  };

  this.complete = function complete(value) {
    if(undefined == value) {
      value = {};
    }
    result = value;

    async(function() {
      task.emit(Task.E_COMPLETE);
    };
  };

  this.retry = function retry() {
    result = null;

    async(function() {
      task.emit(Task.E_RETRY);
    });
  };

  this.abort = function abort() {
    result = null;

    async(function() {
      task.emit(Task.E_ABORT);
    });
  };
}

inherits(Task, EventEmitter);

Task.E_COMPLETE = 'COMPLETE';
Task.E_RETRY = 'RETRY';
Task.E_ABORT = 'ABORT';

module.exports = Task;