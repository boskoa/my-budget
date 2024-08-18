import { TestBed } from "@angular/core/testing";
import { DefaultCurrencyService } from "./default-currency.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

describe("Currency Service", () => {
  let service: DefaultCurrencyService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let rates = {
    date: "2024-08-13",
    eur: {
      bam: 1.95583,
      bat: 6.65867497,
      bsd: 1.09303701,
      bsv: 0.025259547,
      bsw: 22.35784973,
      btg: 0.047950627,
      btn: 91.76051633,
      cfx: 8.06909248,
      chf: 0.94728429,
      chz: 19.67968415,
      clp: 1020.86206617,
      dydx: 1.03240961,
      dzd: 147.16883596,
      etc: 0.056873875,
      eth: 0.00040228965,
      eur: 1,
      fim: 5.94573,
      fjd: 2.46664865,
      fkp: 0.85623143,
      flow: 1.97173335,
      flr: 71.67753695,
      frax: 1.09678826,
      frf: 6.55957,
    },
  };

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj("HttpClient", ["get"]);
    TestBed.configureTestingModule({
      providers: [
        DefaultCurrencyService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(DefaultCurrencyService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return currency rates for eur", (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(rates));
    service.getCurrencyRates("eur").subscribe({
      next: (data) => {
        expect(data).toEqual(rates);
        done();
      },
      error: () => {
        done.fail;
      },
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
