FROM php:8.4-fpm AS php
# Extensiones básicas
RUN apt-get update && apt-get install -y \
    default-mysql-client \
    mariadb-client \
    libzip-dev \
    libonig-dev \
    unzip \
    zip \
    git \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    sqlite3 \
    libsqlite3-dev \
    libicu-dev \
    cups smbclient cifs-utils netcat-openbsd iproute2 procps \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring zip gd intl \
    && rm -rf /var/lib/apt/lists/*
    
# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
    
# copia entrypoint y dale permiso de ejecución
COPY docker/php/mysql_setup.sh /usr/local/bin/mysql_setup.sh
COPY docker/php/laravel_setup.sh /usr/local/bin/laravel_setup.sh
COPY docker/php/cups_setup.sh /usr/local/bin/cups_setup.sh
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
# permiso de ejecución
RUN chmod +x /usr/local/bin/entrypoint.sh /usr/local/bin/mysql_setup.sh /usr/local/bin/laravel_setup.sh /usr/local/bin/cups_setup.sh 

# Copia el código del proyecto Laravel
WORKDIR /var/www/html

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]