// angular
import { getTestBed } from '@angular/core/testing';

// module
import { MetaLoader, MetaService, MetaSettings, MetaStaticLoader } from '../index';
import { defaultSettings, emptySettings, testModuleConfig, testSettings } from './index.spec';

describe('@ngx-meta/core:',
  () => {
    beforeEach(() => {
      const metaFactory = () => new MetaStaticLoader(testSettings);

      testModuleConfig({
        provide: MetaLoader,
        useFactory: (metaFactory)
      });
    });

    describe('MetaLoader',
      () => {
        it('should be able to return the default metaSettings',
          () => {
            const loader = new MetaStaticLoader();
            const loadedApiEndpoint = loader.getSettings();

            expect(loadedApiEndpoint).toEqual(defaultSettings);
          });

        it('should be able to provide `MetaStaticLoader`',
          () => {
            const metaFactory = () => new MetaStaticLoader(testSettings);

            testModuleConfig({
              provide: MetaLoader,
              useFactory: (metaFactory)
            });

            const injector = getTestBed();
            const meta = injector.get(MetaService);

            expect(MetaStaticLoader).toBeDefined();
            expect(meta.loader).toBeDefined();
            expect(meta.loader instanceof MetaStaticLoader).toBeTruthy();
          });

        it('should be able to provide any `MetaLoader`',
          () => {
            class CustomLoader implements MetaLoader {
              getSettings(): MetaSettings {
                return emptySettings;
              }
            }

            testModuleConfig({
              provide: MetaLoader,
              useClass: CustomLoader
            });

            const injector = getTestBed();
            const meta = injector.get(MetaService);

            expect(CustomLoader).toBeDefined();
            expect(meta.loader).toBeDefined();
            expect(meta.loader instanceof CustomLoader).toBeTruthy();
          });
      });
  });
