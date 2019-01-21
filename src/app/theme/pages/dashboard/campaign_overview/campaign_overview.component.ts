import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Helpers } from "../../../../helpers";
import { Router } from "@angular/router";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { DataService } from "../../../../_services/data.service";

declare let Chart: any;
declare let mApp: any;
declare let $: any;
declare let mUtil: any;

@Component({
    selector: "app-campaign-overview-demo",
    templateUrl: "./campaign_overview.component.html",
    encapsulation: ViewEncapsulation.None
})
export class CampaignOverviewDemoComponent implements OnInit, AfterViewInit {

// variables for overview

    stats: Array<object> = [];
    outreachcampaign: object = {};

// end variables

// variables for contacts  
    data: any;
    private profile: object = {
        name: "Anna Strong",
        job: "Chief Financial Officer, Google Inc",
        img: "assets/app/media/img/users/user1.jpg",
        university: "Stanford University",
        city: "New York",
        connections: "300+ Connections",
        title: "Chief Financial Officer",
        present_comp_img: "assets/app/media/img/client-logos/logo9.png",
        present_company: "Google Inc",
        dates_employed: "Jul 2015 - present",
        present_span: "3 yrs, 2 mos",
        previous_comp_img: "assets/app/media/img/client-logos/logo6.png",
        previous_company: "Oracle Corporation",
        previous_title: "Finance Controller",
        previous_dates_employed: "Jun 2012 - Jun 2015",
        previous_span: "3 yrs",
        previous_comp_img2: "assets/app/media/img/client-logos/logo8.png",
        previous_company2: "Adobe Inc",
        previous_title2: "Finance Manager",
        previous_dates_employed2: "Jun 2010 - May 2012",
        previous_span2: "2 yrs"
    };

// end

// variables for sequences
    loading = false;
    boxes: Array<string> = ['box'];

    insertvars: Array<object> = [];
    templates: Array<object> = [];

// end

// variables for settings
    timezones: Array<object> = [];
    schedules: Array<object> = [];
    defaulttimezone = "Eastern Standard Time";
    selectedtimezone = "Eastern Standard Time";
    selectedschedule = 0;
    schedulename: string = "Default";
    selectedStartAt: string = "8:00 AM";
    selectedEndAt: string = "5:00 PM";
    defaultStartAt: string = "8:00 AM";
    defaultEndAt: string = "5:00 PM";
    days: Array<object> = [];
    defaultdays: any = [
        {"day": "Mon", "state": "active"},
        {"day": "Tue", "state": "active"},
        {"day": "Wed", "state": "active"},
        {"day": "Thu", "state": "active"},
        {"day": "Fri", "state": "active"},
        {"day": "Sat", "state": "active"},
        {"day": "Sun", "state": "active"}
    ];

    schedule_loading = false;
    new_loading = false;

    daily_endorse_limit: any = 0;
    delay_between_endorse: any = 0;
    max_skills_endorse: any = 0;

    daily_follow_limit: any = 0;
    delay_between_follow: any = 0;

    daily_visit_profile_limit: any = 0;
    delay_between_visit_profile: any = 0;

    daily_connection_limit: any = 0;
    daily_follow_message: any = 0;
    delay_between_connections: any = 0;
    delay_between_messages: any = 0;

// end

    constructor(
        private _script: ScriptLoaderService,
        private dataService: DataService,
        private router: Router
    ) { }

