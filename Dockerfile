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
    cups \
    cups-client \
    smbclient cifs-utils netcat-openbsd iproute2 procps \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring zip gd intl \
    && rm -rf /var/lib/apt/lists/*
    

RUN usermod -u 1000 www-data && groupmod -g 1000 www-data
# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY docker/php/*.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/*.sh

# Copia el código del proyecto Laravel
WORKDIR /var/www/html

RUN mkdir -p /var/www/.cache && chown -R www-data:www-data /var/www/html /var/www/.cache

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]