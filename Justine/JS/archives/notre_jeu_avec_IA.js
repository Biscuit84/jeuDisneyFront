
  // variables
  var velocity = 1; // nb de pixel d'avancement du pion par raffraichissement (10ms)
  var Tour = 0;

  // init image
  var background;
  var ctxBackground;
  var player;
  var playerIA1;
  var ctxPlayer;
  var ctxPlayerIA1;
  var ctxPlayerIA2;
  var ctxPlayerIA3;
  var backgroundImage = new Image();
  var backgroundPlayer = new Image();
  var backgroundPlayerIA1 = new Image();
  var backgroundPlayerIA2 = new Image();
  var backgroundPlayerIA3 = new Image();

  // init du canvas
  var canvasPlateau = document.getElementById("myCanvas");
  var ctxPlateau = canvasPlateau.getContext("2d");
  w = ctxPlateau.canvas.width;
  h = ctxPlateau.canvas.height;

  // init player
  backgroundPlayer.src = "../img/milkandmocha.jpg";
  var player = document.getElementById("player");
  var ctxPlayer = player.getContext("2d");

   // inti background
  backgroundImage.src = "../img/princess.png";
  var background = document.getElementById("background");
  var ctxBackground = background.getContext("2d");

  // init une IA
  backgroundPlayerIA1.src = "../img/ennemi.jpg";
  var playerIA1 = document.getElementById("IA1");
  var ctxPlayerIA1 = playerIA1.getContext("2d");
  backgroundPlayerIA2.src = "../img/donald.png";
  var playerIA2 = document.getElementById("IA2");
  var ctxPlayerIA2 = playerIA2.getContext("2d");
  backgroundPlayerIA3.src = "../img/dingo.png";
  var playerIA3 = document.getElementById("IA3");
  var ctxPlayerIA3 = playerIA3.getContext("2d");

  // nombre de case du plateau
  format=nbcaseDemande();
  var nbcasePlateau = format[0];;
  var nombreDe = 0 ;
  nombreDe=nbDeDemande();

  // taille des cases
  var nBcaseW = format[1];
  var nBcaseH = format[2];
  var taillecaseW = w / nBcaseW;
  var taillecaseH = h / nBcaseH;
  var listeCases = [];

  var Player = {
    numero: 0,
    positionXPlayer: 0,
    positionYPlayer: 0,

  }


  //init position pion
  var positionXPlayer = 0;
  var positionYPlayer = 0;
  var futurPositionXPlayer = 0;
  var futurPositionYPlayer = 0;
  var positionIndexCasePlayer = 0;      //à quel index de la liste de Cases se trouve le joueur:
  var futurePositionIndexCasePlayer = 0;
  var playerIsMoving = false;

  //init position pion IA
  var positionXPlayerIA1 = 0;
  var positionYPlayerIA1 = 0;
  var futurPositionXPlayerIA1 = 0;
  var futurPositionYPlayerIA1 = 0;
  var positionIndexCasePlayerIA1 = 0;      //à quel index de la liste de Cases se trouve le joueur:
  var futurePositionIndexCasePlayerIA1 = 0;
  var playerIA1IsMoving = false;

  //init position pion IA
  var positionXPlayerIA2 = 0;
  var positionYPlayerIA2 = 0;
  var futurPositionXPlayerIA2 = 0;
  var futurPositionYPlayerIA2 = 0;
  var positionIndexCasePlayerIA2 = 0;      //à quel index de la liste de Cases se trouve le joueur:
  var futurePositionIndexCasePlayerIA2 = 0;
  var playerIA12sMoving = false;

  //init position pion IA
  var positionXPlayerIA3 = 0;
  var positionYPlayerIA3 = 0;
  var futurPositionXPlayerIA3 = 0;
  var futurPositionYPlayerIA3 = 0;
  var positionIndexCasePlayerIA3 = 0;      //à quel index de la liste de Cases se trouve le joueur:
  var futurePositionIndexCasePlayerIA3 = 0;
  var playerIA3IsMoving = false;

 // affiche des cases du plateua :
  console.log("listeCases : ", listeCases);


// lanchement de la page :
  Render();
  // render contient l'init du fond mais aussi de la couche de code du player (refresh toutes les 10ms)


//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
// les fonctions :

