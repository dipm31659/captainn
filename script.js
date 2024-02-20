function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();

function navbarAnimation() {
  gsap.to("#nav_part1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    }
  });
  gsap.to("#nav_part2 #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    }
  });
}
navbarAnimation();

function videoContainerAnimation() {
  let videoContainer = document.querySelector("#video_container");
  let playBtn = document.querySelector("#play");

  //  when mouse enter the videoContainer section then show the play button
  videoContainer.addEventListener("mouseenter", function () {
    gsap.to(playBtn, {
      scale: 1, // show to the webpage
      opacity: 1, // show to the webpage
    });
  });

  //  when mouse leave the videoContainer section then hide the play button
  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(playBtn, {
      scale: 0, // hide to the webpage
      opacity: 0, // hide to the webpage
    });
  });

  //  videoContainer section jokhon mouse move korbo tokhon mouse er shate shate play button tao move korbe

  videoContainer.addEventListener("mousemove", function (elem) {
    gsap.to(playBtn, {
      left: elem.x - 60, // mouse er shate shate x-axis borabor playBtn move korbe
      top: elem.y - 50, // mouse er shate shate y-axis borabor playBtn move korbe
    });
  });
}
videoContainerAnimation();

function textLoadingAnimation() {
  gsap.from("#page1 h1", {
    y: 80, //  y-axis borabor niche theke opore animate hobe
    opacity: 0, // first a content(h2/p) show hobe na(nicher property gulo na likhle bogha jabe na je opacity keno use hoche)
    delay: 0.5, // 0.5 sec pore(deri kore) animate hobe
    duration: 1, // 1 sec time dhore animate hobe
    stagger: 0.3, // first a 1no. ta animate hobe tar 0.3 sec pore 2no. ta animate hobe
  });
  gsap.from("#page1 #video_container", {
    scale: 0.3, //  video tar total size choto theke boro hoche.  *(1.3 dile tokhon total size boro theke choto hoto)
    opacity: 0, // first a content(h2/p) show hobe na(nicher property gulo na likhle bogha jabe na je opacity keno use hoche)
    delay: 1.5, // 1.5 sec pore(deri kore) animate hobe
    duration: 0.8, // 0.8 sec time dhore animate hobe
  });
}
textLoadingAnimation();

function mouseShadowAnimation() {
  document.addEventListener("mousemove", function (mouse) {
    // puro html page a 1 ta mouse er shadow create kora hoyeche
    gsap.to("#cursor", {
      left: mouse.x, //  x-axis(horizontal) borabor mouse er shate shadow move hobe
      top: mouse.y, //  y-axis(verticalli) borabor mouse er shate shadow move hobe
    });
  });

  document.querySelectorAll(".child").forEach(function (elem) {
    // sob gulo .child class a forEach loop chaliechi korechi
    elem.addEventListener("mouseenter", function () {
      // elem a mouseenter eventListener diye gsap use kora hoyeche
      gsap.to("#cursor", {
        transform: `translate(-50%, -50%) scale(1)`, // mouse er shadow show hobe jokhon i .child property te mouse enter korbe
      });
    });
    elem.addEventListener("mouseleave", function () {
      // elem a mouseenter eventListener diye gsap use kora hoyeche
      gsap.to("#cursor", {
        transform: `translate(-50%, -50%) scale(0)`, // mouse er shadow hide hobe jokhon i .child property theke mouse leave korbe
      });
    });
  });
}
mouseShadowAnimation();
