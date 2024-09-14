## Autenticación y acceso a API

En este ejercicio vamos a trabajar la autenticación y el acceso a la API

Como véis no hay un package.json por tanto tendréis que inicializar NPM e instalar todas las dependencias necesarias para realizar el ejercicio.

Todo lo haremos desde el lado del servidor, en este caso no usaremos el FRONT para consumirlo. Por tanto no deberiáis tener errores de CORS.

## ¿Qué vamos a hacer?
El ejercico consta de 2 partes:
- Acceso a la API creada por nosotros de Rick and Morty. Podéis traerla a este archivo y adaptarla a lo que pide el ejercicio
- Autenticación. Podéis usar autenticaciones anterirores y adaptarla a este ejercicio. 

1. En la ruta "/" estará nuestra entrada a la validación con dos inputs de usuario y contraseña.
Si conseguimos pasarla tendremos acceso a nuestra API de rick and morty para poder consumirla.
Si volvemos a esta ruta los inputs habrán desaparecido y habrá un enlace a /search  y un botón de logout para deslogarnos.

2. En /search tendremos un input donde podremos introducir el nombre del personaje de rick and morty y el botón enviar para hacer la busqueda que nos llevará al /character/:nombre. También un botón de logout para deslogarnos

3. Crearemos las rutas de /characters y /character/:nombre
Tendremos que securizar todas las rutas para verificar si estamos logados antes de poder acceder a ellas.

4. En este caso /character será res.json(), pero /character/:nombre debera devolver un HTML con los datos de nombre, género, url de la imagen, y los datos que se os ocurran

El ejercicio hay que hacerlo MODULAR, no puede ser un monolito, diferenciando el archivo inical con el servidor, los middlewares, autenticaciones, rutas, usuarios...
 