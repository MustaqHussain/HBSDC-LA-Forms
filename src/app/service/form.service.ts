import { Injectable  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private uri = 'http://localhost:3000/api';

  private LAs: any;
  errorMessage: string;

  private scotishTierAbove = 80101;
  private englishTierBelow = 70101;

  constructor(private http: HttpClient) {
    console.log('FormService constructor');
    this.getLADetails()
          .subscribe(data => {
              this.LAs = data['data'];
              console.log('FormService - got getLADetails now');
              console.log(this.LAs);
            },
            error => this.errorMessage = <any>error);
  }

  public getLAs() {
    return this.LAs;
  }

  public saveForm(form) {
    const body = JSON.stringify(form.value);
    // console.log(body);
    return this.http.post(`${this.uri}/add`, body, httpOptions);
  }

  public getForms() {
    console.log('Service getForms');
    return this.http.get(`${this.uri}/form`);
  }

  public getForm(year, form, la) {
    const params = new HttpParams()
    .set('Year', year)
    .set('FormType', form)
    .set('LAReference', la);

    console.log(params);
    return this.http.get(`${this.uri}/form`, {params});
  }

  public countryType(LAReference) {

    const obj = this.LAs.find(o => o.AuthorityNumber === LAReference);

    const tierNumber = parseInt(obj.TierNumber, 10);

    if (tierNumber >= this.scotishTierAbove ) {
      // Scottish
      return 'B';
    } else if (tierNumber < this.englishTierBelow) {
      // English
      return 'A';
    } else {
      // Welsh
      return 'C';
    }

  }

  private getLADetails() {
    return this.http.get(`${this.uri}/getLADetails`);
  }


}
