import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('RequestCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheService = TestBed.get(CacheService);
    expect(service).toBeTruthy();
  });
});
