#!/usr/bin/env bash
set -Eeuo pipefail
project_dir="$(cd "$(dirname "$0")/.." && pwd)"
dist_dir="$project_dir/dist"
rm -rf "$dist_dir"
install -d "$dist_dir"
cp -a "$project_dir/src/." "$dist_dir/"
test -s "$dist_dir/index.html"
test -s "$dist_dir/app.js"
test -s "$dist_dir/data/projects.js"
echo "Build complete: $dist_dir"
