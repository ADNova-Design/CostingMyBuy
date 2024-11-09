const overlay = document.querySelector('.overlay');
const panels = document.querySelectorAll('.panel');

document.querySelectorAll('.card').forEach((card, index) => {
card.addEventListener('click', () => {
openPanel(index + 1);
});
});

function openPanel(panelIndex) {
    overlay.style.display = 'flex';
    panels.forEach(panel => {
        panel.style.display = 'none';
    });
    document.getElementById('panel' + panelIndex).style.display = 'block';
}

function showPanel3() {
overlay.style.display = 'flex'; // Asegúrate de que el overlay esté visible
panels.forEach(panel => {
panel.style.display = 'none'; // Oculta todos los panels
});
document.getElementById('panel3').style.display = 'block'; // Muestra el panel3
}

function closePanel() {
const overlay = document.querySelector('.overlay');
const panels = document.querySelectorAll('.panel');

overlay.style.display = 'none'; // Oculta la superposición
panels.forEach(panel => {
panel.style.display = 'none'; // Oculta todos los panels
});
}

function openFormulaPanel(panelId) {
const overlay = document.querySelector('.overlay');
const panels = document.querySelectorAll('.panel');
const formulaPanel = document.getElementById(panelId);

overlay.style.display = 'flex';
panels.forEach(panel => {
panel.style.display = 'none'; // Oculta todos los panels
});
formulaPanel.style.display = 'block'; // Muestra solo el panel de fórmula seleccionado

// Asegúrate de que los inputs estén visibles
const formulaInputs = document.querySelector('.formula-inputs');
formulaInputs.style.display = 'block'; // Muestra el contenedor de inputs
}

function limpiarCamposCostoProduccion() {
document.getElementById('costo-materiales').value = '';
document.getElementById('costo-manufactura').value = '';
document.getElementById('resultado-costo-produccion').innerHTML = '';
}

function limpiarCamposPrecioVenta() {
document.getElementById('produccioncost').value = '';
document.getElementById('gananciaPV').value = '';
document.getElementById('resultado-precio-venta').innerHTML = '';
}

function limpiarCamposROI() {
document.getElementById('ganancia').value = '';
document.getElementById('inversion').value = '';
document.getElementById('resultado-roi').innerHTML = '';
}

function calcularCostoProduccion() {
    const costoMateriales = document.getElementById('costo-materiales').value;
    const costoManufactura = document.getElementById('costo-manufactura').value;
    const resultado = parseFloat(costoMateriales) + parseFloat(costoManufactura);
    document.getElementById('resultado-costo-produccion').innerHTML = 'El costo de producción es: $' + resultado.toFixed(2);
}

function calcularPrecioVenta() {
const costoProduccion = parseFloat(document.getElementById('produccioncost').value);
const margenGananciaPV = parseFloat(document.getElementById('gananciaPV').value);

// Verifica que los valores no sean NaN y que el margen no sea 100
if (isNaN(costoProduccion) || isNaN(margenGananciaPV) || margenGananciaPV >= 100) {
document.getElementById('resultado-precio-venta').innerHTML = 'Por favor, ingresa valores válidos y asegúrate de que el margen sea menor a 100%.';
return;
}

// Calcula el precio de venta usando la fórmula proporcionada
const resultado = (costoProduccion / (100 - margenGananciaPV)) * 100;
document.getElementById('resultado-precio-venta').innerHTML = 'El precio de venta es: $' + resultado.toFixed(2);
}

function calcularROI() {
    const ganancia = document.getElementById('ganancia').value;
    const inversion = document.getElementById('inversion').value;
    const resultado = (parseFloat(ganancia) / parseFloat(inversion)) * 100;
    document.getElementById('resultado-roi').innerHTML = 'El ROI es: ' + resultado.toFixed(2) + '%';
}


const addButton = document.getElementById('add-button');
const formPanel = document.getElementById('form-panel');
const loanCards = document.getElementById('loan-cards');
const search = document.getElementById('search');
const saveButton = document.getElementById('save-buttonPt');
const successNotification = document.getElementById('success-notification');
const errorNotification = document.getElementById('error-notification');

addButton.addEventListener('click', () => {
    formPanel.style.display = 'flex';
});

formPanel.addEventListener('click', (e) => {
    if (e.target === formPanel) {
        formPanel.style.display = 'none';
    }
});

saveButton.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const time = document.getElementById('time').value;
    const timeUnit = document.getElementById('time-unit').value;

    // Verificar que todos los campos requeridos estén completos
    if (name && amount && time) {
        const loan = { name, amount, time: `${time} ${timeUnit}` };
        const loans = JSON.parse(localStorage.getItem('loans')) || [];
        loans.push(loan);
        localStorage.setItem('loans', JSON.stringify(loans));
        formPanel.style.display = 'none';
        document.getElementById('name').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('time').value = '';
        displayLoans();
        
        // Mostrar notificación de éxito
        mostrarNotificacion('Datos guardados correctamente', 'success');
    } else {
        // Mostrar notificación de error
        mostrarNotificacion('Rellene los campos vacíos', 'error');
    }
});

function displayLoans() {
    loanCards.innerHTML = '';
    const loans = JSON.parse(localStorage.getItem('loans')) || [];
    loans.forEach((loan, index) => {
        const card = document.createElement('div');
        card.className = 'cardPrestamos';
        card.innerHTML = `
            <strong>${loan.name}</strong><br>
            Monto: $${loan.amount}<br>
            Tiempo: ${loan.time}
            <button class="delete-button" onclick="deleteLoan(${index})">Eliminar</button>
        `;
        loanCards.appendChild(card);
    });
}

function deleteLoan(index) {
    const loans = JSON.parse(localStorage.getItem('loans')) || [];
    loans.splice(index, 1);
    localStorage.setItem('loans', JSON.stringify(loans));
    displayLoans();
}

// Función de búsqueda
search.addEventListener('input', () => {
    const filter = search.value.toLowerCase();
    const cards = loanCards.getElementsByClassName('cardPrestamos');
    Array.from(cards).forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(filter) ? '' : 'none';
    });
});

// Cargar préstamos al iniciar
displayLoans();


// Función para abrir la modal
function openModal() {
    document.getElementById('whatsappModal').style.display = 'block';
}

// Función para cerrar la modal
function closeModal() {
    document.getElementById('whatsappModal').style.display = 'none';
}

// Asignar el evento de clic al elemento "Ayuda"
document.getElementById('helpModal').onclick = function() {
    openModal();
};

// Asignar el evento de clic al botón "Aceptar"
document.getElementById('acceptBtn').onclick = function() {
    // Redirigir a WhatsApp con el mensaje preestablecido
    const phoneNumber = '+18632541732';
    const message = 'Necesito Soporte para el siguiente problema:';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    closeModal();
};

// Asignar el evento de clic al botón "Cancelar"
document.getElementById('cancelBtn').onclick = function() {
    closeModal();
};

// Cerrar la modal si el usuario hace clic fuera de la modal
window.onclick = function(event) {
    const modal = document.getElementById('whatsappModal');
    if (event.target == modal) {
        closeModal();
    }
};

// Asignar el evento de clic al elemento "Sitio Web"
document.getElementById('sitioWeb').onclick = function() {
    window.open('https://adnova-design.github.io/ADNova/', '_blank'); // Abre la URL en una nueva pestaña
};