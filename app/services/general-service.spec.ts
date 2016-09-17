import { beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import { asyncCallbackFactory, injectAsyncWrapper, providers }   from '../../test/diExports';
import { GeneralService }                                                 from './general-service';


describe('GeneralService', () => {
    beforeEachProviders(() => [GeneralService]);
    
    it('setCurrentPosition', inject([GeneralService], (generalService) => {
        let result = [10.2669, -10.2669];
        expect(generalService.setCurrentPosition(result)).toBeTruthy;
    }
    ));

    it('getCurrentPosition', inject([GeneralService], (generalService) => {
        expect(generalService.getCurrentPosition()).toBeTruthy;
    }
    ));

    it('presentLoading', inject([GeneralService], (generalService) => {
        expect(generalService.presentLoading(1000)).toBeTruthy;
    }
    ));

    it('errorAlert', inject([GeneralService], (generalService) => {
        expect(generalService.errorAlert('test error')).toBeTruthy;
    }
    ));

    it('greetingAlert', inject([GeneralService], (generalService) => {
        expect(generalService.greetingAlert('test greeting alert')).toBeTruthy;
    }
    ));

    it('confirmAlert', inject([GeneralService], (generalService) => {
        expect(generalService.confirmAlert('test confirm alert')).toBeTruthy;
    }
    ));
});
