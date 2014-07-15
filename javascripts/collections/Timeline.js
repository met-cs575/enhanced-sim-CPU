App.Collection.Timeline = Backbone.Collection.extend({
  model: App.Model.Timeframe,
  comparator: 'time'
});