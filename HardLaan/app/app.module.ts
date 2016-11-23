import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpModule, JsonpModule} from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import { AppComponent }   from './app.component';
import { ApplyForm } from './ApplyForm';
import { applist } from './applist.component';

@NgModule({

    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule
    ],

    declarations: [ApplyForm, applist],
    bootstrap: [ApplyForm, applist]

})
export class AppModule { }
