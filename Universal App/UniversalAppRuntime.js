/* =========================================================

   UNIVERSAL APP RUNTIME (UAR)
   Version 1.0.0

   PART 1
   CORE ENGINE

   Purpose:
   - Create runtime foundation
   - Detect browser
   - Detect device
   - Detect features
   - Provide utilities
   - Provide debug system

========================================================= */


(function(window){

"use strict";


/* =========================================================
   GLOBAL OBJECT
========================================================= */

const UAR = {

    version:"1.0.0",

    ready:false,

    config:{

        debug:false,

        autoDetectRoot:true,

        rootSelector:null,

        preventOverscroll:false,

        preventZoom:false,

        useSafeArea:true,

        useVisualViewport:true

    },


    device:{},

    browser:{},

    features:{},


    utils:{},


    modules:{}

};



/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

UAR.utils = {


    log:function(...args){

        if(UAR.config.debug){

            console.log(
                "%cUAR:",
                "color:#4caf50;font-weight:bold",
                ...args
            );

        }

    },


    warn:function(...args){

        console.warn(
            "UAR Warning:",
            ...args
        );

    },


    isMobile:function(){

        return /Android|iPhone|iPad|iPod/i
        .test(navigator.userAgent);

    },


    clamp:function(value,min,max){

        return Math.min(
            Math.max(value,min),
            max
        );

    },


    debounce:function(fn,delay){

        let timer;

        return function(){

            clearTimeout(timer);

            timer=setTimeout(
                ()=>fn.apply(this,arguments),
                delay
            );

        };

    },


    throttle:function(fn,limit){

        let waiting=false;

        return function(){

            if(!waiting){

                fn.apply(this,arguments);

                waiting=true;

                setTimeout(
                    ()=>waiting=false,
                    limit
                );

            }

        };

    }


};




/* =========================================================
   BROWSER DETECTION
========================================================= */

function detectBrowser(){

    const ua =
    navigator.userAgent;


    UAR.browser = {


        chrome:
        /Chrome/i.test(ua)
        &&
        !/Edge|Edg/i.test(ua),


        edge:
        /Edg/i.test(ua),


        safari:
        /Safari/i.test(ua)
        &&
        !/Chrome/i.test(ua),


        firefox:
        /Firefox/i.test(ua),


        samsung:
        /SamsungBrowser/i.test(ua),


        webview:
        /(WebView|wv)/i.test(ua)

    };


}




/* =========================================================
   DEVICE DETECTION
========================================================= */

function detectDevice(){

    const ua =
    navigator.userAgent;


    UAR.device = {


        mobile:
        /Android|iPhone|iPod/i.test(ua),


        tablet:
        /iPad|Tablet|Android(?!.*Mobile)/i.test(ua),


        iphone:
        /iPhone/i.test(ua),


        ipad:
        /iPad/i.test(ua),


        android:
        /Android/i.test(ua),


        touch:
        "ontouchstart" in window
        ||
        navigator.maxTouchPoints > 0,


        retina:
        window.devicePixelRatio > 1,


        dpr:
        window.devicePixelRatio || 1

    };


}



/* =========================================================
   FEATURE DETECTION
========================================================= */

function detectFeatures(){


    UAR.features = {


        visualViewport:
        !!window.visualViewport,


        resizeObserver:
        !!window.ResizeObserver,


        mutationObserver:
        !!window.MutationObserver,


        pointerEvents:
        !!window.PointerEvent,


        fullscreen:
        !!document.fullscreenEnabled,


        speech:
        "speechSynthesis" in window,


        localStorage:
        !!window.localStorage,


        canvas:
        !!document.createElement("canvas")
        .getContext,


        cssVariables:
        window.CSS
        &&
        CSS.supports
        &&
        CSS.supports(
            "--test",
            "0"
        )


    };


}



/* =========================================================
   ENVIRONMENT INFORMATION
========================================================= */

UAR.info=function(){

    return {

        version:
        UAR.version,


        browser:
        UAR.browser,


        device:
        UAR.device,


        features:
        UAR.features,


        viewport:{

            width:
            window.innerWidth,


            height:
            window.innerHeight,


            dpr:
            window.devicePixelRatio

        }

    };

};




/* =========================================================
   INITIALIZATION
========================================================= */

function initialize(){


    detectBrowser();

    detectDevice();

    detectFeatures();


    UAR.ready=true;


    UAR.utils.log(
        "Universal App Runtime initialized",
        UAR.version
    );


}



/* =========================================================
   START
========================================================= */

initialize();



/* =========================================================
   EXPORT
========================================================= */

window.UAR = UAR;



})(window);

