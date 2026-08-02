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