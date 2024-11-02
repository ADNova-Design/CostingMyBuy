

let currentInput = null;

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('focus', () => {
        currentInput = input;
    });
});

// Función para agregar números al input actual
function addNumber(number) {
    if (currentInput) {
        currentInput.value += number;
        calcular(); // Llama a la función calcular después de agregar el número
    }
}

// Función para agregar un decimal al input actual
function addDecimal(decimal) {
    if (currentInput) {
        // Evitar agregar más de un punto o coma
        if (!currentInput.value.includes('.') && decimal === '.') {
            currentInput.value += decimal;
        } else if (!currentInput.value.includes(',') && decimal === ',') {
            currentInput.value += decimal;
        }
        calcular(); // Llama a la función calcular después de agregar el decimal
    }
}


function borrarUltimoCaracter() {
  if (currentInput) {
      currentInput.value = currentInput.value.slice(0, -1); // Elimina el último carácter
      calcular(); // Actualiza el cálculo si es necesario
  }
}

// Función del Slide Panel
function togglePanel() {
    const panel = document.getElementById('slidingPanel');
    panel.classList.toggle('open');
}

function calcular() {
    var campoPrecio = document.getElementById("precio");
    var campoTasa = document.getElementById("tasa");
    var campoComision = document.getElementById("comision");
    var campoResultado = document.getElementById("resultado");

    // Convertir los valores a números de punto flotante
    var precio = parseFloat(campoPrecio.value.replace(',', '.')) || 0;  // Reemplazar coma por punto
    var tasa = parseFloat(campoTasa.value.replace(',', '.')) || 0;      // Reemplazar coma por punto
    var comision = parseFloat(campoComision.value.replace(',', '.')) || 0; // Reemplazar coma por punto

    // Calcular solo si los valores son números válidos
    if (!isNaN(precio) && !isNaN(tasa) && !isNaN(comision)) {
        // Calcular el resultado
        var resultado = (precio * (comision / 100) + precio) * tasa;
        campoResultado.value = resultado.toFixed(2); // Mostrar el resultado con dos decimales
    } else {
        campoResultado.value = ""; // Limpiar el resultado si hay un valor no válido
    }
}

// Función para copiar todos los datos en el formato especificado
function copiarResultado() {
  const campoPrecio = document.getElementById("precio").value;
  const campoTasa = document.getElementById("tasa").value;
  const campoComision = document.getElementById("comision").value;
  const campoResultado = document.getElementById("resultado").value;

  // Generar código basado en la fecha y hora actual
  const fecha = new Date();
  const codigo = `COD-${fecha.getFullYear()}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}${fecha.getHours().toString().padStart(2, '0')}${fecha.getMinutes().toString().padStart(2, '0')}`;

  // Construir el texto a copiar
  const textoACopiar = `
FACTURA DE PEDIDO

Precio del carrito: ${campoPrecio} CUP
Tasa del USD: ${campoTasa} CUP x USD
Comisión: ${campoComision} %

TOTAL A PAGAR: ${campoResultado} CUP

${codigo}
  `;

  // Copiar el texto al portapapeles
  navigator.clipboard.writeText(textoACopiar).then(() => {
      mostrarNotificacion('Datos copiados al portapapeles', 'success');
  }).catch(err => {
      console.error('Error al copiar: ', err);
  });
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

// Función para limpiar campos
function limpiarCampos() {
    document.getElementById("precio").value = "";
    document.getElementById("tasa").value = "";
    document.getElementById("comision").value = "";
    document.getElementById("resultado").value = "";
}


// Llamar a la función cargar Ajustes al cargar la página
$(document).ready(function() {
    cargarAjustes();
});

// Función para cargar los ajustes desde el almacenamiento local
function cargarAjustes() {
    var porcentajeSobreCompra = localStorage.getItem('porcentajeSobreCompra');
    var nuevoPrecioLibras = localStorage.getItem('nuevoPrecioLibras');

    if (porcentajeSobreCompra && nuevoPrecioLibras) {
        $('#tasa').val(porcentajeSobreCompra);
        $('#precio-libras').val(nuevoPrecioLibras);
    }
}
