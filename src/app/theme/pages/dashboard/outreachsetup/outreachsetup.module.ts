import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { OutreachSetupComponent } from "./outreachsetup.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { DashboardComponent } from "../dashboard.component";

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children: [
            {
                path: "",
                component: OutreachSetupComponent
            }
        ]
    }
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), LayoutModule],
    exports: [RouterModule],
    declarations: [OutreachSetupComponent]
})
export class OutreachSetupModule { }
