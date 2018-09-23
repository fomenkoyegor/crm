import { TestBed } from '@angular/core/testing';

import { MaterialToastService } from './material-toast.service';

describe('MaterialToastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialToastService = TestBed.get(MaterialToastService);
    expect(service).toBeTruthy();
  });
});
