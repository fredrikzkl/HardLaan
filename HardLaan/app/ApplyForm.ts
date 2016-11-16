import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: "my-app",
    templateUrl: "./app/ApplyForm.html"
})


export class ApplyForm {

    ApplyForm: FormGroup;

    showForm: boolean;
    showConfirmation: boolean;

    monthChoices: number[];

    tempID: string;
    tempEmail: string;
    tempPhone: string;
    tempAmount: number;
    tempMonths: number;

    tempPay: number;

    constructor(private fb: FormBuilder) {
        this.ApplyForm = fb.group({
            userid: ["", Validators.pattern("[0-9]{11}")],
            email: ["", Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")],
            phone: ["", Validators.pattern("[0-9]{8,15}")],
            amount: ["", Validators.pattern("[0-9]{4,7}")],
            months: ["", Validators.required]
        });
    }

    ngOnInit() {
        this.monthChoices = [6, 12, 18, 24];
        this.showForm = true;
        this.showConfirmation = false;
    }

    onSubmit() {
        this.showConfirmation = true;
        this.showForm = false;

        this.tempID = this.ApplyForm.value.userid;
        this.tempEmail = this.ApplyForm.value.email;
        this.tempPhone = this.ApplyForm.value.phone;
        this.tempAmount = this.ApplyForm.value.amount;
        this.tempMonths = this.ApplyForm.value.months;
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
    
}