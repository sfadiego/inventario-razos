
#!/usr/bin/env sh
set -e

APP_DIR="/var/www/html"

# Ejecutar tareas de arranque solo una vez (o cada inicio según prefieras)
# Composer install
if [ -f composer.json ]; then
  # echo "removing vendor files"
  # rm -rf vendor
  
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

# crea storage 
php artisan storage:link || true
