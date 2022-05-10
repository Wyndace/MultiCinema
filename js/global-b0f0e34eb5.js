// ==== Global scripts ====================================================================================================================================================

// === Animation, this script is best to leave connected. Some scripts do not work without it =============================================================================

// ==== All ease animations are stored here ===============================================================================================================================

const easeOutQuart = (t, b, c, d) => {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};

// ========================================================================================================================================================================

// ==== Плавная прокрутка =================================================================================================================================================

const smoothScrollAnimation = (currentTime, distance, duration, startTime, startPositon) => {
  if (startTime === null) startTime = currentTime;
  let timeElapsed = currentTime - startTime;
  let run = easeOutQuart(timeElapsed, startPositon, distance, duration);
  window.scrollTo(0, run);
  const SmoothScrollAnim = (currentTime) => smoothScrollAnimation(currentTime, distance, duration, startTime, startPositon);
  if (timeElapsed < duration) requestAnimationFrame(SmoothScrollAnim);
};

// ========================================================================================================================================================================

// ==== Скольжение вверх и вниз ===========================================================================================================================================

let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

// ========================================================================================================================================================================

// ========================================================================================================================================================================

// === Small convenient functions, this script is the best to leave connected. Some scripts do not work without it ========================================================


const createMatch = (string, regex) => {
  return regex.test(string);
};

const parseBoolean = (value) => {
  if (typeof value === "string") {
    value = value.replace(/^\s+|\s+$/g, "").toLowerCase();
    if (value === "true" || value === "false") return value === "true";
  }
  return;
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const moveAttributes = (from, to, deleteFrom = false) => {
  for (let index = 0; index < from.attributes.length; index++) {
    const attr = from.attributes.item(index);
    to.setAttribute(attr.name, attr.value);
  }
};


// ========================================================================================================================================================================

// ========================================================================================================================================================================

// === Global functions ===================================================================================================================================================

// ==== Smooth scrolling to element | Require _animation.js ===================================--==========================================================================

const smoothScroll = (target, duration) => {
  const topOffset = getComputedStyle(document.querySelector(".header__body")).position == "fixed" || getComputedStyle(document.querySelector(".header__body")).position == "sticky" ? document.querySelector(".header__body").offsetHeight + 10 : 0;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;

  const startPositon = window.pageYOffset;

  const distance = targetPosition - startPositon - topOffset;

  let startTime = null;

  const SmoothScrollAnim = (currentTime) => smoothScrollAnimation(currentTime, distance, duration, startTime, startPositon);

  requestAnimationFrame(SmoothScrollAnim);
};

const smoothScrollers = document.querySelectorAll("[data-scroll_to]");
if (smoothScrollers.length > 0) {
  smoothScrollers.forEach((smoothScroller) => {
    if (smoothScroller.dataset.scroll_to != "") {
      smoothScroller.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(smoothScroller.dataset.scroll_to);
        smoothScroll(target, 1000);
      });
    } else {
      console.log("You must type selector in data-scroll_to");
    }
  });
}
;

// ========================================================================================================================================================================

// ==== Full disable/enable scroll from the element =======================================================================================================================

const scrollDisabling = (element, fixed = false, position) => {
  if (!element.classList.contains("_scroll-disabled") && !element.classList.contains("_scroll-disabled_horizontal") && !element.classList.contains("_scroll-disabled_vertical")) {
    if (fixed) {
      if (element == document.body) {
        let paddingOffset = innerWidth - document.body.offsetWidth + "px";
        document.body.style.paddingRight = paddingOffset;
        if (scrollFixedElements.length > 0) {
          for (let index = 0; index < scrollFixedElements.length; index++) {
            const el = scrollFixedElements[index];
            el.style.paddingRight = paddingOffset;
          }
        }
      }
    }
    if (position == "vertical") {
      element.classList.add("_scroll-disabled_vertical");
    } else if (position == "horizontal") {
      element.classList.add("_scroll-disabled_horizontal");
    } else {
      element.classList.add("_scroll-disabled");
    }
  }
};

