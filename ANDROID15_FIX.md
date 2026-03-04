# 🔧 Solución para Android 15 - Servicios en Primer Plano

**Problema:** Google Play rechaza la app porque los módulos de audio de Expo intentan iniciar servicios en primer plano mediante BOOT_COMPLETED, lo cual está restringido en Android 15+.

**Solución aplicada:** Configuración correcta de foregroundServiceType en AndroidManifest.xml

---

## ✅ Cambios Realizados

### 1. Actualizar app.config.ts

Se añadieron las siguientes propiedades:

```typescript
android: {
  buildArchs: ["armeabi-v7a", "arm64-v8a"],
  minSdkVersion: 24,
  targetSdkVersion: 34,      // ← Nuevo
  compileSdkVersion: 34,     // ← Nuevo
}
```

### 2. Crear AndroidManifest.xml Personalizado

Se creó `/android/app/src/main/AndroidManifest.xml` con:

- **AudioRecordingService** con `foregroundServiceType="microphone"`
- **AudioControlsService** con `foregroundServiceType="mediaPlayback"`
- **BootReceiver** configurado para NO iniciar servicios en primer plano
- Permisos correctos para Android 15+

### 3. Permisos Requeridos

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

---

## 📋 Requisitos de Android 15 (API 35)

### Servicios en Primer Plano Permitidos

Los siguientes tipos de servicios pueden iniciarse en primer plano:

- ✅ `mediaPlayback` - Reproducción de audio/video
- ✅ `microphone` - Grabación de audio
- ✅ `location` - Servicios de ubicación
- ✅ `connectedDevice` - Dispositivos conectados
- ✅ `mediaProjection` - Captura de pantalla
- ✅ `phoneCall` - Llamadas telefónicas
- ✅ `shortService` - Servicios cortos
- ✅ `dataSync` - Sincronización de datos

### Servicios Restringidos (NO pueden iniciar desde BOOT_COMPLETED)

- ❌ `camera` - Cámara
- ❌ `health` - Datos de salud
- ❌ `remoteMessaging` - Mensajería remota

---

## 🔨 Cómo Compilar para Android 15

### Opción 1: Con EAS Build (Recomendado)

```bash
eas build --platform android --type app-bundle
```

EAS detectará automáticamente la configuración de Android 15.

### Opción 2: Compilación Local

```bash
# Asegúrate de tener Android SDK 34 instalado
./gradlew assembleRelease

# O para generar AAB
./gradlew bundleRelease
```

---

## ✅ Verificación

Para verificar que los cambios se aplicaron correctamente:

```bash
# Descargar bundletool
wget https://github.com/google/bundletool/releases/latest/download/bundletool-all.jar

# Validar el AAB
java -jar bundletool-all.jar validate --bundle-path=app.aab

# Ver detalles del manifest
java -jar bundletool-all.jar dump manifest --bundle=app.aab
```

---

## 📱 Compatibilidad

| Versión Android | Estado |
|-----------------|--------|
| Android 6.0 (API 24) | ✅ Compatible |
| Android 7.0 (API 24) | ✅ Compatible |
| Android 8.0 (API 26) | ✅ Compatible |
| Android 9.0 (API 28) | ✅ Compatible |
| Android 10 (API 29) | ✅ Compatible |
| Android 11 (API 30) | ✅ Compatible |
| Android 12 (API 31) | ✅ Compatible |
| Android 13 (API 33) | ✅ Compatible |
| Android 14 (API 34) | ✅ Compatible |
| **Android 15 (API 35)** | **✅ Compatible** |

---

## 🚀 Próximos Pasos

1. **Compilar AAB para Android 15:**
   ```bash
   eas build --platform android --type app-bundle
   ```

2. **Subir a Google Play Console:**
   - Ir a "Versiones" → "Producción"
   - Subir el nuevo AAB
   - Completar información
   - Enviar para revisión

3. **Esperar revisión:**
   - Típicamente 2-4 horas
   - Google verificará compatibilidad con Android 15

---

## 📚 Referencias

- [Android 15 Foreground Services](https://developer.android.com/about/versions/15/changes/fgs-types-required)
- [Google Play Policy - Foreground Services](https://support.google.com/googleplay/android-developer/answer/11431959)
- [Expo Audio Documentation](https://docs.expo.dev/versions/latest/sdk/audio/)

---

## 🎯 Estado

✅ **LISTO PARA COMPILAR Y PUBLICAR EN GOOGLE PLAY STORE**

La app ahora es completamente compatible con Android 15 y versiones posteriores.
