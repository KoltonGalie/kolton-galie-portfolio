#!/usr/bin/env bash
set -Eeuo pipefail
project_dir="$(cd "$(dirname "$0")" && pwd)"
production_dir="/var/www/koltongalie-portfolio"
release_dir="${production_dir}.release"
if [[ ${EUID} -ne 0 ]]; then echo "Run with sudo: sudo $0" >&2; exit 1; fi
sudo -u koltongalie "$project_dir/scripts/build.sh"
rm -rf "$release_dir"
install -d -o www-data -g www-data "$release_dir"
rsync -a --delete "$project_dir/dist/" "$release_dir/"
chown -R www-data:www-data "$release_dir"
find "$release_dir" -type d -exec chmod 755 {} +
find "$release_dir" -type f -exec chmod 644 {} +
test -s "$release_dir/index.html"
if ! nginx -t; then echo "nginx validation failed; production was not replaced." >&2; exit 1; fi
if [[ -d "$production_dir" ]]; then
  previous_dir="${production_dir}.previous.$(date -u +%Y%m%d-%H%M%S)"
  mv "$production_dir" "$previous_dir"
fi
mv "$release_dir" "$production_dir"
nginx -t
systemctl reload nginx
echo "Portfolio deployed to $production_dir"