/* =========================================================

   UNIVERSAL APP RUNTIME (UAR)

   PART 2
   VIEWPORT & SCALING ENGINE

   Requires:
   PART 1 CORE ENGINE

========================================================= */


(function(window){

"use strict";


if(!window.UAR){

    console.error(
        "UAR Part 2 requires Part 1"
    );

    return;

}


const UAR = window.UAR;



/* =========================================================
   VIEWPORT OBJECT
========================================================= */

UAR.viewport = {


    width:0,

    height:0,

    scale:1,

    offsetX:0,

    offsetY:0,


    visualWidth:0,

    visualHeight:0,


    orientation:"",


    root:null,


    initialized:false

};





/* =========================================================
   GET REAL VIEWPORT
========================================================= */

function updateViewport(){


    let width;
    let height;


    if(
        window.visualViewport
    ){

        width =
        window.visualViewport.width;

        height =
        window.visualViewport.height;

    }

    else{

        width =
        window.innerWidth;

        height =
        window.innerHeight;

    }



    UAR.viewport.width =
    width;


    UAR.viewport.height =
    height;



    UAR.viewport.visualWidth =
    width;


    UAR.viewport.visualHeight =
    height;



    UAR.viewport.orientation =
    width > height
    ?
    "landscape"
    :
    "portrait";



}





/* =========================================================
   FIND APPLICATION ROOT
========================================================= */

function findRoot(){


    if(
        UAR.config.rootSelector
    ){

        return document.querySelector(
            UAR.config.rootSelector
        );

    }



    const candidates=[

        "#app",

        "#main",

        "#wrapper",

        ".app",

        ".container"

    ];



    for(
        let selector of candidates
    ){

        const el =
        document.querySelector(selector);


        if(el){

            return el;

        }

    }



    return null;


}





/* =========================================================
   SCALE APPLICATION
========================================================= */

UAR.viewport.fit=function(){



    const root =
    UAR.viewport.root;



    if(!root){

        UAR.utils.warn(
            "No application root found"
        );

        return;

    }



    const rect =
    root.getBoundingClientRect();



    const appWidth =
    root.offsetWidth;


    const appHeight =
    root.offsetHeight;



    if(
        !appWidth ||
        !appHeight
    ){

        return;

    }



    const scale =
    Math.min(

        UAR.viewport.width /
        appWidth,


        UAR.viewport.height /
        appHeight

    );



    UAR.viewport.scale =
    scale;



    const x =
    (
        UAR.viewport.width -
        (appWidth * scale)
    )
    /2;



    const y =
    (
        UAR.viewport.height -
        (appHeight * scale)
    )
    /2;



    UAR.viewport.offsetX=x;

    UAR.viewport.offsetY=y;



    root.style.transformOrigin =
    "top left";


    root.style.transform =
    `
    translate(${x}px,${y}px)
    scale(${scale})
    `;



};





/* =========================================================
   APPLY DYNAMIC HEIGHT VARIABLE
========================================================= */

function updateCSSVariables(){


    document.documentElement
    .style
    .setProperty(

        "--uar-vh",

        UAR.viewport.height+"px"

    );



    document.documentElement
    .style
    .setProperty(

        "--uar-vw",

        UAR.viewport.width+"px"

    );


}





/* =========================================================
   INITIALIZATION
========================================================= */

function initializeViewport(){


    UAR.viewport.root =
    findRoot();



    updateViewport();

    updateCSSVariables();


    UAR.viewport.initialized=true;



    if(
        UAR.viewport.root
    ){

        UAR.viewport.fit();

    }



}





/* =========================================================
   EVENT HANDLERS
========================================================= */


const refresh =
UAR.utils.debounce(

    function(){

        updateViewport();

        updateCSSVariables();

        UAR.viewport.fit();

    },

    100

);



window.addEventListener(
    "resize",
    refresh
);


window.addEventListener(
    "orientationchange",
    refresh
);



if(
    window.visualViewport
){

    window.visualViewport
    .addEventListener(
        "resize",
        refresh
    );


    window.visualViewport
    .addEventListener(
        "scroll",
        refresh
    );

}



/* =========================================================
   START
========================================================= */

initializeViewport();



UAR.utils.log(
    "Viewport Engine loaded"
);



})(window);

