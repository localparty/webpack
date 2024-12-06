#!/usr/bin/env node
import { readFileSync } from 'fs';
import { parse, stringify } from 'yaml';

// Command line arguments:
// node scripts/serialize.js path/to/file.yaml
const [,, yamlFilePath] = process.argv;

if (!yamlFilePath) {
  console.error('Usage: node scripts/serialize.js <yamlFilePath>');
  process.exit(1);
}

try {
  const fileContents = readFileSync(yamlFilePath, 'utf8');
  
  // Parse the YAML
  const data = parse(fileContents);
  
  // Validation logic (example):
  // Check that schema key is present and matches expected pattern
  if (!data.schema || typeof data.schema !== 'string') {
    console.error('Validation failed: "schema" key missing or invalid.');
    process.exit(1);
  }
  
  // Additional validations as needed...
  
  // After validation, serialize the data back to YAML in a canonical way
  const serialized = stringify(data);
  
  // Print the serialized YAML to stdout
  process.stdout.write(serialized);
  
} catch (err) {
  console.error('Failed to parse or validate YAML:', err.message);
  process.exit(1);
}
