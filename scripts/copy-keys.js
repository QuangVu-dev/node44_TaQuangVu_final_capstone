const fs = require('fs-extra');
const path = require('path');

// Đường dẫn đến thư mục khóa gốc
const srcDir = path.resolve(__dirname, '../keys');

// Đường dẫn đến thư mục đích trong dist
const destDir = path.resolve(__dirname, '../dist/keys');

// Sao chép thư mục khóa vào thư mục dist
fs.copy(srcDir, destDir)
  .then(() => {
    console.log('Keys copied to dist/keys');
  })
  .catch((err) => {
    console.error('Error copying keys:', err);
  });
