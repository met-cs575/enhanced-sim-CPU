var Konami=function(){var a={addEvent:function(b,c,d,e){if(b.addEventListener)b.addEventListener(c,d,false);else if(b.attachEvent){b["e"+c+d]=d;b[c+d]=function(){b["e"+c+d](window.event,e)};b.attachEvent("on"+c,b[c+d])}},input:"",pattern:"3838404037393739666513",load:function(b){this.addEvent(document,"keydown",function(c,d){if(d)a=d;a.input+=c?c.keyCode:event.keyCode;if(a.input.length>a.pattern.length)a.input=a.input.substr(a.input.length-a.pattern.length);if(a.input==a.pattern){a.code(b);a.input=
""}},this);this.iphone.load(b)},code:function(b){window.location=b},iphone:{start_x:0,start_y:0,stop_x:0,stop_y:0,tap:false,capture:false,orig_keys:"",keys:["UP","UP","DOWN","DOWN","LEFT","RIGHT","LEFT","RIGHT","TAP","TAP","TAP"],code:function(b){a.code(b)},load:function(b){this.orig_keys=this.keys;a.addEvent(document,"touchmove",function(c){if(c.touches.length==1&&a.iphone.capture==true){c=c.touches[0];a.iphone.stop_x=c.pageX;a.iphone.stop_y=c.pageY;a.iphone.tap=false;a.iphone.capture=false;a.iphone.check_direction()}});
a.addEvent(document,"touchend",function(){a.iphone.tap==true&&a.iphone.check_direction(b)},false);a.addEvent(document,"touchstart",function(c){a.iphone.start_x=c.changedTouches[0].pageX;a.iphone.start_y=c.changedTouches[0].pageY;a.iphone.tap=true;a.iphone.capture=true})},check_direction:function(b){x_magnitude=Math.abs(this.start_x-this.stop_x);y_magnitude=Math.abs(this.start_y-this.stop_y);x=this.start_x-this.stop_x<0?"RIGHT":"LEFT";y=this.start_y-this.stop_y<0?"DOWN":"UP";result=x_magnitude>y_magnitude?
x:y;result=this.tap==true?"TAP":result;if(result==this.keys[0])this.keys=this.keys.slice(1,this.keys.length);if(this.keys.length==0){this.keys=this.orig_keys;this.code(b)}}}};return a};

(function() {
    var konami = new Konami();
    konami.code = function() {
        $('#demo-buttons').show('slow');
    }
    konami.load();
})();

$(function() {
    $('#demo-lock').click(function() {
        ResourceManager.clear();
        ProcessManager.clear();
        ResourceManager.bulkLoad([
            new RoundRobinCPU('CPU (Quad-Core)', 50, 4),
            new Resource('LOCK')
        ]);
        ResourceManager.resources()[1].addBlockWaitFor("CPU (Quad-Core)");
        for(var i = 0; i < 5; ++i) {
            ProcessManager.bulkLoad([
                new Process([
                    new Need('CPU (Quad-Core)', 1000, 0),
                    new Need('LOCK', 200, 50),
                    new Need('LOCK', 200, 300),
                    new Need('LOCK', 200, 550),
                    new Need('LOCK', 180, 800)], 0)]);
        }
    });

    $('#demo-deadlock').click(function() {
        ResourceManager.clear();
        ProcessManager.clear();
        ResourceManager.bulkLoad([
            new RoundRobinCPU('CPU', 50, 1),
            new Resource('LOCK1'),
            new Resource('LOCK2')
        ]);

        ProcessManager.bulkLoad([
            new Process([new Need('CPU', 1000, 0), new Need('LOCK1', 990, 10), new Need('LOCK2', 940, 60)]),
            new Process([new Need('CPU', 1000, 0), new Need('LOCK2', 990, 10), new Need('LOCK1', 940, 60)]),
        ]);
    });

    $('#demo-multicore').click(function() {
        ResourceManager.clear();
        ProcessManager.clear();
        ResourceManager.bulkLoad([
            new RoundRobinCPU('CPU', 50, 4)
        ]);
        for(var i = 0; i < 13; ++i) {
            ProcessManager.bulkLoad([
                new Process([new Need('CPU', 1000, 0)], 0)
            ]);
        }
    });
});