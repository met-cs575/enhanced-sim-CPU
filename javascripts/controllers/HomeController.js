App.Controller.HomeController = {

  index: function(){
    viewport.generateProcesses(null);
    simulator.render();
    //$('div.result').append(output);
    // processList.render();
  }

};

