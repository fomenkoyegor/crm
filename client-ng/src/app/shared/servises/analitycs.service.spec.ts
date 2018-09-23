import { TestBed } from '@angular/core/testing';

import { AnalitycsService } from './analitycs.service';

describe('AnalitycsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalitycsService = TestBed.get(AnalitycsService);
    expect(service).toBeTruthy();
  });
});
