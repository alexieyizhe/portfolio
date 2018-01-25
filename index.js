var stop_pos;
var bottom;
var special_lines = {8: "envelope", 9:"id-badge", 10:"github", 11:"linkedin", 12:"facebook", 16:"graduation-cap", 25:"cog", 36: "align-left", 41: "align-left", 46:"align-left", 54:"briefcase", 60:"briefcase", 68:"briefcase"};

function smooth_scroll_up(){
	var current_pos = document.documentElement.scrollTop || document.body.scrollTop;
	if (current_pos > stop_pos) {
		//console.log(current_pos/10); for testing
		window.requestAnimationFrame(smooth_scroll_up);
		window.scrollTo (0, current_pos - (current_pos/10));
	} else {
		window.scrollTo (0, stop_pos);
	}
}

function smooth_scroll_down(){
	var current_pos = document.documentElement.scrollTop || document.body.scrollTop;
	var window_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var difference = Math.min((stop_pos - current_pos)/10, ((bottom - current_pos - window_height) / 10));
	difference = ((difference * 10 < 10) ?  1 : difference); //stops the scroll from infinitely approaching window_height
	console.log("difference " + (difference*10) + " diff bottom " + (current_pos + difference + window_height) + " bottom " + bottom);  
	if ((current_pos < stop_pos) && (current_pos + difference + 780 < bottom)){ //if can't scroll all the way to bottom, it wont stop trying
		window.requestAnimationFrame(smooth_scroll_down);
		window.scrollTo (0, current_pos + difference);
	} else {
		window.scrollTo (0, stop_pos);
	}
}

function smooth_scroll_wrapper(target){
	stop_pos = document.getElementById(target).offsetTop;
	bottom = parseInt(window.getComputedStyle(document.getElementById("main"), null).getPropertyValue("height"));
	var current_pos = document.documentElement.scrollTop || document.body.scrollTop;
	if (current_pos > stop_pos) {
		smooth_scroll_up();
	} else if (current_pos < stop_pos){
		smooth_scroll_down();;
	}
}

function countLines(target) {
      var style = window.getComputedStyle(target, null);
      var height = parseInt(style.getPropertyValue("height"));
      var font_size = parseInt(style.getPropertyValue("font-size"));
      var line_spacing = 5;
      var line_height = (isNaN(parseInt(style.getPropertyValue("line-height"))) ? font_size : parseInt(style.getPropertyValue("line-height"))) + line_spacing;
      var box_sizing = style.getPropertyValue("box-sizing");
     
      if(box_sizing=='border-box'){
      	var padding_top = parseInt(style.getPropertyValue("padding-top"));
      	var padding_bottom = parseInt(style.getPropertyValue("padding-bottom"));
      	var border_top = parseInt(style.getPropertyValue("border-top-width"));
      	var border_bottom = parseInt(style.getPropertyValue("border-bottom-width"));
      	height = height - padding_top - padding_bottom - border_top - border_bottom;
      } 

      var lines = Math.ceil(height / line_height);
      console.log("height: " + height + "\nline height: " + line_height + "\nlines: " + lines);

      return lines;
 }

 function addLineNum(){
	var total_lines = countLines(document.getElementById("main"));
	var line_ct_elem = document.getElementById("line_ct");
	for(i = 1; i < total_lines; i++){
		var new_line = (special_lines[i] ?  ('<span class="fa fa-' + special_lines[i] + '"></span><br>') : (i + '<br>'));
		line_ct_elem.innerHTML += new_line;
	}
	line_ct_elem.innerHTML += '<span class="fa fa-arrow-circle-o-up"></span><br>'; // last line of site always loads with return to top icon in place of line num
}