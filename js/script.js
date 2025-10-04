const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')

const scoreEl = document.getElementById('score')
const highscoreEl = document.getElementById('highscore')

let score = 0

let highscore = Number(localStorage.getItem('marioHighscore') || 0)
highscoreEl.textContent = highscore

let lastPipePosition = pipe.offsetLeft 

const jump = () => {
    mario.classList.add('jump');

    setTimeout(()=>{
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() =>{

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    if(pipePosition <= 120 && pipePosition > 0  && marioPosition < 85){

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src ='./images/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px' 

        clearInterval(loop)
        return
    }
    if (lastPipePosition > 0 && pipePosition <= 0) {
    score += 1
    scoreEl.textContent = score

    if (score > highscore) {
      highscore = score
      highscoreEl.textContent = highscore
      localStorage.setItem('marioHighscore', String(highscore))
    }
  }

  
  lastPipePosition = pipePosition

}, 10);


document.addEventListener('keydown', jump);