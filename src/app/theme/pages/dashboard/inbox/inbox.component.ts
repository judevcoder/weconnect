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
    selector: "app-inbox",
    templateUrl: "./inbox.component.html",
    encapsulation: ViewEncapsulation.None
})
export class InboxComponent implements OnInit, AfterViewInit {
    data: any;

    private profile: object = {
        name: "Anna Strong",
        job: "Chief Financial Officer",
        img: "assets/app/media/img/users/user1.jpg",
        university: "Harvard University",
        city: "New York"
    };

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService
    ) {}

    ngOnInit() {
        this.dataService.getData().subscribe(
            data => {
                this.data = data;
            },
            error => {}
        );

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
                            '<img src="' +
                            row.img +
                            '" class="profile-img" data-id="' +
                            row.id +
                            '"/>'
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
                    width: 50,
                    template: function(row) {
                        return '<ul class="m-portlet__nav table-nav-portlet">\
                            <li class="m-portlet__nav-item m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push" m-dropdown-toggle="hover" aria-expanded="true">\
                                <a href="#" class="m-portlet__nav-link m-portlet__nav-link--icon m-portlet__nav-link--icon-xl m-dropdown__toggle">\
                                    <i class="la la-ellipsis-h m--font-brand table-drop-icon"></i>\
                                </a>\
                                <div class="m-dropdown__wrapper">\
                                    <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>\
                                    <div class="m-dropdown__inner">\
                                        <div class="m-dropdown__body">\
                                            <div class="m-dropdown__content">\
                                                <ul class="m-nav">\
                                                    <li class="m-nav__item" style="margin-bottom: 20px;">\
                                                        <a href="javascript:;" class="m-nav__link">\
                                                            <i class="m-nav__link-icon la la-star"></i>\
                                                            <span class="m-nav__link-text">Mark as Important</span>\
                                                        </a>\
                                                    </li>\
                                                    <li class="m-nav__item">\
                                                        <a href="javascript:;" class="m-nav__link">\
                                                            <i class="m-nav__link-icon la la-envelope"></i>\
                                                            <span class="m-nav__link-text">Mark as Unread</span>\
                                                        </a>\
                                                    </li>\
                                                </ul>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </li>\
                        </ul>';
                    }
                }
            ]
        });
        let that = this;
        jQuery(document)
            .off("click", ".profile-img")
            .on("click", ".profile-img", function() {
                let id = $(this).attr("data-id");
                that.profile = that.data.find(x => x.id == id);
            });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-inbox", ["assets/app/js/dashboard.js"]);
    }
}
