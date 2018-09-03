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
    selector: "app-who-viewed-your-profile",
    templateUrl: "./whoviewedyourprofile.component.html",
    encapsulation: ViewEncapsulation.None
})
export class WhoViewedYourProfileComponent implements OnInit, AfterViewInit {
    data: any;

    private profile: object = {
        name: "Anna Strong",
        job: "Chief Financial Officer",
        img: "assets/app/media/img/users/user1.jpg",
        university: "Harvard University",
        city: "New York"
    };

    private pageSelection: string = 'page';
    private isRowSelected: boolean = false;

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService
    ) { }

    ngOnInit() {
        this.dataService.getData().subscribe(data => {
            this.data = data;
        }, error => { });

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
                    field: "RecordID",
                    title: "#",
                    width: 50,
                    sortable: false,
                    textAlign: "center",
                    selector: { class: "m-checkbox--solid m-checkbox--brand" }
                },
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
                    width: 250,
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
                    field: "button",
                    title: "Status",
                    sortable: false,
                    template: function(row) {
                        var status = {
                            Pending: {
                                title: "Pending",
                                state: "la la-clock-o",
                                color: "metal"
                            },
                            Connection: {
                                title: "Connect",
                                state: "la la-link",
                                color: "primary"
                            },
                            Message: {
                                title: "Message",
                                state: "flaticon-chat-1",
                                color: "success"
                            }
                        };
                        return '<a href="javascript:;" class="btn btn-outline-' + status[row.button].color + ' btn-sm     m-btn m-btn--icon">\
                                    <span>\
                                        <i class="' + status[row.button].state + '"></i>\
                                        <span>' + status[row.button].title + '</span>\
                                    </span>\
                                </a>';
                    }
                }
            ]
        });
        let that = this;
        jQuery(document)
            .off("click", ".m-datatable__body .m-datatable__row")
            .on("click", ".m-datatable__body .m-datatable__row", function() {
                $(this).closest('tbody').find('.m-datatable__row--selected').removeClass('m-datatable__row--selected');
                $(this).addClass('m-datatable__row--selected');

                let id = $(this).find('.profile-img').attr("data-id");
                that.profile = that.data.find(x => x.id == id);
            });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-pending-requests", [
            "assets/app/js/dashboard.js"
        ]);
    }

    private selectRow() {
        console.log(this.isRowSelected);
        console.log(this.pageSelection);
    }

}
