<h1 align="center">
🌐 TicketMaster App | MERN Stack
</h1>
<p align="center">
MongoDB, Express.js, React, Node.js
</p>

La app de TicketMaster te permite explorar eventos, con detalles completos para ayudarte a decidir. Al iniciar sesión, puedes agregar eventos a tus favoritos y dejar reseñas. Es ideal para quienes disfrutan asistir a muchos eventos y quieren mantener un registro de sus experiencias.

## Funcionalidades principales
 - Registro de usuarios e inicio de sesión: Permite a los usuarios crear una cuenta y acceder a su perfil de manera segura.
 - Visualización de eventos: Ofrece una interfaz clara para explorar una amplia variedad de eventos disponibles.
 - Filtro de eventos en México y EE. UU.: Facilita la búsqueda de eventos permitiendo al usuario seleccionar entre opciones de ambos países.
 - Barra de búsqueda de eventos: Incluye una función de búsqueda que permite a los usuarios encontrar eventos específicos rápidamente.
 - Favoritos al iniciar sesión: Los usuarios pueden agregar eventos a su lista de favoritos al iniciar sesión, personalizando su experiencia.
 - Gestión de favoritos: Permite a los usuarios actualizar o eliminar eventos de su lista de favoritos según sus preferencias.
 - Paginación: Implementa un sistema de paginación para facilitar la navegación a través de grandes cantidades de eventos, mejorando la experiencia del usuario.

## Clonar
```terminal
$ git clone https://github.com/ColveraDeanda/Events-Application.git
```

## Prerequisitos
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/)
- [npm](https://nodejs.org/en/download/package-manager/)

> Ten en cuenta que necesitas que el cliente y el servidor se ejecuten simultáneamente en diferentes sesiones de terminal para que puedan comunicarse entre sí.

## Frontend
```terminal
$ cd frontend
```
```terminal
$ npm i
```
```terminal
$ npm start
```

## Backend
```terminal
$ cd backend
```
```terminal
$ npm i
```
```terminal
$ npm start
```

## Variables de entorno 

### Backend
> Crear archivo .env en la carpeta backend con las siguientes variables:
 - MONGO_CONNECTION_STRING = URL de conección BD Mongo
 - PORT= Puerto a conectarse
 - SESSION_SECRET = Clave de sesión 

### Frontend
> Crear archivo .env en la carpeta frontend con la siguiente variable:
 - REACT_APP_TICKETMASTER_API = https://app.ticketmaster.com/discovery/v2/events.json?apikey={API_KEY}

**Dirigirse a la página [página de TicketMaster](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) para generar la API KEY**

## Screenshots TicketMaster App

### Página principal
![image](https://github.com/user-attachments/assets/fe72f9dc-e4cb-4140-bb16-1a4b9e6253e8)

### Registrarse
![image](https://github.com/user-attachments/assets/88e316db-b29c-4534-8f96-d612db7368ba)

### Iniciar sesión
![image](https://github.com/user-attachments/assets/8be05c9e-081f-4be2-8333-7e9271936d4f)

### Detalle de evento
![image](https://github.com/user-attachments/assets/2d7029aa-7b2e-41b9-96d9-5502db248cd6)

### Favoritos
![image](https://github.com/user-attachments/assets/72132297-7e84-422a-891b-2329b949d03a)

### Paginación
![image](https://github.com/user-attachments/assets/0106fd41-80af-48d5-ad4b-7477bb0e2a0d)





