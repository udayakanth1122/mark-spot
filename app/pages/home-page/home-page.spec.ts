import {Headers, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response} from '@angular/http';
import {provide} from '@angular/core';
import {MockBackend} from '@angular/http/testing';
import { beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import { asyncCallbackFactory, injectAsyncWrapper, providers }   from '../../../test/diExports';
import { HomePage }                                                 from './Home-Page';
import {UserPage} from '../user-page/user-page';
import {MenuController, NavController} from 'ionic-angular';

class ConfigMock {

    public get(): any {
        return '';
    }

    public getBoolean(): boolean {
        return true;
    }

    public getNumber(): number {
        return 1;
    }
};

this.fixture = null;
this.instance = null;

let clickerFormProviders: Array<any> = [
    provide(HomePage, { useClass: ConfigMock }),
];

describe('HomePage', () => {

    let beforeEachFn: Function = ((testSpec) => {
        spyOn(testSpec.instance, 'park').and.callThrough();
    });

    beforeEachProviders(() => providers.concat(clickerFormProviders));
    beforeEach(injectAsyncWrapper(asyncCallbackFactory(HomePage, this, true, beforeEachFn)));


    // it('initialises', () => {
    //     expect(this.fixture).not.toBeNull();
    //     expect(this.instance).not.toBeNull();
    // });
    //
    // it('doesn\'t try to add a clicker with no name', () => {
    //
    //     expect(this.instance['navigate'].push).toHaveBeenCalledWith(UserPage);
    // });

});
