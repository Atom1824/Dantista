# Configuración de Google Sheets

## Pasos para configurar Google Apps Script:

### 1. Crear una nueva hoja de Google Sheets
- Ve a [Google Sheets](https://sheets.google.com)
- Crea una nueva hoja de cálculo
- Nómbrala "Citas Dentales" o como prefieras

### 2. Abrir Google Apps Script
- En tu hoja de Google Sheets, ve a **Extensiones** > **Apps Script**
- Se abrirá el editor de Google Apps Script

### 3. Reemplazar el código
- Borra todo el código que aparece por defecto
- Copia y pega el código del archivo `google-apps-script.js`

### 4. Guardar y desplegar
- Guarda el proyecto (Ctrl+S)
- Haz clic en **Desplegar** > **Nueva implementación**
- Selecciona **Aplicación web** como tipo
- Configura:
  - **Ejecutar como**: Tu cuenta
  - **Quién tiene acceso**: Cualquier persona
- Haz clic en **Desplegar**

### 5. Obtener la URL
- Copia la **URL de la aplicación web** que se genera
- Esta URL debe reemplazar la que está en `consulta.js`

### 6. Permisos
- La primera vez que ejecutes, Google te pedirá permisos
- Acepta todos los permisos necesarios

### 7. Verificar funcionamiento
- Prueba enviando el formulario desde tu sitio web
- Verifica que los datos aparezcan en tu hoja de Google Sheets

## Estructura de la hoja:
La hoja tendrá las siguientes columnas:
- **Timestamp**: Fecha y hora automática
- **Nombre**: Nombre del paciente
- **Email**: Correo electrónico
- **Teléfono**: Número de teléfono
- **Servicio**: Servicio solicitado
- **Fecha**: Fecha de la cita
- **Hora**: Hora de la cita

## Solución de problemas:

### Si no funciona:
1. Verifica que la URL en `consulta.js` sea correcta
2. Asegúrate de que los permisos estén configurados correctamente
3. Revisa la consola del navegador para errores
4. Verifica que el Google Apps Script esté desplegado como "Aplicación web"

### Para probar la conexión:
- Abre la URL del Google Apps Script en tu navegador
- Deberías ver: `{"result":"success","message":"API funcionando correctamente"}`