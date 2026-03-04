# 🔧 SOLUCIÓN: Error de Java en Windows

## ⚠️ EL PROBLEMA QUE TENÍAS

Tu computadora tiene **Java 25**, pero Gradle necesita **Java 21 o anterior**. Por eso fallaba la compilación.

```
Error: Gradle requires Java 21 or earlier
You have Java 25 installed
```

---

## ✅ LA SOLUCIÓN (3 PASOS SIMPLES)

### PASO 1: Desinstalar Java 25 (5 minutos)

1. Abre **Panel de Control**
2. Ve a **Programas** → **Programas y características**
3. Busca **Java** en la lista
4. Haz clic derecho en **Java 25** (o cualquier versión que veas)
5. Selecciona **Desinstalar**
6. Sigue las instrucciones
7. **Reinicia tu PC**

### PASO 2: Instalar Java 21 (10 minutos)

1. Ve a: https://www.oracle.com/java/technologies/downloads/
2. Busca **Java 21 LTS** (Long Term Support)
3. Haz clic en **Windows** (para descargar el instalador `.exe`)
4. Descarga el archivo
5. Ejecuta el instalador
6. Sigue los pasos por defecto (haz clic en "Next" varias veces)
7. **Reinicia tu PC**

**Verificar que Java 21 está instalado:**
- Abre **Símbolo del sistema** (Command Prompt)
- Escribe: `java -version`
- Deberías ver algo como: `java version "21.0.x"`

### PASO 3: Compilar la app (15 minutos)

1. **Descarga el proyecto:**
   - En Manus, ve al checkpoint más reciente
   - Haz clic en **"Code"** → **"Download all files"**
   - Se descargará un ZIP

2. **Extrae el ZIP:**
   - Haz clic derecho en el archivo descargado
   - Selecciona **"Extraer aquí"** o **"Extract All"**
   - Se creará una carpeta llamada `vuestrafiesta-app`

3. **Abre Git Bash o PowerShell:**
   - Abre la carpeta `vuestrafiesta-app`
   - Haz clic derecho en la carpeta vacía
   - Selecciona **"Git Bash Here"** o **"Open PowerShell here"**

4. **Ejecuta estos comandos:**

```bash
# Instalar dependencias
npm install

# Generar código nativo
npx expo prebuild --clean --platform android

# Compilar el AAB
cd android
./gradlew bundleRelease
```

5. **Espera 15-20 minutos** mientras compila. Verás mucho texto en la pantalla, ¡es normal!

### PASO 4: Encontrar el archivo AAB (1 minuto)

Cuando termine, el archivo estará aquí:
```
vuestrafiesta-app\android\app\build\outputs\bundle\release\app-release.aab
```

Este es el archivo que subirás a Google Play Store.

---

## 📱 SUBIR A GOOGLE PLAY STORE

Una vez que tengas el archivo `app-release.aab`:

1. Ve a: https://play.google.com/console
2. Inicia sesión con tu cuenta de Google
3. Crea una nueva app (o selecciona VUESTRAFIESTA si ya existe)
4. Ve a **Versiones** → **Producción**
5. Haz clic en **"Crear nueva versión"**
6. En **"Archivos de la app"**, sube el archivo `app-release.aab`
7. Completa la información:
   - **Nombre de versión:** `1.0.2`
   - **Notas de la versión:**
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
8. Haz clic en **"Revisar"** y luego **"Enviar para revisión"**
9. Google revisará tu app (2-4 horas típicamente)
10. ¡Tu app está en Google Play Store! 🎉

---

## 🎯 RESUMEN RÁPIDO

| Paso | Acción | Tiempo |
|------|--------|--------|
| 1 | Desinstalar Java 25 | 5 min |
| 2 | Instalar Java 21 | 10 min |
| 3 | Compilar con Gradle | 15 min |
| 4 | Encontrar AAB | 1 min |
| **TOTAL** | | **31 minutos** |

---

## 🆘 SI ALGO FALLA

### Error: "Java not found"
- Reinicia tu PC después de instalar Java 21
- Verifica con `java -version` en Command Prompt

### Error: "Gradle sync failed"
- Asegúrate de tener Java 21 (no 25)
- Elimina la carpeta `android\.gradle`
- Intenta de nuevo

### Error: "Permission denied"
- Usa `bash gradlew bundleRelease` en lugar de `./gradlew bundleRelease`

### La compilación es muy lenta
- Es normal, toma 15-20 minutos la primera vez
- Asegúrate de tener al menos 8 GB de RAM libre
- Cierra otros programas pesados

### Error: "Out of memory"
- Abre PowerShell
- Ejecuta:
  ```powershell
  $env:GRADLE_OPTS = "-Xmx4096m"
  cd android
  ./gradlew bundleRelease
  ```

---

## ✨ DESPUÉS DE COMPILAR

Una vez que tengas el archivo `app-release.aab`, estás listo para publicar en Google Play Store. Sigue los pasos en la sección "SUBIR A GOOGLE PLAY STORE" arriba.

¡Tú puedes! 💪