    ngOnInit() {

    // init for overview

        this.dataService.getStats().subscribe(
            data => {
                this.stats = data;
            },
            error => {
            }
        );

        this.dataService.getOutreachCampaigns().subscribe(
            data => {
                this.outreachcampaign = data[0];
            },
            error => {
            }
        );

        this.dataService.getConnectRequestChartData().subscribe(
            data => {
                if ($('#m_chart_bandwidth1').length == 0) {
                    return;
                }

                var ctx = (<any>document.getElementById("m_chart_bandwidth1")).getContext("2d");

                var gradient = ctx.createLinearGradient(0, 0, 0, 240);
                gradient.addColorStop(0, Chart.helpers.color('#d1f1ec').alpha(1).rgbString());
                gradient.addColorStop(1, Chart.helpers.color('#d1f1ec').alpha(0.3).rgbString());

                var config = {
                    type: 'line',
                    data: {
                        labels: data["month"],
                        datasets: [{
                            label: "Bandwidth Stats",
                            backgroundColor: gradient,
                            borderColor: mApp.getColor('success'),

                            pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                            pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                            pointHoverBackgroundColor: mApp.getColor('danger'),
                            pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),

                            //fill: 'start',
                            data: data["connect_request"]
                        }]
                    },
                    options: {
                        title: {
                            display: false,
                        },
                        tooltips: {
                            mode: 'nearest',
                            intersect: false,
                            position: 'nearest',
                            xPadding: 10,
                            yPadding: 10,
                            caretPadding: 10
                        },
                        legend: {
                            display: false
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                display: false,
                                gridLines: false,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Month'
                                }
                            }],
                            yAxes: [{
                                display: false,
                                gridLines: false,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value'
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        elements: {
                            line: {
                                tension: 0.0000001
                            },
                            point: {
                                radius: 4,
                                borderWidth: 12
                            }
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 10,
                                bottom: 0
                            }
                        }
                    }
                };

                var chart = new Chart(ctx, config);
            },
            error => {
                console.log(error);
                // this.connectrequestchartdata = [];
            }
        );

        this.dataService.getConnectedChartData().subscribe(
            data => {
                if ($('#m_chart_bandwidth2').length == 0) {
                    return;
                }

                var ctx = (<any>document.getElementById("m_chart_bandwidth2")).getContext("2d");

                var gradient = ctx.createLinearGradient(0, 0, 0, 240);
                gradient.addColorStop(0, Chart.helpers.color('#ffefce').alpha(1).rgbString());
                gradient.addColorStop(1, Chart.helpers.color('#ffefce').alpha(0.3).rgbString());

                var config = {
                    type: 'line',
                    data: {
                        labels: data["month"],
                        datasets: [{
                            label: "Bandwidth Stats",
                            backgroundColor: gradient,
                            borderColor: mApp.getColor('warning'),

                            pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                            pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                            pointHoverBackgroundColor: mApp.getColor('danger'),
                            pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),

                            //fill: 'start',
                            data: data["connected"]
                        }]
                    },
                    options: {
                        title: {
                            display: false,
                        },
                        tooltips: {
                            mode: 'nearest',
                            intersect: false,
                            position: 'nearest',
                            xPadding: 10,
                            yPadding: 10,
                            caretPadding: 10
                        },
                        legend: {
                            display: false
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                display: false,
                                gridLines: false,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Month'
                                }
                            }],
                            yAxes: [{
                                display: false,
                                gridLines: false,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value'
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        elements: {
                            line: {
                                tension: 0.0000001
                            },
                            point: {
                                radius: 4,
                                borderWidth: 12
                            }
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 10,
                                bottom: 0
                            }
                        }
                    }
                };

                var chart = new Chart(ctx, config);
            },
            error => {
                console.log(error);
                // this.connectedchartdata = [];
            }
        );

        jQuery(document).ready(function() {
            $(".flaticon-mail-1").parent().parent().addClass("m-menu__item--active");
        });

        jQuery(document)
            .off('click', '.m-wizard__step-number').on('click', '.m-wizard__step-number', function() {
                var wizardStep = $(this).closest('.m-wizard__step');
                if (!wizardStep.hasClass('m-wizard__step--current')) {
                    $('.m-wizard__steps').find('.m-wizard__step--current').removeClass('m-wizard__step--current');
                    $('.m-wizard__form-step--current').removeClass('m-wizard__form-step--current');
                    wizardStep.addClass('m-wizard__step--current');
                    var wizardFormselector = wizardStep.attr('m-wizard-target');
                    $('#' + wizardFormselector).addClass('m-wizard__form-step--current');
                }
        });
    // end overview 

    // init for contacts
        this.dataService.getData().subscribe(
            data => {
                this.data = data;
            },
            error => { }
        );

        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo7/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleAddNewTemplateFormSubmit();
            });

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

    // end

    // init for sequences
        this.dataService.getInsertVars().subscribe(
            data => {
                this.insertvars = data;
            },
            error => {
                console.log(error);
                this.insertvars = [];
            }
        );

        this.dataService.getTemplates().subscribe(
            data => {
                this.templates = data;
            },
            error => {
                console.log(error);
                this.templates = [];
            }
        );

        jQuery(document).ready(function() {
            $(".flaticon-mail-1").parent().parent().addClass("m-menu__item--active");
        });

        jQuery(document)
            .off('click', '.edit-message').on('click', '.edit-message', function() {
                var message_content = $('.saved-content').text().trim();

                $(this).css('display', 'none');
                $('.save-message').css('display', 'block');
                $('.saved-content').css('display', 'none');
                $('.editable-content textarea').val(message_content);
                $('.editable-content').css('display', 'block');
            });

        jQuery(document)
            .off('click', '.save-message').on('click', '.save-message', function() {
                var message_content = $('.editable-content textarea').val();
                $(this).css('display', 'none');
                $('.edit-message').css('display', 'block');
                $('.editable-content').css('display', 'none');
                $('.saved-content').text(message_content);
                $('.saved-content').css('display', 'block');
            });

    // end

    // init for settings
        this.dataService.getTimeZone().subscribe(
            data => {
                this.timezones = data;
            },
            error => {
                this.timezones = [];
            }
        );

        this.dataService.getSchedules().subscribe(
            data => {
                this.schedules = data;
            },
            error => {
                this.schedules = [];
            }
        );

        this.days = this.defaultdays;

        (<any>$('#start_time_picker')).timepicker();
        (<any>$('#end_time_picker')).timepicker();

        $(document).off('click', '.schedule-date button').on('click', '.schedule-date button', function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });

        $(document)
            .off('click', '.add-new-schedule-btn').on('click', '.add-new-schedule-btn', function() {
                (<any>$('#add_schedule')).modal('hide');
                (<any>$('#add_new_schedule')).modal('show');
            });

        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo7/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleSaveScheduleFormSubmit();
            });

        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo7/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleAddScheduleFormSubmit();
            });

        (<any>$('#start_time_picker')).timepicker();
        (<any>$('#end_time_picker')).timepicker();
        $(document).off('click', '.schedule-date button').on('click', '.schedule-date button', function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });
        jQuery(document).ready(function() {
            $(".flaticon-mail-1").parent().parent().addClass("m-menu__item--active");
        });
    // end
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-campaign-overview-demo", [
            "assets/app/js/dashboard.js"
        ]);
    }

