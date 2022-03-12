let audioContext;
let audio_node;
let gain_node;
let ac_Initialised = false;
var dot = 120;
var dash = dot * 3;
let j = 0;
let m = 0;
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
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "'": ".----.",
  '"': ".-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "/": "-..-.",
  "_": "..--.-",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  "$": "...-..-",
  "@": ".--.-."

};
const fromMorsseCode = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "..._": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0",
  ".-.-.-": ".",
  "--..--": ",",
  "..--..": "?",
  "-.-.--": "!",
  ".----.": "'",
  ".-..-.": '"',
  "-.--.": "(",
  "-.--.-": ")",
  ".-...": "&",
  "---...": ":",
  "-.-.-.": ";",
  "-..-.": "/",
  "..--.-": "_",
  "-...-": "=",
  ".-.-.": "+",
  "-....-": "-",
  "...-..-": "$",
  ".--.-.": "@",
  '/': " ",
};

document.getElementById("message").oninput = function() {
  if (document.getElementById("selector").innerHTML == "Text To Morse Code") {
    let x = document.getElementById("message").value;
    const converts = (stri) => {
      return x.toUpperCase().split("").map(ele => {
        return toMorsseCode[ele] ? toMorsseCode[ele] : ele == " " ? "/" : carrier();
      }).join(" ");
    };
    document.getElementById("translate").value = converts(x);
    document.getElementById("play").innerHTML = "Play";
    j = 0;
  } else {
    let x = document.getElementById("message").value;
    const converts = (stri) => {
      return x.split(" ").map(ele => {
        return fromMorsseCode[ele] ? fromMorsseCode[ele] : ele == '' ? '' : carrier2(ele);
      }).join("");
    };
    document.getElementById("translate").value = converts(x);
    document.getElementById("play").innerHTML = "Play";
    j = 0;
  }
};
//remove invalid text
async function removeInvalid() {
  //alert("Enter valid"+ele+"input");
  document.getElementById("message").value = document.getElementById("message").value.substr(0, document.getElementById("message").value.length - 1);
  //try to change color of div
  let el = document.querySelectorAll(".myTextArea");
  el.forEach((ele) => {
    ele.style.border = "1px solid #ff2929";
    ele.style.outline = "1px solid #ff2929";
  });
  //document.getElementsByClassName("myTextArea")[1].style.border = "1px solid red";
  await sleep(150);
  //document.getElementsByClassName("myTextArea").removeAttribute("style");
  //document.getElementsByClassName("myTextArea")[1].removeAttribute("style");
  el.forEach((ele) => {
    ele.removeAttribute("style");
  });
}
function carrier() {
  removeInvalid();
}
async function removeInvalid2(ele) {
  if (ele.slice(-1) == "." || ele.slice(-1) == "-") {
    if (ele.length < 7) {
      return "";
    } else {
      document.getElementById("message").value = document.getElementById("message").value.substr(0, document.getElementById("message").value.length - 1);
    }
  } else {
    document.getElementById("message").value = document.getElementById("message").value.substr(0, document.getElementById("message").value.length - 1);
  }
  //try to change color of div
  let el = document.querySelectorAll(".myTextArea");
  el.forEach((ele) => {
    ele.style.border = "1px solid #ff2929";
    ele.style.outline = "1px solid #ff2929";
  });
  await sleep(150);
  el.forEach((ele) => {
    ele.removeAttribute("style");
  });
}
function carrier2(ele) {
  removeInvalid2(ele);
}
//selector
document.getElementById("selector").onclick = function() {
  if (document.getElementById("selector").innerHTML == "Morse Code To Text") {
    document.getElementById("selector").innerHTML = "Text To Morse Code";
    if (document.getElementById("translate").value != 0) {
      document.getElementById("message").value = document.getElementById("translate").value + "";
    } else {
      document.getElementById("message").value = "";
    }
    document.getElementById("translate").value = "";
    document.getElementById("play").innerHTML = "Play";
    j = 0;
    m = 0;
  } else {
    document.getElementById("selector").innerHTML = "Morse Code To Text";
    if (document.getElementById("translate").value != 0) {
      document.getElementById("message").value = document.getElementById("translate").value + " ";
    } else {
      document.getElementById("message").value = "";
    }
    document.getElementById("translate").value = "";
    document.getElementById("play").innerHTML = "Play";
    j = 0;
    m = 0;
  }
}
//change pause to play and vise versa
document.getElementById("play").onclick = changeStat;
async function changeStat() {
  if (document.getElementById("selector").innerHTML == "Text To Morse Code") {
    if (document.getElementById("play").innerHTML == "Play") {
      var el = document.getElementById("play");
      el.innerHTML = "Pause";
      let le;
      le = " " + document.getElementById("translate").value;
      le = le.split(" ");
      for (let i = j; i < le.length; i++) {
        await isPlay();
        if (le[i] == "/") {
          document.getElementById("display").innerHTML = "Word";
          document.getElementById("result").innerHTML = " ";
        } else {
          document.getElementById("display").innerHTML = le[i];
          if (fromMorsseCode[le[i]] != undefined) {
            document.getElementById("result").innerHTML = fromMorsseCode[le[i]];
          }
        }
        await playLetter(le[i]);
        await sleep(dot * 3);
        j += 1;
      }
      document.getElementById("play").innerHTML = "Play";
      j = 0;
      m = 0;
    } else {
      var el = document.getElementById("play");
      el.innerHTML = "Play";
    }
  } else {
    if (document.getElementById("play").innerHTML == "Play") {
      document.getElementById("play").innerHTML = "Pause";
      let le;
      le = " " + document.getElementById("message").value;
      le = le.split(" ");
      for (let i = j; i < le.length; i++) {
        await isPlay();
        if (le[i] == "/") {
          document.getElementById("display").innerHTML = "Word";
          document.getElementById("result").innerHTML = " ";
        } else {
          document.getElementById("display").innerHTML = le[i];
          if (fromMorsseCode[le[i]] != undefined) {
            document.getElementById("result").innerHTML = fromMorsseCode[le[i]];
          }
        }
        await playLetter(le[i]);
        await sleep(dot * 3);
        j += 1;
      }
      document.getElementById("play").innerHTML = "Play";
      j = 0;
      m = 0;
    } else {
      document.getElementById("play").innerHTML = "Play";
    }
  }
}

