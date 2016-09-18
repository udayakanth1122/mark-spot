import { beforeEach, beforeEachProviders, describe, expect, it} from '@angular/core/testing';
import { asyncCallbackFactory, injectAsyncWrapper, providers }   from '../../../test/diExports';
import { SideMenu } from './side-menu';

this.fixture = null;
this.instance = null;

describe('SideMenu', () => {

    beforeEachProviders(() => providers);
    //beforeEach(injectAsyncWrapper(asyncCallbackFactory(HomePage, this, true)));

    it('initialises', () => {
        expect(this.instance).toBeNull();
        expect(this.fixture).toBeNull();
    });
});
