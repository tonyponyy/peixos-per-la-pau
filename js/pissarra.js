var color = "#000000";
var gruix = 1;
var esticDibuixant = false;
var imatge;
var pucOmplir = true;
var tempOmplir = true;
var einaActiva = document.getElementById("gruix_petit");

var plantilla = new Image();
plantilla.src = "data:image/png;base64,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";


function imprimir_plantilla(){
  ctx.drawImage(plantilla, 0, 0);
} 


//mode dibuix :
// 1- pincell
// 2- cubeta
// 3- goma d'esborrar
var ModeDibuix = 1;

function vasculaTemp() {
  tempOmplir = !tempOmplir;
}

function seleccioEina(eina) {
  if (eina != undefined){

 
  eina_anterior = document.getElementsByClassName("seleccio_eina")[0];
  if (eina_anterior != undefined) {
    eina_anterior.classList.remove("seleccio_eina");
  }
  eina.classList.add("seleccio_eina");
  // si la eina no es la cubeta o la goma la guardem a la variable einaActiva.
  if (eina.id != "cubeta") {
    einaActiva = eina;
  }

  }
}

function seleccioColor(color) {
  eina_anterior = document.getElementsByClassName("seleccio_color")[0];
  if (eina_anterior != undefined) {
    eina_anterior.classList.remove("seleccio_color");
  }
  console.log(color);
  color.classList.add("seleccio_color");
}

//variables ratolí

var RatoliX = 0;
var RatoliY = 0;
var CanvasPos;

//imatge
var imatge;

window.onresize = function () {
  CanvasPos = posicioAbsoluta(document.getElementById("pissarra"));
};

function CambiaColor(color_boto) {
  color = color_boto;
}

function CambiaGruix(gruix_boto) {
  ModeDibuix = 1;
  gruix = gruix_boto;
}

function Netejar() {
  ctx.clearRect(0, 0, 800, 400);
  ctx.fillStyle = "rgba(255,255,255,0)";
  ctx.fillRect(0, 0, 800, 400);
}

function Guardar(){
  document.getElementById('enviar').style.visibility = "visible"
}
function Ocultar(){
  document.getElementById('enviar').style.visibility = "hidden"
}
function Ocultar_marc(){
  document.getElementById('marc_plantilla').style.visibility = "hidden"
}

function amb_plantilla(){
  imprimir_plantilla();
  Ocultar_marc();
}



function Enviar() {
  text = document.getElementById("desitg").value
  nom = document.getElementById("nom").value
  console.log(nom)
  var copia = document.getElementById("pissarra");
  imatge = copia.toDataURL("image/png");
  $.ajax({
    url:'http://127.0.0.1:8000/api/guardar_peix',
    data:{
      'imatge':imatge,
      "text": text ,
      "nom": nom
  
  },
    type:'post',
    success: function (response) {
                console.log(response)
                text = response.message
                alert(text);
                sessionStorage.setItem('id_peixera', text.substring(text.length-1));     
            window.location.href = "index.html";

    },

    error:function(){
      alert("No s'ha pogut enviar el peix, torna a intentar-ho en uns minuts.")
      window.location.href = "index.html";

    }
 });





}

function Imprimeix() {
  document.body.innerHTML += "<img class='peix' src='" + imatge + "'> </img>";
}

function posicioAbsoluta(pissarra) {
  // Aquesta funció retorna la posicio absoluta del element ( en aquest cas la pissarra )
  var x = 0;
  var y = 0;

  while (pissarra.offsetParent) {
    x += pissarra.offsetLeft;
    y += pissarra.offsetTop;
    pissarra = pissarra.offsetParent;
  }
  return { dalt: y, esquerra: x };
}

function cubeta() {
  ModeDibuix = 2;
}

function gomaDeBorrar() {
  ModeDibuix = 3;
}

