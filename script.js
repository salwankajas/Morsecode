let audioContext;
let audio_node;
let gain_node;
let ac_Initialised = false;
var dot = 60;
var dash = dot * 3;
let j=0;
let m=0;
const toMorsseCode = {
   "A": ".-",
   "B": "-...",
   "C": "-.-.",
   "D": "-..",
   "E": ".",
   "F": "..-.",
   "G": "--.",
   "H": "....",
   "I": "..",
   "J": ".---",
   "K": "-.-",
   "L": ".-..",
   "M": "--",
   "N": "-.",
   "O": "---",
   "P": ".--.",
   "Q": "--.-",
   "R": ".-.",
   "S": "...",
   "T": "-",
   "U": "..-",
   "V": "..._",
   "W": ".--",
   "X": "-..-",
   "Y": "-.--",
   "Z": "--..",
   "1":".----",
   "2":"..---",
   "3":"...--",
   "4":"....-",
   "5":".....",
   "6":"-....",
   "7":"--...",
   "8":"---..",
   "9":"----.",
   "0":"-----",
	".":".-.-.-",
	",":"--..--",
	"?":"..--..",
	"!":"-.-.--",
	"'":".----.",
	'"':".-..-.",
	"(":"-.--.",
	")":"-.--.-",
	"&":".-...",
	":":"---...",
	";":"-.-.-.",
	"/":"-..-.",
	"_":"..--.-",
	"=":"-...-",
	"+":".-.-.",
	"-":"-....-",
	"$":"...-..-",
	"@":".--.-."
	
};
const fromMorsseCode = {
   ".-":"A",
   "-...":"B",
   "-.-.":"C",
   "-..":"D",
   ".":"E",
   "..-.":"F",
   "--.":"G",
   "....":"H",
   "..":"I",
   ".---":"J",
   "-.-":"K",
   ".-..":"L",
   "--":"M",
   "-.":"N",
   "---":"O",
   ".--.":"P",
   "--.-":"Q",
   ".-.":"R",
   "...":"S",
   "-":"T",
   "..-":"U",
   "..._":"V",
   ".--":"W",
   "-..-":"X",
   "-.--":"Y",
   "--..":"Z",
   ".----":"1",
   "..---":"2",
   "...--":"3",
   "....-":"4",
   ".....":"5",
   "-....":"6",
   "--...":"7",
   "---..":"8",
   "----.":"9",
   "-----":"0",
	".-.-.-":".",
	"--..--":",",
	"..--..":"?",
	"-.-.--":"!",
	".----.":"'",
	".-..-.":'"',
	"-.--.":"(",
	"-.--.-":")",
	".-...":"&",
	"---...":":",
	"-.-.-.":";",
	"-..-.":"/",
	"..--.-":"_",
	"-...-":"=",
	".-.-.":"+",
	"-....-":"-",
	"...-..-":"$",
	".--.-.":"@",
   '/':" ",
};

document.getElementById("message").oninput = function(){
	if(document.getElementById("selector").innerHTML == "Text To Morse code"){
	let x = document.getElementById("message").value;
	const converts = (stri) => {
		return x.toUpperCase().split("").map(ele => {
			return toMorsseCode[ele] ? toMorsseCode[ele] : ele == " " ? "/" : removeInvalid();
		}).join(" ");
	};
	document.getElementById("translate").value = converts(x);
	document.getElementById("play").innerHTML = "Play";
	j=0;
	}else{
		let x = document.getElementById("message").value;
		const converts = (stri) => {
			return x.split(" ").map(ele => {
					return fromMorsseCode[ele] ? fromMorsseCode[ele] : ele == '' ? '' : removeInvalid2(ele);
			}).join("");
		};
		document.getElementById("translate").value = converts(x);
		document.getElementById("play").innerHTML = "Play";
		j=0;
	}
};
//remove invalid text
function removeInvalid(){
		//alert("Enter valid"+ele+"input");
		document.getElementById("message").value = document.getElementById("message").value.substr(0,document.getElementById("message").value.length -1);
		//try to change color of div
}
function removeInvalid2(ele){
		if(ele.slice(-1) == "." || ele.slice(-1) == "-"){
			if (ele.length < 7){
				return "";
			}else{
				document.getElementById("message").value = document.getElementById("message").value.substr(0,document.getElementById("message").value.length -1);
			}
		}else{
			document.getElementById("message").value = document.getElementById("message").value.substr(0,document.getElementById("message").value.length -1);
		}
		//try to change color of div
}
//selector
document.getElementById("selector").onclick= function(){
	if(document.getElementById("selector").innerHTML == "Text To Morse code"){
		document.getElementById("selector").innerHTML = "Morse code To Text";
		document.getElementById("message").value = document.getElementById("translate").value + " ";
		document.getElementById("translate").value = "";
		document.getElementById("play").innerHTML = "Play";
	}else{
		document.getElementById("selector").innerHTML = "Text To Morse code";
		document.getElementById("message").value = document.getElementById("translate").value + " ";
		document.getElementById("translate").value = "";
		document.getElementById("play").innerHTML = "Play";
	}
}
//change pause to play and vise versa
document.getElementById("play").onclick = changeStat;
async function changeStat() {
	if (document.getElementById("play").innerHTML == "Play"){
		var el = document.getElementById("play");
        el.innerHTML = "Pause";
		let le;
		le = document.getElementById("translate").value;
		le = le.split(" ");
		for (let i=j; i < le.length ; i++){
			await isPlay();
			if(le[i] == "/"){
				document.getElementById("display").innerHTML = "New Word";
			}else{
				document.getElementById("display").innerHTML = le[i];
			}
			await playLetter(le[i]);
			await sleep(dot * 3);
			j +=1;
		}
		document.getElementById("play").innerHTML = "Play";
		j=0;
	}else{
		var el = document.getElementById("play");
        el.innerHTML = "Play";
	}
}

//web audio initialisation
function initializeAc(){
	audioContext = new AudioContext;
	audio_node = audioContext.createOscillator();
	audio_node.frequency.value = 600;
	gain_node = audioContext.createGain();
	gain_node.gain.value = 0;
	audio_node.connect(gain_node);
	gain_node.connect(audioContext.destination);
	audio_node.start();
	ac_Initialised = true;
}
function sleep(ms){
	return new Promise(res => {setTimeout(res,ms)});
}
async function playDot(){
	startPlaying();
	await sleep(dot);
	stopPlaying();
}
async function playDash(){
	startPlaying();
	await sleep(dash);
	stopPlaying();
}
function isPlay(){
	return new Promise(resolve =>{
		if (document.getElementById("play").innerHTML == "Pause"){
			resolve("done");
		}
	});
}
async function playLetter(letter){
	if(!ac_Initialised){
		initializeAc();
	}
	for (let i= m; i < letter.length; i++){
		await isPlay();
		if(letter[i] == "."){
			await playDot();
		}else if (letter[i] == "-"){
			await playDash();
		}else if (letter[i] == "/"){
			await sleep(dot * 7);
		}
		await sleep(dot);
		m +=1;
	}
	m=0;
}
function startPlaying(){
	gain_node.gain.setTargetAtTime(0.1,0,0.001);
}
function stopPlaying(){
	gain_node.gain.setTargetAtTime(0,0,0.001);
}