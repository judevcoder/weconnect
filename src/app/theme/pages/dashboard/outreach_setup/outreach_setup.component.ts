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
import { SelectItem } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

declare let $: any;
declare let mApp: any;
declare let mUtil: any;

@Component({
    selector: "app-outreach-setup-demo",
    templateUrl: "./outreach_setup.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService]
})

export class Outreach_SetupComponent implements OnInit, AfterViewInit {
    wizardstatus: number = 1;
    data: any;

// variables for setup wizard
    campaignName: string = "Campaign Name";
    campaignType: string = "0";
    campaignProspect: string = "0";
    campaigntypeName: string = "";
    campaignprospectName: string = "";
    msgs: Message[] = [];

// variables for sequence wizard

    insertvars: Array<object> = [];
    templates: Array<object> = [];
    profile: object = {};
    InsertVar: string = "";
    InsertTemplates: Array<any> = [];
    disabled: boolean = false;
    boxes: Array<string> = ['box'];
    messageboxes: Array<string> = [];
    loading = false;

// end variables

// variables for settings wizard

    timezones: Array<object> = [];
    schedules: Array<object> = [];
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

// end variables

// variables for launch wizard
    send_campaign_loading = false;
    connectionMessage: string = "";
    messageAfterConnection: string = "";
// end variables

    CampaignType: Array<object> = [];
    CampaignProspects: Array<object> = [];

    constructor(
        private _script: ScriptLoaderService, 
        private router: Router,
        private messageService: MessageService,
        private dataService: DataService
    ) { }

    ngOnInit() {

        // if (!this.showcampaignName) {
        //     this.showcampaignName = this.campaignName;
        // }

        this.dataService.getCampaignType().subscribe(
            data => {
                this.CampaignType = data;
            },
            error => {
                this.CampaignType = [];
            }
        );

        this.dataService.getCampaignProspects().subscribe(
            data => {
                this.CampaignProspects = data;
            },
            error => {
                this.CampaignProspects = [];
            }
        );

    // init for sequences wizard

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

        this.dataService.getCampaignProspects().subscribe(
            data => {
                this.CampaignProspects = data;
            },
            error => {
                this.CampaignProspects = [];
            }
        );

        jQuery(document)
            .off("keyup", "input[name='campaignname']")
            .on("keyup", "input[name='campaignname']", function() {
                $('.campaign-name-form').removeClass('has-danger');
                $('#campaignname-error').css('display', 'none');
            });

        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/demo7/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleAddNewTemplateFormSubmit();
            });

        var maxLength = 300;
        jQuery(document)
            .on("keyup", "#comment_connection_message", function() {
                var length = String($(this).val()).length;
                var length = maxLength - length;
                $('#chars').text(length);
            });

        jQuery(document)
            .off("change", "select[name='add_schedule_hour']")
            .on("change", "select[name='add_schedule_hour']", function() {
                if ($(this).val() == "0") {
                    $("#add_schedule_day").removeAttr("disabled");
                } else {
                    $("#add_schedule_day").attr("disabled", "disabled");
                }
            });

        jQuery(document)
            .off("change", "select[name='add_schedule_day']")
            .on("change", "select[name='add_schedule_day']", function() {
                if ($(this).val() == "0") {
                    $("#add_schedule_hour").removeAttr("disabled");
                } else {
                    $("#add_schedule_hour").attr("disabled", "disabled");
                }
            });

    // end for sequences wizard

    // init for settings wizard
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

    // end init for settings wizard 
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-outreach-setup-demo", [
            "assets/app/js/dashboard.js"
        ]);
    }

// start function for setu wizard
    private selectCampaignType(value: string) {
        this.campaignType = value;
        this.campaigntypeName = this.CampaignType[parseInt(value, 10)]["content"];
    }

    private selectCampaignProspects(value: string) {
        this.campaignProspect = value;
        this.campaignprospectName = this.CampaignProspects[parseInt(value, 10)]["content"];
    }

// end functions

