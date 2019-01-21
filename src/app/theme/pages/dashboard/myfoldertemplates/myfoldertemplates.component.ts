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
    selector: "app-myfolder-templates",
    templateUrl: "./myfoldertemplates.component.html",
    encapsulation: ViewEncapsulation.None
})
export class MyfolderTemplatesComponent implements OnInit, AfterViewInit {
    loading = false;
    data: any;
    templates: Array<object> = [];

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService,
        private sendformdataService: SendFormDataService
    ) { }

    ngOnInit() {
        this.dataService.getTemplates().subscribe(
            data => {
                this.templates = data;
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
                                    <a href="javascript:;" class="m-portlet__nav-link btn m-btn edit-template-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View"  data-toggle="modal" data-target=".edit_template">
                                        <i class="la la-edit"></i>
                                    </a>`;
                                }
                            }
                        ]
                    });
                }, 200);
            },
            error => {
                console.log(error);
                this.templates = [];
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
            .off("click", ".edit-template-btn")
            .on("click", ".edit-template-btn", function(e) {
                var templateName = $(this).closest("tr").find("td:nth-child(2)").text();
                var message = $(this).closest("tr").find("td:nth-child(3)").text();
                $("input[type='text'].edit-recipient-name").val(templateName);
                $("textarea.edit-message-text").val(message);
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

    saveEditTemplate() {
        this.loading = true;
        setTimeout(() => {
            (<any>$('.edit_template')).modal('hide');
            this.loading = false;
        }, 500);
    }

    saveNewTemplate() {
        this.loading = true;
        setTimeout(() => {
            (<any>$('.new_template')).modal('hide');
            this.loading = false;
        }, 500);
    }

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