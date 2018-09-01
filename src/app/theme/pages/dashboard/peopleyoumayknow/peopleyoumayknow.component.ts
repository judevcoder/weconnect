import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { DataService } from "../../../../_services/data.service";

@Component({
    selector: "app-people-you-may-know",
    templateUrl: "./peopleyoumayknow.component.html",
    encapsulation: ViewEncapsulation.None
})
export class PeopleYouMayKnowComponent implements OnInit, AfterViewInit {
    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService
    ) { }

    data: any;

    ngOnInit() {
        var datatable = (<any>$("#json_data")).mDatatable({
            // datasource definition
            data: {
                type: "remote",
                source: {
                    read: {
                        url: "./json/data.json",
                        method: "GET"
                    }
                },
                pageSize: 10
            },

            // layout definition
            layout: {
                theme: "default", // datatable theme
                class: "we_connect_table", // custom wrapper class
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false // display/hide footer
            },

            // column sorting
            sortable: false,

            pagination: true,

            search: {
                input: $(".m-header-search__input")
            },

            // columns definition
            columns: [
                {
                    field: "img",
                    title: "Logo",
                    width: 50,
                    sortable: false,
                    template: function(row) {
                        return (
                            '<img src="' + row.img + '" class="profile-img"/>'
                        );
                    }
                },
                {
                    field: "name",
                    title: "Name",
                    width: 300,
                    sortable: false,
                    template: function(row) {
                        return (
                            '<span class="m-widget3__username">' +
                            row.name +
                            '</span><br>\
									<span class="m-widget3__time">' +
                            row.job +
                            "</span>"
                        );
                    }
                },
                {
                    field: "status",
                    title: "Status",
                    overflow: "visible",
                    sortable: false,
                    template: function(row) {
                        return '<a href="javascript:;" class="btn btn-outline-primary btn-sm 	m-btn m-btn--icon"> \
									<span> \
										<i class="la la-link"></i> \
										<span>Connect</span> \
									</span> \
								</a>';
                    }
                }
            ]
        });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-people-you-may-know", ["assets/app/js/dashboard.js"]);
    }
}