// demander le nombre de case pour les tests
function nbcaseDemande(){
  var nbcase =0;
  while (nbcase > 100 || nbcase < 3)
  {
      var nbcase = prompt("nombre de case (en tout, entre 1 et 100)?");
  }
  var format=taillePlateau(nbcase);
  return  format;
}

// taille du plateau en terme de nb de case sur les cotés
function taillePlateau(nbcase){
  // pourra servir pour la création de la plateau dynamique
  // TODO: faudra mieux faire cette partie c'est pas opti et ce ne sont que des plateaux carrés
    if (nbcase <= 9)        {  var nBcaseW = 3;   var nBcaseH = 3   }
    else if (nbcase <= 16)  {  var nBcaseW = 4;   var nBcaseH = 4;  }
    else if (nbcase <= 25)  {  var nBcaseW = 5;   var nBcaseH = 5;  }
    else if (nbcase <= 36)  {  var nBcaseW = 6;   var nBcaseH = 6;  }
    else if (nbcase <= 49)  {  var nBcaseW = 7;   var nBcaseH = 7;  }
    else if (nbcase <= 64)  {  var nBcaseW = 8;   var nBcaseH = 8;  }
    else if (nbcase <= 91)  {  var nBcaseW = 9;   var nBcaseH = 9;  }
    else if (nbcase <= 100) {  var nBcaseW = 10;  var nBcaseH = 10; }

    var format= [nbcase, nBcaseW, nBcaseH];
    return  format;
}

function nbDeDemande(){
  var nombreDe =0;
  while (nombreDe<1 || nombreDe>2)
  {
      nombreDe = prompt("nombre de dé (1 ou 2)?");
  }

  return nombreDe;
}

function cacherLeDe2()
{
  aff2=document.getElementById("afficheDe2");
  aff2.style.display = "none";
    //document.getElementById("De2").style.visibility = "hidden";
}

function Render() {


  //setInterval(drawAll, 10);
  drawAll();
//ctxPlateau.globalCompositeOperation = "source-over"; // pour afficher le pion SUR le fond
//ctxPlayer.globalCompositeOperation = "source-over"; // pour afficher le pion SUR le fond

}

//dessine le fond d'écran et le joueur
function drawAll() {
  drawBackground();
  drawPlateau();
  setInterval(drawPlayers, 10);
  //drawPlayer();
  if (nombreDe==1){

//cacherLeDe2();
  }
  else if (nombreDe==2) {
  }
}

// dessine le fond d'ecran
function drawBackground() {
  //clearRect(positionx, position y, positionfinale x, position finale y)
  ctxBackground.clearRect(0, 0, 800, 800);
  ctxBackground.drawImage(backgroundImage, 0, 0);
}

// dessine le plateau
function drawPlateau() {
  //clearRect(positionx, position y, positionfinale x, position finale y)

  // création des cases
  numeroCase = 0;

  // sens de la ligne

  for (y = 0; y < nBcaseW; y++) {

    for (x = 0; x < nBcaseH; x ++) {
          // on créé la case
      var Case = {
        numero: 0,
        positionCaseX: 0,
        positionCaseY: 0
      }

      // incrémentation
      numeroCase++;

      // si on devrait dépasser le tableau
      if (numeroCase > nbcasePlateau) {break;} // on depasse le nombre de case

      // sens
      if (isEven(y)){ // ligne paire (on va dans le bon sens)
        var pX=taillecaseW * x;
        }
      else{ // ligne impaire  (on va dans le sens inverse)
        var pX= taillecaseW * (nBcaseW-x-1);
        }
      var pY=taillecaseH * y;

      // on memorise la case :
      Case.numero = numeroCase;
      Case.positionCaseX = pX;
      Case.positionCaseY = pY;
      listeCases.push(Case);

      // on dessine la case :
      ctxPlateau.beginPath();
      ctxPlateau.rect( pX, pY, taillecaseW, taillecaseH);  //ctx.rect(x, y, width, height);

      // pour le test :
      if (isEven(numeroCase)) {
        ctxPlateau.fillStyle = "lightpink"; // la couleur de la case
        ctxPlateau.globalAlpha = 0.5; // c'est l'opacité
      }
      else {
        ctxPlateau.fillStyle = "lightblue";
        ctxPlateau.globalAlpha = 0.5;
      }

        //ctx.strokeStyle = "black";
        //ctx.stroke();
        ctxPlateau.fill(); // ça remplit la forme (case ici)
        ctxPlateau.font = '100px';
        ctxPlateau.textBaseline = 'hanging';
        ctxPlateau.textAlign = "center";
        var affichecase = numeroCase-1;
        if (numeroCase==nbcasePlateau)
          {
            var str="arrivée";
          }
        else if (numeroCase==1) {
              var str="départ";
          }
        else
          {
            var str="case " + affichecase;
          }
        ctxPlateau.strokeText(str, pX+taillecaseW/2, pY+taillecaseH/2);  //ctx.strokeText(texte, x, y [, largeurMax]);
      ctxPlateau.closePath();
    }
  }
}

