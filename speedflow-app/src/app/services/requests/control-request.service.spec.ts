import { TestBed } from '@angular/core/testing';

import { ControlRequestService } from './control-request.service';

describe('ControlRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlRequestService = TestBed.get(ControlRequestService);
    expect(service).toBeTruthy();
  });
});
