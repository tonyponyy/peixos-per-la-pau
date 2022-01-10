var peixos = [];
bombolles = [];
counter = 0;
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



var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
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
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
        dx = Math.random() * 0.9;
        dy = Math.random() * 2 - Math.random() * 2;
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
    if (chance(1)) {
      x = peix.x;
      y = peix.y;
      var bom = new Bombolla(
        x+220*peix.zoom ,
        y-80*peix.zoom ,
        Math.random(2),
        1 + Math.random(4)
      );
      bombolles.push(bom);
    }

    gira = 1;

    if (peix.x > canvas.width + 200 || peix.x < 0) {
      peix.dx = -peix.dx;
      if (chance(50)) {
        peix.dy = -peix.dy;
      }
    }
    if (peix.y > canvas.height || peix.y < 40) {
      peix.dy = -peix.dy;

      if (chance(50)) {
        peix.dx = -peix.dx;
      }

 

    }



    if (peix.y > canvas.height + 1 || peix.y < 39) {
      peix.y = Math.random() * canvas.height;
      // ctx.save();
      //ctx.translate()
      // ctx.translate(canvas.width, 0);
      //  gira=-1
      //   ctx.scale(-1, 1);
    }
    
    drawRotatedImage(peix.imatge, peix.x, peix.y, -20 + peix.angle, peix.zoom);
    //ctx.drawImage(peix.imatge, peix.x, peix.y, 800*peix.zoom, 400*peix.zoom);

    peix.x += peix.dx;
    peix.y += peix.dy;
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
  
  window.requestAnimationFrame(moure_peixos);
  //contador de frames
  counter++;
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

function drawRotatedImage(image, x, y, angle, zoom) {
  ctx.save();

  ctx.translate(x,y);

  ctx.rotate(angle * TO_RADIANS);

  ctx.imageSmoothingQuality = "low";
  ctx.imageSmoothingEnabled = false;
  //ctx.drawImage(image, -(image.width/2)*zoom, -(image.height/2)*zoom);
  //ctx.drawImage(image, -(image.width/2), -(image.height/2), 800*zoom, 400*zoom);
  ctx.drawImage(
    image,
    -(image.width*zoom / 2),
    -(image.height*zoom / 2),
    800 * zoom,
    400 * zoom
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

//fullscreen
window.onload = window.onresize = function () {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};
