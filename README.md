# Clubes de Paleta

El objetivo de este proyecto es que todos los pelotaris argentinos puedan saber si hay una cancha de pelota a paleta en la ciudad que estan visitando.

La idea es que circule un formulario de google por la comunidad pelotari, a partir de las respuestas aceptarlas, modificarlas y pasarlas a una hoja de calculo definitiva. Esta hoja de calculo recopila provincia, ciudad, club, tipo de cancha, direccion y contacto.
Con esta informacion en la pagina mostraria los clubes segun la ciudad, y demas información.

Ver online [AQUI](https://clubes-paleta.vercel.app/).

## Entorno

Este proyecto fue realizado con **Next 15**, React.js, Sass y Google Sheets como "bd", deployado en Vercel.

## Scripts
(node version ^20)
```bash
npm i           # install dependencies
npm run dev     # run it
```

next 15
node express psql sequelize
next auth 15 beta with github

what is api folder for????????

Ir a [http://localhost:3000](http://localhost:3000) en el navegador para ver el resultado.

Esta el ejemplo
```
.env.example 
```
de como guardar la variable de entorno para google sheets

## Update Google Sheets

- archivo
- compartir
- publicar en la web
- seleccionar hoja
- seleccionar .csv


## TODO:

### Pendiente:
- [ ] agregar el link de las que tienen pagina
- [ ] recopilar canchas + cargar excel en la db
- [ ] SEO trafico etc...
- [ ] refactor club card
    - [ ] convertir direccion en link de maps
- [ ] admin
    - [ ] mejorar seguridad de login (2 factor de autenticaicon o verificar mail y contraseña u otp...)
- [ ] handle images upload
    - [ ] restringir el tamaño o ratio de la imagen / ver post de linkedin / solucionar warning de imagenes por resize
    - [ ] dar la opcion de recortarla (?)
- [ ] mapa de canchas
- [ ] clean code
    - [ ] todos funciones o todos arrow funtions
    - [ ] ver que esten bien usados los use client o use server
    - [ ] separar bien la logica dumb and smart components
- [ ] Acerca de
    - [ ] Brindar feedback (telegram? mail?)
    - [ ] Compartir con amigos
- [ ] Footer contacto
    - [ ] redes??
    - [ ] email??
- [ ] 





## re-redactar descripcion para README

The user is building an app for "canchas de pelota paleta" (pelota paleta courts) in Argentina. The app has:

1. A Next.js frontend with TypeScript
2. A Node.js Express backend with TypeScript


The main functionality involves:

- Users can submit their courts ("canchas") which go into a pending state
- Admin can approve, edit, or reject these pending courts
- When approved, the pending court should be removed from the pending collection and added to the main courts collection


The user has two models:

- Cancha (approved courts)
- PendingCancha (courts submitted by users waiting for approval)


The user wants help with:

1. The controller logic to move a court from pending to approved
2. Whether they need a separate create controller for Cancha or if they should only create Canchas through the approval process