function comenzar() {
  CanvasPos = posicioAbsoluta(document.getElementById("pissarra"));
  Pissarra = document.getElementById("pissarra");
  ctx = Pissarra.getContext("2d");
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingQuality = "low";
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

 

  //Escoltem els events del ratolí
  document.addEventListener("mouseup", aixeca_ratoli, false);
  document.addEventListener("mousedown", pulsa_ratoli, false);
  document.addEventListener("mousemove", mou_ratoli, false);
 
}

function pulsa_ratoli(capturo) {
  //Mirem la posició del ratoli respecte a la pissarra i la guardem per utilitzarla després
  PosRatoliX = capturo.clientX - CanvasPos.esquerra;
  PosRatoliY = capturo.clientY - CanvasPos.dalt;

  switch (ModeDibuix) {
    case 1:
      //Indiquem que anem a dibuixar
      esticDibuixant = true;
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      //comencem a traçar la linea i l'induquem la posició del ratolí
      ctx.moveTo(parseInt(PosRatoliX), parseInt(PosRatoliY));

      break;
    case 2:
      //Avans d'omplir amb color mirem que estigui als limits de la pissarra
      //també mirem si podem omplir
      if (
        pucOmplir &&
        PosRatoliX >= 0 &&
        PosRatoliX <= 800 &&
        PosRatoliY >= 0 &&
        PosRatoliY <= 400
      ) {
        seleccioEina(einaActiva);
        if (einaActiva.id == "goma") {
          ModeDibuix = 3;
        } else ModeDibuix = 1;

        ctx.globalCompositeOperation = "source-over";
        //Avans d'omplir amb color mirem que estigui als limits de la pissarra
        // iniciem la funció per omplir de color
        flood_fill(PosRatoliX, PosRatoliY, color_to_rgba(color));
      }
      break;
    case 3:
      ctx.globalCompositeOperation = "destination-out";

      //Indiquem que anem a dibuixar
      esticDibuixant = true;
      ctx.beginPath();
      //comencem a traçar la linea i l'induquem la posició del ratolí
      ctx.moveTo(PosRatoliX, PosRatoliY);
  }
}

function mou_ratoli(capturo) {
  //Comprovem si estem dibuixant
  if (esticDibuixant) {
    //Indiquem el color i el gruix que volem
    ctx.strokeStyle = color;
    ctx.lineWidth = gruix + gruix * Math.random();
    //Por dónde vamos dibujando
    ctx.lineCap = "round";
    //Mirem la posició del ratoli respecte a la pissarra i la guardem per utilitzarla després
    PosRatoliX = capturo.clientX - CanvasPos.esquerra;
    PosRatoliY = capturo.clientY - CanvasPos.dalt;
    //creem la linea
    //Avans de pintar amb color mirem que estigui als limits de la pissarra
    if (
      PosRatoliX >= 0 &&
      PosRatoliX <= 800 &&
      PosRatoliY >= 0 &&
      PosRatoliY <= 400
    ) {
      ctx.lineTo(PosRatoliX, PosRatoliY);
    }
    ctx.stroke();
  }
}

function aixeca_ratoli() {
  //Indiquem que em acabat el traç
  ctx.closePath();
  esticDibuixant = false;
}

//funció cubeta de pintura

//adaptació del algoritme flood_fill de nem akrin
// https://ben.akrin.com/canvas_fill/fill_03.html

