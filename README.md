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

Definir:
- [?] busqueda
    - nombre de club
    - ciudad tmb

Pendiente:
- [ ] imagenes
- [ ] agregar el link de las que tienen pagina
- [ ] hacer circular el formulario / llamar
- [ ] SEO trafico etc...
- [ ] loader en buscar clubes no error de una
- [ ] 

NEW
- [ ] refactor club car 
    - accept buttons accept decline for admin panel
    - optional-default image
- [ ] accept/decline new canchas
- [ ] handle images upload
    - poder subir imagenes
    - restringir el tamaño o ratio de la imagen
    - dar la opcion de recortarla
    - preview de la imagen
- [ ] cartel de cancha enviada correctamente
- [ ] link a cafecito
- [ ] mapa de canchas (como???????)
- [ ] ciudades y provincias de canchas como selects predefinidos (para subir cancha y para filtrarlas)
- [ ] 
