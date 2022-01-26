module.exports = {
  '**/!(*graphql).{ts,tsx}': 'eslint --fix',
  '**/*.{ts,tsx}': () => 'tsc --noEmit -p tsconfig.json'
}
