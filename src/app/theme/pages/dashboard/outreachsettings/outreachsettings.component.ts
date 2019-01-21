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
    selector: "app-outreach-settings",
    templateUrl: "./outreachsettings.component.html",
    encapsulation: ViewEncapsulation.None
})
export class OutreachSettingsComponent implements OnInit, AfterViewInit {
    data: any;
    timezones: Array<object> = [];
    schedules: Array<object> = [];
    selectedtimezone = null;
    selectedschedule = 0;
    schedulename: string = "Default";
    selectedStartAt: string = "8:00 AM";
    selectedEndAt: string = "5:00 PM";
    days: Array<object> = [];
    defaultdays: any = [
        {"day": "Mon", "state": ""},
        {"day": "Tue", "state": ""},
        {"day": "Wed", "state": ""},
        {"day": "Thu", "state": ""},
        {"day": "Fri", "state": ""},
        {"day": "Sat", "state": ""},
        {"day": "Sun", "state": ""}
    ];
    campaignName: string = localStorage.getItem('CampaignName');
    campaigntype: string = localStorage.getItem('CampaignType');
    skipsequence: string = localStorage.getItem('SkipSequence');
    showcampaigntype: string = localStorage.getItem('ShowCampaignType');
    showcampaignprospect: string = localStorage.getItem('ShowCampaignProspect');
    InsertVar:string = localStorage.getItem('InsertVar');

    daily_endorse_limit: any = "";
    delay_between_endorse: any = "";
    max_skills_endorse: any = "";

    daily_follow_limit: any = "";
    delay_between_follow: any = "";

    daily_visit_profile_limit: any = "";
    delay_between_visit_profile: any = "";

    daily_connection_limit: any = "";
    daily_follow_message: any = "";
    delay_between_connections: any = "";
    delay_between_messages: any = "";

    daily_endorse_limit_ = localStorage.getItem('daily_endorse_limit');
    delay_between_endorse_ = localStorage.getItem('delay_between_endorse');
    max_skills_endorse_ = localStorage.getItem('max_skills_endorse');

    daily_follow_limit_ = localStorage.getItem('daily_follow_limit');
    delay_between_follow_ = localStorage.getItem('delay_between_follow');

    daily_visit_profile_limit_ = localStorage.getItem('daily_visit_profile_limit');
    delay_between_visit_profile_ = localStorage.getItem('delay_between_visit_profile');
    
    daily_connection_limit_ = localStorage.getItem('daily_connection_limit');
    daily_follow_message_ = localStorage.getItem('daily_follow_message');
    delay_between_connections_ = localStorage.getItem('delay_between_connections');
    delay_between_messages_ = localStorage.getItem('delay_between_messages');
    
    loading = false;
    new_loading = false;

    constructor(
        private _script: ScriptLoaderService,
        private router: Router,
        private dataService: DataService
    ) { }

    ngOnInit() {

        console.log(this.daily_visit_profile_limit);

        if (this.daily_endorse_limit_ !== "undefined") {
            this.daily_endorse_limit = this.daily_endorse_limit_;
        }
        if (this.delay_between_endorse_ !== "undefined") {
            this.delay_between_endorse = this.delay_between_endorse_;
        }
        if (this.max_skills_endorse_ !== "undefined") {
            this.max_skills_endorse = this.max_skills_endorse_;
        }
        if (this.daily_follow_limit_ !== "undefined") {
            this.daily_follow_limit = this.daily_follow_limit_;
        }
        if (this.delay_between_follow_ !== "undefined") {
            this.delay_between_follow = this.delay_between_follow_;
        }
        if (this.daily_visit_profile_limit_ !== "undefined") {
            this.daily_visit_profile_limit = this.daily_visit_profile_limit_;
        }
        if (this.delay_between_visit_profile_ !== "undefined") {
            this.delay_between_visit_profile = this.delay_between_visit_profile_;
        }
        if (this.daily_connection_limit_ !== "undefined") {
            this.daily_connection_limit = this.daily_connection_limit_;
        }
        if (this.daily_follow_message_ !== "undefined") {
            this.daily_follow_message = this.daily_follow_message_;
        }
        if (this.delay_between_connections_ !== "undefined") {
            this.delay_between_connections = this.delay_between_connections_;
        }
        if (this.delay_between_messages_ !== "undefined") {
            this.delay_between_messages = this.delay_between_messages_;
        }

        this.dataService.getTimeZone().subscribe(
            data => {
                this.timezones = data;
                this.selectedtimezone = this.timezones[0]["value"];
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
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-outreach-settings", [
            "assets/app/js/dashboard.js"
        ]);
    }

