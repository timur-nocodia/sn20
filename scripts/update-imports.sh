#!/bin/bash

# Update UI component imports
find ./components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/ui/|@/ui/|g'

# Update feature component imports
find ./components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/features/|@/features/|g'

# Update layout component imports
find ./components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/layout-components/|@/layout/|g'
