import { TestBed } from '@angular/core/testing';

import { PowerStationDataService } from './power-station-data.service';

describe('PowerStationDataService', () => {
  let service: PowerStationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerStationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
