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

@Component({
    selector: "app-outreach-setup",
    templateUrl: "./outreachsetup.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService]
})

export class OutreachSetupComponent implements OnInit, AfterViewInit {
    data: any;
    showcampaignName = localStorage.getItem('CampaignName');
    campaignName: string = "Campaign Name";
    campaigntype: string;
    showcampaigntype: string = localStorage.getItem('ShowCampaignType');
    campaignprospect: string;
    showcampaignprospect: string = localStorage.getItem('ShowCampaignProspect');

    typeselectedvalue = localStorage.getItem('SelectedValue');
    selectedValue = null;

    prospectselectedvalue = localStorage.getItem('ProspectSelectedValue');
    prospselectedValue = null;

    skipsequence: string = "true";
    msgs: Message[] = [];

    CampaignType: Array<object> = [];
    CampaignProspects: Array<object> = [];

    constructor(
        private _script: ScriptLoaderService, private router: Router,
        private messageService: MessageService,
        private dataService: DataService
    ) { }

    ngOnInit() {

        if (!this.showcampaignName) {
            this.showcampaignName = this.campaignName;
        }

        this.dataService.getCampaignType().subscribe(
            data => {
                this.CampaignType = data;
                if (!this.typeselectedvalue) {
                    this.selectedValue = this.CampaignType[0]["id"];
                } else {
                    this.selectedValue = parseInt(this.typeselectedvalue, 10);
                }
            },
            error => {
            }
        );

        this.dataService.getCampaignProspects().subscribe(
            data => {
                this.CampaignProspects = data;
                if (!this.prospectselectedvalue) {
                    this.prospselectedValue = this.CampaignProspects[0]["id"];
                } else {
                    this.prospselectedValue = parseInt(this.prospectselectedvalue, 10);
                }
            },
            error => {
            }
        );
    }

    ngAfterViewInit() {
        this._script.loadScripts("app-outreach-setup", [
            "assets/app/js/dashboard.js"
        ]);
    }

    private selectCampaignType() {
        var selectedCampaignType = $("select.campaign-type option:selected").text();
        this.campaigntype = selectedCampaignType;
        this.selectedValue = $("select.campaign-type option:selected").val();
    }

    private selectCampaignProspects() {
        var selectedCampaignProspect = $("select.campaign-prospects option:selected").text();
        this.campaignprospect = selectedCampaignProspect;
        this.prospselectedValue = $("select.campaign-prospects option:selected").val();
    }

    private saveCampaignName() {
        if (this.selectedValue == 0) {
            // console.log(this.campaigntype);
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Please select campaign type!' });
            return false;
        }

        if (this.prospselectedValue == 0) {
            console.log(this.campaignprospect);
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Please select campaign prospect!' });
            return false;
        }

        if (this.showcampaignName) {
            this.campaignName = this.showcampaignName;
        }

        localStorage.setItem('CampaignName', this.campaignName);
        localStorage.setItem('CampaignType', this.campaigntype);
        localStorage.setItem('ShowCampaignType', this.campaigntype);
        localStorage.setItem('ShowCampaignProspect', this.campaignprospect);
        localStorage.setItem('SelectedValue', this.selectedValue);
        localStorage.setItem('ProspectSelectedValue', this.prospselectedValue);
        if (this.campaigntype == "Endorse Contacts" || this.campaigntype == "Auto Follow" || this.campaigntype == "Visit Profiles") {
            localStorage.setItem('SkipSequence', this.skipsequence);
            this.router.navigate(['/outreach/settings']);
        } else {
            this.router.navigate(['/outreach/sequences']);
        }
    }

    private changeCampaignName(value: string) {
        this.campaignName = value;
        this.showcampaignName = value;
    }
}
