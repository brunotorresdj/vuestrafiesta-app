# 💻 Compilar VUESTRAFIESTA en tu Computadora - Paso a Paso

**Tiempo total:** 30-45 minutos  
**Dificultad:** Fácil ⭐⭐

---

## 📋 Requisitos Previos

Antes de empezar, necesitas tener instalado:

1. **Node.js 18 o superior**
2. **Android Studio** (incluye Android SDK y Gradle)
3. **Java JDK 11 o superior**

Si no los tienes, sigue las instrucciones abajo.

---

## 🔧 PASO 0: Instalar Requisitos (Si no los tienes)

### 0.1 Instalar Node.js

**Windows/Mac/Linux:**

1. Ve a: https://nodejs.org
2. Descarga la versión **LTS** (recomendada)
3. Ejecuta el instalador y sigue los pasos
4. Abre terminal/PowerShell y verifica:
   ```bash
   node --version
   npm --version
   ```
   Debe mostrar versiones (ej: v18.17.0)

### 0.2 Instalar Android Studio

**Windows:**

1. Ve a: https://developer.android.com/studio
2. Descarga "Android Studio"
3. Ejecuta el instalador
4. Sigue los pasos (acepta todo por defecto)
5. Cuando termine, abre Android Studio
6. Ve a **Settings** → **SDK Manager**
7. Verifica que esté instalado:
   - Android SDK 34
   - Android SDK Build-Tools 34.0.0
   - Android Emulator

**Mac:**

1. Ve a: https://developer.android.com/studio
2. Descarga "Android Studio for Mac"
3. Arrastra a Applications
4. Abre Android Studio
5. Ve a **Android Studio** → **Preferences** → **SDK Manager**
6. Verifica que esté instalado:
   - Android SDK 34
   - Android SDK Build-Tools 34.0.0

**Linux:**

1. Ve a: https://developer.android.com/studio
2. Descarga "Android Studio for Linux"
3. Extrae el archivo
4. Ejecuta: `./android-studio/bin/studio.sh`
5. Sigue los pasos de instalación

### 0.3 Instalar Java JDK 11

**Windows:**

1. Ve a: https://www.oracle.com/java/technologies/javase-jdk11-downloads.html
2. Descarga JDK 11 para Windows
3. Ejecuta el instalador
4. Verifica en terminal:
   ```bash
   java -version
   ```

**Mac:**

```bash
brew install openjdk@11
```

**Linux:**

```bash
sudo apt-get install openjdk-11-jdk
```

---

## 📥 PASO 1: Descargar el Proyecto

### 1.1 Descargar desde Manus

1. En la interfaz de Manus, ve al checkpoint `manus-webdev://a68381a7`
2. Haz clic en el botón **"Descargar"** (esquina superior derecha)
3. Se descargará un archivo ZIP llamado `vuestrafiesta-app.zip`

### 1.2 Extraer el Archivo

**Windows:**

1. Abre tu carpeta de **Descargas**
2. Haz clic derecho en `vuestrafiesta-app.zip`
3. Selecciona **"Extraer aquí"** o **"Extract All"**
4. Se creará una carpeta llamada `vuestrafiesta-app`

**Mac/Linux:**

1. Abre terminal
2. Ve a la carpeta de descargas:
   ```bash
   cd ~/Downloads
   ```
3. Extrae el archivo:
   ```bash
   unzip vuestrafiesta-app.zip
   ```

### 1.3 Abrir Terminal en la Carpeta

**Windows (PowerShell):**

1. Abre la carpeta `vuestrafiesta-app`
2. Haz clic en la barra de direcciones
3. Escribe: `powershell`
4. Presiona Enter
5. Se abrirá PowerShell en esa carpeta

**Mac/Linux:**

1. Abre terminal
2. Navega a la carpeta:
   ```bash
   cd ~/Downloads/vuestrafiesta-app
   ```

---

## 📦 PASO 2: Instalar Dependencias

En la terminal, ejecuta:

```bash
npm install
```

**Esto descargará todos los paquetes necesarios (toma 5-10 minutos)**

Espera a que termine. Verás un mensaje como:
```
added 500+ packages in 5m
```

---

## 🔨 PASO 3: Generar Código Nativo de Android

En la terminal, ejecuta:

```bash
npx expo prebuild --clean --platform android
```

**Esto crea la carpeta `android` con el código nativo (toma 2-3 minutos)**

Verás mensajes como:
```
✔ Cleared android code
✔ Created native directory
✔ Finished prebuild
```

---

## 🏗️ PASO 4: Compilar el AAB (Android App Bundle)

### 4.1 Navegar a la Carpeta Android

En la terminal, ejecuta:

```bash
cd android
```

### 4.2 Compilar

**Opción A: Compilar AAB (para Google Play Store - RECOMENDADO)**

```bash
./gradlew bundleRelease
```

**Opción B: Compilar APK (para pruebas)**

```bash
./gradlew assembleRelease
```

**En Windows, si no funciona, intenta:**

```bash
gradlew.bat bundleRelease
```

### 4.3 Esperar a que Compile

**Tiempo esperado: 10-20 minutos**

Verás muchos mensajes. Espera a que termine.

**Cuando termine, verás:**

```
BUILD SUCCESSFUL in XXs
```

---

## ✅ PASO 5: Ubicar el Archivo Compilado

### 5.1 Buscar el AAB

El archivo compilado estará en:

```
vuestrafiesta-app/android/app/build/outputs/bundle/release/app-release.aab
```

O si compilaste APK:

```
vuestrafiesta-app/android/app/build/outputs/apk/release/app-release.apk
```

