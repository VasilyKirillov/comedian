window.addEventListener("load", (event) => {
    lightUp();
    // setTimeout(()=>showLaugh(), 100);
    // setInterval(()=> changePosture(), 10000);
});

document.addEventListener('keypress', (e) => {
    console.log(`pressed: ${e.code}`);
    if (e.code === 'Space') {
        changePosture();
    } else if (e.code === 'KeyX') {
        showLaugh();
    }
});

const changePosture = () => {
    const postures = document.querySelectorAll('.comedian');
    const index = Math.ceil(Math.random() * postures.length - 1);
    console.log('index=', index);
    postures.forEach(e=>e.style.visibility = 'hidden');
    postures[index].style.visibility = 'visible';
}


const showLaugh = () => {
    const tenPercentH = window.innerHeight / 10;
    const tenPercentW = window.innerWidth / 10;
    const courterW = window.innerWidth / 4;
    const verticalBase = window.innerHeight / 2;
    const horisontalBase = Math.round(Math.random()) ? courterW : 3 * courterW ;

    const y = verticalBase + getRandomInt(-tenPercentH, tenPercentH);
    const x = horisontalBase + getRandomInt(-tenPercentW, tenPercentW);
    
    const smiles = [0x1F929, 0x1F635, 0x1F602, 0x1FAE2, 0x1F61C, 0x1F601, 0x1F92D, 0x1F92A, 0x1F602, 0x1F923, 0x1F929, 0x1F60D];
    const smiles2 = ['😆','😅','😀','🤣','😂','😁','😊','😍','🤩','😋','😛','😜','🤪','😝','🤗','🤭','🥵', '🥶','😵','🥳','🥳','🤓','🧐','😳','😱','🤬','🤫']
    const smile = String.fromCodePoint(smiles[getRandomInt(smiles.length - 1)]);

console.log('x=', x, 'y=', y, 'h=', window.innerHeight, 'w=', window.innerWidth, 'smile=',smile);

    const laf = document.getElementById('laughter_1');
    laf.textContent = `${smile} HA-HA-HA ${smile}`;
    const blockWidth = laf.offsetWidth / 2;
    laf.style.visibility = "visible";
    laf.style.top = y + 'px';
    laf.style.left = (x-blockWidth) + 'px';
    laf.classList.add('burst');

    setTimeout(() => {
        laf.style.visibility = 'hidden';
        laf.classList.remove('burst');
    }, 1250);
}

const lightUp = () => {
    const container = document.querySelector('.curtain');
    container.classList.add('open');
}

const getRandomInt = (max, min) => {
    if (min === null || min === undefined ) {
        min = 0;
    }
    if (max === null || max === undefined ) {
        max = 1;
    }
    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }
    return min + Math.floor(Math.random() * (max - min));
}