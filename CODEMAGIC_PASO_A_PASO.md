# 📱 Codemagic: Guía Paso a Paso (FÁCIL)

**Tiempo total:** 30 minutos  
**Dificultad:** Muy Fácil ⭐

---

## 🎯 Resumen Rápido

1. Crear cuenta en Codemagic
2. Conectar tu repositorio GitHub
3. Configurar build
4. Ejecutar build
5. Descargar APK
6. Subir a Google Play Store

---

## 📝 PASO 1: Crear Cuenta en Codemagic

### 1.1 Ir a Codemagic

Abre en tu navegador: **https://codemagic.io**

### 1.2 Hacer Clic en "Sign Up"

En la esquina superior derecha, haz clic en **"Sign Up"** o **"Get Started"**

### 1.3 Elegir Opción de Registro

Tienes 3 opciones:
- **GitHub** (RECOMENDADO - más fácil)
- **Google**
- **Email**

**Haz clic en "GitHub"** si tienes cuenta de GitHub

### 1.4 Autorizar Codemagic

Se abrirá GitHub pidiendo autorización. Haz clic en **"Authorize codemagic"**

### 1.5 Completar Perfil

- Nombre: Tu nombre
- Email: Tu email
- Haz clic en **"Create Account"**

✅ **¡Cuenta creada!**

---

## 🔗 PASO 2: Conectar tu Repositorio

### 2.1 Seleccionar Repositorio

Después de crear cuenta, verás una pantalla que dice:
**"Select a repository"**

### 2.2 Buscar tu Repositorio

- Si tienes el código en GitHub: busca **"vuestrafiesta-app"**
- Si no lo tienes en GitHub: necesitas subirlo primero (ver sección "Alternativa" abajo)

### 2.3 Hacer Clic en tu Repositorio

Cuando lo encuentres, haz clic en él

✅ **¡Repositorio conectado!**

---

## ⚙️ PASO 3: Configurar el Build

### 3.1 Ir a Settings

En la pantalla del proyecto, haz clic en **"Settings"** (engranaje)

### 3.2 Configurar Android

En el menú izquierdo, haz clic en **"Android"**

### 3.3 Llenar Información Básica

**Build type:** Selecciona **"Release"**

**Build format:** Selecciona **"APK"** (o "AAB" si prefieres)

### 3.4 Configurar Versión de Android

Desplázate hacia abajo y verifica:

- **Target SDK:** 34 (o superior)
- **Min SDK:** 24
- **Build tools version:** 34.0.0

### 3.5 Configurar Keystore (Importante)

**Opción A: Dejar que Codemagic lo genere automáticamente**

- Marca la opción: **"Generate keystore"**
- Codemagic lo hará por ti automáticamente ✅

**Opción B: Usar tu propio keystore**

Si ya tienes un keystore:
- Marca: **"Upload keystore"**
- Sube tu archivo `.keystore`
- Ingresa contraseña

### 3.6 Guardar Configuración

Haz clic en **"Save"** en la parte inferior

✅ **¡Configuración completada!**

---

## 🚀 PASO 4: Ejecutar el Build

### 4.1 Ir a Builds

En el menú superior, haz clic en **"Builds"**

### 4.2 Iniciar Nuevo Build

Haz clic en el botón **"Start new build"** o **"Build"** (color azul)

### 4.3 Seleccionar Rama

- **Branch:** main (o la rama que uses)
- **Workflow:** Android release

Haz clic en **"Build"**

### 4.4 Esperar a que Compile

Verás una pantalla con:
- ⏳ "Building..."
- Barra de progreso
- Logs del build

**Tiempo esperado:** 10-15 minutos

**Mientras esperas, puedes:**
- Ir a tomar café ☕
- Revisar emails
- Hacer otra cosa

### 4.5 Build Completado

Cuando termine, verás:
- ✅ "Build successful"
- Botón **"Download"**

✅ **¡Build completado!**

---

## 📥 PASO 5: Descargar el APK

### 5.1 Hacer Clic en Download

En la pantalla de build completado, haz clic en **"Download"**

### 5.2 Seleccionar Archivo

Se descargará un archivo llamado:
- `app-release.apk` (si elegiste APK)
- `app-release.aab` (si elegiste AAB)

Guárdalo en un lugar seguro (Desktop o carpeta de Descargas)

### 5.3 Verificar Descarga

Abre tu carpeta de Descargas y verifica que el archivo esté ahí

✅ **¡APK descargado!**

---

## 🎮 PASO 6: Probar el APK (Opcional)

Si quieres probar antes de publicar:

### 6.1 Conectar Dispositivo Android

Conecta tu teléfono Android a la computadora por USB

### 6.2 Instalar APK

Abre terminal y ejecuta:

```bash
adb install app-release.apk
```

### 6.3 Probar la App

Abre tu teléfono y busca "VUESTRAFIESTA" en las apps

✅ **¡App instalada y funcionando!**

---

