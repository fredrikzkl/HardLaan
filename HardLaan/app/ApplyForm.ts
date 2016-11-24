﻿
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Http, Response } from '@angular/http';
import {Headers} from "@angular/http";


import "rxjs/add/operator/map";

import { ApplicationVM } from "./ApplicationVM";

declare var jQuery: any;


@Component({
    selector: "my-app",
    templateUrl: "./app/ApplyForm.html"
})


export class ApplyForm implements AfterViewInit{

    ApplyForm: FormGroup;

    showForm: boolean;
    showConfirmation: boolean;
    showSuccess: boolean;
    loading: boolean;
    userExist: boolean;

    monthChoices: number[];

    tempID: string;
    tempEmail: string;
    tempPhone: string;
    tempAmount: number;
    tempMonths: number;

    tempPay: number;

    constructor(private _http: Http, private fb: FormBuilder) {
        this.ApplyForm = fb.group({
            userid: ["", Validators.pattern("[0-9]{11}")],
            email: ["", Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")],
            phone: ["", Validators.pattern("[0-9]{8,15}")]
        });
    }
  

    ngOnInit() {
        this.monthChoices = [6, 12, 18, 24, 30, 36];
        this.showForm = true;
        this.showConfirmation = false;
        this.showSuccess = false;
        this.loading = false;
        this.tempAmount = 0;

        
    }

    
    ngAfterViewInit() {
         
        jQuery('#amount-slider').slider({
            formatter: function (value) {
                return 'NOK: ' + value;
            }
        });

        jQuery('#month-slider').slider({
            formatter: function (value) {
                return 'Måneder: ' + value;
            }
        });

        // = $('#amount-slider').data("slider-value");

        var amount = 0;
        jQuery("#amount-slider").on("slide", function (slideEvt) {
            jQuery('#testface').text(slideEvt.value);
            amount = slideEvt.value;
            calculate();
        });

        var month = 0;
        jQuery("#month-slider").on("slide", function (slideEvt) {
            jQuery('#testface').text(slideEvt.value);
            month = slideEvt.value;
            calculate();
        });


        function calculate() {
            if (amount == 0 || month == 0) return;
            var r = 0.07;
            var G = amount;
            var n = month;
            var y = (r * G) / (1 - Math.pow(1 + r, -n));
            jQuery('#borrowcalculator').text(Math.round(y));
            $('#borrow-info').text(" kr/mnd");

        }
      
    }

    onSubmit() {

        this.tempEmail = this.ApplyForm.value.email;
        this.tempPhone = this.ApplyForm.value.phone;
        this.tempAmount = jQuery('#amount-slider').val();
        this.tempMonths = jQuery('#month-slider').val();;

        this.tempID = this.ApplyForm.value.userid;

        this.checkIfCustomerExist(this.tempID);

        if (this.userExist = true) {
            this.showConfirmation = true;
            this.showForm = false;
        } else {
            alert("Brukeren finnes allerede");
        }
       


     
        this.calculateRepayment();
        
    }

    calculateRepayment() {
        var r = 0.07;
        var G = this.tempAmount;
        var n = this.tempMonths;
        var y = (r * G) / (1 - Math.pow(1 + r, -n)); 
        this.tempPay = Math.round(y);
    }

   

    backToForm(){
        this.showForm = true;
        this.showConfirmation = false;
    }

    checkIfCustomerExist(id: string) {
        this._http.get("api/application/" + id)
            .map(returData => {
                let JsonData = returData.json();
                return JsonData;
            }).subscribe(
            JsonData => {
                if (JsonData == null) {
                    this.userExist = false;
                } else {
                    this.userExist = true;
                }
            },
            error => alert(error),
            () => console.error("ferdig get")
        );
    }

    addApplication() {
        var newApp = new ApplicationVM();

        newApp.userid = this.tempID;
        newApp.email = this.tempEmail;
        newApp.phone = this.tempPhone;
        newApp.amount = this.tempAmount;
        newApp.months = this.tempMonths;
        newApp.pay = this.tempPay;

        
        var body: string = JSON.stringify(newApp);
        var headers = new Headers({ "Content-Type": "application/json" });

        this.showForm = false;
        this.showConfirmation = false;
        this.loading = true;

        this._http.post("api/application", body, { headers: headers })
            .map(returData => returData.toString())
            .subscribe(
            retur => {
                this.loading = false;
                this.showSuccess = true;
            },
            error => alert(error),
            () => console.log("ferdig post")
        );

    }
}