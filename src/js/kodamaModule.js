// Log
  // Make graphic
  // Layout with specific goals

// Change copy "a tribute to"?
// Make text floaty feel?
// Correct grads

// Make mobile
// Light and title are static, exclude from animation array

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
  const ff = header.querySelectorAll("[data-ff]"); console.log(ff);
  const vines = header.querySelectorAll("[data-vine]"); console.log(vines);
  const shrooms = header.querySelectorAll("[data-shroom]"); console.log(shrooms);
  const text = header.querySelectorAll("[data-text]"); console.log(text);
  const textMobile = header.querySelectorAll("[data-text-mobile]"); console.log(textMobile);

  const foreground = document.querySelector("[data-foreground]"); console.log(foreground);

  const audioGroup = document.querySelector("[data-audio-group]");
  const ambientAudio = audioGroup.querySelector("[data-audio=ambient]"); console.log(ambientAudio);
  const spinAudio1 = audioGroup.querySelector("[data-audio=spin1]"); console.log(spinAudio1);
  const spinAudio2 = audioGroup.querySelector("[data-audio=spin2]"); console.log(spinAudio2);
  const spinAudio3 = audioGroup.querySelector("[data-audio=spin3]"); console.log(spinAudio3);

  const mainTl = new TimelineMax({paused: true});


  let mouseX = 0;
  let mouseY = 0;
  let scrollDist = 0;

  let musicMuted = false;

  // Bind
  function bindEvents() {
    document.addEventListener("mousemove", function(e) { moveArt(e); } );
    document.addEventListener("scroll", function(e) { scrollArt(e); });    
  }

  // Start
  createTimeline();
  setStartPos(); // prepare all elements
  revealScene(); // fade to black
  playScene(); // start animation



  // Event handlers
  function moveArt(e) {
    mouseX = (e.screenX - window.innerWidth/2)/(window.innerWidth/2); // -1 / 1
    mouseY = (e.screenY - window.innerHeight/2)/(window.innerHeight/2);
    scrollDist = window.pageYOffset;

    for (let i = 0; i < layers.length; i++) {
      var layerOffsetAmount = 10 * i;
      var layerPosX = layerOffsetAmount * mouseX;
      var layerPosY = layerOffsetAmount * mouseY;
      if (false) {
        // do something...
      } else {
        TweenMax.to(layers[i], 5, {
          x: -layerPosX,
          y: -layerPosY,
          ease: Power4.easeOut
        });
      }
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
  
  function createTimeline() {
    mainTl
      .add("revealKodamas")
      .to(kodamas[0], 3, { autoAlpha: 0.7, ease: Power3.easeOut}, 7)
      .to(kodamas[1], 3, { autoAlpha: 0.7, ease: Power3.easeOut}, 9.5)
      .to(kodamas[2], 3, { autoAlpha: 0.7, ease: Power3.easeOut}, 10.5)
      .call(bindEvents, [""], this, 7)

      .add("revealTitle")
      .to(text[0], 3, { autoAlpha: 1, ease: Power3.easeOut}, 11.3)
      .to(text[1], 3, { autoAlpha: 0.7, ease: Power3.easeOut}, 12.2)


      .add("spinHeads")
      .add("spin1")
      .to(heads[0], 2, {rotation: 90, transformOrigin: "center center"}, "spin1")
      .to(heads[0], 2, {rotation: 0, ease: Elastic.easeOut.config(1.5, 0.1), transformOrigin: "center center"}, "spin1 =+2")
      .call(playSFX, [spinAudio1], this, "spin1")
      .add("spin2", "spin1 =+2")
      .to(heads[1], 2, {rotation: 90, transformOrigin: "center center"}, "spin2")
      .to(heads[1], 2, {rotation: 0, ease: Elastic.easeOut.config(1.5, 0.1), transformOrigin: "center center"}, "spin2 =+2")
      .call(playSFX, [spinAudio2], this, "spin2")
      .add("spin3", "spin1 =+2.3")
      .to(heads[2], 2, {rotation: 90, transformOrigin: "center center"}, "spin3")
      .to(heads[2], 2, {rotation: 0, ease: Elastic.easeOut.config(1.5, 0.1), transformOrigin: "center center"}, "spin3 =+2")
      .call(playSFX, [spinAudio3], this, "spin3");
  }

  function setStartPos() {
    TweenMax.set(kodamas[0], { scale: 0.8, transformOrigin: "bottom center" });
    for (let i = 0; i < layers.length; i++) {
      TweenMax.set(layers[i], {y: -150*i});
      TweenMax.set(foreground, { y: -400 });
    }

  }


  function revealScene() {
    TweenMax.to(header, 1, { autoAlpha: 1 });
  }


  function playScene() {
    // Unbind events if any
    setStartPos();
    parallaxLayers();
    //playMusic();
    playMainTl();
    
    // System discrimination, default, more, less
    if (true) {
      dancingFireflies();
      swingingVines();
      pulsatingShrooms();  
    } else {
      // Remove everything fancy
        // Hide lights
        // Hide blob glows
        // Hide kodama glows
        // Make gradients flat
        // Make bg lighter
    }
    

    // Reveal Kodamas
    // Reveal Text
    // Spin heads
  }



  
  function parallaxLayers() {    
    for (let i = 0; i < layers.length; i++) {
      TweenMax.to(layers[i], 10, { y: 0 });
    }

    TweenMax.to(foreground, 10, { y: 0 });
  }



  function playMusic() {
    ambientAudio.volume = 0.1;
    ambientAudio.currentTime = 0;
    ambientAudio.play();
  }
  
  function toggleMusic() {
    if (ambientAudio.volume === 0) {
      ambientAudio.volume = 0.1;
      spinAudio1.volume = 1;
      spinAudio2.volume = 1;
      spinAudio3.volume = 1;
    } else {
      ambientAudio.volume = 0;
      spinAudio1.volume = 0;
      spinAudio2.volume = 0;
      spinAudio3.volume = 0;
    }
    
  }

  function playSFX(audio) {
    if (musicMuted) {
      audio.volume = 0;  
    }
    audio.currentTime = 0;
    audio.play(); 
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
  function playMainTl() {
      mainTl.restart();
    }




  return {
    replay: playScene,
    mute: toggleMusic
  };

}) ();




/*

function mobileStart() {
  spin1.load();
  spin2.load();
  spin3.load();
  
  ambient.load();
  ambient.loadeddata = start();
}
*/