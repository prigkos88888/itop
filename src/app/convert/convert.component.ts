import {Component, Input, OnInit} from '@angular/core';

interface Val {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})

export class ConvertComponent implements OnInit {
  @Input() currency: any;

  selectedValue: string = 'usd';
  selectedValue2: string = 'uah';
  valueInput_1: any = '';
  valueInput_2: any = '';

  currencyM: Val[] = [
    {value: '840', viewValue: 'USD'},
    {value: '978', viewValue: 'EUR'},
    {value: '980', viewValue: 'UAH'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  numberOnly(event: any) : boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && event.key !== '.') {
      return false;
    }
    return true;
  }

  onKeyUp(inputNumber: number) {
    let elm1: any, elm2: any;

    if (this.valueInput_1 || this.valueInput_2) {
      for (let i = 0; i < this.currencyM.length; i++) {
        if (this.currencyM[i].viewValue.toLowerCase() === this.selectedValue) elm1 = this.currencyM[i].value;
        if (this.currencyM[i].viewValue.toLowerCase() === this.selectedValue2) elm2 = this.currencyM[i].value;
      }

      this.currency.forEach((item: any) => {
        if (item.currencyCodeA === Number(elm1) && item.currencyCodeB === Number(elm2)) {
          if (inputNumber === 1) this.valueInput_2 = (this.valueInput_1 * item.rateBuy).toFixed(2);
          if (inputNumber === 2) this.valueInput_1 = (this.valueInput_2 / item.rateBuy).toFixed(2);
        }

        if (item.currencyCodeA === Number(elm2) && item.currencyCodeB === Number(elm1)) {
          if (inputNumber === 1) this.valueInput_2 = (this.valueInput_1 / item.rateBuy).toFixed(2);
          if (inputNumber === 2) this.valueInput_1 = (this.valueInput_2 * item.rateBuy).toFixed(2);
        }
      });
    }
  }

  changePosition() {
    let oldValue = this.selectedValue2;
    this.selectedValue2 = this.selectedValue;
    this.selectedValue = oldValue;
    this.onKeyUp(1);
  }

}
