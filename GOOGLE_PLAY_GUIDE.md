# 📱 Guía para Subir VUESTRAFIESTA a Google Play Console

**Versión de la app:** 1.0.0  
**Nombre:** VUESTRAFIESTA  
**Descripción:** Pide canciones a tu DJ en bodas sin registro. ¡Que empiece la fiesta!

---

## 📋 Requisitos Previos

Antes de subir la app a Google Play Console, asegúrate de tener:

- ✅ Cuenta de Google Play Developer ($25 USD - pago único)
- ✅ Certificado de firma (keystore) para Android
- ✅ APK o AAB (Android App Bundle) compilado
- ✅ Iconos y capturas de pantalla
- ✅ Descripción de la app
- ✅ Política de privacidad
- ✅ Términos de servicio

---

## 🔑 Paso 1: Crear Certificado de Firma (Keystore)

Si aún no tienes un keystore, crea uno:

```bash
keytool -genkey-dsk -v -keystore vuestrafiesta-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias vuestrafiesta-key
```

**Información a proporcionar:**
- Contraseña del keystore: `[tu_contraseña_segura]`
- Nombre y apellido: VUESTRAFIESTA
- Unidad organizativa: Music
- Organización: VUESTRAFIESTA
- Ciudad: [Tu ciudad]
- Provincia: [Tu provincia]
- País: ES (España)

**Guarda este archivo en un lugar seguro.** Lo necesitarás para futuras actualizaciones.

---

## 🏗️ Paso 2: Compilar APK/AAB para Producción

### Opción A: Usar EAS Build (Recomendado)

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Loguarse en Expo
eas login

# Compilar para Android
eas build --platform android --auto-submit
```

### Opción B: Compilar Localmente

```bash
# Compilar AAB (Android App Bundle)
cd vuestrafiesta-app
eas build --platform android --type app-bundle

# O compilar APK
eas build --platform android --type apk
```

---

## 📦 Información de la App para Google Play

### Nombre de la App
```
VUESTRAFIESTA
```

### Descripción Corta (80 caracteres máximo)
```
Pide canciones a tu DJ en bodas sin registro
```

### Descripción Completa (4000 caracteres máximo)
```
VUESTRAFIESTA es la app perfecta para bodas modernas.

🎵 CARACTERÍSTICAS:
• Pide canciones sin registro
• Acceso inmediato con código de 4 dígitos
• Modo para invitados, novios y DJ
• Notificaciones en tiempo real
• Mensajes de felicitación personalizados
• Modo oscuro automático
• Funciona sin conexión a internet

👥 TRES MODOS:

🎉 INVITADO
Pide tu canción favorita con un mensaje de felicitación. 
Acceso fácil con código de la boda.

💍 NOVIOS
Crea tu lista de canciones imprescindibles.
Comparte el código con tu DJ.

🎧 DJ
Gestiona todas las peticiones en tiempo real.
Visualiza estadísticas y prioridades.

✨ VENTAJAS:
• Sin registro requerido
• Acceso instantáneo
• Interfaz intuitiva
• Almacenamiento local
• Funciona en todos los dispositivos
• Diseño moderno y elegante

Perfecta para:
✓ Bodas
✓ Fiestas
✓ Eventos
✓ Celebraciones

