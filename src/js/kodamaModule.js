// Dynamically set the mode and change relevant values

// Light pulse
  // Make light optional
  // Make pulsing light optional, shifting two grads

// Write text

// System discriminatio
  // Rich: All fancy
  // Default: Standard fancy
  // Smart: No fancy

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
  const header = document.querySelector("[data-header]");
    const layers = header.querySelectorAll("[data-layer]");
    const light = header.querySelector("[data-light]");
    const kodamas = header.querySelectorAll("[data-kodama]");
    const kodamaGlow = header.querySelectorAll("[data-kodamaGlow]");
    const heads = header.querySelectorAll("[data-head]");
    const ffGroups = header.querySelectorAll("[data-ff-group]");
    const ff = header.querySelectorAll("[data-ff]");
    const vines = header.querySelectorAll("[data-vine]");
    const shrooms = header.querySelectorAll("[data-shroom]");
    const texts = header.querySelectorAll("[data-text]");
    const textMobile = header.querySelectorAll("[data-text-mobile]");

  const sticks = document.querySelectorAll("[data-stick]");

  const foreground = document.querySelector("[data-foreground]");

  const buttons = document.querySelectorAll("[data-btn]");
  const muteButton = document.querySelector("[data-btn=mute]");
  const replayButton = document.querySelector("[data-btn=replay]");
  
  const scrollInd = document.querySelector("[data-scrollInd]");
  const arrows = scrollInd.querySelectorAll("[data-arrow]");

  const audioGroup = document.querySelector("[data-audio-group]");
  const ambientAudio = audioGroup.querySelector("[data-audio=ambient]");
  const spinAudio1 = audioGroup.querySelector("[data-audio=spin1]");
  const spinAudio2 = audioGroup.querySelector("[data-audio=spin2]");
  const spinAudio3 = audioGroup.querySelector("[data-audio=spin3]");

  const mainTl = new TimelineMax({paused: true, onComplete: revealScrollInd});

  let systemDiscriminationMode = "rich";

  let kodamaTransparency = 0.7;
  let kodamaGlowValue = 1;
  let isLight = false;
  let isMusicMuted = false;

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

    // System discrimination: rich, limited, default
    if (systemDiscriminationMode === "rich") {
      
      // Core features
      setStartPos();
      parallaxIntro();
      playMusic();
      playMainTl();

      // Bonus features
      dancingFireflies();
      swingingVines();
      pulsatingShrooms();
      pulseLight();
      floatingText();
      lightsOn();
      //pulseLight();

    } else if (systemDiscriminationMode === "limited") {
      setStartPos();
      parallaxIntro();
      playMusic();
      playMainTl();
      // Hide blob glows
      // Make gradients flat
      // Make bg lighter
      // Hide excessive layers and elements
    } else {
      // default
    }
  }



  function createTimeline() {
    
    mainTl
      .add("revealKodamas")
      .to(kodamas[0], 3, { autoAlpha: kodamaTransparency, ease: Power3.easeOut}, 7)
      .to(kodamas[1], 3, { autoAlpha: kodamaTransparency, ease: Power3.easeOut}, 9.5)
      .to(kodamas[2], 3, { autoAlpha: kodamaTransparency, ease: Power3.easeOut}, 10.5)

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
      .call(playSFX, [spinAudio3], this, "spin3")
      .call(bindParallax, [""], this, "spin3");
  }



  function setStartPos() {

    // set system specific values
    setSystemSpecificValues(systemDiscriminationMode);

    lightsOff();
    unbindParallax();

    // Set Kodama Glow
    TweenMax.set(kodamaGlow, { autoAlpha: kodamaGlowValue});

    // Reset page scroll
    window.scroll(0,0);
    
    // Hide scroll indicator
    TweenMax.set(scrollInd, { opacity: 0 });
    
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

    TweenMax.to(foreground, 10, { y: window.innerHeight-200 }); // Revise the position of this
  }

  function playMainTl() {
      mainTl.restart();
    }

  function playMusic() {
    if (isMusicMuted) {
      ambientAudio.volume = 0;
    } else {
      ambientAudio.volume = 0.1;  
    }
    ambientAudio.currentTime = 0;
    ambientAudio.play();
  }


  function playSFX(audio) {
    if (isMusicMuted) {
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
    if (systemDiscriminationMode === "rich" || systemDiscriminationMode === "default") {
      document.addEventListener("mousemove", moveArt);  
    }
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
      isMusicMuted = false;
    } else {
      ambientAudio.volume = 0;
      spinAudio1.volume = 0;
      spinAudio2.volume = 0;
      spinAudio3.volume = 0;
      isMusicMuted = true;
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
  //        SYSTEM DISCRIMINATION
  //___________________________________________________________________________________________

  function setSystemSpecificValues(mode) {
    if (mode === "rich") {
      kodamaTransparency = 0.7;
      kodamaGlowValue = 0.15;
    } else if (mode === "limited") {
      // set values
    } else {
      // set default values
    }
  }

  // Floaty text
  function floatingText() {
    TweenMax.to(texts[0], 4, { y: 10, ease: Power1.easeInOut, repeat: -1, yoyo: true });
    TweenMax.to(texts[1], 4, { y: 10, ease: Power1.easeInOut, repeat: -1, yoyo: true, delay: 0.8 });
  }

  function dancingFireflies() {
    
    var interval = 4,
        duration = interval;

    dance();
    repeat();

    function repeat() {
      setTimeout(function() {

        dance();
        repeat();

      }, interval*1000);  
    }

    function dance() {

      TweenMax.to(ffGroups[0], random(1,3), {
        autoAlpha: 1,
        rotation: random(0,60),
        scale: random(0.5,1),
        x:random(1250,1350),
        y: random(25,100)
      });

      TweenMax.to(ffGroups[1], random(2,4), {
        autoAlpha: 1,
        rotation: random(0,60),
        scale: random(0.5,1),
        x:random(1050,1150),
        y: random(325,400)
      });

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
          autoAlpha: random(0.3,1),
          ease: Linear.easeNone
        });

      }
    }   
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
  
  function lightsOn() {
    isLight = true;
    TweenMax.to(light, 3, { autoAlpha: 0.2, delay: 10}); // Tweak timing of lights on
  }

  function lightsOff() {
    isLight = false;
    TweenMax.set(light, { autoAlpha: 0 });
  }

  function pulseLight() {
    if (isLight) {
      TweenMax.to(light, 3, { autoAlpha: 0.5, repeat: -1, yoyo: true });
    }
  }





  //¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
  //        API
  //___________________________________________________________________________________________

  return {
    replay: playScene,
    mute: toggleAudio,
    mode: systemDiscriminationMode
  }





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