# inventario motopartes razo


# Ejecutar testing
```bash
php artisan test --env=testing
```

# Levantar docker
```bash
docker compose up --build -d
```

# Levantar docker testing
-rm `{nombre_container}` lo borra despues de que termina
```bash
docker compose -f docker-compose.test.yml run --rm php_test
```

# Finalizar el contenedor 
descomentar `--volumes` si deseas que se borre la informacion de la base de datos

```bash
docker compose down #--volumes
```

# Notas
si ejecutas docker, ajusta las variables de entorno

```bash
VITE_APP_URL=http://localhost:8080
DB_HOST=mysql
DB_PASSWORD=root
```
