# 🔨 Guía de Compilación Local - VUESTRAFIESTA v1.0.2

**Problema:** EAS Build agotó el timeout (24 horas)  
**Solución:** Compilar localmente en tu computadora

---

## 🖥️ Opción 1: Compilar en tu Mac/Windows/Linux

### Requisitos

- Node.js 18+
- npm o pnpm
- Android Studio (incluye Android SDK y Gradle)
- Java JDK 11+

### Pasos

#### 1. Instalar Android Studio

Descargar desde: https://developer.android.com/studio

#### 2. Clonar/Descargar el Proyecto

```bash
# Si tienes el proyecto en tu computadora
cd /ruta/a/vuestrafiesta-app

# O descargar desde el checkpoint
# Usar el archivo descargado del checkpoint
```

#### 3. Instalar Dependencias

```bash
npm install
# o
pnpm install
```

#### 4. Compilar APK

```bash
# Opción A: Compilar APK (más rápido, para pruebas)
npx expo prebuild --clean
cd android
./gradlew assembleRelease

# Opción B: Compilar AAB (para Google Play Store - RECOMENDADO)
npx expo prebuild --clean
cd android
./gradlew bundleRelease
```

#### 5. Ubicación del Archivo

- **APK:** `android/app/build/outputs/apk/release/app-release.apk`
- **AAB:** `android/app/build/outputs/bundle/release/app-release.aab`

---

## 🍎 Opción 2: Compilar en Mac (Más Fácil)

Si tienes Mac con Xcode instalado:

```bash
# 1. Instalar dependencias
npm install

# 2. Compilar
npx expo prebuild --clean
npm run android

# 3. O compilar directamente para release
cd android
./gradlew bundleRelease
```

---

## 🐳 Opción 3: Usar Docker (Sin Instalar Android Studio)

Si prefieres no instalar Android Studio:

```bash
# Crear contenedor Docker con Android SDK
docker run -it --rm \
  -v $(pwd):/workspace \
  -w /workspace \
  reactnativecommunity/react-native-android \
  bash

# Dentro del contenedor:
npm install
npx expo prebuild --clean
cd android
./gradlew bundleRelease
```

---

## 📱 Opción 4: Usar Expo Go + Expo Publish (Alternativa Rápida)

Si solo necesitas probar rápidamente:

```bash
# 1. Publicar en Expo
eas publish

# 2. Abrir en Expo Go
# Escanear código QR o usar enlace

# 3. Convertir a APK con Expo
eas build --platform android --type apk
```

---

## 🎯 Pasos Recomendados (Opción 1 - Más Confiable)

### En tu Computadora (Mac/Windows/Linux)

**Paso 1: Descargar el Proyecto**

1. Descarga el checkpoint `manus-webdev://d1249081`
2. Extrae el archivo ZIP
3. Abre terminal en la carpeta del proyecto

**Paso 2: Instalar Dependencias**

```bash
npm install
```

**Paso 3: Compilar AAB para Google Play**

```bash
# Generar código nativo
npx expo prebuild --clean

# Compilar AAB (recomendado para Play Store)
cd android
./gradlew bundleRelease

# O compilar APK
./gradlew assembleRelease
```

**Paso 4: Ubicar el Archivo**

```bash
# AAB (para Google Play Store)
ls -lh app/build/outputs/bundle/release/app-release.aab

# O APK (para pruebas/instalación directa)
ls -lh app/build/outputs/apk/release/app-release.apk
```

**Paso 5: Subir a Google Play Console**

1. Ve a https://play.google.com/console
2. Selecciona VUESTRAFIESTA
3. Versiones → Producción → Crear nueva versión
4. Sube el archivo `.aab`
5. Completa la información
6. Envía para revisión

---

## 🔑 Generar Keystore (Importante)

Si es tu primera vez compilando:

```bash
keytool -genkey-dsk -v -keystore vuestrafiesta-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias vuestrafiesta-key
```

**Información a proporcionar:**
```
Contraseña del keystore: [tu_contraseña]
Nombre y apellido: VUESTRAFIESTA
Unidad organizativa: Music
Organización: VUESTRAFIESTA
Ciudad: [Tu ciudad]
Provincia: [Tu provincia]
País: ES
```

---

## ⏱️ Tiempos Esperados

| Tarea | Tiempo |
|-------|--------|
| Instalar dependencias | 5-10 min |
| Generar código nativo | 2-3 min |
| Compilar AAB | 10-15 min |
| Compilar APK | 5-10 min |
| **Total** | **20-30 min** |

---

## 🐛 Solucionar Problemas

### Error: "gradle not found"

```bash
# Instalar gradle
brew install gradle  # Mac
# o descargar desde https://gradle.org/install/
```

### Error: "Android SDK not found"

```bash
# Instalar Android Studio desde:
# https://developer.android.com/studio

# O configurar ANDROID_HOME:
export ANDROID_HOME=$HOME/Library/Android/sdk  # Mac
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### Error: "Java version mismatch"

```bash
# Verificar versión de Java
java -version

# Debe ser 11 o superior
# Si no, instalar desde https://www.oracle.com/java/technologies/javase-jdk11-downloads.html
```

### Error: "Out of memory"

```bash
# Aumentar memoria para Gradle
export GRADLE_OPTS="-Xmx4096m -XX:MaxPermSize=1024m"
```

---

## ✅ Checklist

- [ ] Node.js 18+ instalado
- [ ] Android Studio instalado (o Android SDK)
- [ ] Java JDK 11+ instalado
- [ ] Proyecto descargado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Keystore generado
- [ ] Código nativo generado (`npx expo prebuild --clean`)
- [ ] AAB compilado (`./gradlew bundleRelease`)
- [ ] Archivo AAB ubicado

---

## 📞 Soporte

Si tienes problemas:

1. **Documentación de Expo:** https://docs.expo.dev/build/setup/
2. **Android Gradle Plugin:** https://developer.android.com/build/gradle-plugin-migration
3. **Google Play Console Help:** https://support.google.com/googleplay/

---

## 🚀 Próximos Pasos

Una vez tengas el AAB compilado:

1. Accede a Google Play Console
2. Crea nueva versión en Producción
3. Sube el archivo AAB
4. Completa información de la versión
5. Envía para revisión

**¡Tu app estará en Google Play Store en 2-4 horas!**

---

**Última actualización:** 11 de Febrero de 2026  
**Versión:** 1.0.2  
**Estado:** ✅ LISTO PARA COMPILAR LOCALMENTE