//web audio initialisation
function initializeAc() {
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
function sleep(ms) {
  return new Promise(res => { setTimeout(res, ms) });
}
async function playDot() {
  startPlaying();
  await sleep(dot);
  stopPlaying();
}
async function playDash() {
  startPlaying();
  await sleep(dash);
  stopPlaying();
}
function isPlay() {
  return new Promise(resolve => {
    if (document.getElementById("play").innerHTML == "Pause") {
      resolve("done");
    }
  });
}
async function playLetter(letter) {
  if (!ac_Initialised) {
    initializeAc();
  }
  for (let i = m; i < letter.length; i++) {
    await isPlay();
    if (letter[i] == ".") {
      await playDot();
    } else if (letter[i] == "-") {
      await playDash();
    } else if (letter[i] == "/") {
      await sleep(dot * 7);
    }
    await sleep(dot);
    m += 1;
  }
  m = 0;
}
function startPlaying() {
  gain_node.gain.setTargetAtTime(0.3, 0, 0.001);
}
function stopPlaying() {
  gain_node.gain.setTargetAtTime(0, 0, 0.001);
}
//stop
document.getElementById("stop").onclick = () => {
  if (document.getElementById("play").innerHTML = "Pause") {
    document.getElementById("play").innerHTML = "Play";
    j = 0;
    m = 0;
  }
};
//hover selector
document.getElementById("selector").onmouseover = () => {
  document.getElementById("chooser").style.backgroundColor = "#620071";
};
document.getElementById("selector").onmouseleave = () => {
  document.getElementById("chooser").style.backgroundColor = "#313131";
};
// disable play before type
document.querySelectorAll(".button")[0].onmouseover = () => {
  if (document.getElementById("message").value == "") {
    document.querySelectorAll(".button")[0].setAttribute("style", "cursor:no-drop");
    document.getElementById("play").style.pointerEvents = "none";
  }
};
document.querySelectorAll(".button")[0].onmouseleave = () => {
  document.getElementById("play").removeAttribute("style");
  document.querySelectorAll(".button")[0].removeAttribute("style");
};
document.querySelectorAll(".button")[1].onmouseover = () => {
  if (document.getElementById("message").value == "") {
    document.querySelectorAll(".button")[1].setAttribute("style", "cursor:no-drop");
    document.getElementById("stop").style.pointerEvents = "none";
  }
};
document.querySelectorAll(".button")[1].onmouseleave = () => {
  document.getElementById("stop").removeAttribute("style");
  document.querySelectorAll(".button")[1].removeAttribute("style");
};