### 5.2 Verificar que Existe

En terminal, ejecuta:

```bash
ls -lh app/build/outputs/bundle/release/app-release.aab
```

Debe mostrar algo como:

```
-rw-r--r--  1 usuario  staff  38M  Feb 12 10:30 app-release.aab
```

---

## 📱 PASO 6: Probar en Dispositivo (Opcional)

Si quieres probar antes de publicar:

### 6.1 Conectar Dispositivo Android

1. Conecta tu teléfono Android a la computadora por USB
2. En el teléfono, activa **"Modo de Desarrollador"**:
   - Ve a **Configuración** → **Acerca de**
   - Toca **"Número de compilación"** 7 veces
   - Vuelve a **Configuración** → **Opciones de Desarrollador**
   - Activa **"Depuración USB"**

### 6.2 Instalar APK

En terminal, ejecuta:

```bash
adb install app/build/outputs/apk/release/app-release.apk
```

### 6.3 Probar la App

En tu teléfono, busca "VUESTRAFIESTA" en las apps y ábrela

---

## 🎯 PASO 7: Subir a Google Play Store

### 7.1 Acceder a Google Play Console

1. Ve a: https://play.google.com/console
2. Inicia sesión con tu cuenta de Google

### 7.2 Crear o Seleccionar App

Si es tu primera vez:
1. Haz clic en **"Crear app"**
2. Llena los datos básicos
3. Haz clic en **"Crear"**

Si ya existe:
1. Selecciona **"VUESTRAFIESTA"**

### 7.3 Ir a Versiones

En el menú izquierdo:
1. Haz clic en **"Versiones"**
2. Luego en **"Producción"**

### 7.4 Crear Nueva Versión

1. Haz clic en **"Crear nueva versión"**

### 7.5 Subir el AAB

1. En la sección **"Archivos de la app"**
2. Haz clic en **"Subir"** o arrastra el archivo
3. Selecciona: `app-release.aab` (de tu computadora)
4. Espera a que se procese (2-5 minutos)

### 7.6 Llenar Información

**Nombre de versión:**
```
1.0.2
```

**Notas de la versión:**
```
🎉 VUESTRAFIESTA v1.0.2

✨ Características principales:
• Pide canciones sin necesidad de registro
• Modos para invitados, novios y DJ
• Notificaciones en tiempo real
• Modo oscuro automático
• Compatible con tablets y dispositivos plegables

🎵 ¡Que empiece la fiesta!
```

### 7.7 Revisar y Enviar

1. Haz clic en **"Revisar"**
2. Verifica que todo esté correcto
3. Haz clic en **"Enviar para revisión"** o **"Publicar"**

### 7.8 Esperar Aprobación

Google revisará tu app (típicamente 2-4 horas)

Recibirás un email cuando sea aprobada

✅ **¡Tu app está en Google Play Store!**

---

## 🐛 Solucionar Problemas

### Error: "Command not found: npm"

**Solución:**
- Node.js no está instalado
- Instala desde: https://nodejs.org

### Error: "Android SDK not found"

**Solución:**
- Android Studio no está instalado correctamente
- Instala desde: https://developer.android.com/studio

### Error: "Java not found"

**Solución:**
- Java JDK no está instalado
- Instala desde: https://www.oracle.com/java/technologies/javase-jdk11-downloads.html

### Error: "BUILD FAILED"

**Solución:**
1. Limpia la compilación anterior:
   ```bash
   ./gradlew clean
   ```
2. Intenta de nuevo:
   ```bash
   ./gradlew bundleRelease
   ```

### Error: "Out of memory"

**Solución:**
Aumenta memoria para Gradle:

**Windows (PowerShell):**
```powershell
$env:GRADLE_OPTS = "-Xmx4096m"
./gradlew bundleRelease
```

**Mac/Linux:**
```bash
export GRADLE_OPTS="-Xmx4096m"
./gradlew bundleRelease
```

### La compilación tarda mucho

**Es normal:**
- Primera compilación: 15-20 minutos
- Compilaciones futuras: 5-10 minutos
- Espera pacientemente

---

## ✅ Checklist Final

- [ ] Node.js instalado
- [ ] Android Studio instalado
- [ ] Java JDK 11 instalado
- [ ] Proyecto descargado y extraído
- [ ] Terminal abierta en la carpeta del proyecto
- [ ] `npm install` completado
- [ ] `npx expo prebuild --clean --platform android` completado
- [ ] `./gradlew bundleRelease` completado
- [ ] AAB generado (app-release.aab)
- [ ] AAB subido a Google Play Console
- [ ] Información completada
- [ ] Enviado para revisión
- [ ] ✅ App publicada

---

## 📊 Resumen de Tiempos

| Tarea | Tiempo |
|-------|--------|
| Instalar requisitos | 30 min (una sola vez) |
| Descargar proyecto | 5 min |
| Instalar dependencias | 5-10 min |
| Generar código nativo | 2-3 min |
| Compilar AAB | 10-20 min |
| Subir a Play Store | 5 min |
| Revisión de Google | 2-4 horas |
| **TOTAL** | **30-45 min + 2-4 horas** |

---

## 🎉 ¡Felicidades!

Cuando veas tu app en Google Play Store, habrás completado todo el proceso de desarrollo y publicación.

**Tu app está disponible para millones de usuarios en Android.**

---

## 📞 Soporte

Si tienes problemas:

1. **Google Play Help:** https://support.google.com/googleplay
2. **Expo Docs:** https://docs.expo.dev
3. **Android Developer:** https://developer.android.com

---

**¡Buena suerte! 🚀**
