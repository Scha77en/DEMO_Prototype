#!/usr/bin/env bash
set -euo pipefail

# Colors
GREEN="\033[0;32m"
RED="\033[0;31m"
NC="\033[0m" # No Color

echo -e "${GREEN}🔧  Starting project setup...${NC}"

# 1. Check for required commands
for cmd in git node npm docker docker-compose; do
  if ! command -v $cmd &> /dev/null; then
    echo -e "${RED}✖  Required command not found: $cmd${NC}"
    exit 1
  fi
done
echo -e "${GREEN}✔  All required tools are installed.${NC}"

# 2. Create .env.local if missing
ENV_FILE=".env.local"
if [ -f "$ENV_FILE" ]; then
  echo -e "${GREEN}✔  ${ENV_FILE} already exists, skipping creation.${NC}"
else
  cat > "$ENV_FILE" <<EOF
# Redis connection URL
REDIS_URL=redis://localhost:6379
EOF
  echo -e "${GREEN}✔  Created ${ENV_FILE}.${NC}"
fi

# 3. Bring up Redis via Docker Compose
echo -e "${GREEN}🔄  Starting Redis container...${NC}"
docker-compose up -d
echo -e "${GREEN}✔  Redis is running on localhost:6379.${NC}"

# 4. Install NPM dependencies
echo -e "${GREEN}📥  Installing NPM dependencies...${NC}"
npm install
npm install framer-motion
echo -e "${GREEN}✔  Dependencies installed.${NC}"

# 5. (Optional) Build & start in production mode
read -p "▶️  Would you like to build & start the app now? (y/N) " BUILD_NOW
if [[ "${BUILD_NOW,,}" == "y" ]]; then
  echo -e "${GREEN}🏗  Building production bundle...${NC}"
  npm run build
  echo -e "${GREEN}🚀  Starting production server...${NC}"
  npm start
  echo -e "${GREEN}✔  App is live at http://localhost:3000${NC}"
else
  echo -e "${GREEN}▶️  Setup complete. You can now run ${RED}npm run dev${NC} or build & start manually.${NC}"
fi

echo -e "${GREEN}🎉  Setup finished!${NC}"
