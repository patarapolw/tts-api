// @ts-ignore
import Speech from "speak-tts";
import swal from "sweetalert";

const ttsTextArea = document.getElementById("tts-textarea") as HTMLTextAreaElement;
const langChooser = document.getElementById("tts-language-chooser") as HTMLSelectElement;
const speakerChooser = document.getElementById("tts-speaker-chooser") as HTMLSelectElement;
const rateLabel = document.getElementById("tts-rate-label") as HTMLLabelElement;
const rateSlider = document.getElementById("tts-rate") as HTMLInputElement;
const speakButton = document.getElementById("tts-speak") as HTMLButtonElement;

const speech = new Speech();
if (!speech.hasBrowserSupport()) {
    swal({
        icon: "error",
        text: "Web Speech API not supported"
    });
} else {
    speech.init().then((speechData: any) => {
        const q = new URL(location.href).searchParams;
        ttsTextArea.value = q.get("q") || ttsTextArea.value;

        const voices: SpeechSynthesisVoice[] = speechData.voices;
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
            if (!defaultLang && voices[i].localService) {
                defaultLang = voices[i].lang;
                defaultSpeaker = voices[i].name;
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
            speech.setLanguage(langChooser.value);
            speech.setVoice(speakerChooser.value);
            speech.setRate(rateSlider.value);
            speech.speak({
                text: ttsTextArea.value,
                queue: false
            });
        };

        if (q.get("q")) {
            swal("Click OK to speak").then((r) => { if (r) speakButton.click(); });
        }

        function setSpeakerName(lang: string) {
            speakerChooser.innerHTML = "";
            voices.forEach((v) => {
                if (v.lang === lang) {
                    const option = document.createElement("option");
                    option.value = v.name;
                    option.innerHTML = `${v.name}${v.localService ? "" : " [online-only]"}`;
                    if (v.name === defaultSpeaker) {
                        option.selected = true;
                    }

                    speakerChooser.appendChild(option);
                }
            });
        }
    });
}