function drawPlayers()
{
  drawPlayer();
  drawIA1();
  drawIA2();
  drawIA3();
}
// dessine le joueur
function drawPlayer() {
  //clear pour refresh
  ctxPlayer.clearRect(0, 0, 800, 800);

  // trouver A quel index de case se trouve le joueur
  positionIndexCasePlayer = positionActuelleJoueur(); // case

  //trouver les index suivants et précédents
  var positionIndexCasePlayerSuivante = positionIndexCasePlayer;
  positionIndexCasePlayerSuivante++;
  var positionIndexCasePlayerPrecedente = positionIndexCasePlayer;
  positionIndexCasePlayerPrecedente--;

  var diff=positionIndexCasePlayer-futurePositionIndexCasePlayer;
  //console.log(diff);
  // rentre dans la boucle seulement si l'index <= à la longueur de la liste des cases du plateau
  if (positionIndexCasePlayerSuivante <= this.listeCases.length - 1 || positionIndexCasePlayerPrecedente >= 0)
  {
    if (diff<0)
    {
      playerIsMoving = true;
      if (listeCases[positionIndexCasePlayer].positionCaseY < listeCases[positionIndexCasePlayerSuivante].positionCaseY)
        {      // avancer case par case
        positionYPlayer += velocity;
        }
      else if (listeCases[positionIndexCasePlayer].positionCaseY > listeCases[positionIndexCasePlayerSuivante].positionCaseY)
        {        //reculer case par case
        positionYPlayer -= velocity;
        }

      if ( listeCases[positionIndexCasePlayer].positionCaseX < listeCases[positionIndexCasePlayerSuivante].positionCaseX)
        {      // avancer case par case
        positionXPlayer += velocity;
        }
      else if (listeCases[positionIndexCasePlayer].positionCaseX > listeCases[positionIndexCasePlayerSuivante].positionCaseX)
        {      //reculer case par case
        positionXPlayer -= velocity;
        }
    }
    else if (diff>0)
    {
      playerIsMoving = true;
      if (listeCases[positionIndexCasePlayer].positionCaseY < listeCases[positionIndexCasePlayerPrecedente].positionCaseY)
        {      // avancer case par case
        positionYPlayer += velocity;
        }
      else if (listeCases[positionIndexCasePlayer].positionCaseY > listeCases[positionIndexCasePlayerPrecedente].positionCaseY)
        {        //reculer case par case
        positionYPlayer -= velocity;
        }
      if ( listeCases[positionIndexCasePlayer].positionCaseX < listeCases[positionIndexCasePlayerPrecedente].positionCaseX)
        {      // avancer case par case
        positionXPlayer += velocity;
        }
      else if (listeCases[positionIndexCasePlayer].positionCaseX > listeCases[positionIndexCasePlayerPrecedente].positionCaseX)
        {      //reculer case par case
        positionXPlayer -= velocity;
        }
    }
  }

  //bouton accessible une fois que le joueur arrête de bouger

     if(diff == 0 && playerIsMoving){
       console.log("le pion est à l'arret")
       disabledButtonFalse();
       playerIsMoving = false;
     }

  // redessiner le player pour le refresh
  ctxPlayer.drawImage(backgroundPlayer, positionXPlayer, positionYPlayer, taillecaseW/2, taillecaseH/2);

}

