#!/usr/bin/env bash
# Rebuild Postiz from the VPS git clone and recreate the running container.
#
# Usage (on the VPS, from the repo root):
#   pnpm deploy:production
#
# Optional env overrides:
#   REPO_DIR=/apps/postora
#   IMAGE_NAME=postiz-custom:latest
#   CONTAINER_NAME=postiz
#
# Dependencies are installed inside the image by Dockerfile.dev (`pnpm install`).
# A host-side pnpm install is skipped on purpose: node_modules is dockerignored
# and would not be copied into the image.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="${REPO_DIR:-$(cd "$SCRIPT_DIR/.." && pwd)}"
IMAGE_NAME="${IMAGE_NAME:-postiz-custom:latest}"
CONTAINER_NAME="${CONTAINER_NAME:-postiz}"
DOCKERFILE="${DOCKERFILE:-Dockerfile.dev}"

log() {
  printf '\n[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

die() {
  printf 'Error: %s\n' "$*" >&2
  exit 1
}

command -v git >/dev/null || die "git is not installed"
command -v docker >/dev/null || die "docker is not installed"
docker compose version >/dev/null 2>&1 || die "docker compose is not available"
[[ -d "$REPO_DIR/.git" ]] || die "not a git repo: $REPO_DIR"
[[ -f "$REPO_DIR/$DOCKERFILE" ]] || die "missing $DOCKERFILE in $REPO_DIR"
docker inspect "$CONTAINER_NAME" >/dev/null 2>&1 || die "container '$CONTAINER_NAME' is not running. Start the Hostinger project first."

cd "$REPO_DIR"

log "1/4 git pull"
git fetch origin
git pull --ff-only

log "2/4 update dependencies + 3/4 build image $IMAGE_NAME"
# pnpm install and pnpm run build both happen in Dockerfile.dev.
docker build \
  -t "$IMAGE_NAME" \
  -f "$DOCKERFILE" \
  --build-arg "NEXT_PUBLIC_VERSION=$(git rev-parse --short HEAD)" \
  .

PROJECT="$(docker inspect "$CONTAINER_NAME" --format '{{index .Config.Labels "com.docker.compose.project"}}')"
SERVICE="$(docker inspect "$CONTAINER_NAME" --format '{{index .Config.Labels "com.docker.compose.service"}}')"
WORKING_DIR="$(docker inspect "$CONTAINER_NAME" --format '{{index .Config.Labels "com.docker.compose.project.working_dir"}}')"
CONFIG_FILES="$(docker inspect "$CONTAINER_NAME" --format '{{index .Config.Labels "com.docker.compose.project.config_files"}}')"

[[ -n "$PROJECT" && -n "$SERVICE" && -n "$WORKING_DIR" && -n "$CONFIG_FILES" ]] \
  || die "could not read Docker Compose labels from container '$CONTAINER_NAME'"

OVERRIDE="$(mktemp /tmp/postiz-image-override.XXXXXX.yaml)"
trap 'rm -f "$OVERRIDE"' EXIT

cat > "$OVERRIDE" <<EOF
services:
  ${SERVICE}:
    image: ${IMAGE_NAME}
    pull_policy: never
EOF

compose_args=(--project-directory "$WORKING_DIR" -p "$PROJECT")
IFS=',' read -ra files <<< "$CONFIG_FILES"
for file in "${files[@]}"; do
  compose_args+=(-f "$file")
done
compose_args+=(-f "$OVERRIDE")

log "4/4 recreate container '$CONTAINER_NAME' (service '$SERVICE', project '$PROJECT')"
docker compose "${compose_args[@]}" up -d --force-recreate --no-deps --pull never "$SERVICE"

log "removing leftover untagged images from previous builds"
docker image prune -f >/dev/null

log "done"
docker ps --filter "name=^${CONTAINER_NAME}$" --format 'table {{.Names}}\t{{.Status}}\t{{.Image}}'
docker image ls "$IMAGE_NAME"
