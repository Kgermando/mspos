import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
    BsDatepickerModule,
    BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { CustomPaginationModule } from './custom-pagination/custom-pagination.module';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { MultiSelectModule } from 'primeng/multiselect';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LightgalleryModule } from 'lightgallery/angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NgxMaskModule } from 'ngx-mask';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgChartsModule } from 'ng2-charts';
import { LightboxModule } from 'ngx-lightbox';
import { ChipsModule } from 'primeng/chips';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { DateRangePickerModule } from './common/date-range-picker/date-range-picker.module';
import { CollapseHeaderModule } from './common/collapse-header/collapse-header.module';
import { ProvinceUserComponent } from './components/province-user/province-user.component';
import { UserAreaComponent } from './components/user-area/user-area.component';
import { UserSupComponent } from './components/user-sup/user-sup.component';
import { UserPosComponent } from './components/user-pos/user-pos.component';
import { ReloadComponent } from './components/reload/reload.component';


@NgModule({
    declarations: [
        ProvinceUserComponent,
        UserAreaComponent,
        UserSupComponent,
        UserPosComponent,
        ReloadComponent,
    ],
    exports: [
        CommonModule,
        NgScrollbarModule,
        NgApexchartsModule,
        BsDatepickerModule,
        CustomPaginationModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule,
        NgxEditorModule,
        MultiSelectModule,
        CollapseHeaderModule,
        CarouselModule,
        LightgalleryModule,
        FullCalendarModule,
        ToastModule,
        TooltipModule,
        PopoverModule,
        NgxMaskModule,
        NgxDropzoneModule,
        NgChartsModule,
        LightboxModule,
        ChipsModule,
        EditorModule,
        DateRangePickerModule,
        DropdownModule,
        TimepickerModule,
        NgxMatTimepickerModule,

        ProvinceUserComponent,
        UserAreaComponent,
        UserSupComponent,
        UserPosComponent,
        ReloadComponent,
    ], imports: [
        CommonModule,
        NgScrollbarModule,
        NgApexchartsModule,
        BsDatepickerModule,
        CustomPaginationModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        NgxEditorModule,
        MultiSelectModule,
        CollapseHeaderModule,
        CarouselModule,
        LightgalleryModule,
        FullCalendarModule,
        ToastModule,
        TooltipModule,
        PopoverModule,
        NgxMaskModule.forRoot({
            showMaskTyped: false,
        }),
        NgxDropzoneModule,
        NgChartsModule.forRoot(),
        LightboxModule,
        ChipsModule,
        EditorModule,
        DateRangePickerModule,
        DropdownModule,
        TimepickerModule.forRoot(),
        NgxMatTimepickerModule],
    providers: [
        BsDatepickerConfig,
        DatePipe,
        BsDaterangepickerConfig,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class SharedModule { }
