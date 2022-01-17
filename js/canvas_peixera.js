var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var peixos = [];
bombolles = [];
pinsos = [];
counter = 0;
limitX1= 80
limitX2= canvas.width-80;
limitY1=60;
limitY2=550;

var peixera_canvas;
var respuesta;
var ANGULO = 32;
class Peix {
  constructor(imatge, x, y, zoom, dx, dy, angle,data,id) {
    this.imatge = imatge;
    this.x = x;
    this.y = y;
    this.zoom = zoom;
    this.dx = dx;
    this.dy = dy;
    this.angle = angle;
    this.data = data;
    this.id = id;
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

var alga2_img = new Image();
alga2_img.src = "imatges/alga2.png";

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
      console.log(response.peixos)
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
        data = transforma_data(peix.created_at);
        id = peix.id;
        var peix_a_guardar = new Peix(imatge_peix, x, y, zoom, dx, dy, angle,data,id);
        if (peix.visible) {
          peixos.push(peix_a_guardar);
        }
      });
      imprimir_peixos_index();
      peixera_canvas = ("000000" + response.peixera[0].fons.toString()).substr(
        5
      );
      carrega_seed();
      moure_peixos();
    },

    error: function () {
      alert(
        "No s'ha pogut accedir a les peixeres, torna a intentar-ho en uns minuts."
      );
    },
  });
}

function transforma_data(data){
  any = data.substring(0,4);
  mes = data.substring(5,7);
  dia = data.substring(8,10);
  hora = data.substring(11,13);
  minuts = data.substring(14,16);
  segons = data.substring(17,19);
 return new Date(any,mes-1,dia,hora,minuts,segons);
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
      inner += '<p id="temps">Viu a la peixera des de '+ temps(transforma_data(tots_els_peixos[index].created_at)) +'.<p>'  
      inner += "</div>";
    }
  }
  document.getElementById("container_targetes").innerHTML = inner;
}






function moure_peixos() {
  //fons

 fons();
  //ctx.save();
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
     if(pinsos[peix.id%9]){
      if (chance(5)){
        py= pinsos[peix.id%9].y
        px= pinsos[peix.id%9].x
        peix.dy= -(peix.y-py)/70
        peix.dx= -(peix.x-px)/70
      } 
    


      if (peix.x < pinsos[peix.id%9].x + 80 &&
        peix.x + 80 > pinsos[peix.id%9].x &&
        peix.y < pinsos[peix.id%9].y + 80 &&
        80 + peix.y > pinsos[peix.id%9].y) {
          pinsos.splice(0, 1)
     }




     }
    
    drawRotatedImage(peix.imatge, peix.x, peix.y, -20 + peix.angle, peix.zoom,peix.dx);
    //ctx.restore();
    
    //ctx.drawImage(peix.imatge, peix.x, peix.y, 800*peix.zoom, 400*peix.zoom);

    peix.x += peix.dx;
    peix.y += peix.dy;


    if (debug){

      ctx.fillStyle = "#FFBD16";
    ctx.fillRect(peix.x, peix.y, 10, 10);
    }
    

  });
 // ctx.restore();
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

var
color1,
color2,
x1,
y1,
x2,
y2,
coral,
posXc,
castell,
posXca,
x3,
y3,
alga1 ,
posX1 ,
posY1,
size1, 
alga2 ,
posX2,
size2 ,
posY2 ;


function carrega_seed(){


colors=["#368b8d","#36608d","#5688bd","#56bd86","#8656bd","#9883ce","#92d8c9","#7ceed5",
        "#c888dd","#3abba6"]

colors_fosc =  ["#a53abb","#653abb","#3b65ba","#2d778f","#1d4d5d","#1d365d","#166f6a","#2077a2","#2036a2","#2077a2"]
colors_clars = ["#33d7bc","#334fd7","#33a0d7","#bf6bff","#ed85ff","#85ffab","#a3cde0","#bbbaee","#81beca","#b2a9db"]

color2= colors_fosc[parseInt(peixera_canvas.substr(4, 1))]
color1= colors_clars[parseInt(peixera_canvas.substr(3, 1))]

//fons 2
x1 = -(parseInt(peixera_canvas.substr(1, 2)) / 100) * canvas.width;
  y1 = -(parseInt(peixera_canvas.substr(1, 3)) / 1000) * 50;
//fons 3
x2 = -(parseInt(peixera_canvas.substr(3, 2)) / 100) * canvas.width;
y2 = -(parseInt(peixera_canvas.substr(4, 2)) / 100) * 100;
//coral
coral = parseInt(peixera_canvas.substr(2, 2));
posXc = (parseInt(peixera_canvas.substr(3, 2)) / 100) * canvas.width;
// castell
castell = parseInt(peixera_canvas.substr(2, 1) + peixera_canvas.substr(6, 1));
posXca =
  (parseInt(peixera_canvas.substr(4, 1) + peixera_canvas.substr(1, 1)) /
    100) *
    canvas.width;
//terra peixera
  x3 = -(parseInt(peixera_canvas.substr(5, 2)) / 100) * 759;
  y3 = (parseInt(peixera_canvas.substr(0, 2)) / 100) * 30;
  //alga 1
  alga1 = parseInt(peixera_canvas.substr(5, 2));
  posX1 = (parseInt(peixera_canvas.substr(2, 2)) / 100) * 924 - 34;
  posY1 = (parseInt(peixera_canvas.substr(5, 2)) / 100) * 120;
  size1 = (parseInt(peixera_canvas.substr(4, 3)) / 1000) * 100 + 100;
  //alga 2
  alga2 = parseInt(peixera_canvas.substr(3, 2));
  posX2 = (parseInt(peixera_canvas.substr(1, 2)) / 100) * 924 - 34;
  size2 = (parseInt(peixera_canvas.substr(1, 3)) / 1000) * 100 + 100;
  posY2 = (parseInt(peixera_canvas.substr(2, 2)) / 100) * 120;        
}






