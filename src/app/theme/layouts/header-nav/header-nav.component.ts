import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { ScriptLoaderService } from "../../../_services/script-loader.service";
import { DataService } from "../../../_services/data.service";
import { ActivatedRoute, Router } from '@angular/router';

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    notifications: Array<object> = [];
    profile: Array<object> = [];

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService,
        private router: Router
    ) { }

    ngOnInit() {
        this.dataService.getNewNotifications().subscribe(
            data => {
                this.notifications = data;
            },
            error => {
                console.log(error);
                this.notifications = [];
            }
        );

        this.dataService.getProfile().subscribe(
            data => {
                this.profile = data;
            },
            error => {
                console.log(error);
                this.notifications = [];
            }
        );
    }
    ngAfterViewInit() {
        mLayout.initHeader();
        this._script.loadScripts("app-index", ["assets/app/js/dashboard.js"]);

    }

    goToSetting(param) {
        this.router.navigate(['/settings'], { queryParams: { param: param } });
  }

}