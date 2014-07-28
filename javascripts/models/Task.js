App.Model.Task = Backbone.Model.extend({
  time: 0,
  duration: 0,
  process: null, // null if context switch.
  process_serial: 'null'
});