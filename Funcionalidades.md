# Hoja de Funcionalidades y Estándares Técnicos (Versión Final Consolidada)

Este documento especifica los requisitos funcionales y técnicos **obligatorios** para la creación del sitio web. El agente de IA puede proponer y añadir funcionalidades adicionales que considere pertinentes, pero las que se detallan a continuación deben ser implementadas sin excepción.

---

### Principios Técnicos y de Código

-   **Comentarios en Español:** Todo el código (HTML, CSS, JavaScript) debe estar claramente comentado por secciones para explicar la lógica y la estructura. **Todos los comentarios deben estar en español.**
-   **Librerías Adicionales:** Si se necesitan librerías adicionales (como Swiper.js, AOS, etc.), estas deben ser agregadas directamente en carpetas del proyecto (ej. `/assets/js/libs/` o `/assets/css/libs/`) para evitar dependencias externas. Esto garantiza que el sitio funcione correctamente en servidores como cPanel donde no se tiene acceso a consola para instalar dependencias.
-   **Logo Corporativo:** El logo debe ser utilizado en el **navbar** y en el **footer** del sitio web. Debe tener un tamaño fijo de **100px** para todas las vistas (mobile, tablet, desktop) para mantener la consistencia visual. El logo estara en ./assets/img/logo y puede tener extension .jpg o .png.
-   **Iconografía SVG:** Todos los iconos utilizados en el sitio deben ser en formato **SVG**. Esto asegura:
    -   **Escalabilidad Vectorial:** No pierden calidad al cambiar de tamaño.
    -   **Colores Dinámicos:** Deben usar `fill="currentColor"` en el código SVG para que hereden el color del elemento padre (texto), facilitando la tematización.
-   **CSS con Custom Properties:** La hoja de estilos (CSS) debe utilizar **variables (Custom Properties)** para los valores clave como colores, fuentes y espaciados, facilitando el mantenimiento y la consistencia.
-   **Imágenes Optimizadas y Responsivas:**
    -   **Responsive:** Usar la etiqueta `<picture>` o el atributo `srcset` para servir imágenes de diferentes tamaños según el dispositivo.
    -   **Lazy Loading:** Todas las imágenes que no sean críticas para la carga inicial deben tener el atributo `loading="lazy"`.
-   **Enlaces de Contacto:** Todos los números de teléfono y correos electrónicos mostrados en el sitio deben estar correctamente vinculados:
    -   **Teléfonos:** Usar el protocolo `tel:` (ej. `<a href="tel:+1234567890">+123 456 7890</a>`)
    -   **Correos:** Usar el protocolo `mailto:` (ej. `<a href="mailto:contacto@empresa.com">contacto@empresa.com</a>`)
-   **Experiencia de Usuario (UX) y Accesibilidad (a11y):**
    -   **Touch-friendly:** Todos los elementos interactivos deben ser fáciles de usar en dispositivos táctiles.
    -   **Consistencia:** El diseño, la tipografía y los componentes deben ser consistentes en todas las páginas del sitio.
    -   **Accesibilidad:** Usar `alt` descriptivos en imágenes y `aria-label` para botones con solo iconos.

---

### 1. Diseño Responsivo (Mobile-First)

-   **Requisito Fundamental:** Todo el sitio web debe ser **completamente responsivo**.
-   **Implementación:** El diseño debe adaptarse fluidamente para garantizar una experiencia de usuario óptima en todos los tamaños de pantalla, incluyendo teléfonos móviles (vertical y horizontal), tabletas y ordenadores de escritorio. Se recomienda un enfoque "Mobile-First".
-   **Breakpoints Específicos:** Se deben usar los siguientes puntos de quiebre como referencia:
    -   **Mobile**: < 768px
    -   **Tablet**: 768px - 992px
    -   **Desktop**: > 992px
    -   **Large Desktop**: > 1200px

---

### 2. Hero Section a Pantalla Completa

-   **Requisito:** La sección "Hero" principal debe ocupar el **100% de la altura de la pantalla** (viewport height).
-   **Animación Obligatoria:** Debe incluir una **flecha de "scroll down" animada** que incite al usuario a desplazarse.
-   **Opcionales (Creatividad del Agente):** Se puede enriquecer esta sección con elementos como:
    -   Un título y subtítulo con animaciones de entrada.
    -   Una imagen o video de fondo relevante a la temática del sitio.
    -   Animaciones de fondo sutiles (ej. partículas, gradientes animados).

