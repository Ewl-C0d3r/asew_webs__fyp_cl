# Especificación: Corrección de Logo Animado y Contenido Dinámico

## Introducción

Se requiere corregir dos problemas críticos identificados en el sitio web de Fierro y Pérez Abogados:
1. El logo animado no funciona según las especificaciones (aparece redondo y sin transición)
2. Las secciones "Áreas de Práctica" y "Nuestros Servicios" no muestran contenido dinámico

## Requisitos

### Requisito 1: Logo Animado Funcional

**User Story:** Como visitante del sitio web, quiero ver el logo de la empresa de forma cuadrada y centrada en el hero section, y que se anime suavemente hacia el navbar al hacer scroll, para tener una experiencia visual profesional y fluida.

#### Acceptance Criteria

1. CUANDO el usuario carga la página ENTONCES el logo SHALL aparecer en forma cuadrada (sin border-radius) sobre el título de la empresa
2. CUANDO el usuario carga la página ENTONCES el logo SHALL estar perfectamente centrado horizontalmente en el hero section
3. CUANDO el usuario hace scroll hacia abajo ENTONCES el logo SHALL iniciar una transición suave hacia el navbar
4. CUANDO el logo está en transición ENTONCES SHALL cambiar gradualmente de tamaño y posición sin saltos bruscos
5. CUANDO el logo llega al navbar ENTONCES SHALL tener un tamaño que no sobresalga de la barra de navegación
6. CUANDO el usuario hace scroll hacia arriba ENTONCES el logo SHALL regresar suavemente a su posición original en el hero
7. CUANDO el sitio se visualiza en dispositivos móviles ENTONCES la animación SHALL funcionar correctamente con tamaños apropiados

### Requisito 2: Contenido Dinámico de Áreas de Práctica

**User Story:** Como visitante del sitio web, quiero ver las áreas de práctica legal del bufete claramente organizadas con iconos y descripciones, para entender los servicios que ofrecen.

#### Acceptance Criteria

1. CUANDO el usuario navega a la sección "Áreas de Práctica" ENTONCES SHALL mostrar 4 tarjetas con las áreas principales
2. CUANDO se cargan las áreas ENTONCES cada tarjeta SHALL incluir un icono SVG, título, descripción y lista de servicios
3. CUANDO se muestran las áreas ENTONCES SHALL incluir: Derecho Corporativo, Derecho Inmobiliario, Derecho de Familia, y Litigios Civiles
4. CUANDO el usuario hace hover sobre una tarjeta ENTONCES SHALL mostrar efectos visuales apropiados
5. CUANDO se cargan las áreas ENTONCES cada tarjeta SHALL incluir un botón CTA funcional hacia WhatsApp

### Requisito 3: Contenido Dinámico de Servicios

**User Story:** Como visitante del sitio web, quiero ver los servicios específicos que ofrece el bufete con detalles claros, para evaluar si pueden ayudarme con mis necesidades legales.

#### Acceptance Criteria

1. CUANDO el usuario navega a la sección "Nuestros Servicios" ENTONCES SHALL mostrar 4 tarjetas de servicios
2. CUANDO se cargan los servicios ENTONCES cada tarjeta SHALL incluir icono, título, descripción y lista de detalles
3. CUANDO se muestran los servicios ENTONCES SHALL incluir: Prevención y Resolución de Conflictos, Representación Judicial, Derecho Corporativo, y Gestión Inmobiliaria Legal
4. CUANDO el usuario hace hover sobre una tarjeta ENTONCES SHALL mostrar efectos visuales sin problemas de invisibilidad
5. CUANDO se cargan los servicios ENTONCES cada tarjeta SHALL incluir un botón CTA funcional hacia WhatsApp
6. CUANDO se visualizan los servicios ENTONCES SHALL usar colores diferenciados de las áreas de práctica

### Requisito 4: Compatibilidad y Performance

**User Story:** Como visitante del sitio web, quiero que todas las funcionalidades trabajen correctamente en diferentes dispositivos y navegadores, para tener una experiencia consistente.

#### Acceptance Criteria

1. CUANDO el sitio se carga ENTONCES todas las funciones JavaScript SHALL inicializarse correctamente
2. CUANDO se ejecuta en dispositivos móviles ENTONCES el logo animado SHALL funcionar con tamaños apropiados
3. CUANDO se ejecuta en desktop ENTONCES el logo animado SHALL funcionar con tamaños apropiados
4. CUANDO se cargan las secciones dinámicas ENTONCES SHALL aparecer el contenido sin errores de consola
5. CUANDO el usuario interactúa con elementos ENTONCES no SHALL haber conflictos entre animaciones y contenido dinámico