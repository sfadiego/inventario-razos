# inventario motopartes razo

# Ejecutar testing

```bash
php artisan test --env=testing
```

# Docker

Levantar docker

```bash
docker compose up --build -d
```

Levantar docker testing

-rm `{nombre_container}` lo borra despues de que termina

```bash
docker compose -f docker-compose.test.yml run --rm php_test
```

Finalizar el contenedor

descomentar `--volumes` si deseas que se borre la informacion de la base de datos

```bash
docker compose down #--volumes
```

# Notas

si ejecutas docker, ajusta las variables de entorno

```bash
VITE_APP_URL=http://localhost:8000
DB_HOST=mysql
DB_PASSWORD=root
```

# Github Actions

comandos para ejecutar formateo de código

Formatea código frontend

```bash
pnpm run format
```

Muestra warnings y errores en codigo

```bash
pnpm run lint
```

formatea código PHP

```bash
./vendor/bin/pint
```

## Comandos

backup de base de datos en la ruta: `storage/app/backups/`

```bash
php artisan db:backup
```

# Configuracion CUps (Windows/MacOs)

- listado dispositivos: 
```bash
lpinfo -v
```

- Habilitar acceso remoto y compartir impresoras en CUPS
```bash
sudo cupsctl --remote-any --remote-admin --share-printers
sudo cupsctl WebInterface=yes
```

- agregar dispositivo a cups:
```bash 
lpadmin -p POS80_Series_POS80_Printer_USB -E -v usb://POS80_Series/POS80_Printer_USB -m raw
lpadmin -p ${PRINTER_NAME} -E -v usb://POS80_Series/POS80_Printer_USB -m raw
```

- estado de impresora:
```bash
lpstat -a
```