---

### 3. Botones Flotantes Persistentes

-   **Requisito:** Implementar un contenedor de botones flotantes fijo en la esquina **inferior derecha**.
-   **Funcionalidades:**
    -   Un botón de **"Scroll Up"** que, al ser presionado, desplace la página suavemente hasta el inicio.
    -   Un botón de **WhatsApp** que enlace al chat de contacto.
-   **Animación Requerida:** El botón de WhatsApp debe tener una **animación sutil y constante** (ej. un pulso) para atraer la atención sin ser molesto.

---

### 4. Barra de Desplazamiento Personalizada (Scrollbar)

-   **Requisito:** El `scrollbar` del navegador debe ser estilizado para que su **color y diseño se integren con la paleta de colores** general de la página.

---

### 5. Botones de Llamada a la Acción (CTA) Contextuales

-   **Requisito:** Cada sección y servicio debe tener un botón **CTA** visible.
-   **Diseño y Texto:**
    -   **No deben llevar el icono de WhatsApp.**
    -   El texto debe ser contextual a la sección. Ej: "Cotizar este servicio", "Quiero saber más".
-   **Vinculación:** Todos los botones deben enlazar a WhatsApp con un **mensaje personalizado y pre-rellenado** que indique de qué sección proviene el usuario.
    -   **Ejemplo de enlace:** `https://api.whatsapp.com/send?phone=TUNUMERO&text=Hola,%20me%20interesa%20el%20servicio%20de%20Diseño%20Web.%20Me%20gustaría%20recibir%20más%20información.`

---

### 6. Renderizado Dinámico de Contenido

-   **Requisito:** Si el sitio requiere listar múltiples elementos (productos, servicios, etc.), estos **no deben ser codificados directamente en el HTML**.
-   **Implementación:** Utilizar JavaScript para renderizar los elementos dinámicamente desde un **array de objetos**.
-   **Ejemplo de Estructura en JS:**
    ```javascript
    const servicios = [
      {
        titulo: 'Servicio Uno',
        descripcion: 'Descripción del primer servicio.',
        imagen: '/assets/img/servicio1.jpg'
      },
      {
        titulo: 'Servicio Dos',
        descripcion: 'Descripción del segundo servicio.',
        imagen: '/assets/img/servicio2.jpg'
      }
    ];
    ```

---

### 7. Galería de Imágenes Avanzada (Carrusel con Modal)

-   **Requisito:** Si se necesita una galería, debe ser un **carrusel de imágenes avanzado y dinámico**.
-   **Funcionalidades del Carrusel:**
    -   **Automático:** Debe deslizarse automáticamente cada cierto intervalo de tiempo.
    -   **Controles Manuales:** Incluir botones **"Next" y "Prev"** para navegación manual.
    -   **Formato Uniforme:** Todas las imágenes en la vista del carrusel deben tener el **mismo tamaño** para mantener una apariencia ordenada.
    -   **Modal (Lightbox):** Al hacer clic en una imagen, se debe abrir un **modal** que la muestre en **tamaño completo** y con una opción para cerrarlo.
-   **Implementación Técnica:**
    -   La galería debe cargar las imágenes dinámicamente desde `/assets/img/galeria/`.
    -   Los nombres de archivo deben ser una secuencia numérica (`1.jpg`, `2.jpg`, etc.).
    -   Se puede usar una librería como **Swiper.js** o crear una solución a medida.
-   **Ejemplo de Lógica en JS (Guía):**
    ```javascript
    // === CONFIGURACIÓN DE LA GALERÍA ===
    const totalImagenesGaleria = 20; // Solo cambiar este número para actualizar

    // === LÓGICA DE GENERACIÓN (Guía para el Agente) ===
    // 1. Generar dinámicamente los slides del carrusel usando el total de imágenes.
    // 2. Inicializar el carrusel (ej. con Swiper.js) con las opciones:
    //    - Autoplay activado.
    //    - Botones de navegación (next/prev).
    //    - Loop (bucle infinito).
    // 3. Añadir un event listener a cada imagen del carrusel.
    // 4. Al hacer clic, obtener la URL de la imagen y mostrarla en un modal.
    // 5. El modal debe tener una función para cerrarse.
    ```