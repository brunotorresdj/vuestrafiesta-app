#!/bin/bash

# VUESTRAFIESTA - Script de Compilación Automatizado
# Este script compila la app para Google Play Store

set -e

echo "🚀 VUESTRAFIESTA v1.0.2 - Compilador Automatizado"
echo "=================================================="
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

# Verificar requisitos
print_info "Verificando requisitos..."

if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado"
    echo "Descarga desde: https://nodejs.org"
    exit 1
fi
print_status "Node.js instalado: $(node --version)"

if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
fi
print_status "npm instalado: $(npm --version)"

if ! command -v java &> /dev/null; then
    print_error "Java JDK no está instalado"
    echo "Descarga desde: https://www.oracle.com/java/technologies/javase-jdk11-downloads.html"
    exit 1
fi
print_status "Java instalado: $(java -version 2>&1 | head -1)"

echo ""
print_info "Instalando dependencias..."
npm install --legacy-peer-deps

echo ""
print_info "Generando código nativo de Android..."
npx expo prebuild --clean --platform android --no-install

echo ""
print_info "Compilando AAB para Google Play Store..."
cd android

# Compilar AAB
./gradlew bundleRelease

cd ..

echo ""
echo "=================================================="
print_status "¡Compilación completada!"
echo ""
echo "📦 Archivo compilado:"
echo "   android/app/build/outputs/bundle/release/app-release.aab"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Sube el AAB a Google Play Console"
echo "   2. Completa la información de la app"
echo "   3. Envía para revisión"
echo ""
echo "📚 Documentación:"
echo "   - COMPILAR_EN_TU_PC.md - Guía paso a paso"
echo "   - CLONAR_REPOSITORIO.md - Cómo obtener el código"
echo ""
echo "🎉 ¡Buena suerte!"
echo "=================================================="
