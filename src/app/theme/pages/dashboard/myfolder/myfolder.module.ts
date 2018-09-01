import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { MyFolderComponent } from "./myfolder.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { DashboardComponent } from "../dashboard.component";

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        children: [
            {
                path: "",
                component: MyFolderComponent
            }
        ]
    }
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), LayoutModule],
    exports: [RouterModule],
    declarations: [MyFolderComponent]
})
export class MyFolderModule { }
