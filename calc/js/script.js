function preencher(numero) {
  var campoPrecio = document.getElementById("precio");
  var campoTasa = document.getElementById("tasa");
  var campoComision = document.getElementById("comision");

  if (campoPrecio === document.activeElement) {
    campoPrecio.value += numero;
    campoTasa.value = "";
    campoComision.value = "";
  } else if (campoTasa === document.activeElement) {
    campoTasa.value += numero;
    campoPrecio.value = "";
    campoComision.value = "";
  } else if (campoComision === document.activeElement) {
    campoComision.value += numero;
    campoPrecio.value = "";
    campoTasa.value = "";
    calcular();
  }
}

function calcular() {
  var campoPrecio = document.getElementById("precio");
  var campoTasa = document.getElementById("tasa");
  var campoResultado = document.getElementById("resultado");
  var campoComision = document.getElementById("comision");

  var precio = parseFloat(campoPrecio.value);
  var tasa = parseFloat(campoTasa.value);
  var comision = parseFloat(campoComision.value);

  if (!isNaN(precio) && !isNaN(tasa) && !isNaN(comision)) {
    var resultado = (precio * (comision / 100) + precio) * tasa;
    campoResultado.value = resultado.toFixed(2);
  } else {
    campoResultado.value = "";
  }
}

// Función para compartir el resultado
function compartirResultado() {
  var precio = parseFloat($('#precio').val());
  var tasa = parseFloat($('#tasa').val());
  var comision = parseFloat($('#comision').val());
  var resultado = $('#resultado').val();

  var mensaje = "Valor del Encargo" + "\n\n" +
    "Precio de producto: " + precio.toFixed(2) + " USD\n" +
    "Tasa USD: " + tasa.toFixed(2) + " USD\n" +
    "Porcentaje sobre compra: " + comision.toFixed(0) + "%\n\n" +
    "RESULTADO: " + resultado + " CUP\n\n" +
    "Compartido desde: https://adnova-design.github.io/CostingMyBuy/" + "\n\n" +
    obtenerFechaHoraActual();

  if (navigator.share) {
    navigator.share({
      text: mensaje
    })
      .then(() => console.log('Contenido compartido exitosamente.'))
      .catch((error) => console.log('Error al compartir:', error));
  } else {
    alert("Lo siento, la función de compartir no es compatible con tu dispositivo o navegador.");
  }
}

// Función para obtener la fecha y hora actual en formato de código
function obtenerFechaHoraActual() {
  var fechaHora = new Date();

  var dia = fechaHora.getDate().toString().padStart(2, '0');
  var mes = (fechaHora.getMonth() + 1).toString().padStart(2, '0');
  var anio = fechaHora.getFullYear().toString();
  var hora = fechaHora.getHours().toString().padStart(2, '0');
  var minutos = fechaHora.getMinutes().toString().padStart(2, '0');
  var ampm = fechaHora.getHours() >= 12 ? '' : '';

  return dia + mes + anio + hora + minutos + ampm;
}

// Llamar a la función compartirResultado al hacer clic en el botón de compartir
$('#btn-compartir').click(function() {
  compartirResultado();
});

$(document).ready(function() {
  var frase1 = "Encargos"; // Frase 1 para mostrar
  var frase2 = "Compras"; // Frase 2 para mostrar
  var frase3 = "Inversiones"; // Frase 3 para mostrar

  var frases = [frase1, frase2, frase3]; // Array de frases
  var indiceActual = 0;

  function maquinaEscribir(elemento, texto, velocidad) {
    var i = 0;
    var intervalo = setInterval(function() {
      elemento.text(texto.slice(0, i));
      i++;
      if (i > texto.length) {
        clearInterval(intervalo);
        setTimeout(function() {
          borrarTexto(elemento);
        }, 10000); // Esperar 2 segundos antes de borrar el texto
      }
    }, velocidad);
  }

  function borrarTexto(elemento) {
    var textoActual = elemento.text();
    var longitudTexto = textoActual.length;
    var intervalo = setInterval(function() {
      elemento.text(textoActual.slice(0, longitudTexto));
      longitudTexto--;
      if (longitudTexto === 0) {
        clearInterval(intervalo);
        setTimeout(function() {
          mostrarSiguienteFrase(elemento);
        }, 1000); // Esperar 1 segundo antes de mostrar la siguiente frase
      }
    }, 50);
  }

  function mostrarSiguienteFrase(elemento) {
    var siguienteFrase = frases[indiceActual];
    maquinaEscribir(elemento, siguienteFrase, 100);
    indiceActual = (indiceActual + 1) % frases.length; // Obtener el siguiente índice
  }

  var encargos = $(".encargos");
  maquinaEscribir(encargos, frase1, 100); // Mostrar la primera frase inicialmente
});

// Agregar evento al botón de compartir
$('#btn-compartir').click(function() {
  compartirResultado();
});

// Función para guardar los ajustes en el almacenamiento local
function guardarAjustes() {
  localStorage.setItem('porcentajeSobreCompra', porcentajeSobreCompra);
  localStorage.setItem('nuevoPrecioLibras', nuevoPrecioLibras);
}

// Función para cargar los ajustes desde el almacenamiento local
function cargarAjustes() {
  var porcentajeSobreCompra = localStorage.getItem('porcentajeSobreCompra');
  var nuevoPrecioLibras = localStorage.getItem('nuevoPrecioLibras');

  if (porcentajeSobreCompra && nuevoPrecioLibras) {
    $('#tasa').val(porcentajeSobreCompra);
    $('#precio-libras').val(nuevoPrecioLibras);
  }
}

// Llamar a la función cargarAjustes al cargar la página
$(document).ready(function() {
  cargarAjustes();
});