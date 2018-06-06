import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FormService } from '../../service/form.service';

@Component({
  selector: 'app-form-2019-mpf714-a',
  templateUrl: './form-2019-mpf714-a.component.html',
  styleUrls: ['./form-2019-mpf714-a.component.css']
})
export class Form2019MPF714AComponent implements OnInit {

  mpfForm: FormGroup;
  validMessage = '';

  constructor(private formService: FormService, private route: ActivatedRoute) { }

  ngOnInit() {
    const financialYear = this.route.snapshot.queryParams.Year;
    const FormType = this.route.snapshot.queryParams.FormType;
    const LAReference = this.route.snapshot.queryParams.LAReference;

    this.mpfForm = new FormGroup({
      C008_ReReExp: new FormControl(),
      C009_ReReExpUpToLwThrshBLA: new FormControl(),
      C010_ReReExpOverHghThrshBLA: new FormControl()
    });
    this.mpfForm.setValue({C008_ReReExp: '',
    C009_ReReExpUpToLwThrshBLA: '',
    C010_ReReExpOverHghThrshBLA: ''
    });
    this.getForm(financialYear, FormType, LAReference);

  }

  getForm(financialYear, FormType, LAReference) {
    // console.log('getForm :' + this.mpfForm.value.C008_ReReExp);
    this.formService.getForm(financialYear, 'MPF714A_MID', LAReference).subscribe(
      (data) => {
        const laDetails = data['data'][0];

        if ( typeof(laDetails) === 'undefined' ) {
          return;
        }
        // laDetails.C008_ReReExp === 'undefined' ? 'xxxx' : laDetails.C008_ReReExp
        this.mpfForm.setValue({C008_ReReExp: laDetails.C008_ReReExp,
        C009_ReReExpUpToLwThrshBLA: laDetails.C009_ReReExpUpToLwThrshBLA,
        C010_ReReExpOverHghThrshBLA: laDetails.C010_ReReExpOverHghThrshBLA
        });
      });
  }
  saveForm() {
    // console.log(JSON.stringify(this.mpfForm.value));
    this.formService.saveForm(this.mpfForm).subscribe(
      (data) => {});
  }

}
