# jQuery.cyclify

## Description
This is a jQuery plugin that lets the user cycle through a bunch of divs, showing only one at a time. It's useful for month calendars, slideshows, etc.

Additional easing effects can be gained by including jQuery UI.

### Requirements
jQuery v1.4+

### Usage


###### HTML/CSS
The HTML/CSS must have the following structure (Note: elements only need to have the correct CSS classes, their types don't matter):

	div.wrapper-class
	    div.cycle-controls
	        a.cycle-prev
	        a.cycle-next
	        a.cycle-begin
	        a.cycle-end
	    div.cycle-cycles
	        div
	        div
	        div
	        ...
##### Javascript
	  $('.wrapper-class').cyclify({
	    loop       : true, 
	    transition : 'linear',
	    delay      : 100,
	    success : function(current_div) { 
	      alert('the current div is ' + $(current_div));
	    }
	  });
##### Options

 Option          | Usage       
:--------------- | :-------------
**loop**             | loop back to the beginning when the end is reached, or vice versa ( default: false )
**transition**       | Name of easing function to use ( default: swing )
**delay**            | Animation time for transition (default: 100)
**success**          | Callback function that is triggered after a successful cycle.  Takes the newly transitioned div as an argument.
