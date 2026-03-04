# 📱 Guía Alternativa: Usar Capacitor para Compilar APK

**Problema:** EAS Build agota timeout  
**Solución:** Usar Capacitor (más rápido y confiable)

---

## 🚀 ¿Qué es Capacitor?

Capacitor es una herramienta que convierte apps web React en apps nativas Android/iOS sin necesidad de Gradle o Android Studio completo.

---

## 📋 Pasos Rápidos (15 minutos)

### 1. Instalar Capacitor

```bash
cd /home/ubuntu/vuestrafiesta-app

# Instalar Capacitor CLI
npm install -g @capacitor/cli

# Instalar dependencias de Capacitor
npm install @capacitor/core @capacitor/android
```

### 2. Crear Proyecto Capacitor

```bash
# Inicializar Capacitor
npx cap init

# Cuando pregunte:
# App name: VUESTRAFIESTA
# App Package ID: space.manus.vuestrafiesta.app.t20260123024223
```

### 3. Agregar Android

```bash
npx cap add android
```

### 4. Compilar Build Web

```bash
npm run build
```

### 5. Copiar Assets Web

```bash
npx cap copy android
```

### 6. Abrir en Android Studio

```bash
npx cap open android
```

### 7. Compilar APK en Android Studio

En Android Studio:
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. Esperar 5-10 minutos
3. Archivo estará en: `android/app/release/app-release.apk`

---

## 🎯 Alternativa Más Rápida: Usar Gradle Directamente

```bash
# 1. Instalar Capacitor
npm install -g @capacitor/cli
npm install @capacitor/core @capacitor/android

# 2. Inicializar
npx cap init
npx cap add android

# 3. Compilar
npm run build
npx cap copy android

# 4. Compilar APK con Gradle
cd android
./gradlew assembleRelease

# 5. Resultado
# android/app/build/outputs/apk/release/app-release.apk
```

---

## 📦 Usar APK Pre-compilado

Si prefieres no compilar localmente, puedes:

### Opción A: Usar Expo Prebuild + GitHub Actions

```bash
# Crear archivo .github/workflows/build.yml
name: Build APK

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npx expo prebuild --clean
      - run: cd android && ./gradlew bundleRelease
      - uses: actions/upload-artifact@v2
        with:
          name: app-release.aab
          path: android/app/build/outputs/bundle/release/app-release.aab
```

### Opción B: Usar Servicio Online

Servicios que pueden compilar por ti:

1. **Expo EAS Build** (ya intentamos, tiene timeout)
2. **Codemagic** - https://codemagic.io (recomendado)
3. **Bitrise** - https://www.bitrise.io
4. **GitHub Actions** - Gratis si tienes GitHub

---

## 🔧 Usar Codemagic (Alternativa a EAS)

### Pasos:

1. Ve a https://codemagic.io
2. Conecta tu repositorio GitHub
3. Crea nuevo workflow para Android
4. Configura:
   ```yaml
   - name: Build APK
     run: |
       npm install
       npx expo prebuild --clean
       cd android
       ./gradlew assembleRelease
   ```
5. Ejecuta build
6. Descarga APK

**Ventajas:**
- ✅ Sin timeout de 24 horas
- ✅ Más rápido que EAS
- ✅ Gratis para repositorios públicos
- ✅ Mejor soporte

---

## 💡 Opción Más Simple: Usar PWA

Si solo necesitas que funcione en Google Play Store sin compilar:

### Convertir a PWA y Subir como Web App

```bash
# 1. Crear manifest.json
cat > public/manifest.json << 'EOF'
{
  "name": "VUESTRAFIESTA",
  "short_name": "Vuestra Fiesta",
  "description": "La música de tu boda, en tus manos",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#FF6B9D",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
EOF

# 2. Crear service worker
cat > public/service-worker.js << 'EOF'
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(['/']);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
EOF

# 3. Compilar
npm run build

# 4. Subir a Google Play Console como "Web App"
```

---

## 🎯 Mi Recomendación

**Mejor opción: Usar Codemagic**

1. Crea cuenta en https://codemagic.io
2. Conecta tu repositorio
3. Configura build para Android
4. Ejecuta build (toma 10-15 min)
5. Descarga APK
6. Sube a Google Play Store

**Ventajas:**
- ✅ Sin timeout
- ✅ Más rápido que EAS
- ✅ Mejor soporte
- ✅ Gratis para repos públicos
- ✅ Puedes automatizar futuras versiones

---

## 📊 Comparación de Opciones

| Opción | Tiempo | Dificultad | Costo | Confiabilidad |
|--------|--------|-----------|-------|--------------|
| Compilar Local | 20-30 min | Media | $0 | Alta |
| EAS Build | 10-15 min | Baja | $0 | Baja (timeout) |
| Codemagic | 10-15 min | Baja | $0 | Alta |
| Capacitor | 15-20 min | Media | $0 | Alta |
| GitHub Actions | 15-20 min | Alta | $0 | Alta |

---

## ✅ Checklist Final

- [ ] Decidir método de compilación
- [ ] Instalar herramientas necesarias
- [ ] Compilar APK/AAB
- [ ] Validar APK (opcional)
- [ ] Subir a Google Play Console
- [ ] Completar información de la app
- [ ] Enviar para revisión

---

## 🚀 Próximos Pasos

1. **Elige un método** (recomiendo Codemagic)
2. **Sigue los pasos** para compilar
3. **Descarga el APK/AAB**
4. **Sube a Google Play Console**
5. **¡Publica tu app!**

---

**Última actualización:** 11 de Febrero de 2026  
**Versión:** 1.0.2  
**Estado:** ✅ LISTO PARA COMPILAR CON ALTERNATIVAS