// dessine une IA
function drawIA1() {

  //clear pour refresh
  ctxPlayerIA1.clearRect(0, 0, 800, 800);


  // trouver A quel index de case se trouve le joueur
  for (var i in listeCases) {
    if (listeCases[i].positionCaseX === positionXPlayerIA1 && listeCases[i].positionCaseY === positionYPlayerIA1) { //=== : egalité stricte => le joueur est sur la case i
      positionIndexCasePlayerIA1 = i;
    }
  }
  //console.log(positionIndexCasePlayerIA1);

  //trouver les index suivants et précédents
  var positionIndexCasePlayerSuivanteIA1 = positionIndexCasePlayerIA1;
  positionIndexCasePlayerSuivanteIA1++;
  var positionIndexCasePlayerPrecedenteIA1 = positionIndexCasePlayerIA1;
  positionIndexCasePlayerPrecedenteIA1--;



  var diffIA1=positionIndexCasePlayerIA1-futurePositionIndexCasePlayerIA1;
  //console.log(diffIA1);

  // rentre dans la boucle seulement si l'index <= à la longueur de la liste des cases du plateau
  if (positionIndexCasePlayerSuivanteIA1 <= this.listeCases.length - 1 || positionIndexCasePlayerPrecedenteIA1 >= 0)
  {
    if (diffIA1<0)
    {
      playerIA1IsMoving = true;
      if (listeCases[positionIndexCasePlayerIA1].positionCaseY < listeCases[positionIndexCasePlayerSuivanteIA1].positionCaseY)
        {      // avancer case par case
        positionYPlayerIA1 += velocity;
        }
      else if (listeCases[positionIndexCasePlayerIA1].positionCaseY > listeCases[positionIndexCasePlayerSuivanteIA1].positionCaseY)
        {        //reculer case par case
        positionYPlayerIA1 -= velocity;
        }

      if ( listeCases[positionIndexCasePlayerIA1].positionCaseX < listeCases[positionIndexCasePlayerSuivanteIA1].positionCaseX)
        {      // avancer case par case
        positionXPlayerIA1 += velocity;
        }
      else if (listeCases[positionIndexCasePlayerIA1].positionCaseX > listeCases[positionIndexCasePlayerSuivanteIA1].positionCaseX)
        {      //reculer case par case
        positionXPlayerIA1 -= velocity;
        }
    }
    else if (diffIA1>0)
    {
      playerIsMoving = true;
      if (listeCases[positionIndexCasePlayerIA1].positionCaseY < listeCases[positionIndexCasePlayerPrecedenteIA1].positionCaseY)
        {      // avancer case par case
        positionYPlayerIA1 += velocity;
        }
      else if (listeCases[positionIndexCasePlayerIA1].positionCaseY > listeCases[positionIndexCasePlayerPrecedenteIA1].positionCaseY)
        {        //reculer case par case
        positionYPlayerIA1 -= velocity;
        }
      if ( listeCases[positionIndexCasePlayerIA1].positionCaseX < listeCases[positionIndexCasePlayerPrecedenteIA1].positionCaseX)
        {      // avancer case par case
        positionXPlayerIA1 += velocity;
        }
      else if (listeCases[positionIndexCasePlayerIA1].positionCaseX > listeCases[positionIndexCasePlayerPrecedenteIA1].positionCaseX)
        {      //reculer case par case
        positionXPlayerIA1 -= velocity;
        }
    }
  }

// redessiner le player pour le refresh
ctxPlayerIA1.drawImage(backgroundPlayerIA1, positionXPlayerIA1+taillecaseW/2, positionYPlayerIA1, taillecaseW/2, taillecaseH/2);


}

function drawIA2(){

  //clear pour refresh
  ctxPlayerIA2.clearRect(0, 0, 800, 800);

  // redessiner le player pour le refresh
  ctxPlayerIA2.drawImage(backgroundPlayerIA2, positionXPlayerIA2, positionYPlayerIA2+taillecaseH/2, taillecaseW/2, taillecaseH/2);

}

function drawIA3(){

  //clear pour refresh
  ctxPlayerIA3.clearRect(0, 0, 800, 800);

  // redessiner le player pour le refresh
  ctxPlayerIA3.drawImage(backgroundPlayerIA3, positionXPlayerIA3+taillecaseW/2, positionYPlayerIA3+taillecaseH/2, taillecaseW/2, taillecaseH/2);

}


