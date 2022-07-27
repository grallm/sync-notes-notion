import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'main.gs',
  output: {
    file: 'bundle.gs',
    format: 'cjs'
  },
  plugins: [nodeResolve({
    dedupe: ['@notionhq/client']
  }), commonjs(), json()]
};