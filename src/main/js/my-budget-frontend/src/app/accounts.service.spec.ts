import { TestBed } from "@angular/core/testing";
import { AccountsService } from "./accounts.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

describe("AccountsService", () => {
  let service: AccountsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let accounts = [
    {
      id: 252,
      name: "Pentan",
      currency: "eur",
      balance: 1041.25,
      transactions: [
        {
          id: 255,
          description: "Initial transaction",
          amount: 1051.25,
          currency: "eur",
          account: "Pentan",
        },
      ],
    },
    {
      id: 253,
      name: "Jane Smith",
      currency: "usd",
      balance: 620.7,
      transactions: [
        {
          id: 258,
          description: "Initial transaction",
          amount: 620.7,
          currency: "usd",
          account: "Jane Smith",
        },
      ],
    },
  ];

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj("HttpClient", ["get"]);
    TestBed.configureTestingModule({
      providers: [
        AccountsService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(AccountsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return expected accounts", (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(accounts));
    service.getAccounts().subscribe({
      next: (data) => {
        expect(data).toEqual(accounts);
        done();
      },
      error: () => {
        done.fail;
      },
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
