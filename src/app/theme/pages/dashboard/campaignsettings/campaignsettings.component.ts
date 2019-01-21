import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { Router } from "@angular/router";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { DataService } from "../../../../_services/data.service";

@Component({
    selector: "app-campaign-settings",
    templateUrl: "./campaignsettings.component.html",
    encapsulation: ViewEncapsulation.None
})
export class CampaignSettingsComponent implements OnInit, AfterViewInit {
    data: any;

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

    constructor(
        private _script: ScriptLoaderService, 
        private router: Router,
        private dataService: DataService
        ) { }

    ngOnInit() {

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
    }


    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }

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
}
