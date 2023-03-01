window.addEventListener("load", (event) => {
    lightsOn();
    setInterval(() => cycle(), 1000);
});

let stop = false;

const cycle = () => {
    getJoke();
    showLaugh();
    if (!stop) {
        cycle();
    }
}

document.addEventListener('keypress', (e) => {
    if (e.code === 'Space') {
        stop == true;
        // getJoke();
        // sayJoke({setup:"One\ntwo\nthree...",punchline:"four? no, boom!"});
    } else if (e.code === 'KeyX') {
        showLaugh();
    }
});

const getJoke = async () => {
    console.log('getJoke');
    try {
        const res = await fetch('https://official-joke-api.appspot.com/jokes/random');
        const joke = await res.json();
        console.log('joke=', joke);
        sayJoke(joke);
    } catch (e) {
        console.error('error fetching the joke', e);
        const jokes = JSON.parse(atob(data));
        const joke = jokes[getRandomInt(jokes.length - 1)];
        sayJoke(joke);
    }
}

const filter = text => {
    return text.replaceAll('\n', '<br/>');
}

const sayJoke = joke => {
    const firstDialog = changePosture().firstElementChild;
    firstDialog.innerHTML = filter(joke.setup);
    setTimeout(() => {
        const secondDialog = changePosture().firstElementChild;
        secondDialog.innerHTML = filter(joke.punchline);
    }, 4000);
}

const changePosture = () => {
    const postures = document.querySelectorAll('.comedian');

    const index = getRandomIndex(postures);

    postures.forEach(e => e.classList.remove('acting'));
    const nextPosture = postures[index];
    nextPosture.classList.add('acting');
    return nextPosture;
}

const getRandomIndex2 = postures => {
    let actingIndex = -1;

    for (let i = 0; i <= postures.length; i++) {
        if (postures[i].classList.contains('acting')) {
            actingIndex = i;
            break;
        }
    }

    let possibleIndex = getRandomInt(postures.length - 1);
    if (possibleIndex === actingIndex || possibleIndex === 0) {
        let tmp = possibleIndex;
        while (tmp === actingIndex || tmp === 0) {
            tmp = getRandomInt(postures.length - 1);
        }
        possibleIndex = tmp;
    }
    console.log(`a=${actingIndex} p=${possibleIndex}`);
    return possibleIndex;
}


const showLaugh = () => {
    const tenPercentH = window.innerHeight / 10;
    const tenPercentW = window.innerWidth / 10;
    const courterW = window.innerWidth / 4;
    const verticalBase = window.innerHeight / 2;
    const horisontalBase = Math.round(Math.random()) ? courterW : 3 * courterW;

    const y = verticalBase + getRandomInt(-tenPercentH, tenPercentH);
    const x = horisontalBase + getRandomInt(-tenPercentW, tenPercentW);

    const smiles = ['😆', '😅', '😀', '🤣', '😂', '😁', '😊', '😍', '🤩', '😋', '😛', '😜', '🤪', '😝', '🤗', '🤭', '🥵', '🥶', '😵', '🥳', '🥳', '🤓', '🧐', '😳', '😱', '🤬', '🤫'];
    const smile = smiles[getRandomInt(smiles.length - 1)];

    const laf = document.getElementById('laughter_1');
    const blockWidth = laf.offsetWidth / 2;

    laf.textContent = `${smile} HA-HA-HA ${smile}`;
    laf.style.visibility = 'visible';
    laf.style.top = `${y}px`;
    laf.style.left = `${x - blockWidth}px`;
    laf.classList.add('burst');

    setTimeout(() => {
        laf.style.visibility = 'hidden';
        laf.classList.remove('burst');
    }, 1250);
}

const lightsOn = () => {
    const container = document.querySelector('.curtain');
    container.classList.add('open');
}

const getRandomInt = (max, min) => {
    if (min === null || min === undefined) {
        min = 0;
    }
    if (max === null || max === undefined) {
        max = 1;
    }
    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }
    return min + Math.floor(Math.random() * (max - min));
}


