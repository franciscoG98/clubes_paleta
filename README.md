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

Ir a [http://localhost:3000](http://localhost:3000) en el navegador para ver el resultado.

Esta el ejemplo
```
.env.example 
```
de como guardar la variable de entorno para google sheets

## TODO:

Definir:
- [?] busqueda
    - nombre de club
    - ciudad tmb
- [x] sacarle los 0 al codigo de area de los telefonos

- [?] abrir y que se vean detalles? (te parece?) que se mostraria?
- [?] en el form agregar un segundo numero de contacto

Pendiente:
- [ ] imagenes
- [ ] agregar el link de las que tienen pagina
- [+/-] responsive
- [ ] hacer circular el formulario / llamar
- [ ] SEO trafico etc...
- [ ] favicon - cambiar logo de la pestaña
- [ ] migrar a next
- [ ] club racing de chivilcoy
- [ ] loader
- [ ] 