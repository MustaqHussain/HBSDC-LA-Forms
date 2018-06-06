import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormService } from '../../service/form.service';


@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  LAs = new Array();
  financialYears = new Array();
  formTypes = new Array();
  FinancialYear:  any;

  constructor(private formService: FormService, private router: Router) { }

  ngOnInit() {

    this.formTypes = [ 'INI', 'MID', 'FINAL' ];

    const now = new Date();
    let lastYear = now.getFullYear();
    if ( now.getMonth() >= 3  ) {
      lastYear = now.getFullYear() + 1;
    }

    for (let i = lastYear; i > 2017; i--) {
      this.financialYears.push( i - 1 + '/' + i );
    }

    this.LAs = this.formService.getLAs();
    this.LAs.sort((a, b) => (a.AuthorityName > b.AuthorityName) ? 1 : ((b.AuthorityName > a.AuthorityName) ? -1 : 0) );
  }

  loadForm(financialYear, formType, LA) {
    const year = financialYear.substring(5, 9);
    const countryType = this.formService.countryType(LA);
    const form = (formType === 'FINAL' ? 'MPF720' : 'MPF714' ) + countryType + '_' +  formType;
    console.log(form);
    this.router.navigate(['form2019'], {queryParams: { Year: year, FormType: form, LAReference: LA}});
  }

}
