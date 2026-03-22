#!/bin/bash
# =============================================================================
# block-env-bash.sh — PreToolUse hook for Bash commands
# Blocks any command that could directly or indirectly read sensitive files
# =============================================================================

INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# --- 1. Block sensitive file patterns anywhere in the command ----------------
# Catches: cat .env, head .env.local, cp .env /tmp/x, etc.
if echo "$CMD" | grep -Eiq '(\.env[^/]*|\.pem|\.key|credentials\.json|/secrets/)'; then
  echo "ERROR: Command references a sensitive file or extension" >&2
  exit 2
fi

# --- 2. Block environment variable dumping -----------------------------------
# Catches: env, printenv, set, export -p, declare -x
if echo "$CMD" | grep -Eq '^\s*(env|printenv|declare)(\s|$)' \
|| echo "$CMD" | grep -Eq '^\s*set(\s|$)' \
|| echo "$CMD" | grep -Eq 'export\s+-[a-zA-Z]*p' \
|| echo "$CMD" | grep -Eq 'declare\s+-[a-zA-Z]*x'; then
  echo "ERROR: Environment variable dumping is blocked" >&2
  exit 2
fi

# --- 3. Block broad hidden-file wildcards ------------------------------------
if echo "$CMD" | grep -Eq '\.\*'; then
  echo "ERROR: Broad hidden file wildcard (.*) is blocked" >&2
  exit 2
fi

# --- 4. Block inline scripting that could bypass file checks -----------------
# Catches: bash -c '...', sh -c '...', python3 -c '...', node -e '...', etc.
if echo "$CMD" | grep -Eq "(bash|sh|zsh|fish|python[0-9.]?|python3|node|perl|ruby|php)\s+(-[a-zA-Z]*c|-e)\s"; then
  echo "ERROR: Inline script execution (-c / -e flags) is blocked" >&2
  exit 2
fi

exit 0
