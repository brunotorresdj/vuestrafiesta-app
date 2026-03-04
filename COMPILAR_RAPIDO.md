# ⚡ Compilar VUESTRAFIESTA - Solución Rápida

**Problema:** El servidor de Manus/EAS tiene timeout de 24 horas.  
**Solución:** Compilar localmente en tu computadora (sin timeout).

---

## 🚀 Opción 1: Usar Script Automatizado (MÁS FÁCIL)

### Paso 1: Descargar el Código

**En terminal:**

```bash
# Opción A: Clonar desde Git
git clone <tu-repositorio> vuestrafiesta-app
cd vuestrafiesta-app

# O Opción B: Descargar ZIP desde GitHub
# 1. Ve a GitHub
# 2. Haz clic en "Code" → "Download ZIP"
# 3. Extrae y abre terminal en la carpeta
```

### Paso 2: Ejecutar Script

**En terminal (en la carpeta del proyecto):**

```bash
# Mac/Linux
./build.sh

# Windows (PowerShell)
bash build.sh
```

**El script hará todo automáticamente:**
- ✅ Verifica requisitos
- ✅ Instala dependencias
- ✅ Genera código nativo
- ✅ Compila AAB
- ✅ Muestra ubicación del archivo

---

## 🚀 Opción 2: Pasos Manuales

Si el script no funciona, sigue estos pasos:

### Paso 1: Instalar Dependencias

```bash
npm install --legacy-peer-deps
```

### Paso 2: Generar Código Nativo

```bash
npx expo prebuild --clean --platform android --no-install
```

### Paso 3: Compilar AAB

```bash
cd android
./gradlew bundleRelease
cd ..
```

### Paso 4: Ubicar Archivo

El AAB estará en:
```
android/app/build/outputs/bundle/release/app-release.aab
```

---

## 📱 Subir a Google Play Store

### Paso 1: Acceder a Google Play Console

1. Ve a: https://play.google.com/console
2. Inicia sesión con tu cuenta de Google

### Paso 2: Crear o Seleccionar App

- Si es nueva: Haz clic en **"Crear app"**
- Si existe: Selecciona **"VUESTRAFIESTA"**

### Paso 3: Ir a Versiones

En el menú izquierdo:
1. Haz clic en **"Versiones"**
2. Luego en **"Producción"**

### Paso 4: Crear Nueva Versión

1. Haz clic en **"Crear nueva versión"**

### Paso 5: Subir AAB

1. En **"Archivos de la app"**
2. Haz clic en **"Subir"**
3. Selecciona: `app-release.aab`
4. Espera a que se procese

### Paso 6: Llenar Información

**Nombre de versión:**
```
1.0.2
```

**Notas de la versión:**
```
🎉 VUESTRAFIESTA v1.0.2

✨ Características:
• Pide canciones sin registro
• Modos para invitados, novios y DJ
• Notificaciones en tiempo real
• Modo oscuro automático
• Compatible con tablets

🎵 ¡Que empiece la fiesta!
```

### Paso 7: Enviar para Revisión

1. Haz clic en **"Revisar"**
2. Verifica todo
3. Haz clic en **"Enviar para revisión"**

### Paso 8: Esperar Aprobación

Google revisará tu app (2-4 horas típicamente)

✅ **¡Tu app está en Google Play Store!**

---

## ⏱️ Tiempos Estimados

| Tarea | Tiempo |
|-------|--------|
| Descargar código | 2 min |
| Instalar dependencias | 5 min |
| Generar código nativo | 2 min |
| Compilar AAB | 10-15 min |
| Subir a Play Store | 5 min |
| **TOTAL** | **24-29 min** |
| Revisión de Google | 2-4 horas |

---

## 🐛 Solucionar Problemas

### Error: "Command not found: npm"

**Solución:**
- Instala Node.js desde: https://nodejs.org

### Error: "Java not found"

**Solución:**
- Instala Java JDK desde: https://www.oracle.com/java/technologies/javase-jdk11-downloads.html

### Error: "BUILD FAILED"

**Solución:**
```bash
cd android
./gradlew clean
./gradlew bundleRelease
cd ..
```

### La compilación tarda mucho

**Es normal:**
- Primera compilación: 15-20 minutos
- Compilaciones futuras: 5-10 minutos
- Espera pacientemente ☕

### Error: "Out of memory"

**Solución:**

**Windows (PowerShell):**
```powershell
$env:GRADLE_OPTS = "-Xmx4096m"
cd android
./gradlew bundleRelease
```

**Mac/Linux:**
```bash
export GRADLE_OPTS="-Xmx4096m"
cd android
./gradlew bundleRelease
```

---

## ✅ Checklist Final

- [ ] Código descargado
- [ ] Node.js instalado
- [ ] Java JDK instalado
- [ ] `npm install` completado
- [ ] `npx expo prebuild` completado
- [ ] `./gradlew bundleRelease` completado
- [ ] AAB generado
- [ ] AAB subido a Google Play Console
- [ ] Información completada
- [ ] Enviado para revisión
- [ ] ✅ App publicada

---

## 📞 Soporte

- **Node.js:** https://nodejs.org
- **Java JDK:** https://www.oracle.com/java
- **Expo:** https://docs.expo.dev
- **Google Play:** https://support.google.com/googleplay

---

**¡Éxito! 🚀**
