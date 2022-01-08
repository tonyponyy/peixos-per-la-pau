var color = "#000";
var gruix = 1;
var esticDibuixant = false;
var imatge;
var pucOmplir = true;
var tempOmplir = true;
var einaActiva;

//mode dibuix :
// 1- pincell
// 2- cubeta
// 3- goma d'esborrar
var ModeDibuix = 1;

function vasculaTemp() {
  tempOmplir = !tempOmplir;
}

function seleccioEina(eina) {
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
                alert(response.message);
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

  //Escoltem els events del ratolí
  document.addEventListener("mousedown", pulsa_ratoli, false);
  document.addEventListener("mousemove", mou_ratoli, false);
  document.addEventListener("mouseup", aixeca_ratoli, false);
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
      ctx.moveTo(PosRatoliX, PosRatoliY);

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
