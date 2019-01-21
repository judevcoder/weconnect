import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { OutreachCampaignComponent } from "./outreachcampaign.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { DashboardComponent } from "../dashboard.component";
import { SendFormDataService } from "../../../../_services/send-form-data.service";

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children: [
            {
                path: "",
                component: OutreachCampaignComponent
            }
        ]
    }
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), LayoutModule],
    exports: [RouterModule],
    declarations: [OutreachCampaignComponent],
    providers: [SendFormDataService]
})
export class OutreachCampaignModule { }