function fons() {
  //peixera_canvas = ("000000"+((parseInt(Math.random()*999999)).toString())).substr(5)
  //colors fons peixera
  
  //console.log('rgba('+vermell+','+verd+','+blau+','+1+')')
  // ctx.fillStyle = 'rgba(144,'+verd+','+blau+','+1+')';

  //ctex.createLinearGradient()
  grad1 = ctx.createLinearGradient(0, 0, 0, canvas.height);
  //"rgba(" + vermell1 + "," + verd1 + "," + blau1 + "," + 11 * 2 + ")"
  grad1.addColorStop(
    0,
    
    color1
  );
  grad1.addColorStop(
    1,
    color2
  );
  ctx.fillStyle = grad1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //fons2


  ctx.fillStyle = "#461556";
  ctx.fillRect(0, 330 - y1, canvas.width, canvas.height);
  ctx.drawImage(fons2_img, x1 + 0, 50 - y1);
  ctx.drawImage(fons2_img, x1+1000, 50 - y1);
  ctx.drawImage(fons2_img, x1 + 2000, 50 - y1);
  //fons1
 
  //ctx.fillStyle="ffffff";
  //ctx.fillRect(100, 300, 1000, 1000);
  ctx.fillStyle = "#680a85";
  ctx.fillRect(0, 410 - y2, canvas.width, canvas.height);
  ctx.drawImage(fons1_img, x2 + 0, 150 - y2);
  ctx.drawImage(fons1_img, x2 + 1000, 150 - y2);
  ctx.drawImage(fons1_img, x2 + 2000, 150 - y2);
  // coral
 
  if (coral < 66) {
    //ctx.globalAlpha = 0.5;
    ctx.drawImage(coral_img, posXc, canvas.height-320 );
    //  ctx.globalAlpha = 1;
  }

  // castell

  if (castell < 33) {
    ctx.drawImage(castell_img, posXca, canvas.height-320, 300, 300);
  }

//terra peixera
  ctx.drawImage(fons_peixera, x3 + 0, canvas.height-100 + y3);
  ctx.drawImage(fons_peixera, x3 + 999, canvas.height-100 + y3);
  ctx.drawImage(fons_peixera, x3 + 1998, canvas.height-100 + y3);
  // alga 1

  if (alga1 < 50) {
    ctx.drawImage(alga, posX1, 365 + 115+posY1);
  }
  // alga 2

  if (alga2 < 50) {
    ctx.drawImage(alga2_img, posX2, 365 + 115+posY2);
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

function temps(data){

  ara = Date.now()
  segons = (ara - data)/1000 ;
  if (segons< 60){
    return "fa menys d'un minut"
  }
  if (segons< 15*60){
    return "fa menys d'un quart d'hora"
  }
  if (segons< 60*60){
    return "fa menys d'una hora"
  }
  if (segons< 24*3600){
    return "fa menys de "+(parseInt(segons/3600)+1)+" hores"
  }
  if (segons< 48*3600){
    return "fa un dia"
  }
  if (segons< (7*24)*3600){
    return "fa "+parseInt((segons/3600)/24)+" dies"
  }
  if (segons< 2*(7*24)*3600){
    return "fa "+parseInt(((segons/3600)/24)/7)+" setmana"
  }
  if (segons< (30*24)*3600){
    return "fa "+parseInt(((segons/3600)/24)/7)+" setmanes"
  }


  if (segons< 12*((30*24)*3600)){
    return "fa "+parseInt(((segons/3600)/24)/7)+" mesos"
  }
  if (segons> 12*((30*24)*3600)){
    return "fa "+parseInt(12*(((segons/3600)/24)/7))+" anys"
  }


}



debug = false;