/* =========================================================

   UNIVERSAL APP RUNTIME (UAR)

   PART 3
   INPUT COMPATIBILITY ENGINE

   Requires:
   PART 1 CORE ENGINE
   PART 2 VIEWPORT ENGINE

========================================================= */


(function(window){

"use strict";


if(!window.UAR){

    console.error(
        "UAR Part 3 requires Part 1"
    );

    return;

}


const UAR = window.UAR;



/* =========================================================
   INPUT OBJECT
========================================================= */

UAR.input = {

    enabled:true,

    touch:false,

    pointer:false,

    mouse:false,

    lastX:0,

    lastY:0,

    startX:0,

    startY:0,

    startTime:0,

    listeners:{}

};





/* =========================================================
   DEVICE INPUT DETECTION
========================================================= */

function detectInput(){


    UAR.input.touch =
    "ontouchstart" in window
    ||
    navigator.maxTouchPoints>0;



    UAR.input.pointer =
    !!window.PointerEvent;



    UAR.input.mouse =
    matchMedia(
        "(pointer:fine)"
    ).matches;


}





/* =========================================================
   UNIFIED EVENT SYSTEM
========================================================= */


UAR.input.on=function(
    element,
    event,
    callback
){


    if(!element){

        return;

    }



    let events;



    switch(event){


        case "tap":

            events =
            [
                "click",
                "pointerup",
                "touchend"
            ];

            break;



        case "down":

            events =
            [
                "pointerdown",
                "mousedown",
                "touchstart"
            ];

            break;



        case "move":

            events =
            [
                "pointermove",
                "mousemove",
                "touchmove"
            ];

            break;



        case "up":

            events =
            [
                "pointerup",
                "mouseup",
                "touchend"
            ];

            break;



        default:

            events=[event];

    }



    events.forEach(type=>{


        element.addEventListener(

            type,

            function(e){


                callback(
                    normalizeEvent(e)
                );


            },

            {
                passive:false
            }

        );


    });


};





/* =========================================================
   NORMALIZE EVENTS
========================================================= */

function normalizeEvent(e){


    let x=0;

    let y=0;



    if(
        e.touches &&
        e.touches.length
    ){

        x =
        e.touches[0].clientX;


        y =
        e.touches[0].clientY;

    }


    else if(
        e.changedTouches &&
        e.changedTouches.length
    ){

        x =
        e.changedTouches[0].clientX;


        y =
        e.changedTouches[0].clientY;

    }


    else{

        x =
        e.clientX || 0;


        y =
        e.clientY || 0;

    }



    UAR.input.lastX=x;

    UAR.input.lastY=y;



    return {


        original:e,


        x:x,

        y:y,


        type:e.type,


        target:e.target


    };


}






/* =========================================================
   TAP DETECTION
========================================================= */

UAR.input.tap=function(
    element,
    callback
){


    let start;


    UAR.input.on(

        element,

        "down",

        function(e){

            start=e;

            UAR.input.startTime=
            Date.now();


        }

    );



    UAR.input.on(

        element,

        "up",

        function(e){


            const time =
            Date.now()
            -
            UAR.input.startTime;



            const distance =
            Math.sqrt(

                Math.pow(
                    e.x-start.x,
                    2
                )

                +

                Math.pow(
                    e.y-start.y,
                    2
                )

            );



            if(
                time < 500
                &&
                distance < 15
            ){

                callback(e);

            }


        }

    );


};






/* =========================================================
   LONG PRESS
========================================================= */

UAR.input.longPress=function(
    element,
    callback,
    delay=700
){


    let timer;


    UAR.input.on(

        element,

        "down",

        function(e){


            timer=setTimeout(

                function(){

                    callback(e);

                },

                delay

            );


        }

    );



    UAR.input.on(

        element,

        "up",

        function(){

            clearTimeout(timer);

        }

    );


};






/* =========================================================
   SWIPE DETECTION
========================================================= */

UAR.input.swipe=function(
    element,
    callback
){


    let startX;

    let startY;



    UAR.input.on(

        element,

        "down",

        function(e){

            startX=e.x;

            startY=e.y;

        }

    );



    UAR.input.on(

        element,

        "up",

        function(e){


            const dx =
            e.x-startX;


            const dy =
            e.y-startY;



            if(
                Math.abs(dx)>50
                ||
                Math.abs(dy)>50
            ){

                callback({

                    x:dx,

                    y:dy,

                    direction:

                    Math.abs(dx)>Math.abs(dy)

                    ?

                    (
                        dx>0
                        ?
                        "right"
                        :
                        "left"
                    )

                    :

                    (
                        dy>0
                        ?
                        "down"
                        :
                        "up"
                    )


                });

            }


        }

    );


};






/* =========================================================
   INITIALIZE
========================================================= */

detectInput();



UAR.utils.log(
    "Input Engine loaded"
);



})(window);

