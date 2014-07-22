App.Module.generateProcesses = function(limit) {
  // console.log("App.Global.howManyProcesses: "+ App.Global.howManyProcesses);
  App.Global.processes.reset();
  var models = new Array();
  for(var i = 0; i < limit; i++) {
    processData = {
      serial: i,
      name: "Awesome process",
      arrive_at: Math.floor((Math.random() * 20) + 1),
      burst_time: Math.floor((Math.random() * 30) + 1),
      deadline: Math.floor((Math.random() * 40) + 1)
    }
    process = new App.Model.Process(processData);
    models.push(process);
    // console.log('generated');
  }

  App.Global.processes.add(models);
  //process.save(processData);
  //console.log("processes generated");
  // console.log(processes);
  return false;
}