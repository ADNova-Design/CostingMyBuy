

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
              console.error('El precio debe ser un número válido');
              return false; // Impedir el envío del formulario
            }

             // Verificar que los campos requeridos no estén vacíos
      if (
        cliente.trim() === '' ||
        telefono.trim() === '' ||
        carrito.trim() === '' ||
        tarjeta.trim() === '' ||
        precio.trim() === '' ||
        detalles.trim() === ''
      ) {
        alert('Por favor, complete todos los campos requeridos.');
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
              'No. Tarjeta Receptora:\n' + tarjeta + '\n' +
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
            console.log('Mensaje enviado exitosamente a Telegram');
            // Puedes agregar aquí cualquier acción adicional después de enviar el mensaje
          } else {
            console.error('Error al enviar el mensaje a Telegram');
          }
        })
        .catch(error => {
          console.error('Error al enviar la solicitud a la API de Telegram:', error);
        });

      return true; // Permitir el envío del formulario
    };
           
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
