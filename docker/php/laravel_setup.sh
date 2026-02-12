
#!/usr/bin/env sh
set -e


APP_DIR="/var/www/html"
cd "$APP_DIR"

echo "Reparando permisos de storage..."
# Crear carpetas
mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache storage/logs bootstrap/cache
chmod -R 777 storage bootstrap/cache

# 2. Composer install (Solo si falta vendor o en cambios)
if [ -f composer.json ]; then
  echo "Verificando dependencias..."
  composer install --no-interaction --prefer-dist --optimize-autoloader || echo "Error en composer install"
fi

# Generar key si no existe APP_KEY
# 3. Generar APP_KEY si falta
if [ -f .env ]; then
    if ! grep -q "APP_KEY=base64" .env; then
        echo "Generando APP_KEY..."
        php artisan key:generate --force
    fi
fi

# 4. Base de datos
echo "Ejecutando migraciones..."
php artisan migrate --force --seed || echo "Migraciones fallidas o ya ejecutadas"


# 5. Limpiezas preventivas (Mejor que cachear en desarrollo)
echo "Limpiando caches..."
php artisan config:clear
php artisan view:clear
php artisan cache:clear

# 6. Enlace de storage
php artisan storage:link --force || true
