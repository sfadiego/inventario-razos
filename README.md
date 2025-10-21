# inventario motopartes razo




# run testing
```bash
php artisan test --env=testing
```

# levantar docker
```bash
docker compose up --build -d
```

# levantar docker testing
-rm `{nombre_container}` lo borra despues de que termina
```bash
docker compose -f docker-compose.test.yml run --rm php_test
```


# Notas
si ejecutas docker, ajusta la variable VITE_APP_URL con el puerto 8080
```bash
VITE_APP_URL=http://localhost:8080
```
