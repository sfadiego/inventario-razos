#!/bin/bash
set -e

# Environment variables expected:
# PRINTER_NAME PRINTER_HOST PRINTER_USER PRINTER_PASSWORD SMB_PROTOCOL

# Start cupsd in background so socket appears
# Use -f later to bring to foreground; here start in background to run registration
/usr/sbin/cupsd &

# Wait for cupsd socket or TCP port 631
for i in $(seq 1 30); do
  if [ -S /var/run/cups/cups.sock ] || nc -z localhost 631; then
    break
  fi
  sleep 1
done

# Build SMB URI depending on credentials
SMB_URI="smb://${PRINTER_HOST}/${PRINTER_NAME}"
if [ -n "${PRINTER_USER}" ] && [ -n "${PRINTER_PASSWORD}" ]; then
  # URL-encode simple characters if needed; keep it simple here
  SMB_URI="smb://${PRINTER_USER}:${PRINTER_PASSWORD}@${PRINTER_HOST}/${PRINTER_NAME}"
elif [ -n "${PRINTER_USER}" ]; then
  SMB_URI="smb://${PRINTER_USER}@${PRINTER_HOST}/${PRINTER_NAME}"
fi

# Optionally force SMB protocol when registering (CUPS will use smbclient)
# Register printer if not already present
if ! lpstat -a | grep -q "^${PRINTER_NAME} "; then
  # Use raw driver for POS printers
  lpadmin -p "${PRINTER_NAME}" -E -v "${SMB_URI}" -m raw || true
fi

# Ensure printer is accepting jobs
cupsenable "${PRINTER_NAME}" || true
cupsaccept "${PRINTER_NAME}" || true

# Bring cupsd to foreground (replace background instance)
# Kill background cupsd and restart in foreground to keep container running
pkill cupsd || true
exec /usr/sbin/cupsd -f
