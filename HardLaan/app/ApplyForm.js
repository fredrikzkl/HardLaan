"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const forms_1 = require('@angular/forms');
let ApplyForm = class ApplyForm {
    constructor(fb) {
        this.fb = fb;
        this.ApplyForm = fb.group({
            userid: ["", forms_1.Validators.pattern("[0-9]{11}")],
            email: ["", forms_1.Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")],
            phone: ["", forms_1.Validators.pattern("[0-9]{8,15}")],
            amount: ["", forms_1.Validators.pattern("[0-9]{4,7}")],
            months: ["", forms_1.Validators.required]
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
    backToForm() {
        this.showForm = true;
        this.showConfirmation = false;
    }
};
ApplyForm = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "./app/ApplyForm.html"
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder])
], ApplyForm);
exports.ApplyForm = ApplyForm;
//# sourceMappingURL=ApplyForm.js.map