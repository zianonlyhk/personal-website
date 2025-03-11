#!/bin/bash

# Exit on error
set -e

# Display help message
show_help() {
    echo "Usage: ./deploy.sh [options]"
    echo ""
    echo "Options:"
    echo "  -h, --help       Show this help message"
    echo "  -d, --dev        Deploy development environment (default)"
    echo "  -p, --prod       Deploy production environment"
    echo "  -s, --stop       Stop the running environment"
    echo "  -r, --restart    Restart the environment"
    echo "  -b, --build      Force rebuild of containers"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh -d           # Deploy development environment"
    echo "  ./deploy.sh -p           # Deploy production environment"
    echo "  ./deploy.sh -p -s        # Stop production environment"
    echo "  ./deploy.sh -p -r        # Restart production environment"
    echo "  ./deploy.sh -p -b        # Deploy production environment with rebuild"
}

# Default values
ENV="dev"
ACTION="up"
BUILD=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--help)
            show_help
            exit 0
            ;;
        -d|--dev)
            ENV="dev"
            shift
            ;;
        -p|--prod)
            ENV="prod"
            shift
            ;;
        -s|--stop)
            ACTION="down"
            shift
            ;;
        -r|--restart)
            ACTION="restart"
            shift
            ;;
        -b|--build)
            BUILD="--build"
            shift
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Set compose file based on environment
if [ "$ENV" == "prod" ]; then
    COMPOSE_FILE="docker-compose.prod.yml"
    echo "Using production environment"
else
    COMPOSE_FILE="docker-compose.yml"
    echo "Using development environment"
fi

# Execute the appropriate command
if [ "$ACTION" == "up" ]; then
    echo "Starting containers..."
    docker-compose -f $COMPOSE_FILE up -d $BUILD
elif [ "$ACTION" == "down" ]; then
    echo "Stopping containers..."
    docker-compose -f $COMPOSE_FILE down
elif [ "$ACTION" == "restart" ]; then
    echo "Restarting containers..."
    docker-compose -f $COMPOSE_FILE down
    docker-compose -f $COMPOSE_FILE up -d $BUILD
fi

echo "Done!" 