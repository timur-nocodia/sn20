#!/bin/bash

# Function to process files in a directory
process_directory() {
    local dir=$1
    echo "Processing directory: $dir"
    
    # Find all TypeScript/TSX files
    find "$dir" -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
        echo "Processing file: $file"
        
        # Update imports for each feature
        sed -i '' -E '
            # AI Chat components
            s/from ".+\/ai-chat\/(chat-input|chat-messages|chat-topics|model-selector)"/from "@\/features\/ai-chat"/g;
            
            # Analytics components
            s/from ".+\/analytics\/(analytics-cards|analytics-overview|analytics-period-selector|follower-growth|top-content)"/from "@\/features\/analytics"/g;
            
            # Media components
            s/from ".+\/media\/(media-content|media-grid|media-list)"/from "@\/features\/media"/g;
            
            # Network components
            s/from ".+\/network\/(network-binary|network-graph|network-levels|network-stats)"/from "@\/features\/network"/g;
            
            # Settings components
            s/from ".+\/settings\/(settings-content|settings-tabs)"/from "@\/features\/settings"/g;
            
            # Socials components
            s/from ".+\/socials\/(add-social-dialog|social-accounts)"/from "@\/features\/socials"/g;
        ' "$file"
    done
}

# Process app and components directories
process_directory "/Users/tyess/Yandex.Disk.localized/SN/sn2.0/Nov_24/project/app"
process_directory "/Users/tyess/Yandex.Disk.localized/SN/sn2.0/Nov_24/project/components"