// functions for sequences
    private addStep() {
        if (this.boxes.length >= 5) {
            $(".add-step-btn").removeClass("btn-outline-success").addClass("btn-success");
            $(".add-step-btn").attr("disabled", "disabled");
        } else {
            this.boxes.push('box');
            setTimeout(() => {
                this.refreshScrollable();
            }, 1000);
        }
    }

    private removeSection() {
        this.boxes.pop();
    }

    private refreshScrollable() {
        $('[data-scrollable="true"]').each(function(){
            var maxHeight;
            var height;
            var el = $(this);

            if (mUtil.isInResponsiveRange('tablet-and-mobile')) {
                if (el.data('mobile-max-height')) {
                    maxHeight = el.data('mobile-max-height');
                } else {
                    maxHeight = el.data('max-height');
                }

                if (el.data('mobile-height')) {
                    height = el.data('mobile-height');
                } else {
                    height = el.data('height');
                }
            } else {
                maxHeight = el.data('max-height');
                height = el.data('max-height');
            }

            if (maxHeight) {
                el.css('max-height', maxHeight);
            }
            if (height) {
                el.css('height', height);
            }

            mApp.initScroller(el, {});
        });
    }

    insertVar() {
        var originVal = (<any>$(event.target).closest(".col-lg-12").find("textarea").val());
        var id = (<any>$(event.target).attr("data-id"));
        var insertVal = this.insertvars[id]["code"];
        var messageVal = (<any>$(event.target).closest(".col-lg-12").find("textarea").val(originVal + "[" + insertVal + "]"));
    }

    insertTemplate() {
        // var originVal = (<any>$(event.target).closest(".col-lg-12").find("textarea").val());
        var id = (<any>$(event.target).attr("data-id"));
        var insertTemplate = this.templates[id]["message"];
        var messageAfterConnection = (<any>$(event.target).closest(".col-lg-12").find("textarea").val(insertTemplate));
        // this.InsertTemplates.push(messageAfterConnection);
    }

    private addNewtemplate() {
        this.loading = true;
        setTimeout(() => {
            (<any>$('#new_template').modal('hide'));
            this.loading = false;
        }, 500);
    }

    private handleAddNewTemplateFormSubmit() {
        $('.add-new-template-btn').click((e) => {
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    new_template_name: {
                        required: true
                    },
                    new_template_message: {
                        required: true
                    }
                },
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

// functions for settings
    private selectSchedule(value: any) {
        if (value == 0) {
            this.selectedschedule = value;
            this.schedulename = "Default";
            this.selectedtimezone = "Eastern Standard Time";
            this.days = this.defaultdays;
            this.selectedStartAt = "8:00 AM";
            this.selectedEndAt = "5:00 PM";
        } else {
            this.selectedschedule = value;
            this.schedulename = this.schedules[value - 1]["name"];
            this.selectedtimezone = this.schedules[value - 1]["name"];
            this.days = this.schedules[value - 1]["days"];
            this.selectedStartAt = this.schedules[value - 1]["start_at"];
            this.selectedEndAt = this.schedules[value - 1]["end_at"];
        }
    }

    private saveSchedule() {
        this.schedule_loading = true;
        localStorage.setItem('ScheduleName', this.schedulename);
        setTimeout(() => {
            (<any>$('#add_schedule')).modal('hide');
            this.schedule_loading = false;
        }, 500);
    }

    private addNewSchedule() {
        this.new_loading = true;
        setTimeout(() => {
            (<any>$('#add_new_schedule')).modal('hide');
            this.new_loading = false;
        }, 500);
    }

    handleSaveScheduleFormSubmit() {
        $('.schedule-save-btn').click((e) => {
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    schedule_name: {
                        required: true
                    }
                },
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    handleAddScheduleFormSubmit() {
        $('.add-schedule-save-btn').click((e) => {
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    add_schedule_name: {
                        required: true
                    }
                },
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }
// end
}
