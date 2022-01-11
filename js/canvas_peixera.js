var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var peixos = [];
bombolles = [];
pinsos = [];
counter = 0;
friccio = 0;
limitX1= 80
limitX2= canvas.width-80;
limitY1=60;
limitY2=550;

var peixera_canvas;
var respuesta;
var ANGULO = 32;
class Peix {
  constructor(imatge, x, y, zoom, dx, dy, angle) {
    this.imatge = imatge;
    this.x = x;
    this.y = y;
    this.zoom = zoom;
    this.dx = dx;
    this.dy = dy;
    this.angle = angle;
  }
}

class Bombolla {
  constructor(x, y, zoom, velocitat) {
    this.x = x;
    this.y = y;
    this.zoom = zoom;
    this.velocitat = velocitat;
  }
}

  class Pinso {
    constructor(x, y, zoom, velocitat) {
      this.x = x;
      this.y = y;
      this.zoom = zoom;
      this.velocitat = velocitat;
    }
}

function llença_pinso(){
  
  if (pinsos.length == 0){

    for (let index = 0; index < 50; index++) {

      var pin = new Pinso(
        canvas.width/3 + Math.random()*canvas.width/3 ,
        0 ,
        Math.random(2),
         Math.random()*1
      )
    
    pinsos.push(pin);
      
    }


  }

  
}


//imatges

var fons_peixera = new Image();
fons_peixera.src = "imatges/terra_peixera.png";

var bombolla_img = new Image();
bombolla_img.src = "imatges/bombolla.png";

var alga = new Image();
alga.src = "imatges/alga.png";

var coral_img = new Image();
coral_img.src = "imatges/coral.png";

var castell_img = new Image();
castell_img.src = "imatges/castell.png";

var fons1_img = new Image();
fons1_img.src = "imatges/fons1.png";

var fons2_img = new Image();
fons2_img.src = "imatges/fons2.png";

var onada_img = new Image();
onada_img.src = "imatges/onada.png";

var pinso_img = new Image();
pinso_img.src = "imatges/pinso.png";




//fondo cargando
ctx.fillStyle = "lightblue";
ctx.fillRect(0, 0, canvas.width, canvas.height);
var centerX = canvas.width / 2;
var centerY = 100;
ctx.textAlign = "center";
ctx.font = "30pt Verdana";
ctx.fillStyle = "blue";
ctx.fillText("Carregant peixera...", centerX, centerY);

function activar_peixera(id) {
  ctx.fillText("Obtenint peixos de la peixera #" + id, centerX, centerY + 70);

  $.ajax({
    url: "http://127.0.0.1:8000/api/peixera/" + id,

    type: "get",
    success: function (response) {
      tots_els_peixos = response.peixos;
      tots_els_peixos.forEach(function (peix) {
        var imatge_peix = new Image(800, 400);
        imatge_peix.src = peix.imatge;
        zoom = Math.random() * (0.5 - 0.2) + 0.2;
        x = (Math.random() * (limitX2-limitX1)+limitX1)
        y = (Math.random() * (limitY2-limitY1)+limitY1)
        dx = Math.random() * 2 - Math.random() * 2;
        dy = Math.random() * 0.9 - Math.random() * 0.9;
        angle = Math.random() * 40;
        var peix_a_guardar = new Peix(imatge_peix, x, y, zoom, dx, dy, angle);
        if (peix.visible) {
          peixos.push(peix_a_guardar);
        }
      });
      imprimir_peixos_index();
      peixera_canvas = ("000000" + response.peixera[0].fons.toString()).substr(
        5
      );
      moure_peixos();
    },

    error: function () {
      alert(
        "No s'ha pogut accedir a les peixeres, torna a intentar-ho en uns minuts."
      );
    },
  });
}

function imprimir_peixos_index() {
  inner = '<p id="titol_targetes">Els habitants : </p>'
  colors = [
    "#d4dba3",
    "#a3d4db",
    "#a3dbc6",
    "#dba3b8",
    "#a3dbc6",
    "#c6a3db",
    "#b8dba3",
    "#c6a3db",
  ];

  for (let index = 0; index < tots_els_peixos.length; index++) {
    if (tots_els_peixos[index].visible) {
      inner +=
        '<div class="targeta_peix" style="background-color:' +
        colors[parseInt(Math.random() * colors.length)] +
        "; transform: rotate(" +
        (Math.random() * 14 - 7) +
        'deg)" >';
      inner +=
        '<img src="' +
        tots_els_peixos[index].imatge +
        '" class="targeta_peix_imatge">';
      inner +=
        '<p class="targeta_peix_nom"> Nom : ' +
        tots_els_peixos[index].nom +
        "</p>";
      inner +=
        '<p class="targeta_peix_text"> Desitg : ' +
        tots_els_peixos[index].text +
        "</p>";
      inner += "</div>";
    }
  }
  document.getElementById("container_targetes").innerHTML = inner;
}

