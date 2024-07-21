
// Obtén todos los elementos de entrada del formulario
const formInputs = document.querySelectorAll('input, textarea');
      
// Captura el evento focus de los elementos de entrada
formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    // Deshabilitar el desplazamiento de la página
    document.body.style.overflow = 'hidden';
  });

  // Captura el evento blur de los elementos de entrada
  input.addEventListener('blur', () => {
    // Habilitar el desplazamiento de la página
    document.body.style.overflow = 'auto';
  });
});

// CAMPO DE TARJETA 4x4
var tarjetaInput = document.getElementById('tarjeta');

tarjetaInput.addEventListener('input', function(e) {
  var inputValue = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
  var formattedValue = formatCardNumber(inputValue);
  e.target.value = formattedValue;
});

function formatCardNumber(value) {
  var formattedValue = '';
  var groups = [];
  var index = 0;

  while (index < value.length) {
    groups.push(value.slice(index, index + 4));
    index += 4;
  }

  formattedValue = groups.join(' ');

  return formattedValue;
}
// GUARDAR INFORMACION
function guardarPedido() {
  // Obtener los valores de los campos del formulario
  var cliente = document.getElementById('cliente').value;
  var telefono = document.getElementById('telefono').value;
  var correo = document.getElementById('correo').value;
  var carrito = document.getElementById('carrito').value;
  var tarjeta = document.getElementById('tarjeta').value;            
  var precio = document.getElementById('precio1').value;
  var detalles = document.getElementById('detalles').value;

  // Verificar que el precio sea un número válido
  if (isNaN(precio)) {
    mostrarNotificacion('El precio debe ser un número válido', 'error');
    return false; // Impedir el envío del formulario
  }

  // Verificar que los campos requeridos no estén vacíos
  if (
    cliente.trim() === '' ||
    telefono.trim() === '' ||
    carrito.trim() === '' ||
    precio.trim() === '' ||
    detalles.trim() === ''
  ) {
    mostrarNotificacion('Por favor, complete todos los campos requeridos.', 'error');
    return false; // Impedir el envío del formulario
  }

  // Obtener el nombre de usuario registrado
  var username = document.getElementById("username").value;

  // Crear el objeto de datos a enviar
  var messageText = '🛒 Nuevo Encargo de #' + username + '\n\n' +              
    'Cliente: ' + cliente + '\n' +
    'Teléfono: ' + telefono + '\n' +
    'Correo: ' + correo + '\n' +
    'Carrito: ' + carrito + '\n' +
    'Precio Total: ' + precio + ' CUP\n' +
    'No. Tarjeta Receptora:\n' + tarjeta + '\n\n' +
    'Detalles:\n' + detalles;

  // Realizar una solicitud POST a la API de Telegram
  fetch('https://api.telegram.org/bot7406598868:AAGxOaXNIfdvC_dJq5XCD4U-KcGmVmwBwMA/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: '-1002230826663',
      text: messageText
    })
  })
    .then(response => {
      if (response.ok) {
        mostrarNotificacion('Datos enviados exitosamente', 'success');
        // Puedes agregar aquí cualquier acción adicional después de enviar el mensaje  
      } else {
        mostrarNotificacion('Error al enviar el mensaje a Telegram', 'error');
      }
    })
    .catch(error => {
      mostrarNotificacion('Error al enviar la solicitud a la API de Telegram: ' + error, 'error');
    });

  return true; // Permitir el envío del formulario
}

// Función para mostrar la notificación
function mostrarNotificacion(mensaje, tipo) {
  Toastify({
    text: mensaje,
    duration: 1000,
    close: false,
    gravity: 'top',
    position: 'right',
    backgroundColor: tipo === 'error' ? '#dc3545' : '#28a745',
    className: 'toastify-custom',
  }).showToast();
}
           
// USUARIOS AUTORIZADOS
          function validateCredentials() {
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      // Verificar las credenciales ingresadas
      if ((username === "Arquimedes" && password === "1") ||
          (username === "q" && password === "1") ||
          (username === "Daniela" && password === "Dany1402")) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("gestoresBox").style.display = "block";
        document.getElementById("saludoUsuario").innerText = "Hola, " + username + "!";
      } else {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        alert("Usuario o Contraseña desconocidos");
      }

      return false; // Evitar el envío del formulario
    } 


// BOTON LIMPIAR
    function limpiarFormulario() {
  document.getElementById('cliente').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('correo').value = '';
  document.getElementById('carrito').value = '';
  document.getElementById('tarjeta').value = '';
  document.getElementById('precio1').value = '';
  document.getElementById('detalles').value = '';
}
