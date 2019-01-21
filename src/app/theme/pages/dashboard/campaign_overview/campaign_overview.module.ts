import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { CampaignOverviewDemoComponent } from "./campaign_overview.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { DashboardComponent } from "../dashboard.component";
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children: [
            {
                path: "",
                component: CampaignOverviewDemoComponent
            }
        ]
    }
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, FormsModule],
    exports: [RouterModule],
    declarations: [CampaignOverviewDemoComponent]
})
export class CampaignOverviewDemoModule { }