function moure_peixos() {
  //fons

  fons();
  ctx.save();
  onades();
  peixos.forEach(function (peix) {
   c_bombolles = debug? 100:1;
    if (chance(c_bombolles)) {
      x = peix.x;
      y = peix.y;
      if (peix.dx>0){
        var bom = new Bombolla(
          x+220*peix.zoom ,
          y-80*peix.zoom ,
          Math.random(2),
          1 + Math.random(4)
        )
      }else{
        var bom = new Bombolla(
          x-200*peix.zoom ,
          y-80*peix.zoom ,
          Math.random(2),
          1 + Math.random(4)
        )
      }
      ;
      bombolles.push(bom);
    }

    gira = 1;
    //troba el limit horitzonal de la peixera
    if (peix.x > limitX2 || peix.x < limitX1) {
      peix.dx = -peix.dx;
      if (chance(50)) {
        peix.dy = -peix.dy;
      }
    }
    if (peix.y > limitY2 || peix.y < limitY1) {
      peix.dy = -peix.dy;

      if (chance(50)) {
        peix.dx = -peix.dx;
      }

 

    }



    if (peix.y > limitY2 + 1 ) {
      peix.y =  peix.y-10
    }
    if (peix.y < limitY1 - 1 ) {
      peix.y =  peix.y+10
    }
    if (peix.x > limitX2 + 1 ) {
      peix.x =  peix.x-10
    }
    if (peix.x < limitX1 - 1 ) {
      peix.x =  peix.x+10
    }




    if (!peix.dx < 0.1 && !peix.dx > -0.1){
     peix.angle = angulo(Math.abs(peix.dx),peix.dy)
    
    }
    
  
    //cambia la ruta del peix aleatoriament  cada x temps
    if (counter%15 == 0 && chance(5)){
    peix.dx += (Math.random() * 0.9 - Math.random() * 0.9)/4
    peix.dy += (Math.random() * 2 - Math.random() * 2)/4;
    //limitadors de velocitat  
    if (peix.dy>0.9){
      peix.dy = 0.9
    }
    if (peix.dy<0.9){
      peix.dy = -0.9
    }
    if (peix.dx>0.9){
      peix.dx = 0.9
    }
    if (peix.dx<0.9){
      peix.dx = -0.9
    }

    //el peix dona una volta aleatoriament cada x temps
     }
     if (counter%120 == 0 && chance(1)){
      peix.dy = -peix.dy 
     }


     // menjar pinsos
     if(pinsos[0]){
      if (chance(5)){
        py= pinsos[0].y
        px= pinsos[0].x
        peix.dy= -(peix.y-py)/70
        peix.dx= -(peix.x-px)/70
      } 
    


      if (peix.x < pinsos[0].x + 80 &&
        peix.x + 80 > pinsos[0].x &&
        peix.y < pinsos[0].y + 80 &&
        80 + peix.y > pinsos[0].y) {
          pinsos.splice(0, 1)
     }




     }
    
    drawRotatedImage(peix.imatge, peix.x, peix.y, -20 + peix.angle, peix.zoom,peix.dx);
    ctx.restore();
    
    //ctx.drawImage(peix.imatge, peix.x, peix.y, 800*peix.zoom, 400*peix.zoom);

    peix.x += peix.dx;
    peix.y += peix.dy;

     if (peix.dx>0){
       peix.dx -=friccio;
     }
     if (peix.dx<0){
      peix.dx +=friccio;
    }
    if (peix.dy>0){
      peix.dy -=friccio;
    }
    if (peix.dy<0){
     peix.dy +=friccio;
   }


    if (debug){

      ctx.fillStyle = "#FFBD16";
    ctx.fillRect(peix.x, peix.y, 10, 10);
    }
    

  });
  ctx.restore();
  for (let i = 0; i < bombolles.length; i++) {
    if (chance(20)) {
      bombolles[i].x += Math.random();
    }
    bombolles[i].y = bombolles[i].y - bombolles[i].velocitat;
    ctx.drawImage(
      bombolla_img,
      bombolles[i].x,
      bombolles[i].y,
      30 * bombolles[i].zoom,
      30 * bombolles[i].zoom
    );
    if (bombolles[i].y < 0) {
      bombolles.splice(i, 1);
    }
  }

  for (let i = 0; i < pinsos.length; i++) {
    if (chance(20)) {
      pinsos[i].x += Math.random();
    }
    pinsos[i].y = pinsos[i].y + pinsos[i].velocitat;
    ctx.drawImage(
      pinso_img,
      pinsos[i].x,
      pinsos[i].y,
      10 * pinsos[i].zoom,
      10 * pinsos[i].zoom
    );
    if (pinsos[i].y > canvas.height) {
      pinsos.splice(i, 1);
    }
  }


  
  
  //contador de frames
  counter++;
  if (debug){
    ctx.fillStyle = "#FFBD16";
    ctx.fillRect(limitX1, 200, 10, 10);
    ctx.fillRect(limitX2, 200, 10, 10);
    ctx.fillStyle = "blue";
    ctx.fillRect(200, limitY1, 10, 10);
    ctx.fillRect(200, limitY2, 10, 10);
  }
  window.requestAnimationFrame(moure_peixos);

}

