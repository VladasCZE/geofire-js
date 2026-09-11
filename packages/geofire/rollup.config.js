import commonjs from 'rollup-plugin-commonjs';
import resolveModule from 'rollup-plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const GLOBAL_NAME = 'geofire';

const plugins = [
  resolveModule(),
  typescript(),
  commonjs()
];

const completeBuilds = [{
    input: 'src/index.ts',
    external: ['firebase/database', '@firebase/database-types'],
    output: [{
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins
  },
  {
    input: 'src/index.ts',
    external: ['firebase/database', '@firebase/database-types'],
    output: {
      file: pkg.browser,
      format: 'umd',
      name: GLOBAL_NAME,
      globals: {
        'firebase/database': 'firebase.database' // Map to firebase.database if loaded globally
      }
    },
    plugins: [...plugins, terser()]
  },
  {
    input: 'src/index.ts',
    external: ['firebase/database', '@firebase/database-types'],
    output: {
      file: pkg.index,
      format: 'umd',
      name: GLOBAL_NAME,
      globals: {
        'firebase/database': 'firebase.database'
      }
    },
    plugins: [...plugins]
  }
];

export default [...completeBuilds];