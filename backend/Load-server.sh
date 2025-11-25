#!/bin/bash

# =========================================================
# Zamara Technologies — Django + Celery Dev Startup Script
# =========================================================
# This script will:
# 1. Kill any process using Django's default port (8000)
# 2. Start Django development server
# 3. Start Celery worker and Celery beat
# 4. Keep them all running until you press CTRL+C
# =========================================================

set -e  # Exit immediately on errors

# ---------- CONFIG ----------
PORT=8000
PROJECT_NAME="config"   # Django project name
PYTHON="python3"         # Change if using a different command
BANNER_FILE="banner.txt" # ASCII art file
# ----------------------------

# ---------- COLORS ----------
CYAN="\033[1;36m"
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
RED="\033[1;31m"
RESET="\033[0m"
# ----------------------------

clear

# ---------- DISPLAY BANNER ----------
if [ -f "$BANNER_FILE" ]; then
    echo -e "${CYAN}"
    cat "$BANNER_FILE"
    echo -e "${RESET}"
else
    echo -e "${CYAN}"
    echo "========================================================="
    echo "              Zamara Technologies - Dev Mode"
    echo "========================================================="
    echo -e "${RESET}"
fi

echo ""
echo -e "${CYAN}Starting local development environment...${RESET}"
echo -e "${YELLOW}Checking if port $PORT is in use...${RESET}"

# ---------- PORT CHECK ----------
PID=$(sudo lsof -t -i:$PORT || true)

if [ -n "$PID" ]; then
    echo -e "${RED}Port $PORT is in use by process $PID. Terminating...${RESET}"
    sudo kill -9 $PID
    echo -e "${GREEN}Port $PORT is now free.${RESET}"
else
    echo -e "${GREEN}Port $PORT is already free.${RESET}"
fi

# ---------- VIRTUAL ENV ----------
if [ -f "../venv/bin/activate" ]; then
    echo ""
    echo -e "${YELLOW}Activating virtual environment...${RESET}"
    source ../venv/bin/activate
else
    echo ""
    echo -e "${RED}No virtual environment found (expected ./venv/).${RESET}"
    echo "Proceeding without activation..."
fi

# ---------- START DJANGO ----------
echo ""
echo -e "${CYAN}Starting Django development server on port $PORT...${RESET}"
$PYTHON manage.py runserver $PORT &
DJANGO_PID=$!

sleep 3

# ---------- START CELERY ----------
echo ""
echo -e "${CYAN}Starting Celery worker...${RESET}"
celery -A $PROJECT_NAME worker --loglevel=info &
CELERY_PID=$!

echo ""
echo -e "${CYAN}Starting Celery beat scheduler...${RESET}"
celery -A $PROJECT_NAME beat --loglevel=info &
BEAT_PID=$!

# ---------- STATUS ----------
echo ""
echo -e "${GREEN}All services started successfully.${RESET}"
echo -e "${CYAN}---------------------------------------------------------${RESET}"
echo -e " Django PID:        $DJANGO_PID"
echo -e " Celery Worker PID: $CELERY_PID"
echo -e " Celery Beat PID:   $BEAT_PID"
echo -e "${CYAN}---------------------------------------------------------${RESET}"
echo -e "${YELLOW}Press CTRL+C to stop all services.${RESET}"
echo ""

# ---------- CLEANUP ----------
trap 'echo ""; echo -e "${RED}Shutting down services...${RESET}"; kill $DJANGO_PID $CELERY_PID $BEAT_PID 2>/dev/null || true; exit 0' INT

# ---------- WAIT ----------
wait