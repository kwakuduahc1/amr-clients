import { NgModule } from "@angular/core";
import { CardDisplayComponent } from "./display/card-display/card-display.component";
import { ListDisplayComponent } from "./display/list-display/list-display.component";
import { FormBuilderComponent } from "./forms/form-builder/form-builder.component";
import { TableDisplayComponent } from "./display/table-display/table-display.component";

@NgModule({
    imports: [
        CardDisplayComponent,
        ListDisplayComponent,
        TableDisplayComponent,
        FormBuilderComponent
    ],
    providers: [],
    bootstrap: [],
    exports: [
        CardDisplayComponent,
        FormBuilderComponent,
        TableDisplayComponent,
        FormBuilderComponent
    ]
})
export class BsControlsModule { }