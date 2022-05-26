import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  currency = [];
  $refs: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.$refs = this.http.get<any>('https://api.monobank.ua/bank/currency').pipe(
      tap(
        response => {
          if (response) {
            console.log(response);
            this.currency = response;
            localStorage.setItem(`currency`, JSON.stringify(this.currency));
          }
        },
        error => {
          console.log(error);
          this.loadData(localStorage.getItem(`currency`));
        }
      )
    );
  }

  loadData(data: any) {
    this.currency = JSON.parse(data);
    console.log(this.currency);
  }

  findElement(num: number, num2: number) {
    var b, b2;
    this.currency.forEach((item: any) => {
      if (item.currencyCodeA === num && item.currencyCodeB === num2) {
        b = (item.rateBuy).toFixed(2);
        b2 = (item.rateSell).toFixed(2);
      }
    });

    return b + ' / ' + b2;
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }
}