function onades(){
  ample = onada_img.width
  n_onades = canvas.width/ample
  for (let i = -2; i < n_onades; i++) {
    ctx.drawImage(onada_img, ample*i+(counter%ample), 0);
    
  }

  
  
}



Y = 200;
function fons() {
  //peixera_canvas = ("000000"+((parseInt(Math.random()*999999)).toString())).substr(5)
  //colors fons peixera
  verd =
    parseInt(peixera_canvas.substr(3, 2)) +
    100 +
    parseInt(peixera_canvas.substr(4, 2)) +
    1;
  blau = parseInt(peixera_canvas.substr(4, 2)) + 200;
  vermell = parseInt(peixera_canvas.substr(4, 2)) / 2 + 130;
  if (blau == NaN) {
    blau = 255;
  }
  if (verd == NaN) {
    verd = 255;
  }
  if (vermell == NaN) {
    vermell = 255;
  }
  transparencia = 0.3 + parseInt(peixera_canvas.substr(2, 2)) / 100;
  //console.log('rgba('+vermell+','+verd+','+blau+','+transparencia+')')
  // ctx.fillStyle = 'rgba(144,'+verd+','+blau+','+transparencia+')';

  //ctex.createLinearGradient()
  grad1 = ctx.createLinearGradient(0, 0, 0, canvas.height);

  grad1.addColorStop(
    0,
    "rgba(" + vermell + "," + verd + "," + blau + "," + transparencia * 2 + ")"
  );
  grad1.addColorStop(
    1,
    "rgba(" +
      parseInt((vermell + verd) / 2) +
      "," +
      parseInt((blau + vermell) / 2) +
      "," +
      verd +
      "," +
      transparencia +
      ")"
  );
  ctx.fillStyle = grad1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //fons2
  x = -(parseInt(peixera_canvas.substr(1, 2)) / 100) * canvas.width;
  y = -(parseInt(peixera_canvas.substr(1, 3)) / 1000) * 50;
  //ctx.fillStyle="ffffff";
  //ctx.fillRect(100, 300, 1000, 1000);
  ctx.fillStyle = "#461556";
  ctx.fillRect(0, 330 - y, canvas.width, canvas.height);
  ctx.drawImage(fons2_img, x + 0, 50 - y);
  ctx.drawImage(fons2_img, x+1000, 50 - y);
  ctx.drawImage(fons2_img, x + 2000, 50 - y);
  //fons1
  x = -(parseInt(peixera_canvas.substr(3, 2)) / 100) * canvas.width;
  y = -(parseInt(peixera_canvas.substr(4, 2)) / 100) * 100;
  //ctx.fillStyle="ffffff";
  //ctx.fillRect(100, 300, 1000, 1000);
  ctx.fillStyle = "#680a85";
  ctx.fillRect(0, 410 - y, canvas.width, canvas.height);
  ctx.drawImage(fons1_img, x + 0, 150 - y);
  ctx.drawImage(fons1_img, x + 1000, 150 - y);
  ctx.drawImage(fons1_img, x + 2000, 150 - y);
  // coral
  coral = parseInt(peixera_canvas.substr(2, 2));
  posXc = (parseInt(peixera_canvas.substr(3, 2)) / 100) * canvas.width;
  sizec = (parseInt(peixera_canvas.substr(3, 3)) / canvas.width) * 100 + 100;
  posYc = (parseInt(peixera_canvas.substr(5, 2)) / 100) * 60;
  if (coral < 66) {
    //ctx.globalAlpha = 0.5;
    ctx.drawImage(coral_img, posXc, canvas.height-420 + posYc, sizec, 400);
    //  ctx.globalAlpha = 1;
  }

  // castell

  castell = parseInt(peixera_canvas.substr(2, 1) + peixera_canvas.substr(6, 1));
  posXca =
    (parseInt(peixera_canvas.substr(4, 1) + peixera_canvas.substr(1, 1)) /
      100) *
      canvas.width;

  if (castell < 33) {
    ctx.drawImage(castell_img, posXca, canvas.height-320, 300, 300);
  }

  // terra_peixera
  x = -(parseInt(peixera_canvas.substr(5, 2)) / 100) * 759;
  y = (parseInt(peixera_canvas.substr(0, 2)) / 100) * 30;
  ctx.drawImage(fons_peixera, x + 0, canvas.height-100 + y);
  ctx.drawImage(fons_peixera, x + 1000, canvas.height-100 + y);
  ctx.drawImage(fons_peixera, x + 2000, canvas.height-100 + y);
  // alga 1
  alga1 = parseInt(peixera_canvas.substr(5, 2));
  posX1 = (parseInt(peixera_canvas.substr(2, 2)) / 100) * 924 - 34;
  posY1 = (parseInt(peixera_canvas.substr(5, 2)) / 100) * 120;
  size1 = (parseInt(peixera_canvas.substr(4, 3)) / 1000) * 100 + 100;
  if (alga1 < 50) {
    ctx.drawImage(alga, posX1, 365 + 115+posY1, size1, 100);
  }
  // alga 2
  alga2 = parseInt(peixera_canvas.substr(3, 2));
  posX2 = (parseInt(peixera_canvas.substr(1, 2)) / 100) * 924 - 34;
  size2 = (parseInt(peixera_canvas.substr(1, 3)) / 1000) * 100 + 100;
  posY2 = (parseInt(peixera_canvas.substr(2, 2)) / 100) * 120;
  if (alga2 < 50) {
    ctx.drawImage(alga, posX2, 365 + 115+posY2, size2, 100);
  }
}

