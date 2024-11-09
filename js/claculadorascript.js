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

// Función para mostrar/ocultar el panel de colores
function toggleColorPanel() {
    const colorPanel = document.getElementById('colorPanel');
    if (colorPanel.style.display === 'none' || colorPanel.style.display === '') {
        colorPanel.style.display = 'block';
    } else {
        colorPanel.style.display = 'none';
    }
}

// Función para establecer el color de fondo
function setColor(color) {
    document.body.style.backgroundColor = color; // Cambia el color de fondo
    toggleColorPanel(); // Cierra el panel de colores después de seleccionar
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

function copiarResultado() {
    const campoPrecio = document.getElementById("precio").value;
    const campoTasa = document.getElementById("tasa").value;
    const campoComision = document.getElementById("comision").value;
    const campoResultado = document.getElementById("resultado").value;

    // Verificar si alguno de los campos está vacío
    if (campoPrecio === "" || campoTasa === "" || campoComision === "" || campoResultado === "") {
        mostrarNotificacion('Hay campos que debes llenar', 'error');
        return;
    }

    // Generar código basado en la fecha y hora actual
    const fecha = new Date();
    const codigo = `COD-${fecha.getFullYear()}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}${fecha.getHours().toString().padStart(2, '0')}${fecha.getMinutes().toString().padStart(2, '0')}`;

    // Construir el texto a copiar
    const textoACopiar = `
FACTURA DE PEDIDO

Precio del carrito: ${campoPrecio} USD
Tasa del USD: ${campoTasa} CUP x USD
Comisión: ${campoComision} %

TOTAL A PAGAR: ${ campoResultado} CUP

${codigo}
    `;

    // Copiar el texto al portapapeles
    navigator.clipboard.writeText(textoACopiar).then(() => {
        mostrarNotificacion('Datos copiados al portapapeles', 'success'); // Notificación de éxito
    }).catch(err => {
        console.error('Error al copiar: ', err);
        mostrarNotificacion('Error al copiar los datos', 'error'); // Notificación de error
    });
}


// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo) {
    const notification = document.createElement('div');
    notification.classList.add('notification', tipo, 'show'); // Agrega la clase 'show'
    notification.textContent = mensaje;

    document.body.appendChild(notification);

    // Mostrar la notificación
    notification.style.display = 'block'; // Cambia a block para mostrar

    setTimeout(() => {
        notification.classList.remove('show'); // Elimina la clase 'show' para la animación de salida
        setTimeout(() => {
            notification.remove(); // Elimina el elemento del DOM después de la animación
        }, 300); // Tiempo de espera para la animación de salida
    }, 5000); // Mostrar la notificación por 10 segundos
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