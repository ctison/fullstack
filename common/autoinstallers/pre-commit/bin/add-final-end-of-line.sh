#!/bin/sh
set -eu

for file in "$@"; do
  if [ -s "$file" ] && [ -n "$(tail -c1 "$file")" ]; then
    echo '' >>"$file"
  fi
done
