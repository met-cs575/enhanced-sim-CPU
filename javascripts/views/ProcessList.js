App.View.ProcessList = Backbone.View.extend({
  el: '.page',
  collection: App.Global.processes,
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addProcess);
  },
  render: function(){
    var self = this;
    this.collection.comparator = 'arrive_at';
    this.collection.sort();
    var template = _.template($('#process-list-template').html(), {processes: this.collection});
    self.$el.html(template);
  },
  addProcess: function() {
    this.render();
  }
});
var processList = new App.View.ProcessList();
