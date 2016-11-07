function random(min, max) {
  if (max === null) { max = min; min = 0; }
  return Math.random() * (max - min) + min;
}

// Init
const kodamaProject = (function() {

  // CacheDOM
  const header = document.querySelector("[data-header]"); console.log(header);
  const layers = header.querySelectorAll("[data-layer]"); console.log(layers);
  const kodamas = header.querySelectorAll("[data-kodama]"); console.log(kodamas);
  const heads = header.querySelectorAll("[data-head]"); console.log(heads);
  const log = header.querySelector("[data-log]"); console.log(log);
  const ff = header.querySelectorAll("[data-ff]"); console.log(ff);
  const ambientAudio = document.querySelector("[data-audio=ambient]");

  let mouseX = 0;
  let mouseY = 0;
  let scrollDist = 0;

  // Bind
  function bindEvents() {
    document.addEventListener("mousemove", function(e) { moveArt(e); } );
    document.addEventListener("scroll", function(e) { scrollArt(e); });    
  }

  // Event handlers
  function moveArt(e) {
    mouseX = (e.pageX - window.innerWidth/2)/(window.innerWidth/2); // -1 / 1
    mouseY = (e.pageY - window.innerHeight/2)/(window.innerHeight/2);
    scrollDist = window.pageYOffset;

    for (let i = 0; i < layers.length; i++) {
      var layerOffsetAmount = 15 * i;
      var layerPosX = layerOffsetAmount * mouseX;
      var layerPosY = layerOffsetAmount * mouseY + scrollDist;

      TweenMax.to(layers[i], 5, {
        x: -layerPosX,
        y: -layerPosY,
        ease: Power4.easeOut
      });
    }
  }

  function scrollArt(e) {
    scrollDist = window.pageYOffset;
    for (let i = 0; i < layers.length; i++) {
      var layerOffsetAmount = 1;
      var layerPosY = scrollDist;
      
//      TweenMax.set(layers[i], { y: -layerPosY });
    }
  }


  function setStartPos() {
    TweenMax.set(log, { y: -700 });
    for (let i = 0; i < layers.length; i++) {
      TweenMax.set(layers[i], {y: -150*i});
    }
  }

  function revealScene() {
    TweenMax.to(header, 1, { autoAlpha: 1 });
  }

  function playIntro() {
    setStartPos();
    firefly();
    ambientAudio.volume = 0.1;
    ambientAudio.play();
    TweenMax.to(log, 10, { y: 0 });
    for (let i = 0; i < layers.length; i++) {
      TweenMax.to(layers[i], 10, {y: 0});
    }

    // Reveal Kodamas
    // Reveal Text
    // Spin heads
  }

  // bindEvents();
  setStartPos(); // prepare all elements
  revealScene(); // fade to black
  playIntro(); // start animation

  // Dancing fireflies
  function firefly() {
    var interval = 2,
        duration = interval;        

    TweenMax.to("#fireflies", duration, {x:random(1250,1350), y: random(25,100)});

    setTimeout(function() {
      for (let i = 0; i < ff.length; i++) {
        var x = [random(-15,15)*(i+2)/3, random(-15,15)*(i+2)/3, random(-15,15)*(i+2)/3],
            scale = [random(0.1, 0.2), random(0.1,0.2), random(0.2,0.5)];

        TweenMax.to(ff[i], duration, {
          bezier: { curviness:1, values: [
            { x: 0+i*10, y: 0+i*10 },
            { x: x[0], y: x[2] },
            { x: x[1], y: 0 },
            { x: x[2], y: x[1] },
            { x: 0+i*10, y: 0+i*10 }
          ]},
          ease: Linear.easeNone
        });
      }
      
      firefly();
    }, interval*1000);  
  }

  // reveal kodamas
  function kodamasIn() {
    for (let i = 0; i < kodamas.length; i++) {
      TweenMax.to(kodamas[i], 1, {autoAlpha: 1, delay: i*0.5});
    }
  }
 
  // reveal text


  // spin heads
  function spinHeads() {
    for (let i = 0; i < heads.length; i++) {
      let tl = new TimelineMax();

      tl.to(heads[i], 1, {rotation: 90, delay: i*0.5, transformOrigin: "center"})
        .to(heads[i], 1, {rotation: 0 });
    }
  }

  return {
    header: header,
    layers: layers,
    playIntro: playIntro,
    kodamasIn: kodamasIn,
    spinHeads: spinHeads,
    firefly: firefly
  };

}) ();



/*

function playSpin(audio) {
  audio.currentTime = 0;
  audio.play();
}


var audio = ambient;
if (Modernizr.audio.ogg) {
  // do ogg stuff
}


function mobileStart() {
  spin1.load();
  spin2.load();
  spin3.load();
  
  ambient.load();
  ambient.loadeddata = start();
}
*/






