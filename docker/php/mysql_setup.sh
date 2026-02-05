#!/usr/bin/env sh
set -e
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



# Esperar DB
wait_for_mysql
