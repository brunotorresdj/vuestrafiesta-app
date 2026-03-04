# VUESTRAFIESTA - TODO

## Fase 1: Configuración Base
- [x] Actualizar logo y branding en app.config.ts
- [x] Configurar paleta de colores en theme.config.js
- [x] Crear componentes base (botones, tarjetas, inputs)

## Fase 2: Interfaz de Invitado
- [x] Pantalla de inicio con opciones (Invitado/DJ)
- [x] Pantalla de petición de canción
- [x] Pantalla de historial de peticiones
- [x] Integración con base de datos local (AsyncStorage)

## Fase 3: Interfaz del DJ
- [x] Pantalla del panel del DJ
- [x] Sistema de tabs (Pendientes, En reproducción, Reproducidas, Rechazadas)
- [x] Botones de acción (Reproducir, Reproducida, Rechazar, Eliminar)
- [x] Actualización en tiempo real de estados

## Fase 4: Base de Datos y Backend
- [x] Crear schema de peticiones (canciones, estados)
- [x] Implementar persistencia con AsyncStorage
- [x] Hook personalizado para gestión de peticiones

## Fase 5: Pulido y Testing
- [x] Validación de formularios
- [x] Manejo de errores
- [x] Testing de flujos principales
- [x] Tests unitarios para storage

## Fase 6: Entrega
- [x] Crear checkpoint final
- [x] Documentación de uso

## Fase 7: Sección de Novios
- [x] Crear pantalla de acceso a sección de novios (con contraseña/PIN)
- [x] Pantalla para crear lista de canciones imprescindibles
- [x] Visualizar lista de canciones imprescindibles
- [x] Editar y eliminar canciones de la lista
- [x] Integrar lista de novios con peticiones de invitados
- [x] Mostrar indicador visual cuando se pide una canción de la lista

## Fase 8: Integración de Canciones Prioritarias
- [x] Crear función para verificar si una canción está en la lista de novios
- [x] Mostrar indicador ⭐💍 en peticiones de invitados
- [x] Mostrar indicador en el panel del DJ
- [x] Mostrar indicador en historial de invitados
- [x] Tests para validar la integración (13 tests pasando)

## Fase 9: Sistema de Notificaciones para el DJ
- [x] Crear hook para gestionar notificaciones in-app
- [x] Crear componente de notificación visual (toast/banner)
- [x] Integrar notificaciones con peticiones de canciones prioritarias
- [x] Mostrar notificación cuando llegue una canción de la lista de novios
- [x] Añadir vibración hapática para notificaciones importantes
- [x] Persistir notificaciones no leídas
- [x] Tests para validar el sistema de notificaciones (25 tests pasando)

## Fase 10: Modo Oscuro Automático
- [x] Crear hook para detectar hora del día y activar modo oscuro automáticamente
- [x] Configurar horario nocturno (20:00 - 07:00) para activar modo oscuro
- [x] Añadir toggle manual para cambiar entre modo claro/oscuro/auto
- [x] Persistir preferencia de tema del usuario
- [x] Integrar modo oscuro en el panel del DJ
- [x] Tests para validar el sistema de modo oscuro (44 tests pasando)

## Fase 11: Mensajes de Felicitación
- [x] Crear hook para gestionar mensajes de felicitación
- [x] Añadir campo opcional de mensaje en la pantalla de petición de canciones
- [ ] Mostrar mensajes junto con las peticiones en el panel del DJ
- [x] Crear pantalla de visualización de mensajes para los novios
- [x] Permitir a los novios ver todos los mensajes recibidos
- [x] Tests para validar el sistema de mensajes (53 tests pasando)

## Fase 12: Sugerencias Rápidas de Canciones
- [x] Crear componente de tarjeta de sugerencia
- [x] Mostrar sugerencias de canciones de novios en pantalla de invitado
- [x] Implementar petición rápida con un toque
- [x] Mostrar confirmación de petición rápida
- [x] Tests para validar sugerencias rápidas (59 tests pasando)

## Fase 13: Rediseño Visual y Mejora de Elegancia
- [x] Actualizar paleta de colores con gradientes y acentos
- [x] Mejorar tipografía y espaciado
- [x] Rediseñar tarjetas con sombras y bordes elegantes
- [x] Mejorar botones con efectos hover y transiciones
- [x] Optimizar pantalla de inicio
- [x] Añadir animaciones sutiles
- [x] Tests para validar el nuevo diseño (59 tests pasando)

## Fase 14: Sistema de Códigos de 4 Dígitos para DJ
- [x] Crear hook para generar y gestionar códigos de 4 dígitos
- [x] Implementar pantalla de creación de código en panel del DJ
- [x] Añadir pantalla de ingreso de código para invitados
- [x] Integrar códigos con almacenamiento de peticiones
- [x] Mostrar código activo en panel del DJ
- [x] Validar código antes de acceder a peticiones
- [x] Tests para validar el sistema de códigos (72 tests pasando)

## Fase 15: Acceso de Novios con Código del DJ y Reordenamiento
- [x] Permitir que novios usen el código del DJ para acceder
- [x] Crear pantalla de ingreso de código para novios
- [x] Reordenar opciones en pantalla de inicio (Invitado → Novios → DJ)
- [x] Actualizar navegación de novios
- [x] Tests para validar los cambios (72 tests pasando)

## Fase 16: Historial de Bodas Anteriores
- [x] Actualizar hook useDJCode para guardar historial de códigos
- [x] Crear pantalla de historial de bodas
- [x] Permitir cambiar entre bodas anteriores
- [x] Mostrar peticiones de boda anterior en panel del DJ
- [x] Tests para validar el historial (72 tests pasando)
