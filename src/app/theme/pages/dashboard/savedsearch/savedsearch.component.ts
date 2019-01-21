import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { DataService } from "../../../../_services/data.service";
import { SendFormDataService } from "../../../../_services/send-form-data.service";

@Component({
    selector: "app-saved-search",
    templateUrl: "./savedsearch.component.html",
    encapsulation: ViewEncapsulation.None
})
export class SavedSearchComponent implements OnInit, AfterViewInit {
    data: any;
    savedsearch: Array<object> = [];

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService,
        private sendformdataService: SendFormDataService
    ) { }

    ngOnInit() {

        this.dataService.getSavedSearch().subscribe(
            data => {
                this.savedsearch = data;
                setTimeout(() => {
                    var table = (<any>$("#m_table_1")).DataTable({
                        responsive: true,

                        //== DOM Layout settings

                        lengthMenu: [5, 10, 25, 50],

                        pageLength: 10,

                        //== Order settings
                        order: [[1, "desc"]],

                        headerCallback: function(thead, data, start, end, display) {
                            thead.getElementsByTagName("th")[0].innerHTML = `
                                <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">
                                    <input type="checkbox" value="" class="m-group-checkable">
                                    <span></span>
                                </label>`;
                        },

                        columnDefs: [
                            {
                                targets: 0,
                                width: "30px",
                                className: "dt-right",
                                orderable: false,
                                render: function(data, type, full, meta) {
                                    return `
                                    <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">
                                        <input type="checkbox" value="" class="m-checkable">
                                        <span></span>
                                    </label>`;
                                }
                            },
                            {
                                targets: -1,
                                title: "Actions",
                                orderable: false,
                                render: function(data, type, full, meta) {
                                    return `
                                    <span class="dropdown">
                                        <a href="javascript:;" class="btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true">
                                          <i class="la la-ellipsis-h"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item export-action" href="javascript:;"><i class="la la-download"></i> Export</a>
                                            <a class="dropdown-item delete-action" href="javascript:;"><i class="la la-trash"></i> Delete</a>
                                        </div>
                                    </span>
                                    <a href="/myfolder/saved-search/saved-search-results" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">
                                        <i class="la la-edit"></i>
                                    </a>`;
                                }
                            }
                        ]
                    });
                }, 200);
            },
            error => {
            }
        );

        this._script
            .loadScripts(
            "body",
            ["assets/vendors/custom/datatables/datatables.bundle.js"],
            true
            )
            .then(result => {

            });

        let that = this;            
        jQuery(document).ready(function() {
            $(".flaticon-folder").parent().parent().addClass("m-menu__item--active");
        });

        jQuery(document)
            .on("change", ".m-group-checkable", function() {
                var e = $(this).closest("table").find("td:first-child .m-checkable"),
                    a = $(this).is(":checked");
                $(e).each(function() {
                    a ? ($(this).prop("checked", !0), $(this).closest("tr").addClass("active")) : ($(this).prop("checked", !1), $(this).closest("tr").removeClass("active"))
                })
            });

        jQuery(document)
            .on("change", "tbody tr .m-checkbox", function() {
                $(this).parents("tr").toggleClass("active")
            });

        jQuery(document)
            .off('click', '.delete-action').on('click', '.delete-action', function() {
                var id = $(this).closest('.action').attr('data-id');
                that.actionDelete(id);
            });

        jQuery(document)
            .off('click', '.export-action').on('click', '.export-action', function() {
                var id = $(this).closest('.action').attr('data-id');
                that.actionExport(id);
            });
    }

    ngAfterViewInit() { }

    actionDelete(id: string) {
        this.sendformdataService.sendId(id).subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
            });
    }

    actionExport(id: string) {
        this.sendformdataService.sendId(id).subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
            });
    }
}
