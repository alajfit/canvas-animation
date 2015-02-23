/***
 * JavaScript Animation initiator and FPS Counter
 * Runs an animation loop for JS canvas (only if a canvas is present)
 * Runs an FPS counter if wanted using the initial variable and if an element with the id 'fps' is present
 * Each call we attempt to call the functions update, render and check from the Global scope
 * Errors are caught and displayed as is necessary
 * 
 *      Created by Alan J Fitzpatrick
 ***/

(function () {
    var fpsActivate = !0, // true or false to activate an fps counter
	    fpsFilter = 20, // used for an fps average, the higher the more accurate
	    lastFrame = +new Date(), // this grabs the current time stamp for use in getting the Delta Time (Time since last available loop)
	    frameTime = 0, // holder for the fps
	    uE = !0, // updateError
        rE = !0, // renderError
        cE = !0; // checkError
	    fpsOut = document.getElementById('fps'), // grab the fps out element if one exists, id must be fps
	    canvasExists = document.getElementsByTagName('canvas'); // this will grab any canvas elements on the page
    
    // this is a polyfill for Animation, this will initiate this function for all browsers
    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function ( callback ) {
                    window.setTimeout(callback, 1000 / 60);
                };
    })();
    
    var _private = {
        startAnimation: function () {
        	var now = +new Date(), // this captures the current time, this is used for comparison between
		        deltaT = now - lastFrame; // this checks the difference between the last loop and this loop, this is known as the Delta Time
		        requestAnimFrame(_private.startAnimation); // this call will run the passed function once the CPU has a free process available
		        frameTime += (deltaT - frameTime)/ fpsFilter;
		        /***
		         * Prevent large Delta Time gaps on tab swapping
                 * this if statement helps with moving between tabs and stops large time gaps from giving
                 * crazy jumps in the game, resume will only happen when delta time is below 100 ms
                 ***/  
		        if ( deltaT < 100 ) { // when you move between tabs the delta Time will be massive and create worm holes
		            _private.functionCall(deltaT); // call the function with update, render and check and pass the delta time
		        }
		        lastFrame = now; // set the lastFrame time to the time acquired at the start of the function
        },
        functionCall: function (deltaT) { // work on this
            try { update(deltaT); } catch (e) { // try to run update and pass delta time
                if( uE ) { // check if an error has been thrown yet
                    if ( document.readyState === "complete" ) { // this is a check for the entire DOM load, all scripts and images
                        alert('Error'); console.log(e); uE = 0; // alert the error, don't alert again
                    }
                } // try the update function, online output error once
            }
            try { render(deltaT); } catch (e) { // try to run render and pass delta time
                if( rE ) { // check if an error has been thrown yet
                    if ( document.readyState === "complete" ) { // this is a check for the entire DOM load, all scripts and images
                        alert('Error'); console.log(e); rE = 0; // alert the error, don't alert again
                    }
                } 
            } // try the render function, online output error once
            try { check(deltaT); } catch (e) { // try to run check and pass delta time
                if( cE ) { // check if an error has been thrown yet
                    if ( document.readyState === "complete" ) { // this is a check for the entire DOM load, all scripts and images
                        alert('Error'); console.log(e); cE = 0; // alert the error, don't alert again
                    }
                } 
            } // try the check function, online output error once
        }
    };
    
   	if( fpsOut !== null ) { // this check is to see if an fps element is present
   		if( fpsActivate !== 0 ) { // check if FPS should be active
	    	setInterval(function(){ // if the element is found start displaying 
			    fpsOut.innerHTML = (1000/frameTime).toFixed(0); // output every 1 second
			},1000);
   		}
    }
    
    // Initiation function for the animation loop
    window.addEventListener("load", function () { // when document ready state changes
    	if( document.readyState === "complete" ) { // check for completion of the state
		    if( canvasExists.length > 0) { // if a canvas element is present on the page start animation
		    	_private.startAnimation(); // run the animation loop
		    }
    	}
    }, false);
	    
    var _public = { // if we need to make any functions public add them here
    };
    
    return _public; // return any public functions to the global scope
})();
