#!/bin/bash

set -e
set -u

npm run migration:run
# npm run seed:run

echo "migration script run successful"
exit 0
