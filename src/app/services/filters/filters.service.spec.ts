import { TestBed, inject } from '@angular/core/testing';

import { FilterService } from './filters.service';

describe('FiltersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterService]
    });
  });

  it('should be created', inject([FilterService], (service: FilterService) => {
    expect(service).toBeTruthy();
  }));
});
