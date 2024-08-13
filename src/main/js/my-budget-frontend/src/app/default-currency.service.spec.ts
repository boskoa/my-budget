import { TestBed } from '@angular/core/testing';

import { DefaultCurrencyService } from './default-currency.service';

describe('DefaultCurrencyService', () => {
  let service: DefaultCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