const scrollEnabling = (element, fixed = false, position) => {
  if (element.classList.contains("_scroll-disabled") || element.classList.contains("_scroll-disabled_horizontal") || element.classList.contains("_scroll-disabled_vertical")) {
    if (fixed) {
      if (element == document.body) {
        document.body.style.cssText = "";
      }
      if (scrollFixedElements.length > 0) {
        for (let index = 0; index < scrollFixedElements.length; index++) {
          const el = scrollFixedElements[index];
          el.style.cssText = "";
        }
      }
    }
    if (position == "vertical") {
      element.classList.remove("_scroll-disabled_vertical");
    } else if (position == "horizontal") {
      element.classList.remove("_scroll-disabled_horizontal");
    } else {
      element.classList.remove("_scroll-disabled");
    }
  }
};

const toggleScroll = (element, fixed = false, position) => {
  if (element.classList.contains("_scroll-disabled") || element.classList.contains("_scroll-disabled_horizontal") || element.classList.contains("_scroll-disabled_vertical")) scrollEnabling(element, fixed, position);
  else scrollDisabling(element, fixed, position);
};

const scrollDisablers = document.querySelectorAll("[data-scroll_disable]");
if (scrollDisablers.length > 0) {
  for (scrollDisabler of scrollDisablers) {
    positon = scrollDisabler.dataset.scroll_disable;
    scrollDisabling(scrollDisabler, positon);
  }
}

const scrollFixedElements = document.querySelectorAll("[data-scroll-fixed]");
;

// ========================================================================================================================================================================

// ==== Check and send form without reloading page ========================================================================================================================


const validatePhone = (input) => {
  if (input.value.replace(/\D/g, "") === "" || input.value.replace(/\D/g, "").length < 10) {
    return false;
  } else {
    return true;
  }
};

const formAddError = (input) => {
  // input.parentElement.classList.add("_error");
  input.classList.add("_error");
};

const formRemoveError = (input) => {
  // input.parentElement.classList.remove("_error");
  input.classList.remove("_error");
};

const formValidate = (form) => {
  let error = 0;
  const formReqiers = form.querySelectorAll("[data-form_require]");
  for (let index = 0; index < formReqiers.length; index++) {
    const input = formReqiers[index];
    formRemoveError(input);
    if (input.dataset.form_input_email != null) {
      if (!createMatch(input.value, /\S+@\S+\.\S+/)) {
        formAddError(input);
        ++error;
      }
    } else if (input.dataset.form_input_tel != null) {
      if (!validatePhone(input)) {
        formAddError(input);
        ++error;
      }
    } else if (input.getAttribute("type") === "checkbox" && !input.checked) {
      formAddError(input);
      ++error;
    } else {
      if (input.value === "") {
        formAddError(input);
        ++error;
      }
    }
  }

  return error;
};
const forms = document.querySelectorAll("[data-form]");
if (forms.length > 0) {
  forms.forEach((form) => {
    async function formSend(e) {
      e.preventDefault();
      let error = formValidate(form);
      if (form.hasAttribute("data-survey")) {
        error = 0;
      }
      if (error === 0) {
        form.classList.add("_sending");
        if (form.dataset.test == null) {


// This is a backend part!!! If you do not add an attribute [data-test] or not to make a real emptying of the letter, then will give an error and nothing happens


          let responce = await fetch(mail.php);

          if (responce.ok) {
            let result = responce.json;
            alert(result.message);
            form.reset();
          } else {
            alert("Something went wrong...");
          }
        } else {
          let result = {
            message: "All OK :Р",
          };
          alert(result.message);
          form.reset();
        }
        form.classList.remove("_sending");
      } else {
        alert("Fill the all fields!");
      }
    }

    form.addEventListener("submit", formSend);
  });
}
;


// ========================================================================================================================================================================

// ==== Header Scroller ===================================================================================================================================================

const headerElement = document.querySelector('.header');
const detectingScroll = function (entries) {
    console.log(entries)
    if ((document.documentElement.clientWidth > 1340)) {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('_scroll');
        } else {
            headerElement.classList.add('_scroll');

        }
    } else {
        headerElement.classList.add('_scroll')
    }
};

const headerObserver = new IntersectionObserver(detectingScroll)
headerObserver.observe(headerElement)

// ====================================================================================================================================================================


// ==== Check on the device with touch screen | Require _function.js ======================================================================================================

