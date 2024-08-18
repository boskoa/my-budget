import { TestBed } from "@angular/core/testing";
import { CurrenciesService } from "./currencies.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

describe("Currency Service", () => {
  let service: CurrenciesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let currencies = {
    clp: "Chilean Peso",
    cnh: "Chinese Yuan Renminbi Offshore",
    cny: "Chinese Yuan Renminbi",
    comp: "Compound",
    cop: "Colombian Peso",
    crc: "Costa Rican Colon",
    crv: "Curve DAO Token",
    cspr: "Casper",
    cuc: "Cuban Convertible Peso",
    cup: "Cuban Peso",
    cve: "Cape Verdean Escudo",
    cvx: "Convex Finance",
    cyp: "Cypriot Pound",
    czk: "Czech Koruna",
    dem: "German Deutsche Mark",
    dfi: "DfiStarter",
    djf: "Djiboutian Franc",
    dkk: "Danish Krone",
    doge: "Dogecoin",
    dop: "Dominican Peso",
    dzd: "Algerian Dinar",
    eek: "Estonian Kroon",
    egp: "Egyptian Pound",
    ern: "Eritrean Nakfa",
    esp: "Spanish Peseta",
    etb: "Ethiopian Birr",
    eur: "Euro",
  };

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj("HttpClient", ["get"]);
    TestBed.configureTestingModule({
      providers: [
        CurrenciesService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(CurrenciesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return currency rates for eur", (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(currencies));
    service.getCurrencies().subscribe({
      next: (data) => {
        expect(data).toEqual(currencies);
        done();
      },
      error: () => {
        done.fail;
      },
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
