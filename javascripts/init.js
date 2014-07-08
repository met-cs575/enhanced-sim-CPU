// init.js

// Using {{ }}, {{= }} as underscore template symbol instead the defaule <% %> to avoid confict with Rails.
_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};

// Model
var Process = Backbone.Model.extend({
  // urlRoot for AJAX requests.
  urlRoot: "/process", 
  initialize: function() {
    arriveTime = 0;
    burstTime = 0;
    period = 0;
    priority = 0;
  }

});


// Colleciton
var Processes = Backbone.Collection.extend({
  model: Process
  // TODO
  // url: "/"
});

var processes = new Processes();

// View
var Viewport = Backbone.View.extend({
  // el: 'div.container',
  render: function(){
    // Main view port dose not need to render
  },
  events: {
    // Bind event here
    'click a.generate-processes': 'generateProcesses'
    //'click': 'generate_processes'
  },
  generateProcesses: function(ev) {
    // Note: this dose not refer to the event target.
    // This refer to Backbone view object it self.
    self = ev.currentTarget;
    process = new Process();
    processData = {
      arriveTime: 100,
      burstTime: 20,
      period: 50
    }
    processes.add(processData);
    //process.save(processData);
    return false;
  }
});
var viewport = new Viewport();


var ProcessList = Backbone.View.extend({
  el: '.page',
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addProcess);
  },
  collection: processes,
  render: function(){
    var self = this;
    var template = _.template($('#process-list-template').html(), {processes: processes.models});
    self.$el.html(template);
  },
  addProcess: function() {
    conlose.log("processess added");
  }
});
var processList = new ProcessList();

// Router
var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'generate_processes': 'generate_processes'
  }
});

var router = new Router();
router.on('route:home', function(){
  //viewport.render();
  // processList.render();
});
router.on('route:generate_processes', function(){
  // processList.render();
});

Backbone.history.start();