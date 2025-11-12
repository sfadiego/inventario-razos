#!/usr/bin/env sh
set -e

APP_DIR="/var/www/html"

# espera a que MySQL responda (usa variables de entorno DB_HOST, DB_USERNAME, DB_PASSWORD)
wait_for_mysql() {
  # si no existe mysqladmin (cliente) salimos rápido
  if ! command -v mysqladmin >/dev/null 2>&1; then
    echo "mysqladmin no disponible, saltando espera de mysql"
    return 0
  fi

  DB_HOST=${DB_HOST:-mysql}
  DB_USERNAME=${DB_USERNAME:-root}
  DB_PASSWORD=${DB_PASSWORD:-}

  echo "Esperando a MySQL en ${DB_HOST}..."
  # intenta hasta que mysqladmin ping devuelva OK (máx 60 intentos)
  tries=0
  until mysqladmin ping -h "${DB_HOST}" -u "${DB_USERNAME}" -p"${DB_PASSWORD}" --silent >/dev/null 2>&1; do
    tries=$((tries+1))
    if [ $tries -gt 60 ]; then
      echo "MySQL no respondió en 60s, abortando."
      break
    fi
    sleep 1
  done
  echo "MySQL listo (o timeout)."
}

# --- inicio ---
cd "$APP_DIR" || exit 1

# Opcional: exportar variables de entorno desde .env si quieres (no recomendado en prod)
# if [ -f "$APP_DIR/.env" ]; then
#   export $(grep -v '^#' .env | xargs)
# fi

# Esperar DB
wait_for_mysql

# Ejecutar tareas de arranque solo una vez (o cada inicio según prefieras)
# Composer install
if [ -f composer.json ]; then
  echo "removing vendor files"
  rm -rf vendor
  
  echo "Running composer install..."
  # usar --no-interaction --no-progress para no colgar en CI
  composer install --no-interaction --prefer-dist --optimize-autoloader || true
fi

# Generar key si no existe APP_KEY
if [ -f .env ] && ! grep -q '^APP_KEY=' .env || [ -z "${APP_KEY:-}" ]; then
  echo "Generando APP_KEY..."
  php artisan key:generate || true
fi

# Cache config (safe en prod)
php artisan config:cache || true

# Migraciones con seed (opcional: proteger en prod)
echo "Ejecutando migraciones..."
php artisan migrate --force --seed || true

# Limpiar cache
php artisan cache:clear || true
php artisan view:clear || true

# Ejecutar el comando que se pase al contenedor (por defecto php-fpm)
exec "$@"
