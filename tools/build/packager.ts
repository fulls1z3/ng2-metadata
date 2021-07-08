import { ngPackagr } from 'ng-packagr';

import { root } from './helpers';

await ngPackagr()
  .forProject(root(`./packages/@ngx-config/${process.argv[2]}/ng-package.json`))
  .withTsConfig(root('./tools/build/tsconfig.package.json'))
  .build()
  .catch(() => (process.exitCode = 1));
