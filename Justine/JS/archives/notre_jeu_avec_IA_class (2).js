


// lancement partie var
var partieEnCours = true;
var Tour = 0;
var joueurActuel = 0;
var tourActuel = document.getElementById("NbTour");
var tourJoueur = document.getElementById("JoueurTour");

// nombre de case du plateau
format=nbcaseDemande();
var nbcasePlateau = format[0];
var nBcaseW = format[1];
var nBcaseH = format[2];
var listeCases = [];

wMax=$("#canvasesdiv").width(); // on prepare le responsive !
hMax=$("#canvasesdiv").height();
//console.log(" TEST TEST TEST");
console.log(wMax +" et "+ hMax);

w = wMax - (wMax%nBcaseW); // pour couper les cases proprement
h= hMax - (hMax%nBcaseH);
console.log((wMax%nBcaseW) +" et "+ (hMax%nBcaseH));

// taille du canvas
 //w=800;
 //h=600;

// taille des cases
var taillecaseW = w / nBcaseW;
var taillecaseH = h / nBcaseH;

//console.log(taillecaseW +" et "+ taillecaseH);


// nombre de de
var nombreDe = 0 ;
nombreDe=nbDeDemande();

// vitesse
var valeurdelavitesse = 1;
var slider = document.getElementById("vitesseRange");
var output = document.getElementById("vitesse");
//output.innerHTML = slider.value;


slider.oninput = function() {
  output.innerHTML = this.value;
  //console.log(this.value);
}



  // variables
  var velocityH = 1; // nb de pixel d'avancement du pion par raffraichissement (10ms)
  var velocityV = 1;
  var tauxRaffraichissement = 10; // vitesse du setinterval


  //var feu=false;
  BF =  document.getElementById("beforeFireworks");
  BF.style.display = "none";
  BF2 =  document.getElementById("afterFireworks");
  BF2.style.display = "none";
  gameover = document.getElementById("textFinPerdu");
  gameover.style.display = "none";
  win = document.getElementById("textFinGagne");
  win.style.display = "none";

  // init image des canvas
  var backgroundImage = new Image();
  var backgroundPlayer = new Image();
  var backgroundPlayerIA1 = new Image();
  var backgroundPlayerIA2 = new Image();
  var backgroundPlayerIA3 = new Image();



     // inti background
    backgroundImage.src = "../img/texture.jpg";
    var background = document.getElementById("background");
    var ctxBackground = background.getContext("2d");
    ctxBackground.canvas.width=w;
    ctxBackground.canvas.height=h;

    // init du canvas
    var canvasPlateau = document.getElementById("plateauCanvas");
    var ctxPlateau = canvasPlateau.getContext("2d");
    //  w = ctxPlateau.canvas.width;
    //  h = ctxPlateau.canvas.height;
    ctxPlateau.canvas.width=w;
    ctxPlateau.canvas.height=h;

  // init player
  //backgroundPlayer.src = "../img/milkandmocha.jpg";
  var player = document.getElementById("player");
  var ctxPlayer = player.getContext("2d");
  ctxPlayer.canvas.width=w;
  ctxPlayer.canvas.height=h;

  // init IA
  var playerIA1 = document.getElementById("IA1");
  var ctxPlayerIA1 = playerIA1.getContext("2d");
  var playerIA2 = document.getElementById("IA2");
  var ctxPlayerIA2 = playerIA2.getContext("2d");
  var playerIA3 = document.getElementById("IA3");
  var ctxPlayerIA3 = playerIA3.getContext("2d");
  ctxPlayerIA1.canvas.width=w;
  ctxPlayerIA1.canvas.height=h;
  ctxPlayerIA2.canvas.width=w;
  ctxPlayerIA2.canvas.height=h;
  ctxPlayerIA3.canvas.width=w;
  ctxPlayerIA3.canvas.height=h;