    private saveCampaignName() {
        this.daily_endorse_limit = $('#daily_endorse_limit').val();
        localStorage.setItem('daily_endorse_limit', this.daily_endorse_limit);

        this.delay_between_endorse = $('#delay_between_endorse').val();
        localStorage.setItem('delay_between_endorse', this.delay_between_endorse);

        this.max_skills_endorse = $('#max_skills_endorse').val();
        localStorage.setItem('max_skills_endorse', this.max_skills_endorse);

        this.daily_follow_limit = $('#daily_follow_limit').val();
        localStorage.setItem('daily_follow_limit', this.daily_follow_limit);

        this.delay_between_follow = $('#delay_between_follow').val();
        localStorage.setItem('delay_between_follow', this.delay_between_follow);

        this.daily_visit_profile_limit = $('#daily_visit_profile_limit').val();
        localStorage.setItem('daily_visit_profile_limit', this.daily_visit_profile_limit);

        this.delay_between_visit_profile = $('#delay_between_visit_profile').val();
        localStorage.setItem('delay_between_visit_profile', this.delay_between_visit_profile);

        this.daily_connection_limit = $('#daily_connection_limit').val();
        localStorage.setItem('daily_connection_limit', this.daily_connection_limit);

        this.daily_follow_message = $('#daily_follow_message').val();
        localStorage.setItem('daily_follow_message', this.daily_follow_message);

        this.delay_between_connections = $('#delay_between_connections').val();
        localStorage.setItem('delay_between_connections', this.delay_between_connections);

        this.delay_between_messages = $('#delay_between_messages').val();
        localStorage.setItem('delay_between_messages', this.delay_between_messages);

        localStorage.setItem('CampaignName', this.campaignName);
        localStorage.setItem('CampaignType', this.campaigntype);
        localStorage.setItem('ShowCampaignType', this.showcampaigntype);
        localStorage.setItem('ShowCampaignProspect', this.showcampaignprospect);
        this.router.navigate(['/outreach/launch']);
    }

    private goBack() {
        if (this.skipsequence == "true") {
            localStorage.removeItem("skipsequence");
            localStorage.removeItem('campaigntype');
            this.router.navigate(['/outreach/setup']);
        } else if (this.skipsequence == "false") {
            localStorage.removeItem("skipsequence");
            localStorage.removeItem('campaigntype');
            this.router.navigate(['/outreach/sequences']);
        }
    }

    // TriggerModal() {
    //     (<any>$('#add_schedule')).modal('hide');
    //     (<any>$('#add_new_schedule')).modal('show');
    // }

    selectSchedule(value: any) {
        if (value == 0) {
            this.selectedschedule = value;
            this.schedulename = "Default";
            this.selectedtimezone = this.timezones[0]["value"];
            this.days = this.defaultdays;
            this.selectedStartAt = "8:00 AM";
            this.selectedEndAt = "10:00 PM";
        } else {
            this.selectedschedule = value;
            this.schedulename = this.schedules[value - 1]["name"];
            this.selectedtimezone = this.schedules[value - 1]["name"];
            this.days = this.schedules[value - 1]["days"];
            this.selectedStartAt = this.schedules[value - 1]["start_at"];
            this.selectedEndAt = this.schedules[value - 1]["end_at"];
        }
    }

    saveSchedule() {
        this.loading = true;
        localStorage.setItem('ScheduleName', this.schedulename);
        setTimeout(() => {
            (<any>$('#add_schedule')).modal('hide');
            this.loading = false;
        }, 500);
    }

    addNewSchedule() {
        this.new_loading = true;
        setTimeout(() => {
            (<any>$('#add_new_schedule')).modal('hide');
            this.loading = false;
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
