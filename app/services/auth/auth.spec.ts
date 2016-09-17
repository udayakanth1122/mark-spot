import { beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import { asyncCallbackFactory, injectAsyncWrapper, providers }   from '../../../test/diExports';
import { AuthService }                                                 from './auth';


describe('AuthService', () => {
    beforeEachProviders(() => [AuthService]);
    // it('authenticated', inject([AuthService], (authService) => {
    //     expect(authService.authenticated()).toBeTruthy();
    // }
    // ));
    // it('login', inject([AuthService], (authService) => {
    //     expect(authService.login()).toBeTruthy();
    // }
    // ));
    // it('logout', inject([AuthService], (authService) => {
    //     expect(authService.logout()).toBeTruthy();
    // }
    // ));

});
