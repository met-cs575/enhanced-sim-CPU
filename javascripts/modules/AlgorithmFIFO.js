App.Module.AlgorithmFIFO = function(processes, atTime) {
  atTime = typeof atTime == 'undefined' ? 0 : atTime;

  // Make a clone of input processes so the original data won't be changed.
  var theseProcesses = processes.clone();
  // Sort collection by the arrive time.
  theseProcesses.comparator = 'arrive_at';
  theseProcesses.sort();

  var busy = false;
  // var timeline = new App.Collection.Timeline();
  var tasks = new App.Collection.Tasks();
  // Build the tasks
  var time = 0;
  var count = 0
  for(var i = 0; i < theseProcesses.length; ) {
    var task = new App.Model.Task();
    var p = theseProcesses.at(i);
    var arrive_at = p.get('arrive_at');

    var duration = 0;
    var type = '';
    var start_at = 0;
    var processSerial = 'null';
//debugger;
    if(arrive_at > time) { // means idle
      duration = p.get('arrive_at') - time;
      type = 'idle';
      p = null;
    //} else if(time > p.get('arrive_at')) { // means queue

    } else { // means busy
      //arrive_at = time;
      duration = p.get('burst_time');
      processSerial = p.get('serial');
      type = 'process';
      i++;
    }

    //console.log("i:" + i + ", arr: " + arrive_at + ", time: " + time + ", duration: " + duration);
    time += duration;
    
    
    task.id = count;
    task.set('type', type);
    task.set('process', p);
    task.set('duration', duration);
    task.set('time', time);
    task.set('process_serial', processSerial);
    tasks.add(task);
    
    count++;
  }
  return tasks;
}