#bin/bash

# install php & extentions
sudo apt-get update && sudo apt-get install php8.1, composer, php8.1-curl, php8.1-xml, php8.1-sqlite, nvm

# install php packages
composer update && composer i

# install js packages
nvm install && npm i

# init project
cp .env.example .env
php artisan key:generate --ansi
php artisan migrate

