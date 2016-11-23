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
const http_1 = require('@angular/http');
require("rxjs/add/operator/map");
let applist = class applist {
    constructor(_http) {
        this._http = _http;
    }
    ngOnInit() {
        this.loading = true;
        this.showbutton = true;
        this.showlist = false;
    }
    closeTabel() {
        this.showbutton = true;
        this.showlist = false;
    }
    generateTabel() {
        this.showbutton = false;
        this.showlist = true;
        this.getAllApplications();
    }
    getAllApplications() {
        this._http.get("api/application/")
            .map(returData => {
            let JsonData = returData.json();
            return JsonData;
        })
            .subscribe(JsonData => {
            this.allApplications = [];
            if (JsonData) {
                this.loading = false;
                for (let a of JsonData) {
                    this.allApplications.push(a);
                }
            }
            ;
        }, error => alert(error), () => console.log("Ferdig med å hente alle søknader"));
    }
};
applist = __decorate([
    core_1.Component({
        selector: "list-content",
        templateUrl: "./app/AppList.html"
    }), 
    __metadata('design:paramtypes', [http_1.Http])
], applist);
exports.applist = applist;
//# sourceMappingURL=applist.component.js.map