const appleIphone = /iPhone/i;
const appleIpod = /iPod/i;
const appleTablet = /iPad/i;
const appleUniversal = /\biOS-universal(?:.+)Mac\b/i;
const androidPhone = /\bAndroid(?:.+)Mobile\b/i; // Match 'Android' AND 'Mobile'
const androidTablet = /Android/i;
const amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i; // Match 'Silk' AND 'Mobile'
const amazonTablet = /Silk/i;
const windowsPhone = /Windows Phone/i;
const windowsTablet = /\bWindows(?:.+)ARM\b/i; // Match 'Windows' AND 'ARM'
const otherBlackBerry = /BlackBerry/i;
const otherBlackBerry10 = /BB10/i;
const otherOpera = /Opera Mini/i;
const otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
const otherFirefox = /Mobile(?:.+)Firefox\b/i; // Match 'Mobile' AND 'Firefox'

const isAppleTabletOnIos13 = (nav) => {
  return typeof nav !== "undefined" && nav.platform === "MacIntel" && typeof nav.maxTouchPoints === "number" && nav.maxTouchPoints > 1 && typeof MSStream === "undefined";
};

const nav = {
  UserAgent: navigator.userAgent,
  platform: navigator.platform || navigator.vendor,
  maxTouchPoints: navigator.maxTouchPoints,
};

const isMobile = {
  apple: {
    phone: createMatch(nav.UserAgent, appleIphone) && !createMatch(nav.UserAgent, windowsPhone),
    ipod: createMatch(nav.UserAgent, appleIpod),
    tablet: !createMatch(nav.UserAgent, appleIphone) && (createMatch(nav.UserAgent, appleTablet) || isAppleTabletOnIos13(nav)) && !createMatch(nav.UserAgent, windowsPhone),
    universal: createMatch(nav.UserAgent, appleUniversal),
    device: (createMatch(nav.UserAgent, appleIphone) || createMatch(nav.UserAgent, appleIpod) || createMatch(nav.UserAgent, appleTablet) || createMatch(nav.UserAgent, appleUniversal) || isAppleTabletOnIos13(nav)) && !createMatch(nav.UserAgent, windowsPhone),
  },
  amazon: {
    phone: createMatch(nav.UserAgent, amazonPhone),
    tablet: !createMatch(nav.UserAgent, amazonPhone) && createMatch(nav.UserAgent, amazonTablet),
    device: createMatch(nav.UserAgent, amazonPhone) || createMatch(nav.UserAgent, amazonTablet),
  },
  android: {
    phone: (!createMatch(nav.UserAgent, windowsPhone) && createMatch(nav.UserAgent, amazonPhone)) || (!createMatch(nav.UserAgent, windowsPhone) && createMatch(nav.UserAgent, androidPhone)),
    tablet: !createMatch(nav.UserAgent, windowsPhone) && !createMatch(nav.UserAgent, amazonPhone) && !createMatch(nav.UserAgent, androidPhone) && (createMatch(nav.UserAgent, amazonTablet) || createMatch(nav.UserAgent, androidTablet)),
    device: (!createMatch(nav.UserAgent, windowsPhone) && (createMatch(nav.UserAgent, amazonPhone) || createMatch(nav.UserAgent, amazonTablet) || createMatch(nav.UserAgent, androidPhone) || createMatch(nav.UserAgent, androidTablet))) || createMatch(nav.UserAgent, /\bokhttp\b/i),
  },
  windows: {
    phone: createMatch(nav.UserAgent, windowsPhone),
    tablet: createMatch(nav.UserAgent, windowsTablet),
    device: createMatch(nav.UserAgent, windowsPhone) || createMatch(nav.UserAgent, windowsTablet),
  },
  other: {
    blackberry: createMatch(nav.UserAgent, otherBlackBerry),
    blackberry10: createMatch(nav.UserAgent, otherBlackBerry10),
    opera: createMatch(nav.UserAgent, otherOpera),
    firefox: createMatch(nav.UserAgent, otherFirefox),
    chrome: createMatch(nav.UserAgent, otherChrome),
    device: createMatch(nav.UserAgent, otherBlackBerry) || createMatch(nav.UserAgent, otherBlackBerry10) || createMatch(nav.UserAgent, otherOpera) || createMatch(nav.UserAgent, otherFirefox) || createMatch(nav.UserAgent, otherChrome),
  },
  any: false,
  phone: false,
  tablet: false,
};

