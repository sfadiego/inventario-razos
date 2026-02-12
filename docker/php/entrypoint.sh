#!/usr/bin/env sh
set -e

APP_DIR="/var/www/html"

# setup mysql
/usr/local/bin/mysql_setup.sh || echo "Aviso: Falló el setup de MySQL"
# setup laravel
/usr/local/bin/laravel_setup.sh || echo "Aviso: Falló el setup de Laravel"

# Ejecutar el comando que se pase al contenedor (por defecto php-fpm)
exec "$@"