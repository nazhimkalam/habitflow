const admin = require('firebase-admin');
const serviceAccount = process.env.NODE_ENV === 'test'
  ? require('./firebaseServiceKey.test.json')
  : require('./firebaseServiceKey.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
