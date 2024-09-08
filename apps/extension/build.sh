#!/bin/bash

# Check if an argument was provided
if [ $# -ne 1 ]; then
  echo "Usage: $0 <chrome|firefox>"
  exit 1
fi

BROWSER_TYPE=$1

# Validate the argument
if [[ "$BROWSER_TYPE" != "chrome" && "$BROWSER_TYPE" != "firefox" ]]; then
  echo "Error: Invalid argument. Use 'chrome' or 'firefox'."
  exit 1
fi

# Define directories and files
DIST_DIR="dist"
BROWSER_DIR="$DIST_DIR/$BROWSER_TYPE"
CHROME_MANIFEST="chrome-manifest.json"
FIREFOX_MANIFEST="firefox-manifest.json"

mkdir -p "$BROWSER_DIR"

if [ "$BROWSER_TYPE" = "chrome" ]; then
  MANIFEST_FILE="$CHROME_MANIFEST"
else
  MANIFEST_FILE="$FIREFOX_MANIFEST"
fi

# Exclude files and directories from being copied
EXCLUDE_FILES="Makefile build.sh README.md $CHROME_MANIFEST $FIREFOX_MANIFEST"
EXCLUDE_PATTERN=$(echo "$EXCLUDE_FILES" | sed 's/ / --exclude=/g' | sed 's/^/--exclude=/')

# Copy files excluding specified ones
rsync -av $EXCLUDE_PATTERN --exclude='dist/' --exclude='*.git*' . "$BROWSER_DIR/"

cp "$MANIFEST_FILE" "$BROWSER_DIR/manifest.json"

echo "Build completed for $BROWSER_TYPE."
