﻿import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpModule, JsonpModule} from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import { AppComponent }   from './app.component';
import { ApplyForm } from './ApplyForm';

@NgModule({

    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule
    ],

    declarations: [ApplyForm],
    bootstrap: [ApplyForm]

})
export class AppModule { }