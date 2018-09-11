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
    selector: "app-connection",
    templateUrl: "./connection.component.html",
    encapsulation: ViewEncapsulation.None
})
export class ConnectionComponent implements OnInit, AfterViewInit {
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
                pageSize: 5
            },

            select: {
                style:    'multi',
                selector: 'td:first-child'
            },

            // toolbar            
            toolbar: {
                // toolbar items
                items: {
                    // pagination
                    pagination: {
                        pageSizeSelect: [10, 20, 30],
                    }
                }
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
                    field: "status",
                    title: "Status",
                    overflow: "visible",
                    sortable: false,
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
                                                    <li class="m-nav__item">\
                                                        <a routerLink="/inbox" class="m-nav__link table-drop-link">\
                                                            <i class="m-nav__link-icon flaticon-chat-1"></i>\
                                                            <span class="m-nav__link-text">Message</span>\
                                                        </a>\
                                                    </li>\
                                                    <li class="m-nav__item">\
                                                        <a href="javascript:;" class="m-nav__link table-drop-link">\
                                                            <i class="m-nav__link-icon flaticon-delete-2"></i>\
                                                            <span class="m-nav__link-text">Remove Connection</span>\
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
            .off("click", ".m-datatable__body .m-datatable__row")
            .on("click", ".m-datatable__body .m-datatable__row", function() {
                $(this).closest('tbody').find('.m-datatable__row--selected').removeClass('m-datatable__row--selected');
                $(this).addClass('m-datatable__row--selected');

                let id = $(this).find('.profile-img').attr("data-id");
                that.profile = that.data.find(x => x.id == id);
            });

        // (<any>jQuery(document))
        //     .on('click', '.m-datatable__pager-link', function() {
        //         var checkboxState = $("#table_row_select_control").attr("ng-reflect-model");
        //         alert(checkboxState);
        //         if (checkboxState == "true") {
        //             $(".m-datatable__body tr").find("input[type='checkbox']").attr("checked", "checked");
        //         } else if (checkboxState == "false") {
        //             $(".m-datatable__body tr").find("input[type='checkbox']").removeAttr("checked");
        //         }

        //     });
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }

    private selectRow() {
        var isChecked = $('#table_row_select_control').prop('checked');
        $('.we_connect_table').children('table').children('tbody').children('tr:visible').find('input[type="checkbox"]').prop('checked', isChecked);
        
        
    }
}
