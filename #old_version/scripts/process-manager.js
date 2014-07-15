ProcessManager = (function() {
    var processes = [];
	var priorities = [];
	var durationArray = [];

    // Handle all the minus buttons.
    $('#modal-process-needs').click(function(e) {
        var origin = $(e.target).closest('a.btn');
        if(origin.hasClass('delete')) {
            origin.closest('li').remove();
        }
    });

    function addProcess(process) {
        processes[processes.length] = process;
		

        $('#process-list').append('<li data-pid="'+process.pID+'" id="p'+process.pID+'"><strong>' + process.name + 
            '</strong> <span class="metrics"></span> <a href="#" class="close">&times</a>' + 
            '<div class="progress" style="display: none;">' +
                '<div class="bar" style="width: 0%;"></div>' +
            '</div></li>');
    }

    $(function() {
        $('#modal-process-add-need').click(function() {
            $('#modal-process-needs').append('<li>' + $('#modal-process-need-template').html() + '</li>');
        });

        $('#process-list').click(function(e) {
            var origin = $(e.target).closest('a.close').closest('li');
            var pid = parseInt(origin.attr('data-pid'));
            if(pid || pid === 0) {
                origin.remove();
                $.each(processes, function(index) {
                    if(this.pID == pid) {
                        processes.splice(index, 1);
                        return false;
                    }
                });
            }
        });

        $('#modal-process-save').click(function() {
            var name = $('#modal-process-name').val();
			var duration;
            if(name == "") name = undefined;
            var arrival = parseInt($('#modal-process-arrival').val());
            // NaN ≠ NaN
            if(arrival != arrival) arrival = 0;

            var needs = [];
            $('#modal-process-needs > li').each(function() {
                var item = $(this);
                var resource = item.find('.need-resource').val();
                var begin = parseInt(item.find('.need-begin').val()) || 0;
                duration = parseInt(item.find('.need-duration').val()) || 1000;
                var quantity = parseInt(item.find('.need-quantity').val()) || 1;
				
				priority = parseInt(item.find('.need-priority').val());
				
				if(priority > 0){
					priorities.push(priority);
				}
				if(durationArray > 0){
					durationArray.push(duration);
				}
                var need = new Need(resource, duration, begin, quantity);
                needs[needs.length] = need;
            });
			
            var process = new Process(needs, arrival, undefined, name, priority, duration);
            addProcess(process);
			print ("------- Entered priority for " + name + " = " + priority);
			print ("------- Entered duration for " + name + " = " + duration);
			for(var ii in priorities.length){print ("------- Priorities[" + ii + "] = " + priorities[ii]);}
			for(var ii in durationArray.length){print ("------- DurationArray[" + ii + "] = " + durationArray[ii]);}
            $('#custom-process-modal').modal('hide');
        });
    });

    return {
        prompt: function() {
            $('#modal-process-name').val('');
            $('#modal-process-arrival').val('0');
            $('#modal-process-needs').html('');
            
            $('#modal-process-need-list').html('');
            $.each(ResourceManager.resources(), function(index, value) {
                $('#modal-process-need-list').append('<option value="' + value.name + '">' + value.name + '</option>');
            });

            $('#custom-process-modal').modal({'backdrop': 'static'});
        },
        processes: function() {
            return processes.slice();
        },
		priorities: function() {
            return priorities.slice();
        },
        fixReferences: function(simulation) {
            // Sometimes the simulation invalidates our process references.
            // This function can fix them up.
            processes = simulation.processList.concat(simulation.terminatedProcList).concat(simulation.waitingProcList);
        },
        resetAll: function() {
            $.each(processes, function() {
                this.reset();
            });
            $('.metrics').html('');
        },
        bulkLoad: function(processList) {
            $.each(processList, function() {
                addProcess(this);
            });
        },
        clear: function() {
            processes = [];
            $('#process-list').html('');
        }
    }
})();
