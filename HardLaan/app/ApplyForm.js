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
const http_1 = require('@angular/http');
const http_2 = require("@angular/http");
require("rxjs/add/operator/map");
const ApplicationVM_1 = require("./ApplicationVM");
let ApplyForm = class ApplyForm {
    constructor(_http, fb) {
        this._http = _http;
        this.fb = fb;
        this.ApplyForm = fb.group({
            userid: ["", forms_1.Validators.pattern("[0-9]{11}")],
            email: ["", forms_1.Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")],
            phone: ["", forms_1.Validators.pattern("[0-9]{8,15}")]
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
            if (amount == 0 || month == 0)
                return;
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
        this.tempMonths = jQuery('#month-slider').val();
        ;
        this.tempID = this.ApplyForm.value.userid;
        this.checkIfCustomerExist(this.tempID);
        if (this.userExist = true) {
            this.showConfirmation = true;
            this.showForm = false;
        }
        else {
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
    backToForm() {
        this.showForm = true;
        this.showConfirmation = false;
    }
    checkIfCustomerExist(id) {
        this._http.get("api/application/" + id)
            .map(returData => {
            let JsonData = returData.json();
            return JsonData;
        }).subscribe(JsonData => {
            if (JsonData == null) {
                this.userExist = false;
            }
            else {
                this.userExist = true;
            }
        }, error => alert(error), () => console.error("ferdig get"));
    }
    addApplication() {
        var newApp = new ApplicationVM_1.ApplicationVM();
        newApp.userid = this.tempID;
        newApp.email = this.tempEmail;
        newApp.phone = this.tempPhone;
        newApp.amount = this.tempAmount;
        newApp.months = this.tempMonths;
        newApp.pay = this.tempPay;
        var body = JSON.stringify(newApp);
        var headers = new http_2.Headers({ "Content-Type": "application/json" });
        this.showForm = false;
        this.showConfirmation = false;
        this.loading = true;
        this._http.post("api/application", body, { headers: headers })
            .map(returData => returData.toString())
            .subscribe(retur => {
            this.loading = false;
            this.showSuccess = true;
        }, error => alert(error), () => console.log("ferdig post"));
    }
};
ApplyForm = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "./app/ApplyForm.html"
    }), 
    __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder])
], ApplyForm);
exports.ApplyForm = ApplyForm;
//# sourceMappingURL=ApplyForm.js.map