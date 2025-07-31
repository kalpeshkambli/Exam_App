// hash.js
const bcrypt = require('bcrypt');

const plainPassword = 'admin123';

bcrypt.hash(plainPassword, 10).then(hash => {
  console.log('🔐 Hashed password:', hash);
}).catch(err => {
  console.error('Error hashing password:', err);
});
