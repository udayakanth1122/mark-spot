import {Headers, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response} from '@angular/http';
import {provide} from '@angular/core';
import {MockBackend} from '@angular/http/testing';
import { beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import { asyncCallbackFactory, injectAsyncWrapper, providers }   from '../../../test/diExports';
import { ParkingService }                                                 from './parking-service';


describe('ParkingService', () => {
    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
            provide(XHRBackend, { useClass: MockBackend }),
            ParkingService
        ];
    });
    it('findAllSpots', inject([XHRBackend, ParkingService], (mockBackend, parkingService) => {
        expect(parkingService.findAllSpots()).toBeTruthy;
    }
    ));
    it('addSpot', inject([XHRBackend, ParkingService], (mockBackend, parkingService) => {
        let obj = {};
        expect(parkingService.addSpot(obj)).toBeTruthy;
    }
    ));
    it('updateSpot', inject([XHRBackend, ParkingService], (mockBackend, parkingService) => {
        let obj = {};
        expect(parkingService.updateSpot(obj)).toBeTruthy;
    }
    ));
    // it('handleError', inject([XHRBackend, ParkingService], (mockBackend, parkingService) => {
    //
    //     expect(parkingService.handleError()).toBeTruthy;
    // }
    // ));

    // it('addSpot', inject([ParkingService], (generalService) => {
    //     expect(generalService.addSpot()).toBeTruthy;
    // }
    // ));
    //
    // it('updateSpot', inject([ParkingService], (generalService) => {
    //     expect(generalService.updateSpot(1000)).toBeTruthy;
    // }
    // ));

    // it('handleError', inject([ParkingService], (parkingService) => {
    //     expect(parkingService.handleError('test error')).toBeTruthy;
    // }
    // ));
});