function positionActuelleJoueur(){
  for (var i in listeCases) {
    if (listeCases[i].positionCaseX === positionXPlayer && listeCases[i].positionCaseY === positionYPlayer) { //=== : egalité stricte => le joueur est sur la case i
      positionIndexCasePlayer = i;
    }
  }
  return positionIndexCasePlayer;
}


// fonction des boutons :

//boutons avancer et reculer disabled
function disabledButtonTrue () {
  $(".bouton").prop('disabled', true);
}
//boutons avancer et reculer abled
function disabledButtonFalse () {
  $(".bouton").prop('disabled', false);
}

/*
function DiceAvance() {
  playSoundDice();
  roulementDe();
  setTimeout(Avance, 2200);
}
*/
/*
function DiceRecule(){
  playSoundDice();
  roulementDe();
  setTimeout(Recule, 2200);
}
*/

function Jouer() {
  playSoundDice();
  roulementDe();
  setTimeout(TourJoueur, 2200);
}

function IAJouer() {
  playSoundDice();
  roulementDe();
  setTimeout(TourIA, 2200);
}


function DiceValue(idDe) {
var lanceDe = Math.floor(Math.random() * 6) + 1;
  //var monDeAvance = document.getElementById("affichageDe");
  //monDeAvance.innerHTML = lanceDe;
//var imageachanger=document.getElementById('imageDe');
var imageachanger=document.getElementById(idDe);
switch (lanceDe) {
  case 1:
  imageachanger.setAttribute("src", "../img/de1.png");
  break;
  case 2:
  imageachanger.setAttribute("src", "../img/de2.png");
  break;
  case 3:
  imageachanger.setAttribute("src", "../img/de3.png");
  break;
  case 4:
  imageachanger.setAttribute("src", "../img/de4.png");
  break;
  case 5:
  imageachanger.setAttribute("src", "../img/de5.png");
  break;
  case 6:
  imageachanger.setAttribute("src", "../img/de6.png");
  break;
  default:imageachanger.setAttribute("src", "../img/de0.png");
  }
  return lanceDe;
}

function roulementDe(){
 disabledButtonTrue ();
  var idDe = "imageDe";
  setTimeout(DiceValue(idDe), 400);
  setTimeout(DiceValue(idDe), 600);
  setTimeout(DiceValue(idDe), 700);
  setTimeout(DiceValue(idDe), 750);
  setTimeout(DiceValue(idDe), 900);
  setTimeout(DiceValue(idDe), 1200);
  setTimeout(DiceValue(idDe), 1700);

}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


function TourJoueur(){

  // incrémente le nombre de tour :
    Tour++;
    var tourActuel = document.getElementById("NbTour");
    tourActuel.innerHTML = Tour;

    // Affiche la valeur du dé dans le html
    var monDeAvance = document.getElementById("valeurDeAvance");
    console.log(monDeAvance);

    var totalDe = 0;

      //random de 1 à 6s
    var lanceDe = DiceValue("imageDe");
    if (nombreDe==1){
     totalDe=lanceDe;
    }
    else if (nombreDe==2) {
    var lanceDe2 = DiceValue("imageDe2");
    totalDe =lanceDe+lanceDe2;
    }
    monDeAvance.innerHTML = totalDe;

    //calcule le nouvel index:
    var nouvelIndex = Number(positionIndexCasePlayer) + Number(totalDe);

    // gere le cas où on dépasse la case arrivee
    if (nouvelIndex > listeCases.length - 1) {
      nouvelIndex = listeCases.length - 1;
    }

    //détermine la future position X et Y du player
    futurePositionIndexCasePlayer = nouvelIndex;
    futurPositionXPlayer = listeCases[futurePositionIndexCasePlayer].positionCaseX;
    futurPositionYPlayer = listeCases[futurePositionIndexCasePlayer].positionCaseY;

    //// TODO: faire les actions/pouvoirs des joueurs
}