¡Que empiece la fiesta!
```

### Categoría
```
Música
```

### Clasificación de Contenido
```
Apta para todas las edades (PEGI 3)
```

### Palabras Clave (máximo 5)
```
boda, música, DJ, canciones, fiesta
```

---

## 🖼️ Activos Visuales Requeridos

### Icono de la App
- **Tamaño:** 512x512 px
- **Formato:** PNG
- **Ubicación:** `assets/images/icon.png`
- **Archivo:** Ya incluido en el proyecto

### Capturas de Pantalla (Mínimo 2, máximo 8)
- **Tamaño:** 1080x1920 px (9:16 vertical)
- **Formato:** PNG o JPEG
- **Ubicación:** Ya generadas en `assets/images/screenshot-*.png`

**Capturas incluidas:**
1. `screenshot-1-home.png` - Pantalla de inicio
2. `screenshot-2-guest.png` - Modo invitado
3. `screenshot-3-dj.png` - Modo DJ
4. `screenshot-4-couple.png` - Modo novios

### Imagen de Característica (Feature Graphic)
- **Tamaño:** 1024x500 px
- **Formato:** PNG o JPEG
- **Descripción:** Banner promocional de la app

### Video Promocional (Opcional)
- **Duración:** 15-30 segundos
- **Resolución:** 1080p mínimo
- **Formato:** MP4

---

## 🔐 Información de Privacidad y Seguridad

### Política de Privacidad
```
URL: https://vuestrafiesta.app/privacy
```

**Contenido mínimo:**
- Datos que recopila la app
- Cómo se usan los datos
- Derechos del usuario
- Contacto para privacidad

### Permisos Solicitados
```
- POST_NOTIFICATIONS: Para notificaciones de peticiones
```

### Clasificación de Contenido
```
- Violencia: No
- Lenguaje: No
- Contenido sexual: No
- Drogas: No
- Alcohol/Tabaco: No
- Juego: No
```

---

## 📝 Paso 3: Crear Cuenta en Google Play Console

1. Ve a [Google Play Console](https://play.google.com/console)
2. Haz clic en "Crear aplicación"
3. Completa la información:
   - **Nombre:** VUESTRAFIESTA
   - **Idioma predeterminado:** Español
   - **Tipo de app:** Aplicación
   - **Categoría:** Música
   - **Clasificación de contenido:** Apta para todas las edades

---

## 🚀 Paso 4: Subir la App

### En Google Play Console:

1. **Ir a "Versiones" → "Producción"**
2. **Hacer clic en "Crear nueva versión"**
3. **Subir el archivo AAB o APK:**
   - Arrastra el archivo `.aab` o `.apk`
   - O haz clic para seleccionar

4. **Completar información de la versión:**
   - Nombre de versión: `1.0.0`
   - Notas de la versión (español):
   ```
   🎉 Versión inicial de VUESTRAFIESTA
   
   ✨ Características:
   • Pide canciones sin registro
   • Modo para invitados, novios y DJ
   • Notificaciones en tiempo real
   • Modo oscuro automático
   
   ¡Que empiece la fiesta!
   ```

5. **Revisar y confirmar:**
   - Verificar que toda la información es correcta
   - Hacer clic en "Guardar"

---

## ✅ Paso 5: Completar Información de la Tienda

### En la sección "Información de la tienda":

1. **Título de la app:** VUESTRAFIESTA
2. **Descripción breve:** Pide canciones a tu DJ en bodas sin registro
3. **Descripción completa:** [Ver sección anterior]
4. **Icono de la app:** Subir `icon.png` (512x512)
5. **Capturas de pantalla:** Subir las 4 capturas
6. **Imagen de característica:** Subir banner 1024x500
7. **Categoría:** Música
8. **Clasificación de contenido:** Apta para todas las edades

---

## 🔍 Paso 6: Configurar Clasificación de Contenido

1. Ir a "Clasificación de contenido"
2. Completar el cuestionario:
   - Violencia: No
   - Lenguaje: No
   - Contenido sexual: No
   - Drogas: No
   - Alcohol/Tabaco: No
   - Juego: No
3. Guardar

---

## 📋 Paso 7: Configurar Política de Privacidad

1. Ir a "Política de privacidad"
2. Proporcionar URL de política de privacidad
3. Confirmar que la app cumple con GDPR

---

## 💳 Paso 8: Configurar Información de Pago

1. Ir a "Configuración de la aplicación"
2. Configurar información de pago y impuestos
3. Seleccionar países donde estará disponible

---

## 🎯 Paso 9: Revisar y Enviar

1. **Revisar toda la información:**
   - Nombre de la app
   - Descripción
   - Capturas
   - Icono
   - Política de privacidad
   - Permisos

2. **Hacer clic en "Revisar"**

3. **Hacer clic en "Enviar para revisión"**

---

## ⏳ Tiempo de Revisión

- **Tiempo típico:** 2-4 horas
- **Tiempo máximo:** 24 horas
- **Notificación:** Recibirás email cuando sea aprobada

---

## ✨ Después de la Aprobación

Una vez aprobada, la app estará disponible en:
- Google Play Store
- Búsqueda de Google Play
- Perfiles de desarrollador

---

## 🔄 Actualizaciones Futuras

Para futuras versiones:

1. Incrementar `versionCode` en `app.json`
2. Actualizar `version` a `1.0.1`, `1.0.2`, etc.
3. Compilar nuevo AAB/APK
4. Subir en "Crear nueva versión"
5. Enviar para revisión

---

## 📞 Soporte

Si tienes problemas:

1. Consulta [Centro de ayuda de Google Play](https://support.google.com/googleplay)
2. Revisa los requisitos técnicos
3. Verifica que el AAB/APK sea válido
4. Contacta con soporte de Google Play

---

## ✅ Checklist Final

Antes de enviar:

- [ ] Cuenta de Google Play Developer creada
- [ ] Certificado de firma (keystore) generado
- [ ] AAB/APK compilado y probado
- [ ] Icono 512x512 px
- [ ] 4 capturas de pantalla 1080x1920 px
- [ ] Descripción completa
- [ ] Política de privacidad
- [ ] Clasificación de contenido completada
- [ ] Información de pago configurada
- [ ] Todo revisado y correcto

---

## 🎉 ¡Listo!

Tu app VUESTRAFIESTA está lista para publicarse en Google Play Store. Sigue estos pasos y tendrás tu app disponible para millones de usuarios en Android.

**Fecha de preparación:** 11 de Febrero de 2026  
**Estado:** ✅ LISTO PARA PRODUCCIÓN
