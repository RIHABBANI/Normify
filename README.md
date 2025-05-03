# Normify


# Create new project

composer create-project laravel/laravel project_name


composer install


cp .env.example .env


DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password


php artisan key:generate

php artisan migrate
php artisan migrate:rollback


php artisan serve