import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { Outreach_SetupComponent } from "./outreach_setup.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { DashboardComponent } from "../dashboard.component";
import { EditorModule, SharedModule, ButtonModule, MessagesModule, GrowlModule } from 'primeng/primeng';

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children: [
            {
                path: "",
                component: Outreach_SetupComponent
            }
        ]
    }
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, GrowlModule, MessagesModule, FormsModule],
    exports: [RouterModule],
    declarations: [Outreach_SetupComponent]
})
export class Outreach_SetupModule { }
