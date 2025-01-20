import { TestBed } from '@angular/core/testing';

import { StorePageService } from './store-page.service';

describe('StorePageService', () => {
  let service: StorePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
