document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Botón de Imprimir
    const btnImprimir = document.getElementById('btn-imprimir');
    if (btnImprimir) {
        btnImprimir.addEventListener('click', () => {
            window.print();
        });
    }

    // 2. Sincronización de datos del Remitente
    const inputsTop = document.querySelectorAll('.input-remitente-top');
    const inputsEtiqueta = document.querySelectorAll('.input-remitente-etiqueta');

    function sincronizarRemitente() {
        if (inputsTop.length >= 5 && inputsEtiqueta.length >= 4) {
            inputsEtiqueta[0].value = inputsTop[0].value; 
            inputsEtiqueta[1].value = inputsTop[1].value; 
            inputsEtiqueta[2].value = inputsTop[2].value; 
            
            const localidad = inputsTop[3].value;
            const provincia = inputsTop[4].value;
            inputsEtiqueta[3].value = `${localidad} - ${provincia}`; 
        }
    }

    inputsTop.forEach(input => {
        input.addEventListener('input', sincronizarRemitente);
    });
    sincronizarRemitente(); 

    // 3. Autocompletar Fecha de hoy
    const inputFecha = document.getElementById('input-fecha');
    if (inputFecha && inputFecha.value === '') {
        const hoy = new Date();
        const dia = String(hoy.getDate()).padStart(2, '0');
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const anio = hoy.getFullYear();
        inputFecha.value = `${dia}/${mes}/${anio}`;
    }

    // 4. Mayúsculas en Aclaración
    const inputAclaracion = document.getElementById('input-aclaracion');
    if (inputAclaracion) {
        inputAclaracion.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
    }

    // 5. SOLUCIÓN: Sincronización + Achique automático de texto (Auto-fit)
    const textarea = document.getElementById('contenido-carta');
    const divPrint = document.getElementById('contenido-carta-print');

    function ajustarTexto() {
        if (!textarea || !divPrint) return;

        // 1. Pasamos el texto al div de impresión
        divPrint.textContent = textarea.value;

        // 2. Lógica de Auto-Fit (Achicar letra si es muy largo)
        // El espacio disponible en la hoja es de aprox 220px de alto (sin contar el padding).
        // El div de impresión tiene el mismo ancho que la hoja, así que medimos su altura real.
        
        let fontSize = 12; // Tamaño base de la letra
        divPrint.style.fontSize = fontSize + 'px';
        
        // Mientras el texto ocupe más de 230px (el espacio disponible en la hoja A4), achicamos
        while (divPrint.scrollHeight > 230 && fontSize > 7) {
            fontSize -= 0.5;
            divPrint.style.fontSize = fontSize + 'px';
        }
        
        // Para que en pantalla se vea achicado también, aplicamos el tamaño al textarea
        textarea.style.fontSize = fontSize + 'px';
    }

    if (textarea) {
        textarea.addEventListener('input', ajustarTexto);
        ajustarTexto(); // Ejecutar al cargar
        
        // Antes de imprimir, nos aseguramos de que esté actualizado
        window.addEventListener('beforeprint', ajustarTexto);
    }
});