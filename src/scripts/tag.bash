#!/usr/bin/env bash

# Usage: ./tag.bash <tagName> <yamlFilePath>

TAG_NAME="$1"
YAML_FILE="$2"

if [ -z "$YAML_FILE" ] || [ -z "$TAG_NAME" ]; then
    echo "Usage: $0 <tagName> <yamlFilePath>"
    exit 1
fi

# Run the serialization/validation Node script and capture the output
SERIALIZED_YAML=$(node src/scripts/serialize.js "$YAML_FILE")

if [ $? -ne 0 ]; then
    echo "Serialization/validation failed."
    exit 1
fi

# Create a tag using the serialized YAML as the message
# Using '-F -' and a here-string so that we don't have to deal with shell escaping
git tag -a "$TAG_NAME" -F - <<<"$SERIALIZED_YAML"

if [ $? -eq 0 ]; then
    echo "Tag \"$TAG_NAME\" created successfully."
else
    echo "Failed to create tag \"$TAG_NAME\"."
    exit 1
fi
