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
    selector: "app-campaign-contacts",
    templateUrl: "./campaigncontacts.component.html",
    encapsulation: ViewEncapsulation.None
})
export class CampaignContactsComponent implements OnInit, AfterViewInit {
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
    ) { }

    ngOnInit() {
        this.dataService.getData().subscribe(
            data => {
                this.data = data;
            },
            error => { }
        );

        var datatable = (<any>$("#campaign_contact_json_data")).mDatatable({
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

            // toolbar            
            toolbar: {
                // toolbar items
                items: {
                    // pagination
                    pagination: {
                        pageSizeSelect: [10, 20, 30]
                    }
                }
            },

            // layout definition
            layout: {
                theme: "default", // datatable theme
                class: "we_connect_table", // custom wrapper class
                height: 680,
                scroll: true, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false // display/hide footer
            },

            // column sorting
            sortable: false,

            pagination: true,

            // columns definition
            columns: [
                {
                    field: "img",
                    title: "Logo",
                    width: 50,
                    sortable: false,
                    template: function(row) {
                        return (
                            '<img src="' + row.img + '" class="profile-img" data-id="' + row.id + '"/>'
                        );
                    }
                },
                {
                    field: "name",
                    title: "Name",
                    width: 240,
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
                    sortable: false,
                    width: 120,
                    template: function(row) {
                        return (
                            '<a href="javascript:;" class="m-portlet__nav-link m-portlet__nav-link--icon m-portlet__nav-link--icon-xl m-dropdown__toggle">' +
                            row.status +
                            "</a>"
                        );
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
        jQuery(document).ready(function() {
            $(".flaticon-mail-1").parent().parent().addClass("m-menu__item--active");
        });

        jQuery(document).ready(function() {
            $(".m-datatable__table tr:last").find("td:last").find(".m-portlet__nav-item").addClass("m-dropdown--up");
            $(".m-datatable__table tr:last").prev().find("td:last").find(".m-portlet__nav-item").addClass("m-dropdown--up");
        });

        jQuery(document).on('click', function() {
            $(".m-datatable__table tr:last").find("td:last").find(".m-portlet__nav-item").addClass("m-dropdown--up");
            $(".m-datatable__table tr:last").prev().find("td:last").find(".m-portlet__nav-item").addClass("m-dropdown--up");
        });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-campaign-contacts", [
            "assets/app/js/dashboard.js"
        ]);
    }
}
