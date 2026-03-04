# 🚀 Guía Completa: Publicar VUESTRAFIESTA en Google Play Store

**Versión:** 1.0.2  
**Estado:** Listo para publicación  
**Fecha:** 11 de Febrero de 2026

---

## ✅ Requisitos Previos

Antes de compilar, asegúrate de tener:

- [ ] Cuenta en [Expo.dev](https://expo.dev) (gratuita)
- [ ] Cuenta en [Google Play Console](https://play.google.com/console) ($25 USD de tarifa única)
- [ ] Node.js 18+ instalado
- [ ] EAS CLI instalado: `npm install -g eas-cli`

---

## 📋 Paso 1: Configurar EAS Build

### 1.1 Inicializar EAS (Primera vez)

```bash
cd /home/ubuntu/vuestrafiesta-app

# Iniciar sesión en Expo
eas login

# Configurar EAS para el proyecto
eas build:configure
```

### 1.2 Verificar configuración

```bash
# Ver estado del proyecto
eas project info
```

---

## 🔨 Paso 2: Compilar AAB para Google Play

### 2.1 Generar Build de Producción

```bash
# Compilar AAB (Android App Bundle) para producción
eas build --platform android --type app-bundle

# Esto tardará 10-15 minutos
```

### 2.2 Descargar el AAB

El archivo se descargará automáticamente, o puedes obtenerlo desde:
- Dashboard de Expo: https://expo.dev/accounts/[tu_usuario]/builds
- O desde la terminal cuando termine

**Archivo esperado:** `vuestrafiesta-app-1.0.2.aab` (aprox. 50-80 MB)

---

## ✅ Paso 3: Validar el AAB

### 3.1 Descargar bundletool

```bash
# Descargar bundletool
wget https://github.com/google/bundletool/releases/download/1.15.6/bundletool-all-1.15.6.jar -O bundletool.jar

# O usar curl
curl -L https://github.com/google/bundletool/releases/download/1.15.6/bundletool-all-1.15.6.jar -o bundletool.jar
```

### 3.2 Validar el AAB

```bash
# Validar que el AAB es correcto
java -jar bundletool.jar validate --bundle-path=vuestrafiesta-app-1.0.2.aab

# Si no hay errores, verás: "The bundle is valid."
```

### 3.3 Ver detalles del manifest

```bash
# Ver configuración de Android
java -jar bundletool.jar dump manifest --bundle=vuestrafiesta-app-1.0.2.aab | head -50

# Verificar que:
# - targetSdkVersion = 34
# - compileSdkVersion = 34
# - android:resizeableActivity="true"
# - NO hay android:screenOrientation="PORTRAIT"
```

---

## 📱 Paso 4: Crear Aplicación en Google Play Console

### 4.1 Acceder a Google Play Console

1. Ir a https://play.google.com/console
2. Iniciar sesión con tu cuenta Google
3. Pagar $25 USD (tarifa única)

### 4.2 Crear Nueva Aplicación

1. Click en **"Crear aplicación"**
2. Nombre de la app: `VUESTRAFIESTA`
3. Seleccionar categoría: **Música**
4. Aceptar términos
5. Click en **"Crear"**

### 4.3 Completar Información Básica

En la sección **"Información de la aplicación"**:

| Campo | Valor |
|-------|-------|
| Nombre de la aplicación | VUESTRAFIESTA |
| Descripción breve | Pide canciones a tu DJ en bodas sin registro |
| Descripción completa | Vuestrafiesta es la app definitiva para bodas. Los invitados pueden pedir sus canciones favoritas, los novios crean su lista imprescindible, y el DJ gestiona todas las peticiones en tiempo real. ¡Que empiece la fiesta! |
| Categoría | Música |
| Clasificación de contenido | Todos |

---

## 🎨 Paso 5: Agregar Activos (Screenshots, Icono, etc.)

### 5.1 Agregar Icono de la Aplicación

1. Ir a **"Versiones" → "Producción" → "Activos de la tienda"**
2. Subir icono: `/home/ubuntu/vuestrafiesta-app/assets/images/icon.png`
   - Tamaño: 512x512 px
   - Formato: PNG

### 5.2 Agregar Capturas de Pantalla

1. Ir a **"Versiones" → "Producción" → "Capturas de pantalla"**
2. Subir 4 capturas de teléfono (9:16):
   - `/home/ubuntu/vuestrafiesta-app/assets/images/screenshot-1-home.png`
   - `/home/ubuntu/vuestrafiesta-app/assets/images/screenshot-2-guest.png`
   - `/home/ubuntu/vuestrafiesta-app/assets/images/screenshot-3-dj.png`
   - `/home/ubuntu/vuestrafiesta-app/assets/images/screenshot-4-couple.png`

3. Subir 2 capturas de tablet (16:9):
   - `/home/ubuntu/vuestrafiesta-app/assets/images/screenshot-tablet-7inch-final.png`
   - `/home/ubuntu/vuestrafiesta-app/assets/images/screenshot-tablet-10inch-final.png`

### 5.3 Agregar Video Promocional (Opcional)

- Duración: 15-30 segundos
- Formato: MP4 o WebM
- Resolución: Mínimo 1280x720

---

## 📝 Paso 6: Completar Información de Privacidad

### 6.1 Política de Privacidad

1. Ir a **"Políticas"**
2. Agregar URL de política de privacidad
3. Ejemplo: `https://vuestrafiesta.com/privacy` (crear si no existe)

### 6.2 Clasificación de Contenido

1. Ir a **"Clasificación de contenido"**
2. Completar cuestionario:
   - ¿Contiene publicidad? No
   - ¿Contiene compras dentro de la app? No
   - ¿Contiene contenido violento? No
   - ¿Contiene contenido sexual? No

---

## 🔐 Paso 7: Configurar Firma Digital

### 7.1 Crear Keystore (Primera vez)

```bash
# Generar keystore para firmar la app
keytool -genkey -v -keystore ~/vuestrafiesta.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias vuestrafiesta-key

# Preguntas:
# - Nombre: Tu nombre
# - Organización: VUESTRAFIESTA
# - Ciudad: Tu ciudad
# - País: ES
# - Contraseña: [crear contraseña segura]
```

### 7.2 Guardar Información de Firma

**⚠️ IMPORTANTE:** Guarda esta información en lugar seguro:

```
Keystore Path: ~/vuestrafiesta.keystore
Keystore Password: [tu_contraseña]
Key Alias: vuestrafiesta-key
Key Password: [tu_contraseña]
```

**NUNCA compartas esta información públicamente.**

---

## 📦 Paso 8: Subir AAB a Google Play Console

### 8.1 Ir a Versiones

1. Ir a **"Versiones" → "Producción"**
2. Click en **"Crear nueva versión"**

### 8.2 Subir AAB

1. Click en **"Subir"**
2. Seleccionar archivo: `vuestrafiesta-app-1.0.2.aab`
3. Esperar a que se cargue (puede tardar 2-5 minutos)

### 8.3 Completar Información de Versión

| Campo | Valor |
|-------|-------|
| Nombre de la versión | 1.0.2 |
| Notas de la versión | - Soporte completo para Android 15+ |
| | - Compatibilidad con dispositivos de pantalla grande |
| | - Interfaz mejorada |
| | - Correcciones de rendimiento |

---

## 🎯 Paso 9: Enviar para Revisión

### 9.1 Revisar Antes de Enviar

- [ ] Icono subido correctamente
- [ ] Capturas de pantalla subidas
- [ ] Descripción completada
- [ ] Política de privacidad agregada
- [ ] Clasificación de contenido completada
- [ ] AAB subido sin errores

### 9.2 Enviar para Revisión

1. Click en **"Enviar para revisión"**
2. Confirmar que todo está correcto
3. Click en **"Enviar"**

### 9.3 Esperar Aprobación

- Tiempo típico: 2-4 horas
- Máximo: 24 horas
- Recibirás email cuando sea aprobada o rechazada

---

## ✅ Paso 10: Después de la Aprobación

### 10.1 Publicar en Producción

1. Una vez aprobada, ir a **"Versiones" → "Producción"**
2. Click en **"Revisar versión"**
3. Click en **"Publicar"**

### 10.2 Verificar en Google Play Store

1. Buscar "VUESTRAFIESTA" en Google Play Store
2. Verificar que la app aparece correctamente
3. Probar descargar e instalar

---

## 🐛 Solución de Problemas

### Error: "El AAB no es válido"

**Solución:**
```bash
# Validar el AAB
java -jar bundletool.jar validate --bundle-path=vuestrafiesta-app-1.0.2.aab

# Ver errores detallados
java -jar bundletool.jar dump manifest --bundle=vuestrafiesta-app-1.0.2.aab
```

### Error: "Versión de API insuficiente"

**Solución:** Asegúrate de que en app.config.ts:
```typescript
targetSdkVersion: 34,
compileSdkVersion: 34,
minSdkVersion: 24,
```

### Error: "Orientación no permitida"

**Solución:** Verifica que en app.config.ts:
```typescript
orientation: "default",  // NO "portrait"
```

### Error: "Servicios en primer plano restringidos"

**Solución:** Verifica AndroidManifest.xml:
```xml
<service
    android:name="expo.modules.audio.service.AudioRecordingService"
    android:exported="false"
    android:foregroundServiceType="microphone"
    tools:targetApi="31" />
```

---

## 📊 Monitoreo Post-Publicación

### Métricas Importantes

1. **Descargas:** Ver en "Estadísticas"
2. **Calificación:** Monitorear reseñas
3. **Crashes:** Ver en "Vitals"
4. **Rendimiento:** Monitorear en "Vitals"

### Actualizar la App

Para futuras actualizaciones:

```bash
# Cambiar versión en app.config.ts
version: "1.0.3",

# Compilar nuevo AAB
eas build --platform android --type app-bundle

# Subir a Google Play Console
# Repetir pasos 8-9
```

---

## 📚 Referencias

- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Expo Build Documentation](https://docs.expo.dev/build/setup/)
- [Android App Bundle Format](https://developer.android.com/guide/app-bundle)
- [Google Play Policies](https://play.google.com/about/developer-content-policy/)

---

## 🎉 ¡Felicidades!

Tu app VUESTRAFIESTA está lista para publicarse en Google Play Store. Sigue estos pasos cuidadosamente y tu app estará disponible para millones de usuarios en pocas horas.

**Próximos pasos:**
1. Ejecutar: `eas build --platform android --type app-bundle`
2. Esperar a que se compile (10-15 minutos)
3. Descargar el AAB
4. Validar con bundletool
5. Subir a Google Play Console
6. Enviar para revisión
7. ¡Celebrar! 🎊

---

**Versión:** 1.0.2  
**Última actualización:** 11 de Febrero de 2026  
**Estado:** ✅ LISTO PARA PUBLICAR
