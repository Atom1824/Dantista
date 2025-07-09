document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector(".formulario");

  function esHorarioValido(fechaStr, horaStr) {
    const fecha = new Date(fechaStr + "T" + horaStr + ":00");
    const diaSemana = fecha.getDay();
    const hora = fecha.getHours();
    
    // Domingo = 0, cerrado
    if (diaSemana === 0) return false;
    
    // Lunes a Viernes (1-5): 9:00 AM - 6:00 PM
    if (diaSemana >= 1 && diaSemana <= 5) {
      if (hora < 9 || hora >= 18) return false;
    } 
    // Sábado (6): 10:00 AM - 4:00 PM
    else if (diaSemana === 6) {
      if (hora < 10 || hora >= 16) return false;
    }
    
    return true;
  }

  function esFechaHoraEnElFuturo(fechaStr, horaStr) {
    const fechaSeleccionada = new Date(fechaStr + "T" + horaStr + ":00");
    const ahora = new Date();
    return fechaSeleccionada > ahora;
  }

  function esEmailValido(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function esTelefonoValido(telefono) {
    const re = /^\d{7,}$/;
    return re.test(telefono);
  }

  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const servicio = document.getElementById("servicio").value;
      const fecha = document.getElementById("fecha").value;
      const hora = document.getElementById("hora").value;

      // Validación de campos vacíos
      if (!nombre || !email || !telefono || !servicio || !fecha || !hora) {
        Swal.fire({
          title: "Faltan campos por llenar",
          text: "Por favor completa todos los campos antes de enviar.",
          icon: "warning",
          confirmButtonText: "Ok"
        });
        return;
      }

      // Validación de email
      if (!esEmailValido(email)) {
        Swal.fire({
          title: "Email inválido",
          text: "Por favor ingresa un correo electrónico válido.",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }

      // Validación de teléfono
      if (!esTelefonoValido(telefono)) {
        Swal.fire({
          title: "Teléfono inválido",
          text: "Por favor ingresa un número de teléfono válido (solo números, mínimo 7 dígitos).",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }

      // Validación de fecha y hora futura
      if (!esFechaHoraEnElFuturo(fecha, hora)) {
        Swal.fire({
          title: "Fecha no válida",
          text: "No puedes agendar una cita en una fecha u hora pasada.",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }

      // Validación de horario de atención
      if (!esHorarioValido(fecha, hora)) {
        Swal.fire({
          title: "Horario no permitido",
          text:
            "Las citas solo pueden agendarse en los horarios de atención:\n" +
            "Lunes a Viernes: 9:00 AM - 6:00 PM\n" +
            "Sábado: 10:00 AM - 4:00 PM\n" +
            "Domingo: Cerrado",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }

      // Mostrar loading
      Swal.fire({
        title: 'Enviando...',
        text: 'Por favor espera mientras procesamos tu solicitud.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Preparar datos para enviar
      const datos = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        servicio: servicio,
        fecha: fecha,
        hora: hora,
        timestamp: new Date().toISOString()
      };

      // URL del Google Apps Script
      const urlGoogleAppsScript = "https://script.google.com/macros/s/AKfycbzBXsYoTmRJzsLeoawoNXFPM1VDfp-P14aXTzfJr56LoDMKOd8I6nwtYnqD3gtr6YIZRg/exec";

      // Enviar datos
      fetch(urlGoogleAppsScript, {
        method: "POST",
        mode: 'no-cors', // Importante para Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
      })
      .then(() => {
        // Con no-cors, siempre llegamos aquí independientemente del resultado
        Swal.fire({
          title: "¡Formulario enviado!",
          text: "Gracias por tu consulta. Nos pondremos en contacto contigo pronto.",
          icon: "success",
          confirmButtonText: "Aceptar"
        });
        formulario.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire({
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor. Intenta más tarde.",
          icon: "error",
          confirmButtonText: "Ok"
        });
      });
    });
  }
});