function TourIA(){

    // Affiche la valeur du dé dans le html
    var monDeAvance = document.getElementById("valeurDeAvance");

    var totalDe = 0;

      //random de 1 à 6s
    var lanceDe = DiceValue("imageDe");
    if (nombreDe==1){
     totalDe=lanceDe;
    }
    else if (nombreDe==2) {
    var lanceDe2 = DiceValue("imageDe2");
    totalDe =lanceDe+lanceDe2;
    }
    monDeAvance.innerHTML = totalDe;

    //calcule le nouvel index:
    var nouvelIndex = Number(positionIndexCasePlayerIA1) + Number(totalDe);

    // gere le cas où on dépasse la case arrivee
    if (nouvelIndex > listeCases.length - 1) {
      nouvelIndex = listeCases.length - 1;
    }

    //détermine la future position X et Y du player
    futurePositionIndexCasePlayerIA1 = nouvelIndex;
    futurPositionXPlayerIA1 = listeCases[futurePositionIndexCasePlayerIA1].positionCaseX;
    futurPositionYPlayerIA1 = listeCases[futurePositionIndexCasePlayerIA1].positionCaseY;
}

/*

function Avance() {

// incrémente le nombre de tour :
  Tour++;
  var tourActuel = document.getElementById("NbTour");
  tourActuel.innerHTML = Tour;

  // Affiche la valeur du dé dans le html
  var monDeAvance = document.getElementById("valeurDeAvance");

  var totalDe = 0;

    //random de 1 à 6s
  var lanceDe = DiceValue("imageDe");
  if (nombreDe==1){
   totalDe=lanceDe;
  }
  else if (nombreDe==2) {
  var lanceDe2 = DiceValue("imageDe2");
  totalDe =lanceDe+lanceDe2;
  }
  monDeAvance.innerHTML = totalDe;

  //calcule le nouvel index:
  var nouvelIndex = Number(positionIndexCasePlayer) + Number(totalDe);

  // gere le cas où on dépasse la case arrivee
  if (nouvelIndex > listeCases.length - 1) {
    nouvelIndex = listeCases.length - 1;
  }

  //détermine la future position X et Y du player
  futurePositionIndexCasePlayer = nouvelIndex;
  futurPositionXPlayer = listeCases[futurePositionIndexCasePlayer].positionCaseX;
  futurPositionYPlayer = listeCases[futurePositionIndexCasePlayer].positionCaseY;
}

function Recule() {

  // Affiche la valeur du dé dans le html
  var monDeRecule = document.getElementById("valeurDeRecule");

 var totalDe = 0;
  var lanceDe = DiceValue("imageDe");
  if (nombreDe==1){
   totalDe=lanceDe;
  }
  else if (nombreDe==2) {
  var lanceDe2 = DiceValue("imageDe2");
  totalDe =lanceDe+lanceDe2;
  }
  monDeRecule.innerHTML = totalDe;

  //calcule le nouvel index:
  var nouvelIndex = Number(positionIndexCasePlayer) - Number(totalDe);
  // gere le cas où on dépasse la case depart
  if (nouvelIndex < 0) {
    nouvelIndex = 0;
  }

  //détermine la future position X et Y du player
  futurePositionIndexCasePlayer = nouvelIndex;
  futurPositionXPlayer = listeCases[futurePositionIndexCasePlayer].positionCaseX;
  futurPositionYPlayer = listeCases[futurePositionIndexCasePlayer].positionCaseY;
}

*/


// son
function playSoundDice() {
  document.getElementById("diceThrowAudio").setAttribute('src', '../sound/diceThrow.mp3');
	document.getElementById("diceThrowAudio").play();
}


// CODE POUR LE SON
var e = document.querySelector('.volume-slider-con');
var eInner = document.querySelector('.volume-slider');
var audio = document.querySelector('audio');
var drag = false;
e.addEventListener('mousedown',function(ev){
   drag = true;
   updateBar(ev.clientX);
});
document.addEventListener('mousemove',function(ev){
   if(drag){
      updateBar(ev.clientX);
   }
});
document.addEventListener('mouseup',function(ev){
 drag = false;
});
var updateBar = function (x, vol) {
   var volume = e;
        var percentage;
        //if only volume have specificed
        //then direct update volume
        if (vol) {
            percentage = vol * 100;
        } else {
            var position = x - volume.offsetLeft;
            percentage = 100 * position / volume.clientWidth;
        }

        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
        }

        //update volume bar and video volume
        eInner.style.width = percentage +'%';
        audio.volume = percentage / 100;
};


// fonctions utiles
function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}
