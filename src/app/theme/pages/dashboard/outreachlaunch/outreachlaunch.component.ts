import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";

@Component({
    selector: "app-outreach-launch",
    templateUrl: "./outreachlaunch.component.html",
    encapsulation: ViewEncapsulation.None
})
export class OutreachLaunchComponent implements OnInit, AfterViewInit {
    data: any;
    campaignName: string = localStorage.getItem('CampaignName');
    campaigntype: string = localStorage.getItem('ShowCampaignType');
    campaignprospect: string = localStorage.getItem('ShowCampaignProspect');
    InsertVar: string = localStorage.getItem('InsertVar');
    schedulename: string = "Default";
    // schedulename_: string = localStorage.getItem('ScheduleName');

    loading = false;

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

    constructor(
        private _script: ScriptLoaderService,
        private _router: Router,
        ) { }

    ngOnInit() { 

        if (this.daily_endorse_limit_ !== "") {
            this.daily_endorse_limit = this.daily_endorse_limit_;
        }
        if (this.delay_between_endorse_ !== "") {
            this.delay_between_endorse = this.delay_between_endorse_;
        }
        if (this.max_skills_endorse_ !== "") {
            this.max_skills_endorse = this.max_skills_endorse_;
        }
        if (this.daily_follow_limit_ !== "") {
            this.daily_follow_limit = this.daily_follow_limit_;
        }
        if (this.delay_between_follow_ !== "") {
            this.delay_between_follow = this.delay_between_follow_;
        }
        if (this.daily_visit_profile_limit_ !== "") {
            this.daily_visit_profile_limit = this.daily_visit_profile_limit_;
        }
        if (this.delay_between_visit_profile_ !== "") {
            this.delay_between_visit_profile = this.delay_between_visit_profile_;
        }
        if (this.daily_connection_limit_ !== "") {
            this.daily_connection_limit = this.daily_connection_limit_;
        }
        if (this.daily_follow_message_ !== "") {
            this.daily_follow_message = this.daily_follow_message_;
        }
        if (this.delay_between_connections_ !== "") {
            this.delay_between_connections = this.delay_between_connections_;
        }
        if (this.delay_between_messages_ !== "") {
            this.delay_between_messages = this.delay_between_messages_;
        }

        if(localStorage.getItem('ScheduleName')) {
            this.schedulename = localStorage.getItem('ScheduleName');
        }
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-connection", [
            "assets/app/js/dashboard.js"
        ]);
    }

    sendCampaign() {
        this.loading = true;
        setTimeout(() => {
            this._router.navigate(['/outreach/campaigns']);
            (<any>$('#send_campaign_now')).modal('hide');
            this.loading = false;
        }, 500);
    }

    private goBack() {
        localStorage.setItem('daily_endorse_limit', this.daily_endorse_limit);
        localStorage.setItem('delay_between_endorse', this.delay_between_endorse);
        localStorage.setItem('max_skills_endorse', this.max_skills_endorse);
        localStorage.setItem('daily_follow_limit', this.daily_follow_limit);
        localStorage.setItem('delay_between_follow', this.delay_between_follow);
        localStorage.setItem('daily_visit_profile_limit', this.daily_visit_profile_limit);
        localStorage.setItem('delay_between_visit_profile', this.delay_between_visit_profile);
        localStorage.setItem('daily_connection_limit', this.daily_connection_limit);
        localStorage.setItem('daily_follow_message', this.daily_follow_message);
        localStorage.setItem('delay_between_connections', this.delay_between_connections);
        localStorage.setItem('delay_between_messages', this.delay_between_messages);
        // localStorage.removeItem('ScheduleName');
        this._router.navigate(['/outreach/settings']);
    }
}
