import {
    TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
}                               from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders } from '@angular/core/testing';
import { MyApp }           from './app';
import {HomePage} from './pages/home-page/home-page';
import {UserPage} from './pages/user-page/user-page';

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

let myApp: MyApp = null;

class MockClass {
    public ready(): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }

    public close(): any {
        return true;
    }

    public setRoot(): any {
        return true;
    }
}

describe('MyApp', () => {

    beforeEach(() => {
        let mockClass: any = (<any>new MockClass());
        myApp = new MyApp(mockClass, mockClass, mockClass, mockClass);
    });

    it('initialises with two possible pages', () => {
        expect(myApp['pages'].length).toEqual(2);
    });

    it('initialises with a root page', () => {
        expect(myApp['rootPage']).not.toBe(null);
    });

    it('initialises with an app', () => {
        expect(myApp['app']).not.toBe(null);
    });

    it('opens a page', () => {
        spyOn(myApp['sideMenu'], 'close');
        myApp['nav'] = (<any>myApp['sideMenu']);
        spyOn(myApp['nav'], 'setRoot');
        myApp.openPage(myApp['pages'][1]);
        expect(myApp['sideMenu']['close']).toHaveBeenCalled();
    });
});
