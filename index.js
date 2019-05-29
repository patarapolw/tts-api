window.speechSynthesis.onvoiceschanged = () => {
    const ttsTextArea = document.getElementById("tts-textarea");
    const langChooser = document.getElementById("tts-language-chooser");
    const speakerChooser = document.getElementById("tts-speaker-chooser");
    const rateLabel = document.getElementById("tts-rate-label");
    const rateSlider = document.getElementById("tts-rate");
    const speakButton = document.getElementById("tts-speak");

    const q = new URL(location.href).searchParams;
    ttsTextArea.value = q.get("q") || ttsTextArea.value;

    const voices = window.speechSynthesis.getVoices();
    let defaultLang = q.get("lang");
    let defaultSpeaker = q.get("speaker");

    let langs = voices.map((v) => {
        if (!defaultLang && (v.default || (v.localService && v.lang.indexOf("en") === 0))) {
            defaultLang = v.lang;
            defaultSpeaker = v.name;
        }
        return v.lang;
    });

    for (let i = 0; i < voices.length; i++) {
        if (!defaultLang && v.localService) {
            defaultLang = v.lang;
            defaultSpeaker = v.name;
            break;
        }
    }

    langs = langs.filter((l, i) => langs.indexOf(l) === i).sort();
    langs.forEach((l) => {
        const option = document.createElement("option");
        option.value = l;
        option.innerHTML = l;
        if (l === defaultLang) {
            option.selected = true;
        }

        langChooser.appendChild(option);
    });

    setSpeakerName(langChooser.value);

    langChooser.onchange = () => {
        setSpeakerName(langChooser.value);
    };

    rateLabel.innerHTML = rateSlider.value = q.get("rate") || rateSlider.value;
    rateSlider.oninput = () => {
        rateLabel.innerHTML = rateSlider.value;
    };

    speakButton.onclick = () => {
        const u = new SpeechSynthesisUtterance(ttsTextArea.value)
        u.lang = langChooser.value;
        u.setSpeakerName = speakerChooser.value;
        u.rate = rateSlider.value;
        speechSynthesis.speak(u);
    };

    if (q.get("q")) {
        swal("Click OK to speak").then(() => speakButton.click());
    }

    function setSpeakerName(lang) {
        speakerChooser.innerHTML = "";
        voices.forEach((v) => {
            if (v.lang === lang) {
                const option = document.createElement("option");
                option.value = v.name;
                option.innerHTML = `${v.name}${v.localService ? "": " [online-only]"}`;
                if (v.name === defaultSpeaker) {
                    option.selected = true;
                }

                speakerChooser.appendChild(option);
            }
        });
    }
};