/* =========================================================

   UNIVERSAL APP RUNTIME (UAR)

   PART 4
   DISPLAY & MEDIA ENGINE

   Requires:
   PART 1 CORE ENGINE
   PART 2 VIEWPORT ENGINE

========================================================= */


(function(window){

"use strict";


if(!window.UAR){

    console.error(
        "UAR Part 4 requires Part 1"
    );

    return;

}


const UAR = window.UAR;



/* =========================================================
   DISPLAY OBJECT
========================================================= */

UAR.display={

    dpr:
    window.devicePixelRatio || 1,


    canvases:[],

    images:[],

    observers:[]


};





/* =========================================================
   CANVAS MANAGER
========================================================= */

UAR.display.canvas={};



/*
    Makes canvas match display size
*/

UAR.display.canvas.fit=function(canvas){


    if(!canvas ||
       !canvas.getContext){

        return;

    }


    const rect =
    canvas.getBoundingClientRect();



    const dpr =
    window.devicePixelRatio || 1;



    canvas.width =
    Math.round(
        rect.width*dpr
    );


    canvas.height =
    Math.round(
        rect.height*dpr
    );



    const ctx =
    canvas.getContext("2d");



    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );



    UAR.utils.log(
        "Canvas fitted",
        rect.width,
        rect.height,
        dpr
    );


};






/*
    Register canvas
*/

UAR.display.canvas.register=function(canvas){


    if(
        !canvas
    ){

        return;

    }



    UAR.display.canvases.push(
        canvas
    );


    UAR.display.canvas.fit(
        canvas
    );


};






/*
    Resize all canvases
*/

UAR.display.canvas.resizeAll=function(){


    UAR.display.canvases
    .forEach(

        canvas=>{

            UAR.display.canvas.fit(
                canvas
            );

        }

    );


};







/* =========================================================
   IMAGE MANAGER
========================================================= */


UAR.display.image={};



UAR.display.image.fit=function(img){


    if(!img){

        return;

    }



    img.style.maxWidth =
    "100%";


    img.style.height =
    "auto";



};





UAR.display.image.register=function(img){


    if(!img){

        return;

    }



    UAR.display.images.push(
        img
    );


    UAR.display.image.fit(
        img
    );


};





UAR.display.image.resizeAll=function(){


    UAR.display.images
    .forEach(

        img=>{

            UAR.display.image.fit(
                img
            );

        }

    );


};







/* =========================================================
   ELEMENT SIZE OBSERVER
========================================================= */

UAR.display.observe=function(
    element,
    callback
){


    if(
        !window.ResizeObserver
    ){

        return;

    }



    const observer =
    new ResizeObserver(

        entries=>{

            callback(
                entries[0]
            );

        }

    );



    observer.observe(
        element
    );


    UAR.display.observers.push(
        observer
    );


};






/* =========================================================
   AUTOMATIC DISCOVERY
========================================================= */

function scanPage(){


    document
    .querySelectorAll("canvas")
    .forEach(

        canvas=>{

            UAR.display.canvas.register(
                canvas
            );

        }

    );



    document
    .querySelectorAll("img")
    .forEach(

        img=>{

            UAR.display.image.register(
                img
            );

        }

    );


}





/* =========================================================
   SVG SUPPORT
========================================================= */

UAR.display.svg={};


UAR.display.svg.fit=function(svg){


    if(!svg){

        return;

    }



    svg.style.maxWidth =
    "100%";


    svg.style.height =
    "auto";


};






/* =========================================================
   GLOBAL REFRESH
========================================================= */

UAR.display.refresh=function(){


    UAR.display.canvas.resizeAll();

    UAR.display.image.resizeAll();


};







/* =========================================================
   EVENTS
========================================================= */

const refresh =
UAR.utils.debounce(

    function(){

        UAR.display.refresh();

    },

    150

);



window.addEventListener(
    "resize",
    refresh
);



window.addEventListener(
    "orientationchange",
    refresh
);







/* =========================================================
   START
========================================================= */

scanPage();



UAR.utils.log(
    "Display Engine loaded"
);



})(window);

