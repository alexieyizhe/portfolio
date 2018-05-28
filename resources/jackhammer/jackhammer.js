/**
 *
 */

var frameNumber = 0;

window.addEventListener('load', function () {
	initJackhammer();
}, false);


function initJackhammer()
{
	var jackhammerTip = document.getElementById("jackhammerTip");
	var jackhammer = document.getElementById("jackhammer");
	var jackBody = document.getElementById("jackBody");
	var jackArms = document.getElementById("jackArms");
	setInterval(animateJackhammer, 40);




}

function animateJackhammer()
{
	frameNumber++;
	jackhammerTip.setAttribute('transform', 'translate(0,'+frameNumber%3 * -3+')');

	jackhammer.setAttribute('transform', 'translate(0,'+ -Math.sin(frameNumber*1.5) +')');

	var jackBodyAmount = Math.sin(frameNumber) + 2;
	jackBody.setAttribute('transform', 'translate(0,'+ -jackBodyAmount +')');
	jackArms.setAttribute('transform', 'translate(0,'+ -jackBodyAmount +')');

	if(frameNumber == 1000)
		frameNumber = 0;
}
