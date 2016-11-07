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
  const vines = header.querySelectorAll("[data-vine]"); console.log(vines);
  const shrooms = header.querySelectorAll("[data-shroom]"); console.log(shrooms);
  const ambientAudio = document.querySelector("[data-audio=ambient]"); console.log(ambientAudio);

  let mouseX = 0;
  let mouseY = 0;
  let scrollDist = 0;

  // Bind
  function bindEvents() {
    document.addEventListener("mousemove", function(e) { moveArt(e); } );
    document.addEventListener("scroll", function(e) { scrollArt(e); });    
  }

  // Start
  bindEvents();
  setStartPos(); // prepare all elements
  revealScene(); // fade to black
  playScene(); // start animation



  // Event handlers
  function moveArt(e) {
    mouseX = (e.screenX - window.innerWidth/2)/(window.innerWidth/2); // -1 / 1
    mouseY = (e.screenY - window.innerHeight/2)/(window.innerHeight/2);
    scrollDist = window.pageYOffset;

    for (let i = 0; i < layers.length; i++) {
      var layerOffsetAmount = 15 * i;
      var layerPosX = layerOffsetAmount * mouseX;
      var layerPosY = layerOffsetAmount * mouseY;

      TweenMax.to(layers[i], 5, {
        x: -layerPosX,
        y: -layerPosY,
        ease: Power4.easeOut
      });
    }
  }

 /* function scrollArt(e) {
  // Enable/disable panning while scrolling
    scrollDist = window.pageYOffset;
    for (let i = 0; i < layers.length; i++) {
      var layerOffsetAmount = 1;
      var layerPosY = scrollDist;
      
      // TweenMax.set(layers[i], { y: -layerPosY });
    }
  }*/


  function setStartPos() {
    TweenMax.set(log, { y: -700 });
    for (let i = 0; i < layers.length; i++) {
      TweenMax.set(layers[i], {y: -150*i});
    }
  }


  function revealScene() {
    TweenMax.to(header, 1, { autoAlpha: 1 });
  }


  function playScene() {
    setStartPos();
    parallaxLayers();
    playMusic();
    
    // System discrimination
    if (true) {
      dancingFireflies();
      swingingVines();
      pulsatingShrooms();  
    } else {
      // Remove everything fancy
        // Hide lights
        // Hide glows
        // Make gradients flat
    }
    

    // Reveal Kodamas
    // Reveal Text
    // Spin heads
  }



  
  function parallaxLayers() {
    TweenMax.to(log, 10, { y: 0 });
    
    for (let i = 0; i < layers.length; i++) {
      TweenMax.to(layers[i], 10, {y: 0});
    }
  }



  function playMusic() {
    ambientAudio.volume = 0.1;
    ambientAudio.play();
  }


  
  function dancingFireflies() {
    var interval = 4,
        duration = interval;        

    TweenMax.to(["#fireflies1"], random(1,3), {
      rotation: random(0,60),
      scale: random(0.5,1),
      x:random(1250,1350),
      y: random(25,100)
    });

    TweenMax.to(["#fireflies2"], random(2,4), {
      rotation: random(0,60),
      scale: random(0.5,1),
      x:random(1050,1150),
      y: random(325,400)
    });

    setTimeout(function() {
      for (let i = 0; i < ff.length; i++) {
        
        var x = [
              random(-15,15)*(i+2)/3,
              random(-15,15)*(i+2)/3,
              random(-15,15)*(i+2)/3
            ];

        TweenMax.to(ff[i], duration, {
          bezier: { curviness:1, values: [
            { x: 0+i*10, y: 0+i*10 },
            { x: x[0], y: x[2] },
            { x: x[1], y: 0 },
            { x: x[2], y: x[1] },
            { x: 0+i*10, y: 0+i*10 }
          ]},
          opacity: random(0.3,1),
          ease: Linear.easeNone
        });
      }
      
      dancingFireflies();
    }, interval*1000);  
  }

  
  function swingingVines() {

    setTimeout(function() {
      for (let i = 0; i < vines.length; i++) {
        TweenMax.to(vines[i], random(5,5), {
          rotation: random(-3,3), transformOrigin: "top center", ease: Linear.easeNone});  
      }
      
      swingingVines();
    }, 5000);
  }

  
  function pulsatingShrooms() {
  
    setTimeout(function() {
      for (let i = 0; i < shrooms.length; i++) {
        TweenMax.to(shrooms[i], 0.5, {
          scale: random(1.1,1.3),
          transformOrigin: "center center",
          ease: SlowMo.ease.config(0.1, 0.1, true),
          delay: random(1,4)
        });  
      }
      
      pulsatingShrooms();
    }, 5000);
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






