import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Form2019MPF714AComponent } from './forms/form-2019-mpf714-a/form-2019-mpf714-a.component';
import { FormService } from './service/form.service';
import { FormListComponent } from './forms/form-list/form-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    Form2019MPF714AComponent,
    FormListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'formList', component: FormListComponent },
      { path: 'form2019', component: Form2019MPF714AComponent }
    ])
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