/* =========================================================

   UNIVERSAL APP RUNTIME (UAR)

   PART 5
   MOBILE ENVIRONMENT ENGINE

   Requires:
   PART 1 CORE ENGINE
   PART 2 VIEWPORT ENGINE

========================================================= */


(function(window){

"use strict";


if(!window.UAR){

    console.error(
        "UAR Part 5 requires Part 1"
    );

    return;

}


const UAR = window.UAR;




/* =========================================================
   MOBILE OBJECT
========================================================= */

UAR.mobile={


    keyboard:false,


    fullscreen:false,


    safeArea:{


        top:0,

        bottom:0,

        left:0,

        right:0


    },


    scrollingLocked:false


};






/* =========================================================
   SAFE AREA DETECTION
========================================================= */


function detectSafeArea(){


    const probe =
    document.createElement("div");


    probe.style.position="fixed";

    probe.style.visibility="hidden";

    probe.style.paddingTop=
    "env(safe-area-inset-top)";

    probe.style.paddingBottom=
    "env(safe-area-inset-bottom)";

    probe.style.paddingLeft=
    "env(safe-area-inset-left)";

    probe.style.paddingRight=
    "env(safe-area-inset-right)";



    document.body.appendChild(
        probe
    );



    const style =
    getComputedStyle(
        probe
    );



    UAR.mobile.safeArea.top =
    parseInt(
        style.paddingTop
    )
    ||
    0;



    UAR.mobile.safeArea.bottom =
    parseInt(
        style.paddingBottom
    )
    ||
    0;



    UAR.mobile.safeArea.left =
    parseInt(
        style.paddingLeft
    )
    ||
    0;



    UAR.mobile.safeArea.right =
    parseInt(
        style.paddingRight
    )
    ||
    0;



    probe.remove();



}





/* =========================================================
   MOBILE KEYBOARD DETECTION
========================================================= */


function detectKeyboard(){


    if(
        !window.visualViewport
    ){

        return;

    }



    const viewport =
    window.visualViewport;



    const check=function(){


        const difference =
        window.innerHeight -
        viewport.height;



        UAR.mobile.keyboard =
        difference > 150;



    };



    viewport.addEventListener(
        "resize",
        check
    );



    check();


}





/* =========================================================
   SCROLL CONTROL
========================================================= */


UAR.mobile.lockScroll=function(){


    if(
        UAR.mobile.scrollingLocked
    ){

        return;

    }



    document.body.dataset.uarOverflow =
    document.body.style.overflow;



    document.body.style.overflow =
    "hidden";



    UAR.mobile.scrollingLocked=true;


};






UAR.mobile.unlockScroll=function(){


    if(
        !UAR.mobile.scrollingLocked
    ){

        return;

    }



    document.body.style.overflow =
    document.body.dataset.uarOverflow
    ||
    "";



    UAR.mobile.scrollingLocked=false;


};







/* =========================================================
   OVERSCROLL PROTECTION
========================================================= */


function preventOverscroll(){


    if(
        !UAR.config.preventOverscroll
    ){

        return;

    }



    document.body.style.overscrollBehavior =
    "none";


}






/* =========================================================
   ZOOM CONTROL
========================================================= */


function preventZoom(){


    if(
        !UAR.config.preventZoom
    ){

        return;

    }



    document.addEventListener(

        "gesturestart",

        function(e){

            e.preventDefault();

        },

        {
            passive:false
        }

    );


}







/* =========================================================
   FULLSCREEN
========================================================= */


UAR.mobile.fullscreenEnter=function(){


    const el =
    document.documentElement;



    if(
        el.requestFullscreen
    ){

        el.requestFullscreen();

        UAR.mobile.fullscreen=true;

    }


};





UAR.mobile.fullscreenExit=function(){


    if(
        document.exitFullscreen
    ){

        document.exitFullscreen();

        UAR.mobile.fullscreen=false;

    }


};








/* =========================================================
   CSS VARIABLES
========================================================= */


function updateMobileVariables(){


    document.documentElement
    .style
    .setProperty(

        "--uar-safe-top",

        UAR.mobile.safeArea.top+"px"

    );


    document.documentElement
    .style
    .setProperty(

        "--uar-safe-bottom",

        UAR.mobile.safeArea.bottom+"px"

    );


    document.documentElement
    .style
    .setProperty(

        "--uar-keyboard-open",

        UAR.mobile.keyboard
        ?
        "1"
        :
        "0"

    );


}






/* =========================================================
   INITIALIZE
========================================================= */


function initialize(){


    detectSafeArea();


    detectKeyboard();


    preventOverscroll();


    preventZoom();


    updateMobileVariables();


}



initialize();



window.addEventListener(

    "resize",

    updateMobileVariables

);





UAR.utils.log(
    "Mobile Environment Engine loaded"
);



})(window);

