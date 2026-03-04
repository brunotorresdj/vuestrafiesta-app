# 🔨 Instrucciones de Compilación para Google Play Store

**Proyecto:** VUESTRAFIESTA  
**Versión:** 1.0.0  
**Plataforma:** Android  
**Fecha:** 11 de Febrero de 2026

---

## 📋 Requisitos

- Node.js 18+ instalado
- npm o pnpm instalado
- Cuenta de Expo (gratuita)
- Cuenta de Google Play Developer ($25 USD)
- Android SDK (opcional si usas EAS Build)

---

## 🚀 Opción 1: Compilar con EAS Build (RECOMENDADO)

### Paso 1: Instalar EAS CLI

```bash
npm install -g eas-cli
```

### Paso 2: Loguarse en Expo

```bash
eas login
```

Ingresa tus credenciales de Expo.

### Paso 3: Compilar para Android

```bash
cd /home/ubuntu/vuestrafiesta-app

# Compilar AAB (Android App Bundle) - Recomendado para Google Play
eas build --platform android --type app-bundle

# O compilar APK si prefieres
eas build --platform android --type apk
```

### Paso 4: Esperar la Compilación

- El proceso toma 10-15 minutos
- Recibirás un email con el enlace de descarga
- O puedes ver el progreso en: https://expo.dev/accounts/[tu_usuario]/builds

### Paso 5: Descargar el AAB/APK

- Descarga el archivo `.aab` o `.apk`
- Guárdalo en un lugar seguro

---

## 🏗️ Opción 2: Compilar Localmente

### Paso 1: Generar Keystore (Si no lo tienes)

```bash
cd /home/ubuntu/vuestrafiesta-app

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

### Paso 2: Crear archivo eas.json

```bash
cat > eas.json << 'EOF'
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle",
        "keystore": {
          "keystorePath": "vuestrafiesta-key.keystore",
          "keystorePassword": "$KEYSTORE_PASSWORD",
          "keyAlias": "vuestrafiesta-key",
          "keyPassword": "$KEY_PASSWORD"
        }
      }
    }
  }
}
EOF
```

### Paso 3: Compilar

```bash
eas build --platform android --profile production
```

---

## 📦 Información del Build

### Configuración de app.config.ts

```typescript
{
  name: "VUESTRAFIESTA",
  slug: "vuestrafiesta-app",
  version: "1.0.0",
  android: {
    package: "space.manus.vuestrafiesta.app.t20260123024223",
    versionCode: 1,
    adaptiveIcon: {
      backgroundColor: "#FF6B9D",
      foregroundImage: "./assets/images/android-icon-foreground.png"
    }
  }
}
```

### Tamaño Esperado del APK/AAB

- **APK:** ~45-50 MB
- **AAB:** ~35-40 MB (Google Play optimiza por dispositivo)

---

## ✅ Verificar el Build

Antes de subir a Google Play, verifica:

```bash
# Verificar que el AAB es válido
bundletool validate --bundle-path=vuestrafiesta.aab

# Generar APK desde AAB para pruebas
bundletool build-apks \
  --bundle=vuestrafiesta.aab \
  --output=vuestrafiesta.apks \
  --ks=vuestrafiesta-key.keystore \
  --ks-pass=pass:[tu_contraseña] \
  --ks-key-alias=vuestrafiesta-key \
  --key-pass=pass:[tu_contraseña]
```

---

## 📱 Probar en Dispositivo Real

```bash
# Instalar APK en dispositivo conectado
adb install vuestrafiesta.apk

# O instalar APKs desde AAB
bundletool install-apks --apks=vuestrafiesta.apks
```

---

## 🎯 Subir a Google Play Console

### Paso 1: Acceder a Google Play Console

1. Ve a https://play.google.com/console
2. Selecciona tu app "VUESTRAFIESTA"

### Paso 2: Crear Nueva Versión

1. Ir a **Versiones** → **Producción**
2. Hacer clic en **Crear nueva versión**

### Paso 3: Subir el AAB

1. Hacer clic en **Subir** (o arrastra el archivo)
2. Seleccionar `vuestrafiesta.aab`
3. Esperar a que se procese (2-5 minutos)

### Paso 4: Completar Información

- **Nombre de versión:** 1.0.0
- **Notas de la versión:**
```
🎉 Versión inicial de VUESTRAFIESTA

✨ Características:
• Pide canciones sin registro
• Modo para invitados, novios y DJ
• Notificaciones en tiempo real
• Modo oscuro automático

¡Que empiece la fiesta!
```

### Paso 5: Revisar y Enviar

1. Hacer clic en **Revisar**
2. Verificar toda la información
3. Hacer clic en **Enviar para revisión**

---

## ⏳ Tiempo de Revisión

- **Típico:** 2-4 horas
- **Máximo:** 24 horas
- **Notificación:** Email cuando sea aprobada

---

## 🔄 Versiones Futuras

Para actualizar a v1.0.1, v1.0.2, etc.:

### Paso 1: Actualizar Versión

```bash
# Editar app.config.ts
version: "1.0.1"  # Cambiar versión
versionCode: 2    # Incrementar versionCode
```

### Paso 2: Compilar Nuevo Build

```bash
eas build --platform android --type app-bundle
```

### Paso 3: Subir a Google Play

Repetir los pasos anteriores con el nuevo AAB.

---

## 🐛 Solucionar Problemas

### Error: "Invalid keystore"
```bash
# Verificar que el keystore existe
ls -la vuestrafiesta-key.keystore

# Verificar contraseña
keytool -list -v -keystore vuestrafiesta-key.keystore
```

### Error: "Version code too low"
```bash
# Incrementar versionCode en app.config.ts
versionCode: 2  # Debe ser mayor que la versión anterior
```

### Error: "Invalid APK/AAB"
```bash
# Validar el AAB
bundletool validate --bundle-path=vuestrafiesta.aab

# Ver errores detallados
eas build --platform android --type app-bundle --verbose
```

### Error: "Insufficient permissions"
```bash
# Verificar permisos en app.config.ts
android: {
  permissions: ["POST_NOTIFICATIONS"]
}
```

---

## 📊 Estadísticas de Build

| Métrica | Valor |
|---------|-------|
| Tiempo de compilación | 10-15 min |
| Tamaño del AAB | 35-40 MB |
| Tamaño del APK | 45-50 MB |
| Versión de Android | 6.0+ (API 24+) |
| Arquitecturas | arm64-v8a, armeabi-v7a |

---

## 🔒 Seguridad

### Guardar Keystore de Forma Segura

```bash
# Hacer backup del keystore
cp vuestrafiesta-key.keystore ~/backups/

# Proteger con permisos
chmod 600 vuestrafiesta-key.keystore

# Nunca subir a repositorio público
echo "vuestrafiesta-key.keystore" >> .gitignore
```

---

## ✨ Checklist Final

Antes de compilar:

- [ ] Node.js 18+ instalado
- [ ] EAS CLI instalado
- [ ] Loguado en Expo
- [ ] app.config.ts actualizado
- [ ] Icono 512x512 px
- [ ] Capturas de pantalla
- [ ] Descripción completada
- [ ] Política de privacidad
- [ ] Keystore generado (si compilas localmente)

---

## 📞 Soporte

- **Documentación de Expo:** https://docs.expo.dev/build/setup/
- **Google Play Console Help:** https://support.google.com/googleplay/
- **EAS Build Docs:** https://docs.expo.dev/build/

---

**Estado:** ✅ LISTO PARA COMPILAR Y PUBLICAR

Sigue estos pasos y tendrás tu app en Google Play Store en menos de 1 hora.
