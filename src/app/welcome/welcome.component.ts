import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  LAs: any;

  constructor(private formService: FormService) { console.log('WelcomeComponent nCon :' ); }

  ngOnInit() {
    console.log('WelcomeComponent ngOnInit :' );
    // this.LAs = this.formService.LAs;
    // console.log('after :' );
    // console.log(this.LAs);
  }

  public loadForm() {
    console.log('loadForm :' );
    this.formService.getForm(2019, 'MPF714A_MID', 76577015).subscribe(
      (data) => {});
  }
}
