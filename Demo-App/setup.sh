#!/usr/bin/env bash
set -euo pipefail

# Colors
GREEN="\033[0;32m"
RED="\033[0;31m"
NC="\033[0m" # No Color

echo -e "${GREEN}🔧  Starting project setup...${NC}"

# 1. Check for required commands and install if missing
REQUIRED_COMMANDS=("git" "node" "npm" "docker" "docker-compose")
for cmd in "${REQUIRED_COMMANDS[@]}"; do
  if ! command -v $cmd &> /dev/null; then
    echo -e "${RED}✖  Required command not found: $cmd${NC}"
    read -p "⚠️  Would you like to install $cmd now? (y/N) " INSTALL_NOW
    if [[ "${INSTALL_NOW}" == "y" ]]; then
      case $cmd in
        git)
          echo -e "${GREEN}📥  Installing Git...${NC}"
          sudo apt update && sudo apt install -y git
          ;;
        node)
          echo -e "${GREEN}📥  Installing Node.js...${NC}"
          curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
          sudo apt install -y nodejs
          ;;
        npm)
          echo -e "${GREEN}📥  Installing npm...${NC}"
          sudo apt install -y npm
          ;;
        docker)
          echo -e "${GREEN}📥  Installing Docker...${NC}"
          sudo apt update && sudo apt install -y docker.io
          sudo systemctl start docker
          sudo systemctl enable docker
          ;;
        docker-compose)
          echo -e "${GREEN}📥  Installing Docker Compose...${NC}"
          sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
          sudo chmod +x /usr/local/bin/docker-compose
          ;;
        *)
          echo -e "${RED}⚠️  Unable to install $cmd automatically. Please install it manually.${NC}"
          exit 1
          ;;
      esac
    else
      echo -e "${RED}⚠️  $cmd is required. Please install it manually and re-run the script.${NC}"
      exit 1
    fi
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
echo -e "${GREEN}✔  Dependencies installed.${NC}"

# 5. (Optional) Build & start in production mode
read -p "▶️  Would you like to build & start the app now? (y/N) " BUILD_NOW
if [[ "${BUILD_NOW}" == "y" ]]; then
  echo -e "${GREEN}🏗  Building production bundle...${NC}"
  npm run build
  echo -e "${GREEN}🚀  Starting production server...${NC}"
  npm start
  echo -e "${GREEN}✔  App is live at http://localhost:3000${NC}"
else
  echo -e "${GREEN}▶️  Setup complete. You can now run ${RED}npm run dev${NC} or build & start manually.${NC}"
fi

echo -e "${GREEN}🎉  Setup finished!${NC}"