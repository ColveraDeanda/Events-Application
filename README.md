<h1 align="center">
🌐 TicketMaster App | MERN Stack
</h1>
<p align="center">
MongoDB, Express.js, React, Node.js
</p>

La app de TicketMaster te permite explorar eventos en México y EE. UU., con detalles completos para ayudarte a decidir. Al iniciar sesión, puedes agregar eventos a tus favoritos y dejar reseñas. Es ideal para quienes disfrutan asistir a varios eventos y quieren mantener un registro de sus experiencias.

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
