const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//Disable/Enable Button
const toogleButton = () => {
  button.disabled = !button.disabled;
};

//Passing jokes to VoiceRSS API
const tellMe = (joke) => {
  console.log(joke);
  VoiceRSS.speech({
    key: "7c0259540a4a47e4af1fc182961613d1",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b09cdcd76dmshd34aed0c2973c8ap1f6ca7jsna4089bfb46ff",
    "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
  },
};

//Get jokes from jokes API
async function getJokes() {
  let joke = " ";
  const apiUrl = "https://dad-jokes.p.rapidapi.com/random/joke";
  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (data.body[0].setup) {
      joke = `${data.body[0].setup} ... ${data.body[0].punchline}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toogleButton;
  } catch (err) {
    console.log(err);
  }
}

//Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toogleButton);