const getRandomIndex = (postures) => {
    let actingIndex = -1;

    for (let i = 0; i <= postures.length; i++) {
        if (postures[i].classList.contains('acting')) {
            actingIndex = i;
            break;
        }
    }
    let indexes = Array(postures.length - 2);
    let n = 1, i = 0;
    while (i < indexes.length) {
        if (n !== actingIndex) { 
            indexes[i] = n++;
            i++;
        } else {
            n++;
        } 
    }

    return shuffleArray(indexes).pop();
}

const shuffleArray = array => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

const data = 'W3sic2V0dXAiOiAiU2NpZW50aXN0cyBmaW5hbGx5IGRpZCBhIHN0dWR5IG9uIGZvcmtzLiIsInB1bmNobGluZSI6ICJJdCdzIGFib3V0IHRpbmUhIn0seyJzZXR1cCI6ICJJIGNvdWxkbid0IGZpZ3VyZSBvdXQgaG93IHRoZSBzZWF0IGJlbHQgd29ya2VkLiIsInB1bmNobGluZSI6ICJUaGVuIGl0IGp1c3QgY2xpY2tlZC4ifSx7InNldHVwIjogIk15IGJvc3MgdG9sZCBtZSB0byBhdHRhY2ggdHdvIHBpZWNlcyBvZiB3b29kIHRvZ2V0aGVyLi4uIiwicHVuY2hsaW5lIjogIkkgdG90YWxseSBuYWlsZWQgaXQhIn0seyJzZXR1cCI6ICJIb3cgY2FuIHlvdSB0ZWxsIGEgdmFtcGlyZSBoYXMgYSBjb2xkPyIsInB1bmNobGluZSI6ICJUaGV5IHN0YXJ0IGNvZmZpbi4ifSx7InNldHVwIjogIkJvdWdodCBhIG5ldyBqYWNrZXQgc3VpdCB0aGUgb3RoZXIgZGF5IGFuZCBpdCBidXJzdCBpbnRvIGZsYW1lcy4iLCJwdW5jaGxpbmUiOiAiV2VsbCxcbml0IHdhcyBhIGJsYXplci4ifSx7InNldHVwIjogIldoaWNoIHNpZGUgb2YgdGhlIGNoaWNrZW4gaGFzIG1vcmUgZmVhdGhlcnM/IiwicHVuY2hsaW5lIjogIlRoZSBvdXRzaWRlLiJ9LHsic2V0dXAiOiAiV2hhdCBkbyB5b3UgY2FsbCBhIHNoZWVwIHdpdGggbm8gbGVncz8iLCJwdW5jaGxpbmUiOiAiQSBjbG91ZC4ifSx7InNldHVwIjogIldoeSBkbyB3ZSB0ZWxsIGFjdG9ycyB0byBcImJyZWFrIGEgbGVnXCI/IiwicHVuY2hsaW5lIjogIkJlY2F1c2UgZXZlcnkgcGxheSBoYXMgYSBjYXN0LiJ9LHsic2V0dXAiOiAiSG9sZCBvbixcbkkgaGF2ZSBzb21ldGhpbmcgaW4gbXkgc2hvZS4iLCJwdW5jaGxpbmUiOiAiSSdtIHByZXR0eSBzdXJlIGl0J3MgeW91ciBmb290In0seyJzZXR1cCI6ICJXaGF0IGRvIHlvdSBjYWxsIHNvbWVvbmUgd2l0aCBubyBub3NlPyIsInB1bmNobGluZSI6ICJOb2JvZHkga25vd3MuIn0seyJzZXR1cCI6ICJXaHkgZG8gY293cyBub3QgaGF2ZSB0b2VzPyIsInB1bmNobGluZSI6ICJUaGV5IGxhY3Rvc2UhIn0seyJzZXR1cCI6ICJXaGF0IGRvIHlvdSBjYWxsIGEgcGlsZSBvZiBjYXRzPyIsInB1bmNobGluZSI6ICJBIE1lb3d0YWluLiJ9LHsic2V0dXAiOiAiV2hhdCBkbyB5b3UgY2FsbCBhIHRyb3VibGVzb21lIENhbmFkaWFuIGhpZ2ggc2Nob29sZXI/IiwicHVuY2hsaW5lIjogIkEgcG91dGluZS4ifSx7InNldHVwIjogIldoYXQgZGlkIHRoZSBjYWxjdWxhdG9yIHNheSB0byB0aGUgc3R1ZGVudD8iLCJwdW5jaGxpbmUiOiAiWW91IGNhbiBjb3VudCBvbiBtZS4ifSx7InNldHVwIjogIldhbnQgdG8gaGVhciBhIGpva2UgYWJvdXQgY29uc3RydWN0aW9uPyIsInB1bmNobGluZSI6ICJXYWl0LFxuSSdtIHN0aWxsIHdvcmtpbmcgb24gaXQuIn0seyJzZXR1cCI6ICJXaGF0IGFyZSB0aGUgc3Ryb25nZXN0IGRheXMgb2YgdGhlIHdlZWs/IiwicHVuY2hsaW5lIjogIlNhdHVyZGF5IGFuZCBTdW5kYXkuLi5cbnRoZSByZXN0IGFyZSB3ZWVrZGF5cy4ifSx7InNldHVwIjogIldoeSBkb2VzIFN1cGVybWFuIGdldCBpbnZpdGVkIHRvIGRpbm5lcnM/IiwicHVuY2hsaW5lIjogIkJlY2F1c2UgaGUgaXMgYSBTdXBwZXJoZXJvLiJ9LHsic2V0dXAiOiAiSG93IGNvbWUgYSBtYW4gZHJpdmluZyBhIHRyYWluIGdvdCBzdHJ1Y2sgYnkgbGlnaHRuaW5nPyIsInB1bmNobGluZSI6ICJIZSB3YXMgYSBnb29kIGNvbmR1Y3Rvci4ifSx7InNldHVwIjogIkRpZCB5b3UgaGVhciBhYm91dCB0aGUgY2hlZXNlIGZhY3RvcnkgdGhhdCBleHBsb2RlZCBpbiBGcmFuY2U/IiwicHVuY2hsaW5lIjogIlRoZXJlIHdhcyBub3RoaW5nIGxlZnQgYnV0IGRlIEJyaWUuIn0seyJzZXR1cCI6ICJEaWQgeW91IGhlYXIgYWJvdXQgdGhlIGd1eSB3aG8gaW52ZW50ZWQgTGlmZXNhdmVycz8iLCJwdW5jaGxpbmUiOiAiVGhleSBzYXkgaGUgbWFkZSBhIG1pbnQuIn0seyJzZXR1cCI6ICJXaHkgZG9uJ3Qgc2VhZ3VsbHMgZmx5IG92ZXIgdGhlIGJheT8iLCJwdW5jaGxpbmUiOiAiQmVjYXVzZSB0aGVuIHRoZXknZCBiZSBiYXktZ3VsbHMhIn0seyJzZXR1cCI6ICJXaGF0J3MgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBhIHJvb3N0ZXIgYW5kIGEgY3Jvdz8iLCJwdW5jaGxpbmUiOiAiQSByb29zdGVyIGNhbiBjcm93IGJ1dCBhIGNyb3cgY2Fubm90IHJvb3N0ZXIuIn0seyJzZXR1cCI6ICJIb3cgZG8geW91IHRlbGwgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBhIGNyb2NvZGlsZSBhbmQgYW4gYWxsaWdhdG9yPyIsInB1bmNobGluZSI6ICJZb3Ugd2lsbCBzZWUgb25lIGxhdGVyIGFuZCBvbmUgaW4gYSB3aGlsZS4ifV0K';