// start functions for sequence wizard

    private addStep() {
        if (this.boxes.length >= 5) {
            this.disabled = true;
        } else {
            this.boxes.push('box');
            setTimeout(() => {
                this.refreshScrollable();
            }, 1000);
        }
    }

    private addMessageStep() {
        if (this.messageboxes.length >= 5) {
            this.disabled = true;
        } else {
            this.messageboxes.push('box');
            setTimeout(() => {
                this.refreshScrollable();
            }, 1000);
        }
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

    private removeSection() {
        this.boxes.pop();
        if (this.boxes.length < 5) {
            this.disabled = false;
        }
    }

    private removeMessageSection() {
        this.messageboxes.pop();
        if (this.messageboxes.length < 5) {
            this.disabled = false;
        }
    }

    private ConnectionMessage(value: string) {
        this.connectionMessage = value;
    }

    private insertVar(event) {
        var originVal = (<any>$(event.target).closest(".col-lg-12").find("textarea").val());
        var id = (<any>$(event.target).attr("data-id"));
        var insertVal = this.insertvars[id]["code"];
        var messageVal = (<any>$(event.target).closest(".col-lg-12").find("textarea").val(originVal + "[" + insertVal + "]"));
        this.InsertVar = messageVal;
    }

    private insertTemplate(event) {
        // var originVal = (<any>$(event.target).closest(".col-lg-12").find("textarea").val());
        var id = (<any>$(event.target).attr("data-id"));
        var insertTemplate = this.templates[id]["message"];
        var messageAfterConnection = (<any>$(event.target).closest(".col-lg-12").find("textarea").val(insertTemplate));
        this.InsertTemplates.push(messageAfterConnection);
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

// end functions

// start functions for settings wizard

    private selectSchedule(value: any) {
        if (value == 0) {
            this.selectedschedule = value;
            this.schedulename = "Default";
            this.selectedtimezone = this.timezones[0]["value"];
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

    dailyEndorseLimit(value: any) {
        this.daily_endorse_limit = value;
    }

    delayBetweenEndorse(value: any) {
        this.delay_between_endorse = value;
    }

    maxSkillsEndorse(value: any) {
        this.max_skills_endorse = value;
    }

    dailyFollowLimit(value: any) {
        this.daily_follow_limit = value;
    }

    delayBetweenFollow(value: any) {
        this.delay_between_follow = value;
    }

    dailyVisitProfileLimit(value: any) {
        this.daily_visit_profile_limit = value;
    }

    delayBetweenVisitProfile(value: any) {
        this.delay_between_visit_profile = value;
    }

    dailyConnectionLimit(value: any) {
        this.daily_connection_limit = value;
    }

    dailyiFollowMessage(value: any) {
        this.daily_follow_message = value;
    }

    dalayBetweenConnections(value: any) {
        this.delay_between_connections = value;
    }

    delayBetweenMessages(value: any) {
        this.delay_between_messages = value;
    }

// end functions

// start functions for launch wizard
    sendCampaign() {
        this.send_campaign_loading = true;
        setTimeout(() => {
            this.router.navigate(['/outreach/campaigns']);
            (<any>$('#send_campaign_now')).modal('hide');
            this.send_campaign_loading = false;
        }, 500);
    }
// end functions

    private changeCampaignName(value: string) {
        this.campaignName = value;
    }

    private moveToNextWizard() {

        let campaignName = $('input[name="campaignname"]').val();
        if (campaignName == "") {
            $('.campaign-name-form').addClass('has-danger');
            $('#campaignname-error').css('display', 'block');
            return false;
        } else {
            $('.campaign-name-form').removeClass('has-danger');
            $('#campaignname-error').css('display', 'none');
        }

        if (this.wizardstatus == 1) {

            if (this.campaignType == "0") {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Please select campaign type!' });
                return false;
            } else if (this.campaignType == "3" || this.campaignType == "4" || this.campaignType == "5") {
                if (this.campaignProspect == "0") {
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Please select campaign Prospect!' });
                    return false;
                } else {
                    $('#m_wizard_form_step_1').removeClass('m-wizard__form-step--current');
                    $('div[m-wizard-target="m_wizard_form_step_1"]').removeClass('m-wizard__step--current').addClass('m-wizard__step--done');
                    $('div[m-wizard-target="m_wizard_form_step_2"]').css('display', 'none');
                    $('#m_wizard_form_step_3').addClass('m-wizard__form-step--current');
                    $('div[m-wizard-target="m_wizard_form_step_3"]').addClass('m-wizard__step--current');
                    $('div[m-wizard-target="m_wizard_form_step_3"]').find('.m-wizard__step-number span span').text(2);
                    $('div[m-wizard-target="m_wizard_form_step_4"]').find('.m-wizard__step-number span span').text(3);
                    $('.progress-bar').css('width', '75%');
                    $('.prev-wizard-btn').css('display', 'inline-block');
                    this.wizardstatus = 3;
                }
            } else {
                if (this.campaignProspect == "0") {
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Please select campaign Prospect!' });
                    return false;

                } else {
                    $('#m_wizard_form_step_1').removeClass('m-wizard__form-step--current');
                    $('div[m-wizard-target="m_wizard_form_step_1"]').removeClass('m-wizard__step--current').addClass('m-wizard__step--done');
                    $('#m_wizard_form_step_2').addClass('m-wizard__form-step--current');
                    $('div[m-wizard-target="m_wizard_form_step_2"]').addClass('m-wizard__step--current');
                    $('.progress-bar').css('width', '50%');
                    $('.prev-wizard-btn').css('display', 'inline-block');
                    this.wizardstatus = 2;
                    $('.ui-messages-error').css('display', 'none');
                    setTimeout(()=>{
                        this.refreshScrollable();
                    }, 500)
                }
            }
        } else if (this.wizardstatus == 2) {
            $('#m_wizard_form_step_2').removeClass('m-wizard__form-step--current');
            $('div[m-wizard-target="m_wizard_form_step_2"]').removeClass('m-wizard__step--current').addClass('m-wizard__step--done');
            $('#m_wizard_form_step_3').addClass('m-wizard__form-step--current');
            $('div[m-wizard-target="m_wizard_form_step_3"]').addClass('m-wizard__step--current');
            $('.progress-bar').css('width', '75%');
            this.connectionMessage = $('#comment_connection_message').val();
            this.messageAfterConnection = $('.after-connection-message').val();
            this.wizardstatus = 3;
        } else if (this.wizardstatus == 3) {
            $('#m_wizard_form_step_3').removeClass('m-wizard__form-step--current');
            $('div[m-wizard-target="m_wizard_form_step_3"]').removeClass('m-wizard__step--current').addClass('m-wizard__step--done');
            $('#m_wizard_form_step_4').addClass('m-wizard__form-step--current');
            $('div[m-wizard-target="m_wizard_form_step_4"]').addClass('m-wizard__step--current');
            $('.progress-bar').css('width', '100%');
            $('.next-wizard-btn').hide();
            $('#send_campaign').show();
            this.wizardstatus = 4;
        }
    }

    private moveToPrevWizard() {
        if (this.wizardstatus == 4) {
            $('#m_wizard_form_step_4').removeClass('m-wizard__form-step--current');
            $('div[m-wizard-target="m_wizard_form_step_4"]').removeClass('m-wizard__step--current');
            $('#m_wizard_form_step_3').addClass('m-wizard__form-step--current');
            $('div[m-wizard-target="m_wizard_form_step_3"]').addClass('m-wizard__step--current').removeClass('m-wizard__step--done');
            $('.progress-bar').css('width', '75%');
            $('#send_campaign').hide();
            $('.next-wizard-btn').show();
            this.wizardstatus = 3;
        } else if (this.wizardstatus == 3) {
            if (this.campaignType == "3" || this.campaignType == "4" || this.campaignType == "5") {
                $('#m_wizard_form_step_3').removeClass('m-wizard__form-step--current');
                $('div[m-wizard-target="m_wizard_form_step_3"]').removeClass('m-wizard__step--current');
                $('#m_wizard_form_step_1').addClass('m-wizard__form-step--current');
                $('div[m-wizard-target="m_wizard_form_step_1"]').addClass('m-wizard__step--current').removeClass('m-wizard__step--done');
                $('div[m-wizard-target="m_wizard_form_step_2"]').css('display', 'block');
                $('div[m-wizard-target="m_wizard_form_step_3"]').find('.m-wizard__step-number span span').text(3);
                    $('div[m-wizard-target="m_wizard_form_step_4"]').find('.m-wizard__step-number span span').text(4);
                $('.progress-bar').css('width', '25%');
                $('.prev-wizard-btn').css('display', 'none');
                this.wizardstatus = 1;
            } else {
                $('#m_wizard_form_step_3').removeClass('m-wizard__form-step--current');
                $('div[m-wizard-target="m_wizard_form_step_3"]').removeClass('m-wizard__step--current');
                $('#m_wizard_form_step_2').addClass('m-wizard__form-step--current');
                $('div[m-wizard-target="m_wizard_form_step_2"]').addClass('m-wizard__step--current').removeClass('m-wizard__step--done');
                $('.progress-bar').css('width', '50%');
                this.wizardstatus = 2;
            }
        } else if (this.wizardstatus == 2) {
            $('#m_wizard_form_step_2').removeClass('m-wizard__form-step--current');
            $('div[m-wizard-target="m_wizard_form_step_2"]').removeClass('m-wizard__step--current');
            $('#m_wizard_form_step_1').addClass('m-wizard__form-step--current');
            $('div[m-wizard-target="m_wizard_form_step_1"]').addClass('m-wizard__step--current').removeClass('m-wizard__step--done');
            $('.progress-bar').css('width', '25%');
            this.wizardstatus = 1;
            $('.prev-wizard-btn').css('display', 'none');
        }
    }
}
