App.Controller.HomeController = {

  index: function(){
    //console.log('home');
    App.Module.generateProcesses(3);
    processList.render();
    simulatorFIFO.render();
    simulatorRR.render();
    simulatorSJF.render();
    //$('div.result').append(output);
    // processList.render();
  }

};

