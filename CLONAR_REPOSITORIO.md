# 📥 Clonar Repositorio VUESTRAFIESTA

Si no puedes descargar el ZIP, puedes clonar el repositorio Git directamente. Es más rápido y fácil.

---

## 🚀 Opción 1: Clonar desde GitHub (RECOMENDADO)

### Paso 1: Instalar Git

**Windows:**
- Descarga desde: https://git-scm.com/download/win
- Ejecuta el instalador

**Mac:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

### Paso 2: Clonar el Repositorio

Abre terminal/PowerShell y ejecuta:

```bash
git clone https://github.com/tu-usuario/vuestrafiesta-app.git
cd vuestrafiesta-app
```

**Si no tienes GitHub, sigue la Opción 2 abajo.**

---

## 🚀 Opción 2: Descargar como ZIP desde GitHub

### Paso 1: Ir a GitHub

1. Ve a: https://github.com/tu-usuario/vuestrafiesta-app
2. Haz clic en el botón verde **"Code"**
3. Selecciona **"Download ZIP"**

### Paso 2: Extraer

1. Abre el ZIP descargado
2. Extrae en tu carpeta de proyectos

---

## 🚀 Opción 3: Copiar Archivos Manualmente

Si Git no funciona, aquí están los archivos principales que necesitas:

### Estructura de Carpetas

```
vuestrafiesta-app/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── _layout.tsx
│   ├── guest.tsx
│   ├── dj.tsx
│   ├── grooms.tsx
│   └── ...
├── components/
│   ├── screen-container.tsx
│   ├── ui/
│   │   ├── icon-symbol.tsx
│   │   └── ...
│   └── ...
├── hooks/
│   ├── use-colors.ts
│   ├── use-color-scheme.ts
│   └── ...
├── lib/
│   ├── utils.ts
│   ├── theme-provider.tsx
│   └── ...
├── assets/
│   └── images/
│       ├── icon.png (logo neon)
│       ├── splash-icon.png
│       └── ...
├── app.config.ts
├── package.json
├── tailwind.config.js
├── theme.config.js
├── tsconfig.json
└── ...
```

---

## 📋 Pasos Después de Clonar/Descargar

Una vez que tengas los archivos en tu computadora:

### 1. Instalar Dependencias

```bash
cd vuestrafiesta-app
npm install
```

### 2. Generar Código Nativo

```bash
npx expo prebuild --clean --platform android
```

### 3. Compilar AAB

```bash
cd android
./gradlew bundleRelease
```

### 4. Subir a Google Play Store

El archivo estará en:
```
android/app/build/outputs/bundle/release/app-release.aab
```

---

## ✅ Checklist

- [ ] Git instalado
- [ ] Repositorio clonado o ZIP descargado
- [ ] Archivos extraídos
- [ ] Terminal abierta en la carpeta del proyecto
- [ ] `npm install` completado
- [ ] `npx expo prebuild` completado
- [ ] `./gradlew bundleRelease` completado
- [ ] AAB generado
- [ ] AAB subido a Google Play Store
- [ ] ✅ App publicada

---

## 📞 Soporte

Si tienes problemas:

1. **Git Help:** https://git-scm.com/doc
2. **GitHub Help:** https://docs.github.com
3. **Expo Docs:** https://docs.expo.dev

---

**¡Buena suerte! 🚀**