function flood_fill(x, y, color, original_color, pixels, pixel_stack) {
  pucOmplir = false;
  timeout_id = 2;
  color = color;
  the_canvas = document.getElementById("pissarra");
  the_canvas_context = the_canvas.getContext("2d");
  original_color =
    typeof original_color === "undefined" ? null : original_color;
  pixels = typeof pixels === "undefined" ? null : pixels;
  pixel_stack = typeof pixel_stack === "undefined" ? null : pixel_stack;

  clearTimeout(timeout_id);

  if (pixels === null) {
    pixels = the_canvas_context.getImageData(
      0,
      0,
      the_canvas.width,
      the_canvas.height
    );
  }

  var linear_cords = (y * the_canvas.width + x) * 4;

  if (original_color === null) {
    original_color = {
      r: pixels.data[linear_cords],
      g: pixels.data[linear_cords + 1],
      b: pixels.data[linear_cords + 2],
      a: pixels.data[linear_cords + 3],
    };
  }

  if (pixel_stack === null) {
    pixel_stack = [{ x: x, y: y }];
  }

  var iterations = 0;
  while (pixel_stack.length > 0) {
    new_pixel = pixel_stack.shift();
    x = new_pixel.x;
    y = new_pixel.y;

    // coloring the pixels we are on
    linear_cords = (y * the_canvas.width + x) * 4;
    pixels.data[linear_cords] = color.r;
    pixels.data[linear_cords + 1] = color.g;
    pixels.data[linear_cords + 2] = color.b;
    pixels.data[linear_cords + 3] = color.a;

    if (
      x - 1 >= 0 &&
      pixels.data[linear_cords - 4] == original_color.r &&
      pixels.data[linear_cords - 4 + 1] == original_color.g &&
      pixels.data[linear_cords - 4 + 2] == original_color.b &&
      pixels.data[linear_cords - 4 + 3] == original_color.a &&
      !is_in_pixel_stack(x - 1, y, pixel_stack)
    ) {
      pixel_stack.push({ x: x - 1, y: y });
    }
    if (
      x + 1 < the_canvas.width &&
      pixels.data[linear_cords + 4] == original_color.r &&
      pixels.data[linear_cords + 4 + 1] == original_color.g &&
      pixels.data[linear_cords + 4 + 2] == original_color.b &&
      pixels.data[linear_cords + 4 + 3] == original_color.a &&
      !is_in_pixel_stack(x + 1, y, pixel_stack)
    ) {
      pixel_stack.push({ x: x + 1, y: y });
    }
    if (
      y - 1 >= 0 &&
      pixels.data[linear_cords - 4 * the_canvas.width] == original_color.r &&
      pixels.data[linear_cords - 4 * the_canvas.width + 1] ==
        original_color.g &&
      pixels.data[linear_cords - 4 * the_canvas.width + 2] ==
        original_color.b &&
      pixels.data[linear_cords - 4 * the_canvas.width + 3] ==
        original_color.a &&
      !is_in_pixel_stack(x, y - 1, pixel_stack)
    ) {
      pixel_stack.push({ x: x, y: y - 1 });
    }
    if (
      y + 1 < the_canvas.height &&
      pixels.data[linear_cords + 4 * the_canvas.width] == original_color.r &&
      pixels.data[linear_cords + 4 * the_canvas.width + 1] ==
        original_color.g &&
      pixels.data[linear_cords + 4 * the_canvas.width + 2] ==
        original_color.b &&
      pixels.data[linear_cords + 4 * the_canvas.width + 3] ==
        original_color.a &&
      !is_in_pixel_stack(x, y + 1, pixel_stack)
    ) {
      pixel_stack.push({ x: x, y: y + 1 });
    }

    iterations++;
    if (iterations >= 1000) {
      break;
    }
  }

  the_canvas_context.putImageData(pixels, 0, 0);
  if (pixel_stack.length > 0) {
    new_pixel = pixel_stack.shift();

    timeout_id = setTimeout(function () {
      flood_fill(
        new_pixel.x,
        new_pixel.y,
        color,
        original_color,
        pixels,
        pixel_stack
      );
    }, 6);
  } else {
    clearTimeout(timeout_id);
    pucOmplir = true;
  }
}

function is_in_pixel_stack(x, y, pixel_stack) {
  for (var i = 0; i < pixel_stack.length; i++) {
    if (pixel_stack[i].x == x && pixel_stack[i].y == y) {
      return true;
    }
  }
  return false;
}

function color_to_rgba(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 255,
  };
}
