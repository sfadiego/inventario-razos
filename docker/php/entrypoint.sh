#!/usr/bin/env sh
set -e

APP_DIR="/var/www/html"

# setup mysql
/usr/local/bin/mysql_setup.sh || true
# setup laravel
/usr/local/bin/laravel_setup.sh || true

# --- inicio ---
cd "$APP_DIR" || exit 1

# Ejecutar el comando que se pase al contenedor (por defecto php-fpm)
exec "$@"
