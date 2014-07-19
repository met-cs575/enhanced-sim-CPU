// init.js

// Using {{ }}, {{= }} as underscore template symbol instead the defaule <% %> to avoid confict with Rails.
_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};

window.App = {
  Model: function(){},
  View: function(){},
  Router: function(){},
  Collection: function(){},
  Controller: function(){},
  Module: function(){},
  Global: {}
}