// TODO: effacer futurPositionXPlayer, futurPositionYPlayer, car obselete
    class pionPlayer  {
      constructor(numeroPassage, image, positionXPlayer, positionYPlayer, positionIndexCasePlayerSuivante, positionIndexCasePlayerPrecedente, positionIndexCasePlayer, futurePositionIndexCasePlayer, playerIsMoving, playedTurn, finished){
        this.numeroPassage= numeroPassage; //ordre de passage
        this.image=image; //image du pion
        this.positionXPlayer=positionXPlayer;
        this.positionYPlayer=positionYPlayer;
        this.positionIndexCasePlayerSuivante=positionIndexCasePlayerSuivante;
        this.positionIndexCasePlayerPrecedente=positionIndexCasePlayerPrecedente;
        this.positionIndexCasePlayer=positionIndexCasePlayer;
        this.futurePositionIndexCasePlayer=futurePositionIndexCasePlayer;
        this.playerIsMoving= playerIsMoving;
        this.playedTurn=playedTurn;
        this.finished=finished;
      }
    }

  // création des objets pion
   pionJoueur = new pionPlayer(0,"../img/player.png",0,0,0,0,0,0,false,0,false);
   pionIA1    = new pionPlayer(1,"../img/ennemi.jpg",0,0,0,0,0,0,false,0,false);
   pionIA2    = new pionPlayer(2,"../img/donald.png",0,0,0,0,0,0,false,0,false);
   pionIA3    = new pionPlayer(3,"../img/dingo.png",0,0,0,0,0,0,false,0,false);

   var listePion = [];
   listePion.push(pionJoueur);
   listePion.push(pionIA1);
   listePion.push(pionIA2);
   listePion.push(pionIA3);
   console.log(listePion);

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
  drawAll();
//ctxPlateau.globalCompositeOperation = "source-over"; // pour afficher le pion SUR le fond
//ctxPlayer.globalCompositeOperation = "source-over"; // pour afficher le pion SUR le fond
//setInterval()
   slider.oninput = function() {
  output.innerHTML = this.value;
  niveauDeVitesseDuPion = this.value;
   }
   niveauDeVitesseDuPion = slider.value;


}

//dessine le fond d'écran et le joueur
function drawAll() {
  actualisationBackground = setInterval(drawBackground, tauxRaffraichissement);
//  drawBackground(); // ne sert à rien
  drawPlateau();
  actualisationJoueur = setInterval(drawPlayers, tauxRaffraichissement);


  //if (nombreDe==1){
//cacherLeDe2();
//  }
//  else if (nombreDe==2) {
//  }
}

// dessine le fond d'ecran
function drawBackground() {
  //clearRect(positionx, position y, positionfinale x, position finale y)
  ctxBackground.clearRect(0, 0, w, h);
  ctxBackground.drawImage(backgroundImage, 0, 0, w,h);

}

