const bcrypt = require('bcryptjs');

async function testHash() {
  const motDePasse = 'motDePasseAleatoire';
  const hashedPassword = await bcrypt.hash(motDePasse, 12);

  console.log('Hashed:', hashedPassword);

  const isMatch = await bcrypt.compare(motDePasse, hashedPassword);
  console.log('Correspondance:', isMatch);
}

testHash();
