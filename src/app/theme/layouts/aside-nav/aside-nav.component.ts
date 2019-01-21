import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { DataService } from "../../../_services/data.service";
import { ScriptLoaderService } from "../../../_services/script-loader.service";
import { ActivatedRoute, Router } from "@angular/router";

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {
    outreachcampaigns: Array<object> = [];

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService,
        private _router: Router
        ) {}
    ngOnInit() {
        this.dataService.getOutreachCampaigns().subscribe(
            data => {
                this.outreachcampaigns = data;
            },
            error => {
                this.outreachcampaigns = [];
            }
        );
    }
    ngAfterViewInit() {

        mLayout.initAside();
    }

    private routing() {
        if (this.outreachcampaigns === undefined || this.outreachcampaigns.length == 0 ) {
            this._router.navigate(['/outreach']);
        } else if (this.outreachcampaigns.length > 0) {
            this._router.navigate(['/outreach/campaigns']);
        }
    }

}