const timerEl = document.getElementById('timer');
const markList = document.getElementById('marks-list');
let intervalid =0;
let timer = 0;
let marks = [];

const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100); 
    const hundredths = time % 100;


    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
}

const addMarkToList = (markindex, markTime) => {
    markList.innerHTML  += `<p>Marca ${markindex}: ${formatTime(markTime)}</P>`
}

const markTime = () => {
    if (timer !== 0){
        marks.push(timer);
        addMarkToList(marks.length, timer);
    }else alert("O valor do cronômetro não pode ser salvo zerado!")
    
}

const toggleTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');

    clearInterval(intervalid);

    if(action == 'start' || action == 'continue') {
        intervalid = setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);
        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }else if (action == 'pause') {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

const resetTimer = () => {
    clearInterval(intervalid);
    timer = 0;
    marks = [];
    setTimer(timer);
    markList.innerHTML = '';
    const button = document.getElementById('power');
    button.getAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

const setTimer = (time) => {
    timerEl.innerText = formatTime(time);
}

document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('mark').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTimer);