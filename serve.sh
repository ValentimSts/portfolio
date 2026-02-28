#!/bin/sh

PORT="${1:-8000}"

echo "Serving portfolio at:"
echo ""
printf "  \033[36mhttp://localhost:%s\033[0m\n" "$PORT"
echo ""

python3 -m http.server "$PORT"
