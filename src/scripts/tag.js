#!/usr/bin/env node
import { promises as fs } from 'fs';
import { execSync, spawnSync } from 'child_process';
import { parse, parseAllDocuments } from 'yaml';

// Extract arguments from the command line:
// npm run tag -- path/to/file.yaml tagName
const [,, tagName, yamlFilePath] = process.argv;

if (!yamlFilePath || !tagName) {
  console.error('Usage: npm run tag -- <tagName> <yamlFilePath>');
  process.exit(1);
}

(async () => {
  try {
    // Read and parse the YAML file
    const fileContents = await fs.readFile(yamlFilePath, 'utf8');
    const yamlData = parseAllDocuments(fileContents);

    // Convert the parsed YAML object back into a string with front-matter style
    // or just JSON.stringify. Since we need a message for the git tag, we might
    // just include the YAML as a block. Here, let's include a simple re-dumped YAML.
    // If you want exact original YAML, you'd need the original text. For simplicity, 
    // we'll use the fileContents directly as the message.
    
    const tagMessage = fileContents.trim();

    // Create the git tag
    // -a to create an annotated tag
    // -m to provide a message
    const tagMessageEscaped = tagMessage.replace(/"/g, '\\"');
    // execSync(`git tag -a "${tagName}" -m "${tagMessageEscaped}"`, { stdio: 'inherit' });
    // Instead of passing a single shell command string, 
    // you can use execSync (or spawnSync) with an array of arguments. 
    // This bypasses the shell parsing step and prevents your message from being misinterpreted:
    // execSync('git', ['tag', '-a', tagName, '-m', tagMessage], { stdio: 'inherit' });
    // Failed to create tag: Error: Command failed: git
    const result = spawnSync('git', ['tag', '-a', tagName, '-m', tagMessage], { stdio: 'inherit' });
    if (result.status !== 0) {
      console.error('Failed to create tag');
    }
    console.log(`Tag "${tagName}" created successfully.`);
  } catch (err) {
    console.error('Failed to create tag:', err);
    process.exit(1);
  }
})();