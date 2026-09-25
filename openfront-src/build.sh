#!/usr/bin/env bash
# Rebuild ../openfront (the static single-player OpenFront site) from source:
# fetch upstream OpenFront at the pinned commit, apply static-solo.patch, build,
# and copy the result into place.
#
# Needs Node 24 and npm 12 (upstream's engines), git and bash.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(dirname "$HERE")"
UPSTREAM="https://github.com/openfrontio/OpenFrontIO.git"
COMMIT="22722dfe9aa9a7d7c6fe1b3fb4ace58ed8282731"
WORK="${WORK_DIR:-$(mktemp -d)}"

git -C "$WORK" init -q
git -C "$WORK" fetch -q --depth 1 "$UPSTREAM" "$COMMIT"
git -C "$WORK" checkout -q FETCH_HEAD
git -C "$WORK" apply "$HERE/static-solo.patch"

cd "$WORK"
npm run inst
STATIC_SOLO_SOURCE_URL="${STATIC_SOLO_SOURCE_URL:-https://github.com/wowksies/pokgames/tree/main/openfront-src}" \
  ./static-solo/build.sh

rm -rf "$REPO_ROOT/openfront"
cp -r static "$REPO_ROOT/openfront"
echo "Built into $REPO_ROOT/openfront"
