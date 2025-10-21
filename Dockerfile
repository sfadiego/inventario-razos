FROM php:8.4-fpm AS php
# Extensiones básicas
RUN apt-get update && apt-get install -y \
    default-mysql-client \
    libzip-dev \
    libonig-dev \
    unzip \
    zip \
    git \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring zip gd \
    && rm -rf /var/lib/apt/lists/*
    
# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
    
# copia entrypoint y dale permiso de ejecución
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Copia el código del proyecto Laravel
WORKDIR /var/www/html

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]