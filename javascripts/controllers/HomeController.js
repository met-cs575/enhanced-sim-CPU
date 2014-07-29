App.Controller.HomeController = {

  index: function(){
    //console.log('home');
    //App.Module.generateProcesses(3);
    
    
    //$('div.result').append(output);
    // processList.render();
  },
  start: function() {
    App.Module.generateProcesses(App.Global.howManyProcesses);
    processList.render();

    simulatorFIFO.render();
    simulatorRR.render();
    simulatorSJF.render();
    return false;
  }

};

