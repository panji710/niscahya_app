#!/bin/bash

echo "=========================================="
echo "SolarMarket - Setup Script"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up SolarMarket...${NC}"
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v php &> /dev/null; then
    echo -e "${RED}PHP is not installed. Please install PHP 8.1+${NC}"
    exit 1
fi

if ! command -v composer &> /dev/null; then
    echo -e "${RED}Composer is not installed. Please install Composer${NC}"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 18+${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed. Please install npm${NC}"
    exit 1
fi

echo -e "${GREEN}All prerequisites found!${NC}"
echo ""

# Setup Backend
echo -e "${YELLOW}Setting up Backend (Laravel)...${NC}"
cd backend

if [ ! -f "composer.json" ]; then
    echo "Creating new Laravel project..."
    composer create-project laravel/laravel . --prefer-dist
fi

echo "Installing Laravel dependencies..."
composer install

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    php artisan key:generate
fi

echo -e "${YELLOW}Please update your database configuration in backend/.env${NC}"
echo -e "${YELLOW}Then run: php artisan migrate && php artisan db:seed${NC}"
echo ""

cd ..

# Setup Frontend
echo -e "${YELLOW}Setting up Frontend (React)...${NC}"
cd frontend

echo "Installing npm dependencies..."
npm install

echo ""
echo -e "${GREEN}Setup completed!${NC}"
echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "1. Update database config in backend/.env"
echo "   DB_DATABASE=solar_marketplace"
echo "   DB_USERNAME=your_username"
echo "   DB_PASSWORD=your_password"
echo ""
echo "2. Create MySQL database:"
echo "   CREATE DATABASE solar_marketplace;"
echo ""
echo "3. Run migrations and seeders:"
echo "   cd backend"
echo "   php artisan migrate"
echo "   php artisan db:seed"
echo ""
echo "4. Start Laravel server:"
echo "   php artisan serve"
echo ""
echo "5. In a new terminal, start React dev server:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "6. Open http://localhost:5173 in your browser"
echo ""
echo "=========================================="
