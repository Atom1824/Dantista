// Este archivo contiene el código que debes copiar y pegar en Google Apps Script
// No es parte del proyecto web, solo es una referencia

function doPost(e) {
  try {
    // Obtener la hoja de cálculo
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Si no hay encabezados, agregarlos
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 7).setValues([
        ['Timestamp', 'Nombre', 'Email', 'Teléfono', 'Servicio', 'Fecha', 'Hora']
      ]);
    }
    
    // Parsear los datos recibidos
    const data = JSON.parse(e.postData.contents);
    
    // Crear nueva fila con los datos
    const newRow = [
      new Date(), // Timestamp automático
      data.nombre,
      data.email,
      data.telefono,
      data.servicio,
      data.fecha,
      data.hora
    ];
    
    // Agregar la fila a la hoja
    sheet.appendRow(newRow);
    
    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'success',
        message: 'Datos guardados correctamente'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Respuesta de error
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      result: 'success',
      message: 'API funcionando correctamente'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}