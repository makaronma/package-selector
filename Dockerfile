FROM node:20-alpine
WORKDIR /usr/app

# Install package-manager
# use corepack for easier installation
RUN corepack enable pnpm


# Download dependencies from lockfile
# it's make build(local) faster because if there is no change in dependencies, it will use cache, 
# but with `package.json` It's updated frequently, so often it won't cache.)
# See more: https://pnpm.io/cli/fetch
COPY ./pnpm-lock.yaml ./
RUN pnpm fetch

# Install dependencies
COPY ./package.json ./
RUN pnpm i --offline

# https://stackoverflow.com/questions/67639482/docker-eacces-permission-denied-mkdir-app-node-modules-cache
RUN mkdir -p ./node_modules/.cache && chmod -R 777 ./node_modules/.cache
# RUN chown -R node /app/node_modules

# Build
COPY ./ ./
# RUN pnpm build

# Clean up devDependencies
# RUN pnpm prune

EXPOSE 3000

USER node

CMD ["pnpm", "start"]