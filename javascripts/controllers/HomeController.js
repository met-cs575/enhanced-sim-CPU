App.Controller.HomeController = {

  index: function(){
    //console.log('home');
    App.Module.generateProcesses(10);
    processList.render();
    simulator.render();
    //$('div.result').append(output);
    // processList.render();
  }

};

