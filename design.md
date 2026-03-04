# VUESTRAFIESTA - Diseño de Interfaz Móvil

## Visión General
Una aplicación minimalista y divertida para bodas que permite a los invitados pedir canciones al DJ sin registro. El DJ gestiona las solicitudes con estados visuales y emoticonos.

## Pantallas Principales

### 1. **Pantalla de Inicio (Home)**
- **Propósito**: Punto de entrada con dos opciones claras
- **Contenido**:
  - Logo/Nombre de la app: "VUESTRAFIESTA" con micrófono 🎤
  - Dos botones grandes:
    - "Soy Invitado 🎉" → Acceso a formulario de petición
    - "Soy DJ 🎧" → Acceso a panel de gestión
  - Subtítulo: "¿Qué quieres hacer?"
- **Funcionalidad**: Navegación simple sin autenticación

### 2. **Pantalla de Petición de Canción (Guest)**
- **Propósito**: Formulario para que invitados pidan canciones
- **Contenido**:
  - Encabezado: "Pide tu canción 🎵"
  - Campo de texto: "Nombre de la canción"
  - Campo de texto: "Artista"
  - Campo de texto: "Tu nombre (opcional)" 👤
  - Botón grande: "Enviar Petición ✨"
  - Mensaje de confirmación después de enviar
  - Botón: "Pedir otra canción" o "Volver"
- **Funcionalidad**: Guardar petición en base de datos, mostrar confirmación con emoji

### 3. **Pantalla de Historial de Peticiones (Guest)**
- **Propósito**: Ver las canciones que el invitado ha pedido
- **Contenido**:
  - Encabezado: "Tus peticiones 📋"
  - Lista de canciones con:
    - Nombre de canción + Artista
    - Estado visual con emoji:
      - ⏳ Pendiente
      - ▶️ En reproducción
      - ✅ Reproducida
      - ❌ No disponible
    - Hora de petición
  - Botón: "Pedir otra canción"
- **Funcionalidad**: Mostrar estado en tiempo real

### 4. **Pantalla de Panel del DJ**
- **Propósito**: Gestión de todas las peticiones
- **Contenido**:
  - Encabezado: "Panel del DJ 🎧"
  - Tabs/Secciones:
    - **Pendientes** ⏳
    - **En Reproducción** ▶️
    - **Reproducidas** ✅
    - **Rechazadas** ❌
  - Lista de peticiones con:
    - Canción + Artista
    - Nombre del invitado (si lo proporcionó)
    - Botones de acción:
      - "Reproducir ▶️"
      - "Reproducida ✅"
      - "Rechazar ❌"
      - "Eliminar 🗑️"
  - Contador de peticiones pendientes en la esquina
- **Funcionalidad**: Cambiar estado de peticiones, gestión completa

## Flujos de Usuario Principales

### Flujo 1: Invitado Pide Canción
1. Inicio → "Soy Invitado 🎉"
2. Pantalla de petición
3. Completa formulario (canción, artista, nombre opcional)
4. Toca "Enviar Petición ✨"
5. Confirmación con emoji 🎉
6. Opción: "Pedir otra" o "Ver mis peticiones"

### Flujo 2: DJ Gestiona Peticiones
1. Inicio → "Soy DJ 🎧"
2. Panel del DJ con lista de pendientes
3. Toca "Reproducir ▶️" → Pasa a "En Reproducción"
4. Toca "Reproducida ✅" → Pasa a "Reproducidas"
5. O toca "Rechazar ❌" → Pasa a "Rechazadas"
6. Puede ver historial completo en tabs

## Paleta de Colores

| Elemento | Color | Uso |
|----------|-------|-----|
| Primario | #FF6B9D | Botones principales, acentos |
| Secundario | #C44569 | Variante más oscura del primario |
| Fondo | #FFFFFF | Fondo general (claro) |
| Fondo Oscuro | #1A1A1A | Fondo en modo oscuro |
| Texto Principal | #2D3436 | Texto principal |
| Texto Secundario | #636E72 | Texto secundario/muted |
| Éxito | #00B894 | Estados positivos (✅) |
| Advertencia | #FDCB6E | Estados pendientes (⏳) |
| Error | #D63031 | Estados rechazados (❌) |
| Borde | #DFE6E9 | Bordes y divisores |

## Tipografía

- **Títulos**: 28-32px, Bold, Color primario
- **Subtítulos**: 18-20px, SemiBold, Texto principal
- **Cuerpo**: 14-16px, Regular, Texto principal
- **Pequeño**: 12-14px, Regular, Texto secundario

## Componentes Clave

### Botones
- **Primario**: Fondo gradiente #FF6B9D → #C44569, texto blanco, redondeado (12px)
- **Secundario**: Borde #FF6B9D, texto #FF6B9D, fondo transparente
- **Pequeño**: Para acciones en lista (cambiar estado)

### Tarjetas
- Fondo blanco/superficie, sombra suave, borde 1px #DFE6E9
- Padding: 16px
- Radio: 12px

### Entrada de Texto
- Borde 1px #DFE6E9, radio 8px
- Padding: 12px
- Placeholder gris claro

## Emoticonos Principales
- 🎤 Micrófono (marca)
- 🎉 Celebración (invitado)
- 🎧 DJ
- 🎵 Música/Canción
- ✨ Confirmación/Éxito
- 📋 Historial
- ⏳ Pendiente
- ▶️ En reproducción
- ✅ Reproducida
- ❌ Rechazada
- 🗑️ Eliminar
- 👤 Nombre

## Consideraciones de Diseño

1. **Minimalismo**: Interfaz limpia, sin elementos innecesarios
2. **Accesibilidad**: Botones grandes, texto legible, contraste adecuado
3. **Diversión**: Uso estratégico de emoticonos para hacer la experiencia lúdica
4. **Responsive**: Diseño adaptable a diferentes tamaños de pantalla
5. **Sin Autenticación**: Acceso directo sin login
6. **Orientación**: Portrait (9:16) optimizado para una mano

## Navegación

- **Pantalla de Inicio**: Hub central
- **Invitado**: Petición → Historial (tab bar)
- **DJ**: Panel con tabs (Pendientes, En reproducción, Reproducidas, Rechazadas)
- **Botón Atrás**: Siempre disponible para volver a inicio
