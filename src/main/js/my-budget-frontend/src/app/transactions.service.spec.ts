import { TestBed } from "@angular/core/testing";
import { TransactionsService } from "./transactions.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

describe("TransactionsService", () => {
  let service: TransactionsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let transactions = [
    {
      id: 252,
      description: "Movie ticket",
      amount: -10.0,
      currency: "eur",
      account: "Pentan",
    },
    {
      id: 253,
      description: "Groceries",
      amount: -150.75,
      currency: "eur",
      account: "Pentan",
    },
    {
      id: 254,
      description: "Transfer to friends account",
      amount: -200.0,
      currency: "eur",
      account: "Pentan",
    },
  ];

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj("HttpClient", ["get"]);
    TestBed.configureTestingModule({
      providers: [
        TransactionsService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(TransactionsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return expected transactions", (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(transactions));
    service.getTransactions("").subscribe({
      next: (data) => {
        expect(data).toEqual(transactions);
        done();
      },
      error: () => {
        done.fail;
      },
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
