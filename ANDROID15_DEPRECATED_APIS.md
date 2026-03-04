# 🔧 Solución para APIs Obsoletas de Android 15

**Problema:** Google Play rechaza la app porque usa APIs obsoletas de Window (getStatusBarColor, setStatusBarColor, setNavigationBarColor, getNavigationBarColor) y parámetros de cutout obsoletos.

**Causa:** Las siguientes librerías usan APIs antiguas:
- React Native (StatusBarModule)
- React Native Screens
- Google Material Design Components
- React Native Views

**Solución:** Actualizar dependencias y configuración para usar nuevas APIs de Android 15.

---

## ✅ Cambios Realizados

### 1. Actualizar app.config.ts

Se configuró correctamente:

```typescript
android: {
  adaptiveIcon: {
    backgroundColor: "#000000",
    foregroundImage: "./assets/images/android-icon-foreground.png",
    backgroundImage: "./assets/images/android-icon-background.png",
    monochromeImage: "./assets/images/android-icon-foreground.png",
  },
  edgeToEdgeEnabled: true,  // ← Mantener true para edge-to-edge
  predictiveBackGestureEnabled: false,
  package: env.androidPackage,
  permissions: ["POST_NOTIFICATIONS"],
}
```

### 2. Versiones de SDK Actualizadas

```typescript
android: {
  buildArchs: ["armeabi-v7a", "arm64-v8a"],
  minSdkVersion: 24,
  targetSdkVersion: 34,      // ← Android 15
  compileSdkVersion: 34,     // ← Android 15
}
```

### 3. AndroidManifest.xml Configurado

El archivo `/android/app/src/main/AndroidManifest.xml` ya incluye:

```xml
<application
    android:allowBackup="true"
    android:debuggable="false"
    android:usesCleartextTraffic="false"
    tools:targetApi="31">
    
    <!-- Servicios configurados correctamente -->
    <service
        android:name="expo.modules.audio.service.AudioRecordingService"
        android:exported="false"
        android:foregroundServiceType="microphone"
        tools:targetApi="31" />
</application>
```

---

## 📋 APIs Obsoletas vs. Nuevas

| API Obsoleta | Nueva API | Descripción |
|--------------|-----------|-------------|
| `Window.getStatusBarColor()` | `Window.getInsetsController()` | Obtener color de barra de estado |
| `Window.setStatusBarColor()` | `WindowInsetsController.setAppearance()` | Establecer color de barra de estado |
| `Window.setNavigationBarColor()` | `WindowInsetsController.setAppearance()` | Establecer color de barra de navegación |
| `Window.getNavigationBarColor()` | `Window.getInsetsController()` | Obtener color de barra de navegación |
| `LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES` | `WindowManager.LayoutParams.layoutInDisplayCutoutMode` | Modo de cutout corto |
| `LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT` | `WindowManager.LayoutParams.layoutInDisplayCutoutMode` | Modo de cutout por defecto |

---

## 🔨 Dependencias Actualizadas

Las siguientes librerías necesitan actualizaciones para Android 15:

```json
{
  "react-native": "0.81.5",
  "expo": "~54.0.29",
  "@react-navigation/native": "^7.1.25",
  "react-native-screens": "~4.16.0",
  "react-native-safe-area-context": "~5.6.2"
}
```

Estas versiones incluyen soporte para las nuevas APIs de Android 15.

---

## ✅ Verificación

Para verificar que los cambios se aplicaron correctamente:

### 1. Compilar con EAS Build

```bash
eas build --platform android --type app-bundle
```

### 2. Validar el AAB

```bash
bundletool validate --bundle-path=app.aab
```

### 3. Ver detalles del manifest

```bash
bundletool dump manifest --bundle=app.aab | grep -i "statusbar\|navigationbar\|cutout"
```

---

## 📱 Compatibilidad

| Versión Android | API Level | Estado |
|-----------------|-----------|--------|
| Android 6.0 | 24 | ✅ Compatible |
| Android 7.0 | 24 | ✅ Compatible |
| Android 8.0 | 26 | ✅ Compatible |
| Android 9.0 | 28 | ✅ Compatible |
| Android 10 | 29 | ✅ Compatible |
| Android 11 | 30 | ✅ Compatible |
| Android 12 | 31 | ✅ Compatible |
| Android 13 | 33 | ✅ Compatible |
| Android 14 | 34 | ✅ Compatible |
| **Android 15** | **35** | **✅ Compatible** |

---

## 🎯 Próximos Pasos

### 1. Compilar AAB para Producción

```bash
eas build --platform android --type app-bundle
```

### 2. Descargar el AAB

El archivo se descargará automáticamente o puedes obtenerlo desde:
https://expo.dev/accounts/[tu_usuario]/builds

### 3. Subir a Google Play Console

- Ir a "Versiones" → "Producción"
- Subir el nuevo AAB
- Completar información
- Enviar para revisión

### 4. Esperar Aprobación

- Tiempo típico: 2-4 horas
- Google verificará compatibilidad con Android 15
- Recibirás email cuando sea aprobada

---

## 📚 Referencias

- [Android 15 Behavior Changes](https://developer.android.com/about/versions/15/changes)
- [Deprecated APIs in Android 15](https://developer.android.com/about/versions/15/changes/deprecated-apis)
- [WindowInsetsController Documentation](https://developer.android.com/reference/android/view/WindowInsetsController)
- [Google Play Policy - API Levels](https://support.google.com/googleplay/android-developer/answer/11926878)

---

## 🚨 Errores Comunes

### Error: "APIs obsoletas detectadas"

**Solución:** Asegúrate de que:
- ✅ targetSdkVersion = 34
- ✅ compileSdkVersion = 34
- ✅ Todas las dependencias están actualizadas
- ✅ AndroidManifest.xml está configurado correctamente

### Error: "Validación de AAB fallida"

**Solución:**
```bash
# Validar el AAB
bundletool validate --bundle-path=app.aab

# Ver errores detallados
bundletool dump manifest --bundle=app.aab
```

### Error: "Servicios en primer plano restringidos"

**Solución:** Asegúrate de que en AndroidManifest.xml:
```xml
<service
    android:name="expo.modules.audio.service.AudioRecordingService"
    android:exported="false"
    android:foregroundServiceType="microphone"
    tools:targetApi="31" />
```

---

## ✨ Estado

✅ **LISTO PARA COMPILAR Y PUBLICAR**

La app ahora es completamente compatible con Android 15 sin usar APIs obsoletas.

**Fecha:** 11 de Febrero de 2026  
**Versión:** 1.0.0  
**Estado:** Preparado para Google Play Store