//rotacio dels peixos
rectX = 0;
rectY = 0;
var TO_RADIANS = Math.PI / 180;

function drawRotatedImage(image, x, y, angle, zoom,dx) {
ctx.save();

  


  ctx.translate(x,y);
  ctx.rotate(angle * TO_RADIANS);

  ctx.imageSmoothingQuality = "low";
  ctx.imageSmoothingEnabled = false;
  //ctx.drawImage(image, -(image.width/2)*zoom, -(image.height/2)*zoom);
  //ctx.drawImage(image, -(image.width/2), -(image.height/2), 800*zoom, 400*zoom);
  
    if (dx<0){
      ctx.scale(-1,1);
    }
    ctx.drawImage(
      image,
      (image.width*zoom / 2),
      (image.height*zoom / 2),
      -800 * zoom,
      -400 * zoom
    );



ctx.restore();

}

function chance(percentatge) {
  n = Math.random() * 100;
  if (n < percentatge) {
    return true;
  } else {
    return false;
  }
}

angle_bloquejat = 45
rectificacio = 180
function  angulo(x,y){

    if (x ==0 && y==0){
        return 0
    }

    x ==0? x=x+1:"";
    y ==0? y=y+1:"";
    
    if (x>0 && y>0){
        // entre 0 y 90
        res = (x*(90/(x+y))+rectificacio)%angle_bloquejat

        return parseInt(res)
    }
    if (x>0 && y<0){
        //entre 90 y 180
        res = x*(90/(x+(-y)))
        return (parseInt(180-res)-rectificacio)%angle_bloquejat
    }
    if (x<0 && y>0){
        // entre 180 y 270
        res = x*(90/((-x)+y))
        return (parseInt(180+(-res))-rectificacio)%angle_bloquejat
    }
    if (x<0 && y<0){
        // entre 270 y 360
        res = x*(90/(-(-x-y)))
        return (parseInt(360-res)-rectificacio)%-angle_bloquejat
    }
  
}

debug = false;


