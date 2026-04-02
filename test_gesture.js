const fs = require('fs');
const content = fs.readFileSync(
  './node_modules/react-native-gesture-handler/lib/typescript/index.d.ts',
  'utf-8'
);
if (content.includes('FlatList')) {
  console.log('FlatList found in RNGH export');
} else {
  console.log('FlatList NOT found in RNGH export');
}
