import { Component, OnInit } from "@angular/core";

import { Http, Response } from '@angular/http';
import {Headers} from "@angular/http";

import {ApplicationVM} from "./ApplicationVM";

import "rxjs/add/operator/map";

@Component({
    selector: "list-content",
    templateUrl: "./app/AppList.html"
})
    
export class applist {

    showbutton: boolean;
    showlist: boolean;
    loading: boolean;

    allApplications: Array<ApplicationVM>

    constructor(private _http: Http) { }

    ngOnInit() {
        this.loading = true;
        this.showbutton = true;
        this.showlist=  false;
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
            .subscribe(
            JsonData => {
                this.allApplications = [];
                if (JsonData) {
                    this.loading = false;
                    for (let a of JsonData) {
                        this.allApplications.push(a);
                    }
                };
            },
            error => alert(error),
            () => console.log("Ferdig med å hente alle søknader")
            );
    }

  




}