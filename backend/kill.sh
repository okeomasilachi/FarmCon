#!/bin/bash

# Get PIDs of processes listening on port 5000
pids=$(lsof -ti tcp:5000 | awk '{if (NR!=1) {print $2}}')

# Check if any PIDs were found
if [[ -z "$pids" ]]; then
  echo "No processes found listening on port 5000."
else
  echo "Found processes listening on port 5000: $pids"
  # Send SIGTERM (termination signal) to each process
  for pid in $pids; do
    echo "Sending SIGTERM to process $pid..."
    kill -TERM "$pid" || echo "Failed to send SIGTERM to process $pid."
  done
  # Check if processes are still running after SIGTERM (optional)
  sleep 5  # Wait 5 seconds to allow processes to terminate gracefully
  remaining_pids=$(lsof -ti tcp:5000 | awk '{if (NR!=1) {print $2}}')
  if [[ -n "$remaining_pids" ]]; then
    echo "WARNING: Some processes (PIDs: $remaining_pids) might still be running on port 5000 after SIGTERM. Sending SIGKILL..."
    # Send SIGKILL (force termination signal) to remaining processes (use with caution)
    for pid in $remaining_pids; do
      echo "Sending SIGKILL to process $pid..."
      kill -KILL "$pid" || echo "Failed to send SIGKILL to process $pid."
    done
  fi
fi
