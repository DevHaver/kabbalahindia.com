#!/bin/bash
# =============================================================================
# block-env-read.sh — PreToolUse hook for Read, Edit, and Write tools
# Blocks access to sensitive files, including via symlinks
# =============================================================================

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Some tools use 'path' instead of 'file_path' — check both
if [ -z "$FILE" ]; then
  FILE=$(echo "$INPUT" | jq -r '.tool_input.path // empty')
fi

# If no file path was found in the input, nothing to check
[ -z "$FILE" ] && exit 0

# --- 1. Block by filename/extension pattern ----------------------------------
SENSITIVE_PATTERN='(\.env([^/]|$)|\.pem$|\.key$|credentials\.json$|/secrets/)'

if echo "$FILE" | grep -Eiq "$SENSITIVE_PATTERN"; then
  echo "ERROR: Access to sensitive file is blocked: $FILE" >&2
  exit 2
fi

# --- 2. Resolve symlinks and re-check the true path -------------------------
if [ -e "$FILE" ]; then
  TRUE_PATH=$(realpath "$FILE" 2>/dev/null)
  if echo "$TRUE_PATH" | grep -Eiq "$SENSITIVE_PATTERN"; then
    echo "ERROR: Symlink resolves to a protected sensitive file: $TRUE_PATH" >&2
    exit 2
  fi
fi

# --- 3. Block directory traversal attempts ----------------------------------
# Catches paths like ../../.env or /app/../secrets/.env
NORMALIZED=$(echo "$FILE" | sed 's|/\./|/|g' | sed 's|[^/]*/\.\./||g')
if echo "$NORMALIZED" | grep -Eiq "$SENSITIVE_PATTERN"; then
  echo "ERROR: Normalized path resolves to a protected sensitive file" >&2
  exit 2
fi

exit 0
