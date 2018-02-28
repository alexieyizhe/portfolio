var stop_pos;
var bottom;
var special_lines = {8: "fas fa-envelope", 9:"fas fa-id-badge", 10:"fab fa-github", 11:"fab fa-linkedin", 12:"fab fa-facebook", 16:"fas fa-graduation-cap", 
25:"fas fa-cogs", 37: "fas fa-align-left", 42: "fas fa-align-left", 47:"fas fa-align-left", 52:"fas fa-align-left", 60:"fas fa-briefcase", 66:"fas fa-briefcase", 74:"fas fa-briefcase"};

function smooth_scroll_up(){
	var current_pos = document.documentElement.scrollTop || document.body.scrollTop;
	var difference = (current_pos/10);

	if (current_pos > stop_pos) {
		window.requestAnimationFrame(smooth_scroll_up);
		window.scrollTo (0, current_pos - difference);
	} else {
		window.scrollTo (0, stop_pos);
	}
}

function smooth_scroll_down(){
	var current_pos = document.documentElement.scrollTop || document.body.scrollTop;
	var window_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var difference = Math.min((stop_pos - current_pos)/10, ((bottom - current_pos - window_height) / 10));
	difference = ((difference < 1) ?  1 : difference); //stops the scroll from infinitely approaching window_height but never reaching it

	if ((current_pos < stop_pos) && (current_pos + window_height - 20 < bottom)){ 
		window.requestAnimationFrame(smooth_scroll_down);
		window.scrollTo (0, current_pos + difference);
	} else {
		window.scrollTo (0, stop_pos);
	}
}

function smooth_scroll_wrapper(target){
	NAV_BAR_OFFSET = 37;
	stop_pos = Math.max(0, document.getElementById(target).offsetTop - NAV_BAR_OFFSET);
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
	line_ct_elem.innerHTML = "";
	for(i = 1; i < total_lines; i++){
		var new_line = (special_lines[i] ?  ('<i class="'+ special_lines[i] + '"></i><br>') : (i + '<br>'));
		line_ct_elem.innerHTML += new_line;
	}
	line_ct_elem.innerHTML += '<i class="fas fa-arrow-circle-up"></i><br>'; // last line of site always loads with return to top icon in place of line num
}

function toggleFullScreen() {
	if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
		(!document.mozFullScreen && !document.webkitIsFullScreen)) {
		if (document.documentElement.requestFullScreen) {  
			document.documentElement.requestFullScreen();  
		} else if (document.documentElement.mozRequestFullScreen) {  
			document.documentElement.mozRequestFullScreen();  
		} else if (document.documentElement.webkitRequestFullScreen) {  
			document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
		}  
	} else {  
		if (document.cancelFullScreen) {  
			document.cancelFullScreen();  
		} else if (document.mozCancelFullScreen) {  
			document.mozCancelFullScreen();  
		} else if (document.webkitCancelFullScreen) {  
			document.webkitCancelFullScreen();  
		}  
	}  
}