document.addEventListener('DOMContentLoaded', function() {
    (function() {
        const denominations = [5, 10, 20, 50, 100, 200, 500, 1000];
        const inputFields = document.querySelectorAll('input[type="text"]:not([readonly])');
        const resultField = document.getElementById('resultado-contadora-total');
        const totalLabel = document.getElementById('total-contadora');

        inputFields.forEach((input, index) => {
            input.addEventListener('input', () => {
                let total = 0;

                inputFields.forEach((field, i) => {
                    const value = parseFloat(field.value); // Obtener el valor del campo
                    // Comprobar si el valor es un número
                    if (isNaN(value)) {
                        console.warn(`Valor no numérico en el campo ${field.id}: ${field.value}`);
                        return; // Si no es un número, no hacer nada y continuar
                    }
                    
                    const subtotal = value * denominations[i]; // Calcular el subtotal
                    total += subtotal; // Sumar el subtotal al total

                    // Actualizar el label con el resultado de la multiplicación
                    const label = field.nextElementSibling;
                    if (label) { // Verificar que label no sea null
                        const denominationText = `Denominación $${denominations[i]}`;
                        label.textContent = value ? `Subtotal: $${subtotal.toFixed(2)}` : denominationText; // Mostrar subtotal o texto de denominación
                    }
                });

                // Solo establecer el resultado si el total es un número
                if (!isNaN(total)) {
                    resultField.value = total.toFixed(2); // Mostrar el total en el campo de resultado
                    totalLabel.textContent = `Total: $${total.toFixed(2)}`; // Actualizar la etiqueta del total
                } else {
                    resultField.value = '0.00'; // Opcional: restablecer a 0 si hay un error
                    totalLabel.textContent = 'Total: $0.00'; // Opcional: restablecer a 0 si hay un error
                }
            });
        });
    })();
});