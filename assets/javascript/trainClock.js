window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
              window.setTimeout(callback, 1000 / 60);
          };
})();

(function clock(){ 
  console.log("clock");
    var hour = document.getElementById("hour"),
        min = document.getElementById("min"),
        sec = document.getElementById("sec");
    (function loop(){
        requestAnimFrame(loop);
        draw();
    })();
    function draw(){
        var now = new Date(),
            then = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0),
            diffInMil = (now.getTime() - then.getTime()),
            h = (diffInMil/(1000*60*60)),
            m = (h*60),
            s = (m*60);
        sec.style.webkitTransform = "rotate(" + (s * 6) + "deg)";
        hour.style.webkitTransform = "rotate(" + (h * 30 + (h / 2)) + "deg)";
        min.style.webkitTransform = "rotate(" + (m * 6) + "deg)"; 
    }
})();
     