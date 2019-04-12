# Encryption
An encryption package that provides implementations for hashing, ciphers, and random string generation.

## Classes
| Class | Description |
| --- | --- |
| [`ECCipher`](https://github.com/elijahjcobb/encryption/blob/master/dist/ECCipher.d.ts) | A class that allows encrypting and decrypting `Buffer` instances with a password and salt. |
| [`ECHash`](https://github.com/elijahjcobb/encryption/blob/master/dist/ECHash.d.ts) | A class that allows hashing a buffer using the sha256 algorithm. |
| [`ECGenerator`](https://github.com/elijahjcobb/encryption/blob/master/dist/ECGenerator.d.ts) | A class providing multiple methods to generate random formatted strings. |

## Import
```typescript
// Separately
import { ECCipher, ECHash, ECGenerator } from "@elijahjcobb/encryption";
 
// All Together
import ECEncryption = require("@elijahjcobb/encryption");
let cipher: ECEncryption.ECCipher = new ECEncryption.ECCipher();
let hashedData: Buffer = ECEncryption.ECHash.hash();
let rando: string = ECEncryption.ECGenerator.randomId();
```

## Documentation

All declaration files and source code files contain full documentation. However, below are some examples.

## Examples

### `ECCipher`
```typescript
// Import
import { ECCipher } from "@elijahjcobb/encryption";

// Create Cipher
let cipher: ECCipher = new ECCipher("password", "salt-is-optional");

// Any Buffer will do.
let data: Buffer = Buffer.from("Hello, World!", "utf8");

// Encrypting
let encrypted: Buffer = cipher.encrypt(data);

// Decrypting
let decrypted: Buffer = cipher.decrypt(encrypted);

// msg = "Hello, World!
let msg: string = data.toString("utf8");

```

### `ECHash`
```typescript
// Import
import { ECHash } from "@elijahjcobb/encryption";

// Any Buffer will do.
let data: Buffer = Buffer.from("Hello, World!", "utf8");

// Hash using sha256.
let hashedData: Buffer = ECHash.hash(data);
```

### `ECGenerator`
```typescript
// Import
import { ECGenerator } from "@elijahjcobb/encryption";

// Generate a random string of just numbers with length 6.
let code: string = ECGenerator.randomCode();

// Generates random string with letters and numbers of length 8.
let fileName: string = ECGenerator.randomFileName();

// Generates random string with lowercase letters and numbers of length 32.
let salt: string = ECGenerator.randomSalt();

// Generates a random string with specified characters of a specified length.
let length: number = 100;
let chars: string = "qwertyuiopasdfghjklzxcvbnm";
let rando: string = ECGenerator.randomString(length, chars);
```


## TypeScript
All classes contain TypeScript declaration files. You can also view all the [source code](https://github.com/elijahjcobb/encryption/tree/master/ts) or [declaration files](https://github.com/elijahjcobb/encryption/tree/master/dist) on GitHub. Each class in the table above links directly to it's declaration file.

## Bugs
If you find any bugs please [create an issue on GitHub](https://github.com/elijahjcobb/encryption/issues) or if you are old fashioned email me at [elijah@elijahcobb.com](mailto:elijah@elijahcobb.com).