/* =========================================================

   UNIVERSAL APP RUNTIME (UAR)

   PART 6
   PERFORMANCE & DIAGNOSTICS ENGINE

   Requires:
   PART 1 CORE ENGINE

========================================================= */


(function(window){

"use strict";


if(!window.UAR){

    console.error(
        "UAR Part 6 requires Part 1"
    );

    return;

}


const UAR = window.UAR;





/* =========================================================
   PERFORMANCE OBJECT
========================================================= */

UAR.performance={


    fps:0,


    frameTime:0,


    frames:0,


    lastTime:performance.now(),


    memory:null


};






/* =========================================================
   FPS MONITOR
========================================================= */


function measureFPS(time){


    UAR.performance.frames++;



    const elapsed =
    time -
    UAR.performance.lastTime;



    if(
        elapsed >=1000
    ){


        UAR.performance.fps =
        UAR.performance.frames;


        UAR.performance.frameTime =
        elapsed /
        UAR.performance.frames;



        UAR.performance.frames=0;


        UAR.performance.lastTime=time;


    }



    requestAnimationFrame(
        measureFPS
    );


}




/* =========================================================
   MEMORY INFORMATION
========================================================= */


function updateMemory(){


    if(
        performance.memory
    ){

        UAR.performance.memory={


            used:
            Math.round(
                performance.memory.usedJSHeapSize
                /
                1048576
            )
            +" MB",


            total:
            Math.round(
                performance.memory.totalJSHeapSize
                /
                1048576
            )
            +" MB"


        };


    }


}







/* =========================================================
   DIAGNOSTIC OBJECT
========================================================= */


UAR.debug={


    enabled:false,


    panel:null,


    open:function(){


        UAR.debug.enabled=true;


        createPanel();


    },


    close:function(){


        UAR.debug.enabled=false;


        if(
            UAR.debug.panel
        ){

            UAR.debug.panel.remove();

            UAR.debug.panel=null;

        }


    }


};







/* =========================================================
   DEBUG PANEL
========================================================= */


function createPanel(){


    if(
        UAR.debug.panel
    ){

        return;

    }



    const panel =
    document.createElement(
        "div"
    );



    panel.id =
    "uar-debug-panel";



    panel.style.position =
    "fixed";

    panel.style.top =
    "10px";

    panel.style.right =
    "10px";

    panel.style.zIndex =
    "999999";

    panel.style.background =
    "rgba(0,0,0,.8)";

    panel.style.color =
    "white";

    panel.style.padding =
    "12px";

    panel.style.fontFamily =
    "monospace";

    panel.style.fontSize =
    "12px";

    panel.style.borderRadius =
    "8px";

    panel.style.pointerEvents =
    "none";



    document.body.appendChild(
        panel
    );



    UAR.debug.panel =
    panel;



    updatePanel();


}





function updatePanel(){


    if(
        !UAR.debug.panel
    ){

        return;

    }



    const vp =
    UAR.viewport
    ||
    {};



    UAR.debug.panel.innerHTML = `

    <b>UAR ${UAR.version}</b><br><br>

    FPS:
    ${UAR.performance.fps}<br>

    DPR:
    ${UAR.device.dpr}<br>

    Touch:
    ${UAR.device.touch}<br>

    Mobile:
    ${UAR.device.mobile}<br>

    Browser:
    ${Object.keys(UAR.browser)
    .filter(k=>UAR.browser[k])
    [0] || "unknown"}<br><br>

    Viewport:
    ${Math.round(vp.width||0)}
    x
    ${Math.round(vp.height||0)}<br>

    Scale:
    ${(vp.scale||1).toFixed(2)}<br>

    Orientation:
    ${vp.orientation||""}

    `;



    requestAnimationFrame(
        updatePanel
    );


}







/* =========================================================
   EVENT MONITOR
========================================================= */


UAR.events={};


UAR.events.counts={};



UAR.events.track=function(name){


    if(
        !UAR.events.counts[name]
    ){

        UAR.events.counts[name]=0;

    }


    UAR.events.counts[name]++;


};







/* =========================================================
   RUNTIME STATUS
========================================================= */


UAR.status=function(){


    return {


        version:
        UAR.version,


        device:
        UAR.device,


        browser:
        UAR.browser,


        features:
        UAR.features,


        viewport:
        UAR.viewport,


        performance:
        UAR.performance


    };


};







/* =========================================================
   FINAL READY SYSTEM
========================================================= */


UAR.readyCallbacks=[];


UAR.onReady=function(callback){


    if(
        UAR.ready
    ){

        callback(UAR);

    }

    else{

        UAR.readyCallbacks.push(
            callback
        );

    }


};




function finishReady(){


    UAR.ready=true;


    UAR.readyCallbacks
    .forEach(

        fn=>fn(UAR)

    );


    UAR.readyCallbacks=[];


}






/* =========================================================
   START
========================================================= */


requestAnimationFrame(
    measureFPS
);



setInterval(

    updateMemory,

    5000

);



finishReady();



UAR.utils.log(
    "Performance Engine loaded"
);


UAR.utils.log(
    "Universal App Runtime complete"
);



})(window);