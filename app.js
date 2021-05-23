const changeColorButton = document.getElementById('change-color');
const btnEmpezar = document.getElementById('btn-empezar');
const amarillo = document.getElementById('amarillo');
const rojo = document.getElementById('rojo');
const azul = document.getElementById('azul');
const violeta = document.getElementById('violeta');
const gameboard = document.getElementById("gameboard");
const dataGame = document.getElementById("data-game");
const body = document.getElementById('body');
const level = document.getElementById('level');
const name = document.getElementById('name');
const ULTIMO_NIVEL = 10;
var nombre;
var song = new Audio();
song.src = './Song.mp3';
var gameOver = new Audio();
gameOver.src = './Game-Over.mp3';
var life = new Audio();
life.src = './life.mp3';
var newGame = new Audio();
newGame.src = './New Gaming.mp3';
mostrarNombre();

class Juego {
     constructor() {
          this.inicializar();
          this.generarSecuencia();
          setTimeout(() => {
               this.siguienteNivel();   
          }, 1000);
     }

     inicializar(){
          this.siguienteNivel = this.siguienteNivel.bind(this);
          this.elegirColor = this.elegirColor.bind(this);
          this.inicializar = this.inicializar.bind(this);
          this.toggleBtnEmpezar();
          this.opacity();
          this.nivel = 1;
          this.cambiarNivel();
          this.colores = {
               amarillo,
               azul,
               rojo,
               violeta
          }
     }

     generarSecuencia() {
          this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map( n => Math.floor(Math.random() * 4));
     }

     cambiarNivel() {
          newGame.play();
          level.innerHTML = this.nivel; 
     }
     siguienteNivel() {
          this.subnivel = 0;
          this.iluminarSecuencia();
          this.agregarEventosClick();
     }
     transformarNumeroAColor(numero) {
          switch(numero) {
               case 0:
                    return 'azul';
               case 1:
                    return 'rojo';
               case 2:
                    return 'amarillo';
               case 3:
                    return 'violeta';
          }
     }
     transformarColorANumero(numero) {
          switch(numero) {
               case 'azul':
                    return 0;
               case 'rojo':
                    return 1;
               case 'amarillo':
                    return 2;
               case 'violeta':
                    return 3;
          }
     }
     iluminarSecuencia() {
          for (var i = 0; i < this.nivel; i++){
               const color = this.transformarNumeroAColor(this.secuencia[i]);
               setTimeout(() => {
                    this.iluminarColor(color);
               }, 1500 * i);
          }
     }
     iluminarColor(color) {
          song.play();
          this.colores[color].classList.add('light');
          setTimeout(() => {
               this.apagarColor(color)
          }, 600);
     }
     apagarColor(color) {
          this.colores[color].classList.remove('light');
     }
     agregarEventosClick(){
          this.colores.azul.addEventListener('click', this.elegirColor);
          this.colores.rojo.addEventListener('click', this.elegirColor);
          this.colores.amarillo.addEventListener('click', this.elegirColor);
          this.colores.violeta.addEventListener('click', this.elegirColor);
     }
     eliminarEventosClick() {
          this.colores.azul.removeEventListener('click', this.elegirColor);
          this.colores.rojo.removeEventListener('click', this.elegirColor);
          this.colores.amarillo.removeEventListener('click', this.elegirColor);
          this.colores.violeta.removeEventListener('click', this.elegirColor);
     }
     elegirColor(ev) {
          const nombreColor = ev.target.dataset.color;
          const numeroColor = this.transformarColorANumero(nombreColor);
          this.iluminarColor(nombreColor);
          if (numeroColor === this.secuencia[this.subnivel]) {
               this.subnivel++;
               if(this.subnivel === this.nivel) {
                    this.nivel++;
                    this.eliminarEventosClick();
                    if(this.nivel === (ULTIMO_NIVEL + 1)) {
                         this.ganoElJuego();
                    } else {
                         setTimeout(this.siguienteNivel, 3000);
                         setTimeout(() => {
                              this.cambiarNivel();
                         }, 1500);
                    }
               }
          } else {
               this.perdioElJuego();
          }

     } 
     ganoElJuego() {
          swal('You have won Congratulations!','Symon Says', 'success')
          .then(() => {
               this.inicializar();
          });
     }
     perdioElJuego() {
          gameOver.play();
          swal('Sorry, you have lost!','Symon Says', 'error')
          .then(() => {
               this.eliminarEventosClick();
               this.inicializar();
          });
     }
     toggleBtnEmpezar() {
          if (btnEmpezar.classList.contains('hide')) {
               btnEmpezar.classList.remove('hide');
          } else {
               btnEmpezar.classList.add('hide');
          }
     }
     opacity() {
          if(gameboard.classList.contains('opacity')){
               gameboard.classList.remove('opacity');
               dataGame.classList.remove('opacity');
          } else {
               gameboard.classList.add('opacity');
               dataGame.classList.add('opacity');
          }
     }
}

function empezarJuego() {
     window.juego = new Juego();
}

function cambiarColor() {
     life.play();
     if(body.classList.contains('blue')){
          body.classList.add('verde');
          body.classList.remove('blue');
     } else if (body.classList.contains('verde')){
          body.classList.add('red');
          body.classList.remove('verde');
     } else if (body.classList.contains('red')){
          body.classList.add('rosado');
          body.classList.remove('red');
     } else if (body.classList.contains('rosado')){
          body.classList.add('yellow');
          body.classList.remove('rosado');
     } else if (body.classList.contains('yellow')){
          body.classList.add('blue');
          body.classList.remove('yellow');
     }
}
function instrucciones (){
     swal('Sorry, you have lost!','Symon Says', 'error')
}
function mostrarNombre(){
     swal('¿What Is Your Name?', {
          content: 'input'
     })
     .then((value) => {
          if(value) {
               swal(`Your Name is: ${value.toUpperCase()}`, 'The game consists of correctly repeating the sequence that is lighting up until you reach level 10, If you make a mistake, you lose immediately.', 'success');
               nombre = value.toUpperCase();
               name.innerHTML = nombre;
          } else {
               swal('You Did Not Enter Your Name, It Will Not Appear!', `The game consists of correctly repeating the sequence that is lighting up until you reach level 10, If you make a mistake, you lose immediately.`, 'error')
          } 
     })
}