## 🎯 PASO 7: Subir a Google Play Store

### 7.1 Acceder a Google Play Console

Ve a: **https://play.google.com/console**

Inicia sesión con tu cuenta de Google

### 7.2 Seleccionar tu App

Si ya creaste la app en Play Store, selecciónala

Si no la creaste:
1. Haz clic en **"Crear app"**
2. Llena información básica
3. Haz clic en **"Crear"**

### 7.3 Ir a Versiones

En el menú izquierdo, haz clic en:
**Versiones** → **Producción**

### 7.4 Crear Nueva Versión

Haz clic en **"Crear nueva versión"**

### 7.5 Subir el APK/AAB

**Opción A: Arrastra el archivo**

Arrastra tu archivo `app-release.apk` o `app-release.aab` al área de carga

**Opción B: Haz clic para seleccionar**

Haz clic en el área y selecciona el archivo

### 7.6 Esperar a que Procese

Google procesará el archivo (2-5 minutos)

Verás:
- ⏳ "Procesando..."
- ✅ "Archivo cargado correctamente"

### 7.7 Llenar Información de la Versión

**Nombre de versión:** 1.0.2

**Notas de la versión:**
```
🎉 VUESTRAFIESTA v1.0.2

✨ Características:
• Pide canciones sin registro
• Modo para invitados, novios y DJ
• Notificaciones en tiempo real
• Modo oscuro automático
• Compatible con tablets y plegables

🎵 ¡Que empiece la fiesta!
```

### 7.8 Revisar Información

Haz clic en **"Revisar"**

Verifica que todo esté correcto:
- ✅ APK/AAB cargado
- ✅ Versión correcta
- ✅ Información completada

### 7.9 Enviar para Revisión

Haz clic en **"Enviar para revisión"** o **"Publicar"**

### 7.10 Esperar Aprobación

Google revisará tu app (típicamente 2-4 horas)

Recibirás un email cuando sea aprobada

✅ **¡Tu app está en Google Play Store!**

---

## 🔄 Versiones Futuras (v1.0.3, v1.0.4, etc.)

Para compilar nuevas versiones:

### Paso 1: Actualizar Versión

En `app.config.ts`:
```typescript
version: "1.0.3",  // Cambiar versión
versionCode: 3,    // Incrementar
```

### Paso 2: Hacer Commit

```bash
git add .
git commit -m "v1.0.3: Nuevas características"
git push
```

### Paso 3: Compilar en Codemagic

1. Ve a Codemagic
2. Haz clic en **"Start new build"**
3. Espera 10-15 minutos
4. Descarga APK

### Paso 4: Subir a Play Store

Repite los pasos 7.3 a 7.10

---

## ⚠️ Solucionar Problemas

### Error: "Build failed"

**Solución:**
1. Haz clic en el build fallido
2. Mira los logs (sección roja)
3. Copia el error
4. Busca en Google: "[error message]"

### Error: "Keystore not found"

**Solución:**
1. Ve a Settings
2. Marca "Generate keystore"
3. Guarda
4. Intenta de nuevo

### Error: "Repository not found"

**Solución:**
1. Verifica que tu repositorio sea público
2. O conecta tu cuenta de GitHub nuevamente

### El build tarda más de 30 minutos

**Solución:**
- Es normal la primera vez
- Futuras compilaciones serán más rápidas
- Espera a que termine

---

## ✅ Checklist Final

- [ ] Crear cuenta en Codemagic
- [ ] Conectar repositorio GitHub
- [ ] Configurar Android build
- [ ] Generar/subir keystore
- [ ] Ejecutar primer build
- [ ] Descargar APK
- [ ] Probar en dispositivo (opcional)
- [ ] Subir a Google Play Store
- [ ] Completar información
- [ ] Enviar para revisión
- [ ] ✅ ¡App publicada!

---

## 📊 Resumen de Tiempos

| Tarea | Tiempo |
|-------|--------|
| Crear cuenta | 5 min |
| Conectar repo | 2 min |
| Configurar build | 5 min |
| Compilar | 10-15 min |
| Descargar | 1 min |
| Subir a Play Store | 5 min |
| Revisión de Google | 2-4 horas |
| **TOTAL** | **30 min + 2-4 horas** |

---

## 🎉 ¡Felicidades!

Cuando veas tu app en Google Play Store, habrás completado:

✅ Desarrollo de app  
✅ Compilación  
✅ Publicación  
✅ Distribución global  

**¡Tu app está disponible para millones de usuarios!**

---

## 📞 Soporte

Si tienes problemas:

1. **Documentación de Codemagic:** https://docs.codemagic.io
2. **Foro de Codemagic:** https://community.codemagic.io
3. **Google Play Help:** https://support.google.com/googleplay

---

**Última actualización:** 11 de Febrero de 2026  
**Versión:** 1.0.2  
**Estado:** ✅ LISTO PARA PUBLICAR CON CODEMAGIC

**¡Buena suerte! 🚀**