// dessine le plateau
function drawPlateau() {
  // création des cases
  numeroCase = 0;

  // sens de la ligne
  for (y = 0; y < nBcaseW; y++) {

    for (x = 0; x < nBcaseH; x ++) {
          // on créé la case
      var CaseVirtuelle = {
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
      CaseVirtuelle.numero = numeroCase;
      CaseVirtuelle.positionCaseX = pX;
      CaseVirtuelle.positionCaseY = pY;
      listeCases.push(CaseVirtuelle);

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
        if (numeroCase==nbcasePlateau)  {
            var str="arrivée";
          }
        else if (numeroCase==1) {
              var str="départ";
          }
        else  {
            var str="case " + affichecase;
          }
        ctxPlateau.strokeText(str, pX+taillecaseW/2, pY+taillecaseH/2);  //ctx.strokeText(texte, x, y [, largeurMax]);
      ctxPlateau.closePath();
    }
  }
}

// affiche les pions
function drawPlayers()
{
  drawPlayer(pionJoueur);
  drawPlayer(pionIA1);
  drawPlayer(pionIA2);
  drawPlayer(pionIA3);
  tourActuel.innerHTML = Tour;
  tourJoueur.innerHTML = joueurActuel;

  if (pionIA1.playerIsMoving || pionIA2.playerIsMoving || pionIA3.playerIsMoving || pionJoueur.playerIsMoving)
  {
    slider.setAttribute('disabled', true);
    //console.log("un pion bouge")
  }
  else {
    slider.removeAttribute('disabled');
    //console.log("tous les pions sont à l'arret")

  }
}

// dessine un pion
function drawPlayer(pion) {


// vitesse en fonciton du range
n= niveauDeVitesseDuPion;

if      (n == 1 )  {  velocityH = 1;              velocityW = 1;}               // tres lent
else if (n == 2 )  {  velocityH = taillecaseH/32;    velocityW = taillecaseW/32;}
else if (n == 3 )  {  velocityH = taillecaseH/16;    velocityW = taillecaseW/16;}
else if (n == 4 )  {  velocityH = taillecaseH/8;    velocityW = taillecaseW/8;}
else if (n == 5 )  {  velocityH = taillecaseH/4;    velocityW = taillecaseW/4;}
else if (n == 6 )  {  velocityH = taillecaseH/2;    velocityW = taillecaseW/2;}
else if (n == 7 ) {  velocityH = taillecaseH;    velocityW = taillecaseW;}     // tres rapide


  //clear pour refresh
  if(pion.numeroPassage==0){
        ctxPlayer.clearRect(0, 0, w, h);
  }
  else if (pion.numeroPassage==1) {
        ctxPlayerIA1.clearRect(0, 0, w, h);
  }
  else if (pion.numeroPassage==2) {
        ctxPlayerIA2.clearRect(0, 0, w, h);
  }
  else if (pion.numeroPassage==3) {
        ctxPlayerIA3.clearRect(0, 0, w, h);
  }

  //console.log("on est dans DrawPlayer")

  // trouver A quel index de case se trouve le joueur
  pion.positionIndexCasePlayer = positionActuelleJoueur(pion); // case

  //trouver les index suivants et précédents
  pion.positionIndexCasePlayerSuivante = pion.positionIndexCasePlayer;
  pion.positionIndexCasePlayerSuivante++;
  pion.positionIndexCasePlayerPrecedente = pion.positionIndexCasePlayer;
  pion.positionIndexCasePlayerPrecedente--;

  //console.log("velocityH="  +velocityH);


  var diff=pion.positionIndexCasePlayer-pion.futurePositionIndexCasePlayer;
  //console.log(diff);
  // rentre dans la boucle seulement si l'index <= à la longueur de la liste des cases du plateau
  if (pion.positionIndexCasePlayerSuivante <= this.listeCases.length - 1 || pion.positionIndexCasePlayerPrecedente >= 0)
  {
    if (diff<0)
    {
      pion.playerIsMoving = true;

      //console.log("diff:" + diff + ", position Y du pion : " + pion.positionYPlayer);
      //console.log(pion);

      if (listeCases[pion.positionIndexCasePlayer].positionCaseY < listeCases[pion.positionIndexCasePlayerSuivante].positionCaseY)
        {      // avancer case par case
        pion.positionYPlayer += velocityH;
        //console.log("on avance en Y")
        }
      else if (listeCases[pion.positionIndexCasePlayer].positionCaseY > listeCases[pion.positionIndexCasePlayerSuivante].positionCaseY)
        {        //reculer case par case
        pion.positionYPlayer -= velocityH;
        //console.log("on recule en Y")
        }

      if ( listeCases[pion.positionIndexCasePlayer].positionCaseX < listeCases[pion.positionIndexCasePlayerSuivante].positionCaseX)
        {      // avancer case par case
        pion.positionXPlayer += velocityW;
        }
      else if (listeCases[pion.positionIndexCasePlayer].positionCaseX > listeCases[pion.positionIndexCasePlayerSuivante].positionCaseX)
        {      //reculer case par case
        pion.positionXPlayer -= velocityW;
        }
    }
    else if (diff>0)
    {
      pion.playerIsMoving = true;
      if (listeCases[pion.positionIndexCasePlayer].positionCaseY < listeCases[pion.positionIndexCasePlayerPrecedente].positionCaseY)
        {      // avancer case par case
        pion.positionYPlayer += velocityH;
        }
      else if (listeCases[pion.positionIndexCasePlayer].positionCaseY > listeCases[pion.positionIndexCasePlayerPrecedente].positionCaseY)
        {        //reculer case par case
        pion.positionYPlayer -= velocityH;
        }
      if ( listeCases[pion.positionIndexCasePlayer].positionCaseX < listeCases[pion.positionIndexCasePlayerPrecedente].positionCaseX)
        {      // avancer case par case
        pion.positionXPlayer += velocityW;
        }
      else if (listeCases[pion.positionIndexCasePlayer].positionCaseX > listeCases[pion.positionIndexCasePlayerPrecedente].positionCaseX)
        {      //reculer case par case
        pion.positionXPlayer -= velocityW;
        }
    }
    else if (diff==0) {
    //  console.log("le pion"+ pion.numeroPassage+ "est à l'arret");
      pion.playerIsMoving = false;
      if (partieEnCours==false && pion.finished==true)
      {
        setTimeout(finDePartie,2000, pion);
      }

    }
  }

  // redessiner le player pour le refresh
  if(pion.numeroPassage==0){
      backgroundPlayer.src = pion.image;
      //backgroundPlayer.src = "../img/milkandmocha.jpg";
      ctxPlayer.drawImage(backgroundPlayer, pion.positionXPlayer, pion.positionYPlayer, taillecaseW/2, taillecaseH/2);
  }
  else if (pion.numeroPassage==1) {
      backgroundPlayerIA1.src = pion.image;
      //console.log(pion.positionYPlayer)
      ctxPlayerIA1.drawImage(backgroundPlayerIA1, pion.positionXPlayer +taillecaseW/2, pion.positionYPlayer, taillecaseW/2, taillecaseH/2);
  }
  else if (pion.numeroPassage==2) {
      backgroundPlayerIA2.src = pion.image;
      ctxPlayerIA2.drawImage(backgroundPlayerIA2, pion.positionXPlayer , pion.positionYPlayer+taillecaseH/2, taillecaseW/2, taillecaseH/2);
  }
  else if (pion.numeroPassage==3) {
      backgroundPlayerIA3.src = pion.image;
      ctxPlayerIA3.drawImage(backgroundPlayerIA3, pion.positionXPlayer +taillecaseW/2, pion.positionYPlayer+taillecaseH/2, taillecaseW/2, taillecaseH/2);
  }

}

// donne la position actuelle du pion
function positionActuelleJoueur(pion){
  for (var i in listeCases) {
    if (listeCases[i].positionCaseX === pion.positionXPlayer && listeCases[i].positionCaseY === pion.positionYPlayer) { //=== : egalité stricte => le joueur est sur la case i
      pion.positionIndexCasePlayer = i;
    }
  }
  return pion.positionIndexCasePlayer;
}

///////////////////////////////////////////////////////////////////////////////////
// fonction des boutons :

//boutons avancer et reculer disabled
function disabledButtonTrue () {
//  $(".bouton").prop('disabled', true);
}
//boutons avancer et reculer abled
function disabledButtonFalse () {
//  $(".bouton").prop('disabled', false);
}

// permet de jouer
function Jouer(pion) {
  playSoundDice();
  roulementDe();
  setTimeout(TourJoueur, 2200, pion);  //setTimeout(TourJoueur(pionJoueur), 2200); //marche pas  //setTimeout(function() {TourJoueur(pionJoueur);}, 2200); //autre ecriture
  joueurActuel=pion.numeroPassage;

  if (joueurActuel!=0){ // si ce n'est pas le joueur qui joue on "click" auto sur la suite
    pionSuivant=listePion[joueurActuel+1];
    setTimeout(FinDeTour, 5000, pionSuivant);
  }
  else if (joueurActuel==3) { //dernier pion avant le joueur
    //joueurActuel=listePion[0].numeroPassage; // on revient au joueur
    //console.log("à toi de jouer");
    // on active les boutons :
    $("#boutonJouer").prop('disabled', false);
    $("#boutonFinDeTour").prop('disabled', false);
  }

 if (joueurActuel==0) {
   $("#boutonJouer").prop('disabled', true);
   $("#boutonFinDeTour").prop('disabled', false);
  }

}

// permet de finir son tour et donc de faire jouer les IA
function FinDeTour(pion)
{
  // on a fini le tour ça incremente notre nombre de tour jouer
  //pion.playedTurn =   pion.playedTurn + 1;
  //console.log("on est dans fin de tour");

// si c'est pas le dernier pion :
// faire jouer le prochain :
if (partieEnCours == true)
{
    if (joueurActuel!=3 ){

           joueurActuel++;
          // console.log("on incremente le numero du joueur")
           //console.log(joueurActuel);

           pionSuivant=listePion[joueurActuel];
           setTimeout(Jouer, 3000, pionSuivant);
           $("#boutonJouer").prop('disabled', true);
           $("#boutonFinDeTour").prop('disabled', true);
      }
    else{ // sinon on revient au joueur
        joueurActuel=0;
        Tour++;// incrémente le nombre de tour
        //console.log("nouveau tour")
        //console.log("joueur suivant :" + joueurActuel);
        $("#boutonJouer").prop('disabled', false);
        $("#boutonFinDeTour").prop('disabled', false);
      }
}

  else if (partieEnCours==false){
    //finDePartie(pion);
  }

}




// lance un dé et l'affiche
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

// affiche des dés qui roule en 2D
function roulementDe(){
  var idDe = "imageDe";
  setTimeout(DiceValue, 400, idDe);
  setTimeout(DiceValue, 600, idDe);
  setTimeout(DiceValue, 700, idDe);
  setTimeout(DiceValue, 750, idDe);
  setTimeout(DiceValue, 900, idDe);
  setTimeout(DiceValue, 1200, idDe);
  setTimeout(DiceValue, 1700, idDe);
  var idDe2 = "imageDe2";
  setTimeout(DiceValue, 400, idDe2);
  setTimeout(DiceValue, 500, idDe2);
  setTimeout(DiceValue, 650, idDe2);
  setTimeout(DiceValue, 800, idDe2);
  setTimeout(DiceValue, 950, idDe2);
  setTimeout(DiceValue, 1300, idDe2);
  setTimeout(DiceValue, 1800, idDe2);
}



// lances les dés et donne la valeur que doit atteindre le pion
function TourJoueur(pion){

    // Affiche la valeur du dé dans le html
    var monDeAvance = document.getElementById("valeurDeAvance");
    //console.log(monDeAvance);

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
    var nouvelIndex = Number(pion.positionIndexCasePlayer) + Number(totalDe);

    // gere le cas où on dépasse la case arrivee
    if (nouvelIndex >= listeCases.length - 1) {
      nouvelIndex = listeCases.length - 1;

      // et donc ça veut dire qu'on a gagné !

      // la partie est terminée
      partieEnCours=false;
      pion.finished=true; // c'est CE pion qui a gagné
      console.log("la partie est terminée")
    }

    //détermine la future position X et Y du player
    pion.futurePositionIndexCasePlayer = nouvelIndex;
    //// TODO: faire les actions/pouvoirs des joueurs


}

function finDePartie(pion) {


        $("#boutonJouer").prop('disabled', true);
        $("#boutonFinDeTour").prop('disabled', true);

      if (pion==pionJoueur){
        // le joueur à gagner
        fireworks();
        //gameover = document.getElementById("textFinGagne");
        win.style.display = "block";

        } else {
        // le pion à perdu
        makeItRain();
        //gameover = document.getElementById("textFinPerdu");
        gameover.style.display = "block";
        }

        // on fait disparaitre le plateau et les pions
        canvasPlateau.style.display = "none";
        background.style.display = "none";
        player.style.display = "none";
        playerIA1.style.display = "none";
        playerIA2.style.display = "none";
        playerIA3.style.display = "none";
        //clearInterval(actualisationJoueur); // arrete d'actualiser les pions etc
        //clearInterval(actualisationBackground);
}




//////////////////////////////////////////////////////////////////////////////////////////
// fireworks
function fireworks(){

/*
  if (feu == true) {
      //Pour masquer la division :
    BF =  document.getElementById("beforeFireworks");
    BF.style.display = "none";
    BF2 =  document.getElementById("afterFireworks");
    BF2.style.display = "none";
      ///Pour afficher la division :
      //document.getElementById(identifiant_de_ma_div).style.display = block;
  }
  else if (feu== false)
    {*/
    BF =  document.getElementById("beforeFireworks");
    BF.style.display = "flex";
    BF2 =  document.getElementById("afterFireworks");
    BF2.style.display = "flex";
  //}

}

//////////////////////////////////////////////////////////////////////////////////////////
// rain
var makeItRain = function() {
  //clear out everything
  $('.rain').empty();

  var increment = 0;
  var drops = "";
  var backDrops = "";

  while (increment < 100) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
    //random number between 5 and 2
    var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
    //increment
    increment += randoFiver;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
  }

  $('.rain.front-row').append(drops);
  $('.rain.back-row').append(backDrops);


}





//////////////////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////////
// fonctions utiles
function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}

/*
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
*/
