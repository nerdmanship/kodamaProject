// Make text floaty

// Light pulse
// Reveal fireflies on que
// Write text

// System discriminatio
// Add scroll indicator

// Make mobile

function random(min, max) {
  if (max === null) { max = min; min = 0; }
  return Math.random() * (max - min) + min;
}


const kodamaProject = function() {

//¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
//        INITIALIZATION
//___________________________________________________________________________________________

  // CacheDOM
  const header = document.querySelector("[data-header]"); console.log(header);
  const layers = header.querySelectorAll("[data-layer]"); console.log(layers);
  const light = header.querySelector("[data-light]"); console.log(light);
  const kodamas = header.querySelectorAll("[data-kodama]"); console.log(kodamas);
  const heads = header.querySelectorAll("[data-head]"); console.log(heads);
  const ff = header.querySelectorAll("[data-ff]"); console.log(ff);
  const vines = header.querySelectorAll("[data-vine]"); console.log(vines);
  const shrooms = header.querySelectorAll("[data-shroom]"); console.log(shrooms);
  const texts = header.querySelectorAll("[data-text]"); console.log(texts);
  const textMobile = header.querySelectorAll("[data-text-mobile]"); console.log(textMobile);

  const sticks = document.querySelectorAll("[data-stick]"); console.log(sticks);

  const foreground = document.querySelector("[data-foreground]"); console.log(foreground);

  const buttons = document.querySelectorAll("[data-btn]"); console.log(buttons);
  const muteButton = document.querySelector("[data-btn=mute]"); console.log(muteButton);
  const replayButton = document.querySelector("[data-btn=replay]"); console.log(replayButton);
  
  const scrollInd = document.querySelector("[data-scrollInd]"); console.log(scrollInd);
  const arrows = scrollInd.querySelectorAll("[data-arrow]"); console.log(arrows);

  const audioGroup = document.querySelector("[data-audio-group]");
  const ambientAudio = audioGroup.querySelector("[data-audio=ambient]"); console.log(ambientAudio);
  const spinAudio1 = audioGroup.querySelector("[data-audio=spin1]"); console.log(spinAudio1);
  const spinAudio2 = audioGroup.querySelector("[data-audio=spin2]"); console.log(spinAudio2);
  const spinAudio3 = audioGroup.querySelector("[data-audio=spin3]"); console.log(spinAudio3);

  const mainTl = new TimelineMax({paused: true, onComplete: revealScrollInd});

  let musicMuted = false;

  let mouseX = 0;
  let mouseY = 0;
  let scrollDist = 0;

  // Bind
  function bindEvents() {
    muteButton.addEventListener("click", toggleAudio);
    replayButton.addEventListener("click", playScene);

    buttons[0].addEventListener("mouseover", highlightIcon);
    buttons[1].addEventListener("mouseover", highlightIcon);

    buttons[0].addEventListener("mouseout", dimIcon);
    buttons[1].addEventListener("mouseout", dimIcon);

    buttons[0].addEventListener("click", feedbackIcon);
    buttons[1].addEventListener("click", feedbackIcon);
  }




  bindEvents(); // Bind Events
  createTimeline(); // Create main timeline
  setStartPos(); // prepare all elements
  revealScene(); // fade to black
  animateMuteIcon(); // Display audio options
  playScene(); // start animation





//¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
//        CORE FUNC
//___________________________________________________________________________________________

function playScene() {
    setStartPos();
    parallaxIntro();
    playMusic();
    playMainTl();
    
    // System discrimination, default, more, less
    if (true) {
      dancingFireflies();
      swingingVines();
      pulsatingShrooms();
      pulseLight();
      floatingText();

    } else {
      // Remove everything fancy
        // Hide lights
        // Hide blob glows
        // Hide kodama glows
        // Make gradients flat
        // Make bg lighter
    }
  }

  function createTimeline() {
    mainTl
      .add("revealKodamas")
      .to(kodamas[0], 3, { autoAlpha: 0.7, ease: Power3.easeOut}, 7)
      .to(kodamas[1], 3, { autoAlpha: 0.7, ease: Power3.easeOut}, 9.5)
      .to(kodamas[2], 3, { autoAlpha: 0.7, ease: Power3.easeOut}, 10.5)
      .call(bindParallax, [""], this, 7)

      .add("revealTitle")
      .to(texts[0], 3, { autoAlpha: 1, ease: Power3.easeOut}, 11.3)
      .to(texts[1], 3, { autoAlpha: 0.7, ease: Power3.easeOut}, 12.2)

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

    unbindParallax();
    
    TweenMax.set(scrollInd, { opacity: 0 });

    // Light pollution off
    TweenMax.set(light, { autoAlpha: 0 });
    
    // Resize background Kodama
    TweenMax.set(kodamas[0], { scale: 0.8, transformOrigin: "bottom center" });
    
    // Foreground start position
    TweenMax.set(foreground, { y: -200 });

    // All layers start position
    for (let i = 0; i < layers.length; i++) {
      TweenMax.set(layers[i], {y: -150*i});
    }
  }


  function revealScene() {
    TweenMax.to(header, 1, { autoAlpha: 1 });
  }



  

  function parallaxIntro() {    
    for (let i = 0; i < layers.length; i++) {
      TweenMax.to(layers[i], 10, { y: 0 });
    }

    TweenMax.to(foreground, 10, { y: window.innerHeight-200 });
    TweenMax.set(light, { autoAlpha: 0, delay: 9.9});
    TweenMax.to(light, 3, { autoAlpha: 0.2, delay: 10});
  }

  function playMainTl() {
      mainTl.restart();
    }

  function playMusic() {
    if (musicMuted) {
      ambientAudio.volume = 0;
    } else {
      ambientAudio.volume = 0.1;  
    }
    ambientAudio.currentTime = 0;
    ambientAudio.play();
  }


  function playSFX(audio) {
    if (musicMuted) {
      audio.volume = 0;  
    }
    audio.currentTime = 0;
    audio.play(); 
  }

//¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
//        INTERACTION
//___________________________________________________________________________________________
  
  // Bind interactions
  function bindParallax() {
    document.addEventListener("mousemove", moveArt);
    document.addEventListener("scroll", removeScrollInd);
  }

  // Unbind interactions
  function unbindParallax() {
    document.removeEventListener("mousemove", moveArt);
  }

  // Parallax artwork layers when user moves the mouse
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

  // Animate volume bars in audio toggle icon
  function animateMuteIcon() {
    for (var i = 0; i < sticks.length; i++) {
      var startVal = (1 - (0.1*i));
      TweenMax.set(sticks[i], { scaleY: startVal, transformOrigin: "bottom" });
      TweenMax.to(sticks[i], random(1.2,1.6), {
        bezier: { curviness:1, values: [
            { scaleY: startVal },
            { scaleY: random(0.3,0.9) },
            { scaleY: random(0.3,0.9) },
            { scaleY: random(0.3,0.9) },
            { scaleY: startVal }
          ]},
          repeat: -1,
          ease: Linear.easeNone
      });
    }
  }

  // Reveal scroll indicator on completion of main timeline
  function revealScrollInd() {
    TweenMax.set(arrows, { opacity: 0.5 });
    TweenMax.to(scrollInd, 3, { opacity: 1 });
    TweenMax.staggerTo(arrows, 2, { opacity: 0.1, ease: SlowMo.ease.config(0.1, 0.1, true), repeat: -1 }, 0.5 )
  }

  // Remove scroll indicator if user scrolled +150px
  function removeScrollInd() {
    if (window.pageYOffset > 150) {
      TweenMax.to(scrollInd, 1, { opacity: 0 });
    }
  }
  
  // Toggle audio on/off
  function toggleAudio() {
    if (ambientAudio.volume === 0) {
      ambientAudio.volume = 0.1;
      spinAudio1.volume = 1;
      spinAudio2.volume = 1;
      spinAudio3.volume = 1;
      musicMuted = false;
    } else {
      ambientAudio.volume = 0;
      spinAudio1.volume = 0;
      spinAudio2.volume = 0;
      spinAudio3.volume = 0;
      musicMuted = true;
    }
  }

  // Highlight icons
  function highlightIcon() {
    TweenMax.to(this, 0.1, {opacity: .5});
  }
  
  // Dim icons
  function dimIcon() {
    TweenMax.to(this, 0.1, {opacity: 0.2});
  }

  // Flash icons
  function feedbackIcon() {
    TweenMax.to(this, 0.2, {opacity: 1, ease: SlowMo.ease.config(0.1, 0.1, true) });
  }





//¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
//        BONUS FEATURES
//___________________________________________________________________________________________

// Floaty text
  function floatingText() {
    TweenMax.to(texts[0], 4, { y: 10, ease: Power1.easeInOut, repeat: -1, yoyo: true });
    TweenMax.to(texts[1], 4, { y: 10, ease: Power1.easeInOut, repeat: -1, yoyo: true, delay: 0.8 });
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

  function pulseLight() {

  }





//¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
//        API
//___________________________________________________________________________________________

  return {
    replay: playScene,
    mute: toggleAudio
  };





}






// Init
kodamaProject();





/*

function mobileStart() {
  spin1.load();
  spin2.load();
  spin3.load();
  
  ambient.load();
  ambient.loadeddata = start();
}
*/