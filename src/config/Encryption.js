/**
 * Redux Encryptor
 */
import createEncryptor from 'redux-persist-transform-encrypt';

const encryptor = createEncryptor({
  secretKey: 'fasto',
});

export default encryptor;
