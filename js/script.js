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



// COMPARTIR
function compartirResultado() {
  // Obtener los datos del formulario
  const precio = parseFloat($('#precio').val());
  const tasa = parseFloat($('#tasa').val());
  const comision = parseFloat($('#comision').val());
  const resultado = $('#resultado').val();
  const nombreUsuario = $('#nombreUsuario').val(); // Suponiendo que tienes un campo para el nombre

  // Validar los datos (puedes personalizar esta función)
  if (!validarDatos(precio, tasa, comision)) {
    mostrarNotificacion('Por favor, ingresa valores numéricos válidos.', 'error');
    return;
  }

  // Crear el mensaje a compartir
  const mensaje = `FACTURA DE PEDIDO\n\n` +
                  `Precio del carrito: ${precio.toFixed(2)} USD\n` +
                  `Tasa USD: ${tasa.toFixed(2)} USD\n` +
                  `Comisión: ${comision.toFixed(0)}%\n\n` +
                  `TOTAL A PAGAR: ${resultado} CUP\n\n` +
                  `Código: ${obtenerFechaHoraActual()}\n`;

  // Intentar compartir utilizando la API Web Share
  if (navigator.share) {
    navigator.share({
      title: 'Compartir resultado del cálculo',
      text: mensaje,
    })
    .then(() => {
      // En lugar de un alert, mostramos una notificación
      mostrarNotificacion('El resultado se ha compartido correctamente.', 'success');
    })
    .catch((error) => {
      console.error('Error al compartir:', error);
      // Mostramos una notificación de error
      mostrarNotificacion('Ocurrió un error al compartir. Intenta nuevamente más tarde.', 'error');
    });
  } else {
    // Si la API no está disponible, ofrecer alternativas
    const clipboard = navigator.clipboard;
    if (clipboard) {
      clipboard.writeText(mensaje)
        .then(() => {
          // Mostrar notificación de éxito
          mostrarNotificacion('El resultado se ha copiado al portapapeles.', 'success');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
          // Mostrar notificación de error
          mostrarNotificacion('No se pudo copiar al portapapeles. Intenta nuevamente más tarde.', 'error');
        });
    } else {
      // Mostrar notificación informando que el navegador no soporta la función
      mostrarNotificacion('Tu navegador no admite la función de compartir. Puedes copiar el siguiente texto y pegarlo en tu aplicación de mensajería favorita:\n\n' + mensaje, 'info');
    }
  }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo) {
  const notification = document.createElement('div');
  notification.classList.add('notification', tipo);
  notification.textContent = mensaje;

  document.body.appendChild(notification);

  setTimeout(() => {
      notification.remove();
  }, 10000); // Mostrar la notificación por 10 segundos
}

// Función para validar los datos (ejemplo)
function validarDatos(precio, tasa, comision) {
  return !isNaN(precio) && !isNaN(tasa) && !isNaN(comision) && precio >= 0 && tasa >= 0 && comision >= 0;
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

// Agregar evento al botón de compartir
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

// Llamar a la función cargar Ajustes al cargar la página
$(document).ready(function() {
  cargarAjustes();
});

function limpiarCampos() {
  document.getElementById("precio").value = "";
  document.getElementById("tasa").value = "";
  document.getElementById("comision").value = "";
  document.getElementById("resultado").value = "";
}

// FUNCION ACTUALIZAR APP
document.getElementById('actualizar').addEventListener('click', function() {
  // Redirigir a la URL deseada al hacer clic en el botón
  window.location.href = 'https://drive.google.com/drive/folders/1ULbST64eWCBEI4i-NK-0tiDvaqpNs9Gx?usp=sharing';
});

// Boton Hamburger
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('#site-nav');

  if (hamburger && menu) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });

    menu.addEventListener('click', function(e) {
      e.stopPropagation(); // Evitar que el clic en el menú cierre el menú
    });

    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && !hamburger.contains(e.target) && menu.classList.contains('is-active')) {
        hamburger.classList.remove('is-active');
        menu.classList.remove('is-active');
      }
    });
  }
});