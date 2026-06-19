#!/usr/bin/env bash
# Launch the Astro dev server with Node 24, regardless of the caller's PATH.
# Used by the Claude preview tool (.claude/launch.json) which otherwise
# inherits the shell's default Node 18.
set -e
export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 24 >/dev/null 2>&1
cd "$(dirname "$0")/.."
exec npm run dev -- "$@"
