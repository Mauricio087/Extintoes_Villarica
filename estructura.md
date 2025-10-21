# Estructura de Archivos para el Proyecto Web

A continuación se detalla un ejemplo de cómo se puede estructurar la organización de los directorios y archivos para el desarrollo del sitio web. Obviamente aqui se pueden agregar o quitar secciones a las ya presentes en el ejemplo, si asi lo indica el documento de info del cliente, siguiendo la misma logica de la estructura.

Los archivos HTML que sean necesarios, irán en la raiz, los css en ./assets/css y los js en ./assets/js, sera un archivo css y js para cada seccion y tambien uno global.

EJEMPLO:
/ (RAIZ)
├── index.html
│
└── /assets
├── /css
│   ├── style.css         // Estilos globales para todo el sitio
│   ├── header.css        // Estilos específicos para el header
│   ├── quienes-somos.css // Estilos específicos para quienes-somos
│   ├── servicios.css     // Estilos específicos para servicios
│   ├── galeria.css       // Estilos específicos para galeria
│   ├── contacto.css      // Estilos específicos para contacto
│   └── footer.css        // Estilos específicos para el footer
│
├── /js
│   ├── main.js           // Scripts globales para todo el sitio
│   ├── home.js           // Scripts específicos para la página de inicio
│   ├── galeria.js        // Scripts para la funcionalidad de la galería
│   └── contacto.js       // Scripts para el formulario de contacto
│
├── /img
│   ├── logo.jpeg         // Logotipo principal de la empresa
│   │
│   └── /galeria
│       ├── 1.jpg
│       ├── 2.jpg
│       └── ...
│


### **Descripción de la Estructura**

* **RAIZ (`/`)**: Contiene todos los archivos HTML principales del sitio. Cada archivo corresponde a una sección de la página (Home, Quiénes Somos, etc.).
* **`./assets/css`**: Almacena todas las hojas de estilo.
    * `style.css`: Contendrá los estilos generales (variables de color, fuentes, estilos para el header, footer, etc.) que se aplicarán en todo el sitio.
    * Archivos CSS por sección: Cada página HTML tendrá su propio archivo CSS para estilos específicos, manteniendo el código más ordenado.
* **`./assets/js`**: Almacena todos los archivos JavaScript.
    * `main.js`: Para funcionalidades que se repiten en todo el sitio, como el menú de navegación móvil.
    * Archivos JS por sección: Para scripts que solo son necesarios en páginas específicas (por ejemplo, `galeria.js` para la lógica de la galería interactiva).
* **`./assets/img`**: Carpeta para todas las imágenes.
    * El logo y otras imágenes generales se guardan en la raíz de `img`.
    * **`./assets/img/"seccion"/`**: cada seccion tendra su propia carpeta donde iran las imagenes.
    * **`./assets/img/galeria/`**: Contiene las imagenes en formato .jpg y enumeradas del 1 al n.
    * **`./assets/img/favicon_io/`**: Contiene los favicon en distintos tamaños y tambien el site.webmanifest.