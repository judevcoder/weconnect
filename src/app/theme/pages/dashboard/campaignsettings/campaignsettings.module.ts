import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { CampaignSettingsComponent } from "./campaignsettings.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { DashboardComponent } from "../dashboard.component";

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children: [
            {
                path: "",
                component: CampaignSettingsComponent
            }
        ]
    }
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), LayoutModule],
    exports: [RouterModule],
    declarations: [CampaignSettingsComponent]
})
export class CampaignSettingsModule { }