isMobile.any = isMobile.apple.device || isMobile.android.device || isMobile.windows.device || isMobile.other.device;
isMobile.phone = isMobile.apple.phone || isMobile.android.phone || isMobile.windows.phone;
isMobile.tablet = isMobile.apple.tablet || isMobile.android.tablet || isMobile.windows.tablet;
;

// ========================================================================================================================================================================

// ==== Burgers Button ====================================================================================================================================================

const burgers = document.querySelectorAll("[data-burger]");
if (burgers.length > 0) {
  burgers.forEach((burger) => {
    burger.addEventListener("click", (e) => {
      if (e.target.closest("[data-burger_button]") || !e.target.closest("[data-burger_body]") || (e.target.closest("a") && !e.target.closest("a").href.split("/")[e.target.closest("a").href.split("/").length - 1].includes(":"))) {
        burger.classList.toggle("_active");
        toggleScroll(document.body, true);
      }
    });
  });
}
;

// ========================================================================================================================================================================

// ==== Dynamical Adaptive ================================================================================================================================================

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

function DynamicAdapt(t){this.type=t}DynamicAdapt.prototype.init=function(){const t=this;this.оbjects=[],this.daClassname="_dynamic_adapt_",this.nodes=document.querySelectorAll("[data-da]");for(let t=0;t<this.nodes.length;t++){const e=this.nodes[t],n=e.dataset.da.trim().split(", "),a={};a.element=e,a.parent=e.parentNode,a.destination=document.querySelector(n[0].trim()),a.breakpoint=n[1]?n[1].trim():"767",a.place=n[2]?n[2].trim():"last",a.index=this.indexInParent(a.parent,a.element),this.оbjects.push(a)}this.arraySort(this.оbjects),this.mediaQueries=Array.prototype.map.call(this.оbjects,function(t){return"("+this.type+"-width: "+t.breakpoint+"px),"+t.breakpoint},this),this.mediaQueries=Array.prototype.filter.call(this.mediaQueries,function(t,e,n){return Array.prototype.indexOf.call(n,t)===e});for(let e=0;e<this.mediaQueries.length;e++){const n=this.mediaQueries[e],a=String.prototype.split.call(n,","),i=window.matchMedia(a[0]),r=a[1],s=Array.prototype.filter.call(this.оbjects,function(t){return t.breakpoint===r});i.addListener(function(){t.mediaHandler(i,s)}),this.mediaHandler(i,s)}},DynamicAdapt.prototype.mediaHandler=function(t,e){if(t.matches)for(let t=0;t<e.length;t++){const n=e[t];n.index=this.indexInParent(n.parent,n.element),this.moveTo(n.place,n.element,n.destination)}else for(let t=0;t<e.length;t++){const n=e[t];n.element.classList.contains(this.daClassname)&&this.moveBack(n.parent,n.element,n.index)}},DynamicAdapt.prototype.moveTo=function(t,e,n){e.classList.add(this.daClassname),"last"===t||t>=n.children.length?n.insertAdjacentElement("beforeend",e):"first"!==t?n.children[t].insertAdjacentElement("beforebegin",e):n.insertAdjacentElement("afterbegin",e)},DynamicAdapt.prototype.moveBack=function(t,e,n){e.classList.remove(this.daClassname),void 0!==t.children[n]?t.children[n].insertAdjacentElement("beforebegin",e):t.insertAdjacentElement("beforeend",e)},DynamicAdapt.prototype.indexInParent=function(t,e){const n=Array.prototype.slice.call(t.children);return Array.prototype.indexOf.call(n,e)},DynamicAdapt.prototype.arraySort=function(t){"min"===this.type?Array.prototype.sort.call(t,function(t,e){return t.breakpoint===e.breakpoint?t.place===e.place?0:"first"===t.place||"last"===e.place?-1:"last"===t.place||"first"===e.place?1:t.place-e.place:t.breakpoint-e.breakpoint}):Array.prototype.sort.call(t,function(t,e){return t.breakpoint===e.breakpoint?t.place===e.place?0:"first"===t.place||"last"===e.place?1:"last"===t.place||"first"===e.place?-1:e.place-t.place:e.breakpoint-t.breakpoint})};

const da = new DynamicAdapt("max");
da.init();
;

// ========================================================================================================================================================================

// ========================================================================================================================================================================

//# sourceMappingURL=global.js.map
