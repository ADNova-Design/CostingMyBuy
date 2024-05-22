$(document).ready(function() {
  var nuevoPorcentaje = parseFloat(localStorage.getItem('porcentaje')) || 0.15; // Porcentaje por defecto (15%)
  var nuevoPrecioLibras = parseFloat(localStorage.getItem('precioLibras')) || 5; // Precio de libras por defecto (5)

  $('nav ul li > a:not(:only-child)').click(function(e) {
    $(this).siblings('.nav-submenu').toggle();
    $('.nav-submenu').not($(this).siblings()).hide();
    e.stopPropagation();
  });

  $('html').click(function() {
    $('.nav-submenu').hide();
  });

  $('#nav-boton').click(function() {
    $('nav ul').toggle();
    $('#nav-boton').toggleClass("activo");
  });

  $('#ajustes-porciento').click(function() {
    var nuevoPorcentajeInput = prompt("Ingrese el nuevo porcentaje del precio:");
    if (nuevoPorcentajeInput !== null) {
      nuevoPorcentaje = parseFloat(nuevoPorcentajeInput) / 100;
      if (!isNaN(nuevoPorcentaje)) {
        $('#precio').val('');
        $('#tasa').val('');
        calcularPrecio(nuevoPorcentaje);
        guardarAjustes();
      } else {
        alert("Ingrese un valor numérico válido.");
      }
    }
  });

  $('#ajustes-precio-libras').click(function() {
    var nuevoPrecioLibrasInput = prompt("Ingrese el nuevo precio de las libras:");
    if (nuevoPrecioLibrasInput !== null) {
      nuevoPrecioLibras = parseFloat(nuevoPrecioLibrasInput);
      if (!isNaN(nuevoPrecioLibras)) {
        $('#precio').val('');
        $('#tasa').val('');
        actualizarPrecioLibras(nuevoPrecioLibras);
        guardarAjustes();
      } else {
        alert("Ingrese un valor numérico válido.");
      }
    }
  });

  function actualizarPrecioLibras(nuevoPrecioLibras) {
    $('#precio-libras').val(nuevoPrecioLibras);
  }

  function calcularPrecio(porcentaje) {
    var precio = parseFloat(document.getElementById("precio").value);
    var tasa = parseFloat(document.getElementById("tasa").value);

    if (isNaN(precio) || isNaN(tasa)) {
      document.getElementById("resultado").value = "...";
    } else {
      var precioEntraga = ((precio * porcentaje) + precio) * tasa;
      document.getElementById("resultado").value = precioEntraga.toFixed(2);
    }
  }

  // Agregar evento de cambio en los campos de precio y tasa para calcular automáticamente
  $('#precio, #tasa').on('input', function() {
    calcularPrecio(nuevoPorcentaje);
  });

  
  

// Función para compartir el resultado
function compartirResultado() {
  var precio = parseFloat($('#precio').val());
  var peso = parseFloat($('#peso').val());
  var tasa = parseFloat($('#tasa').val());

  var porcentajeSobreCompra = nuevoPorcentaje * 100;
  var resultado = $('#resultado').val();

  var mensaje = "Precio de producto: " + precio.toFixed(2) +
    " - Peso en Lb: " + peso.toFixed(2) +
   " - Tasa USD: " + tasa.toFixed(2) +
    " - Porcentaje sobre compra: " + porcentajeSobreCompra.toFixed(2) +
    " - Resultado: " + resultado;

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

// Agregar evento al botón de compartir
$('#btn-compartir').click(function() {
  compartirResultado();
});

// Función para guardar los ajustes en el almacenamiento local
function guardarAjustes() {
    localStorage.setItem('porcentaje', nuevoPorcentaje);
    localStorage.setItem('precioLibras', nuevoPrecioLibras);
  }
});
