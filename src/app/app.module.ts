import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatTabsModule } from '@angular/material/tabs';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { HeaderComponent } from './header/header.component';
import { AppToolbarService } from './app-toolbar/app-toolbar.component'
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { KpiComponent } from './components/kpi/kpi.component';
import { PivotTableComponent } from './components/pivot-table/pivot-table.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ColumnChartComponent } from './components/column-chart/column-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { LineChartHasSegmentByComponent } from './components/line-chart-has-segmeny-by/line-chart-has-segmeny-by.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';
import { ComboChartComponent } from './components/combo-chart/combo-chart.component';
import { HeatMapComponent } from './components/heat-map/heat-map.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { TreemapComponent } from './components/tree-map/tree-map.component';
import { BubbleChartComponent } from './components/bubble-chart/bubble-chart.component';
import { ScatterPlotComponent } from './components/scatter-chart/scatter-chart.component';
import { DualColumnChartComponent } from './components/dual-column-chart/dual-column-chart.component';
import { TableComponent } from './components/table/table.component';
import { PivotTableTotalsComponent } from './components/pivot-table-total/pivot-table-total.component';
import { VisualizationAreaChartComponent } from './visualizations/visualization-area-chart/visualization-area-chart.component';
import { VisualizationAreaChartByUriComponent } from './visualizations/visualization-area-chart-by-uri/visualization-area-chart-by-uri.component';
import { VisualizationTableComponent } from './visualizations/visualization-table/visualization-table.component';
import { VisualizationColumnChartByUriComponent } from './visualizations/visualization-column-chart-by-uri/visualization-column-chart-by-uri.component';
import { VisualizationColumnChartComponent } from './visualizations/visualization-column-chart/visualization-column-chart.component';
import { VisualizationBarChartComponent } from './visualizations/visualization-bar-chart/visualization-bar-chart.component';
import { VisualizationBarChartByUriComponent } from './visualizations/visualization-bar-chart-by-uri/visualization-bar-chart-by-uri.component';
import { VisualizationLineChartComponent } from './visualizations/visualization-line-chart/visualization-line-chart.component';
import { VisualizationLineChartByUriComponent } from './visualizations/visualization-line-chart-by-uri/visualization-line-chart-by-uri.component';
import { VisualizationApplyMeasureValueFilterComponent } from './visualizations/visualization-apply-measure-value-filter/visualization-apply-measure-value-filter.component';
import { VisualizationApplyMeasureValueFilterUriComponent } from './visualizations/visualization-apply-measure-value-filter-uri/visualization-apply-measure-value-filter-uri.component';
import { MeasureSortingExampleComponent } from './components/measure-sorting-example/measure-sorting-example.component';
import { AttributeSortingExampleComponent } from './components/attribute-sorting-example/attribute-sorting-example.component';
import { SamePeriodColumnChartExampleComponent } from './components/same-period-column-chart-example/same-period-column-chart-example.component';
import { PreviousPeriodColumnChartExampleComponent } from './components/previous-period-column-chart-example/previous-period-column-chart-example.component';
import { PreviousPeriodHeadLineExampleComponent } from './components/previous-period-headline-example/previous-period-headline-example.component';
import { AttributeFilterExampleComponent } from './components/attribute-filter-example/attribute-filter-example.component';
import { AttributeFilterComponent } from './components/attribute-filter/attribute-filter.component';
import { BasicComponentsComponent } from './routes/basic-components/basic-components.component';
import { PivotTableComponentsComponent } from './routes/pivot-table-components/pivot-table-components.component';
import { SortingComponentsComponent } from './routes/sorting-components/sorting-components.component';
import { TimeOverTimeComparisonComponent } from './routes/time-over-time-comparison/time-over-time-comparison.component';
import { AttributeFilterComponentsComponent } from './routes/attribut-filter-components/attribut-filter-components.component';
import { TableDrillExampleComponent } from './components/table-drill-example/table-drill-example.component';
import { ArithmeticMeasureChangeComponent } from './components/arithmetic-measure-change/arithmetic-measure-change.component';
import { ArithmeticMeasuresRatioComponent } from './components/arithmetic-measure-ratio/arithmetic-measure-ratio.component';
import { ArithmeticMeasureSumComponent } from './components/arithmetic-measure-sum/arithmetic-measure-sum.component';
import { ArithmeticMeasureMultiplicationComponent } from './components/arithmetic-measure-multiplication/arithmetic-measure-multiplication.component';
import { ArithmeticMeasureDrillingComponent } from './components/arithmetic-measure-drilling/arithmetic-measure-drilling.component';
import { PieChartColorMappingComponent } from './components/pie-chart-color-mapping/pie-chart-color-mapping.component';
import { ArithmeticMeasureComponentsComponent } from './routes/arithmetic-measure-components/arithmetic-measure-components.component';
import { HeadlineComponent } from './components/head-line/head-line.component';
import { VisualizationPivotTableByUriComponent } from './visualizations/visualization-pivot-table-by-uri/visualization-pivot-table-by-uri.component';
import { DrillWithExternalDataComponent } from './components/drill-with-external-data/drill-with-external-data.component';
import { DrillingComponentsComponent } from './routes/drilling-components/drilling-components.component';
import { PivotTableDrillExampleComponent } from './components/pivot-table-drill-example/pivot-table-drill-example.component';
import { VisualizationHeadlineByUriComponent } from './visualizations/visualization-headline-by-uri/visualization-headline-by-uri.component';
import { VisualizationScatterPlotByUriComponent } from './visualizations/visualization-scatter-plot-by-uri/visualization-scatter-plot-by-uri.component';
import { VisualizationBubbleChartByUriComponent } from './visualizations/visualization-bubble-chart-by-uri/visualization-bubble-chart-by-uri.component';
import { VisualizationTreemapByIdentifierComponent } from './visualizations/visualization-treemap-by-identifier/visualization-treemap-by-identifier.component';
import { VisualizationHeatmapByIdentifierComponent } from './visualizations/visualization-heatmap-by-identifier/visualization-heatmap-by-identifier.component';
import { VisualizationDonutChartByIdentifierComponent } from './visualizations/visualization-donut-chart-by-identifier/visualization-donut-chart-by-identifier.component';
import { VisualizationPieChartByIdentifierComponent } from './visualizations/visualization-pie-chart-by-identifier/visualization-pie-chart-by-identifier.component';
import { VisualizationDonutChartByUriComponent } from './visualizations/visualization-donut-chart-by-uri/visualization-donut-chart-by-uri.component';
import { VisualizationPieChartByUriComponent } from './visualizations/visualization-pie-chart-by-uri/visualization-pie-chart-by-uri.component'
import { AreaChartHasColorPaletteComponent } from './components/area-chart-has-color-palette/area-chart-has-color-palette.component';
import { NewAttributeFilterComponent } from './components/new-attribute-filter/new-attribute-filter.component';
import { AttributeFilterDefinitionByURIComponent } from './components/attribute-filter-definition-by-uri/attribute-filter-definition-by-uri.component';
import { DateFilterConfigComponent } from './components/date-filter-config/date-filter-config.component';
import { DateFilterComponent } from './routes/date-filter/date-filter.component';
import { DateFilterConfigExampleComponent } from './components/date-filter-config-example/date-filter-config-example.component';
import { DateFilterVisComponent } from './visualizations/visualization-date-filter/visualization-date-filter.component';
import { AdvancedUseCasesComponent } from './routes/advanced-use-cases/advanced-use-cases.component';
import { GlobalFiltersComponent } from './routes/global-filters/global-filters.component';
import { GlobalFiltersExampleComponent } from './components/global-filters-example/global-filters-example.component';
import { ParentFilterComponent } from './routes/parent-filter/parent-filter.component';
import { ParentFilterExampleComponent } from './components/parent-filter-example/parent-filter-example.component';
import { VisualizationBulletChartByUriComponent } from './visualizations/visualization-bullet-chart-by-uri/visualization-bullet-chart-by-uri.component';
import { VisualizationByUriComponent } from './routes/visualization-by-uri/visualization-by-uri.component';
import { VisualizationByIdentifierComponent } from './routes/visualization-by-identifier/visualization-by-identifier.component';
import { VisualizationComponent } from './routes/visualization-components/visualization.component';
import { VisualizationBulletChartByIdentifierComponent } from './visualizations/visualization-bullet-chart-by-identifier/visualization-bullet-chart-by-identifier.component';
import { BulletChartComponent } from './components/bullet-chart/bullet-chart.component';
import { BulletChartHasAmMeasureComponent } from './components/bullet-chart-has-am-measure/bullet-chart-has-am-measure.component';
import { BulletChartHasMeasureValueFilterComponent } from './components/bullet-chart-has-measure-value-filter/bullet-chart-has-measure-value-filter.component';
import { ResponsiveExampleComponent } from './components/responsive-example/responsive-example.component';
import { PivotTableSizingComponent } from './components/pivot-table-sizing/pivot-table-sizing.component';
import { MeasureValueFilterExamplesComponent } from './components/measure-value-filter-examples/measure-value-filter-examples.component';
import { MeasureValueFilterComponent } from './routes/measure-value-filter/measure-value-filter.component';
import { MeasureValueFilterShownInPercentComponent } from './components/measure-value-filter-shown-in-percent/measure-value-filter-shown-in-percent.component';
import { MeasureValueFilterStackTo100PercentComponent } from './components/measure-value-filter-stack-to100-percent/measure-value-filter-stack-to100-percent.component';
import { MeasureValueFilterFormattedInPercentComponent } from './components/measure-value-filter-formatted-in-percent/measure-value-filter-formatted-in-percent.component';
import { FilterByMeasureValueComponent } from './routes/filter-by-measure-value/filter-by-measure-value.component';
import { MeasureValueFilterComponentComponent } from './routes/measure-value-filter-component/measure-value-filter-component.component';
import { MeasureValueFilterDropdownComponent } from './components/measure-value-filter-dropdown/measure-value-filter-dropdown.component';
import { MeasureValueFilterRatioDropdownComponent } from './components/measure-value-filter-ratio-dropdown/measure-value-filter-ratio-dropdown.component';
import { MeasureValueFilterPercentDropdownComponent } from './components/measure-value-filter-percent-dropdown/measure-value-filter-percent-dropdown.component';
import { ExampleWithExportComponent } from './components/utils/example-with-export/example-with-export.component';
import { PivotTableExportExampleComponent } from './components/pivot-table-export-example/pivot-table-export-example.component';
import { HeadlineExportExampleComponent } from './components/headline-export-example/headline-export-example.component';
import { VisualizationColumnChartExportExampleComponent } from './visualizations/visualization-column-chart-export-example/visualization-column-chart-export-example.component';
import { TableExportExampleComponent } from './components/table-export-example/table-export-example.component';
import { BarChartExportExampleComponent } from './components/bar-chart-export-example/bar-chart-export-example.component';
import { ExportChartComponent } from './routes/export-chart/export-chart.component';
import { ExportHeadlineComponent } from './routes/export-headline/export-headline.component';
import { ExportPivotTableComponent } from './routes/export-pivot-table/export-pivot-table.component';
import { ExportTableComponent } from './routes/export-table/export-table.component';
import { ExportVisualizationComponent } from './routes/export-visualization/export-visualization.component'
import { ResponsiveChartComponent } from './routes/responsive-chart/responsive-chart.component';
import { SaveAsDashboardComponent } from './components/save-as-dashboard/save-as-dashboard.component';
import { SaveAsDashboardComponentComponent } from './routes/save-as-dashboard-component/save-as-dashboard-component.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { MonthPickerComponent } from './components/month-picker/month-picker.component';
import { DatepickerComponent } from './routes/datepicker/datepicker.component';
import { DynamicSortingComponent } from './components/dynamic-sorting/dynamic-sorting.component';
import { BarchartConfigComponent } from './components/barchart-config/barchart-config.component';
import { DualAxisColumnChartComponent } from './components/dual-axis-column-chart/dual-axis-column-chart.component';
import { DualAxisBarChartComponent } from './components/dual-axis-bar-chart/dual-axis-bar-chart.component';
import { ColumnChartConfigComponent } from './components/column-chart-config/column-chart-config.component';
import { PieChartWithColorMappingComponent } from './components/pie-chart-with-color-mapping/pie-chart-with-color-mapping.component';
import { ChartConfigComponentsComponent } from './routes/chart-config-components/chart-config-components.component';
import { ExampleWithSourceComponent } from './components/utils/example-with-source/example-with-source.component';
import { DynamicMeasureComponent } from './components/dynamic-measure/dynamic-measure.component';
import { DynamicMeasureComponentComponent } from './routes/dynamic-measure-component/dynamic-measure-component.component';
import { AttributeElementComponent } from './components/attribute-element/attribute-element.component';
import { MeasureValueFilterComponentExampleComponent } from './components/measure-value-filter-component-example/measure-value-filter-component-example.component';
import { MeasureValueFilterComponentPercentageExampleComponent } from './components/measure-value-filter-component-percentage-example/measure-value-filter-component-percentage-example.component';
import { MeasureValueFilterComponentShowInPercentComponent } from './components/measure-value-filter-component-show-in-percent/measure-value-filter-component-show-in-percent.component';
import { VisualizationHasMvfComponent } from './visualizations/visualization-has-mvf/visualization-has-mvf.component';
import { CombineAttributeWithMeasureFilterComponent } from './components/combine-attribute-with-measure-filter/combine-attribute-with-measure-filter.component';
import { CombineDateWithMeasureFilterComponent } from './components/combine-date-with-measure-filter/combine-date-with-measure-filter.component';
import { CombineDateAndAttributeWithMeasureFilterComponent } from './components/combine-date-and-attribute-with-measure-filter/combine-date-and-attribute-with-measure-filter.component';;
import { CombineFilterExamplesComponent } from './routes/combine-filter-examples/combine-filter-examples.component';
import { CombineFilterComponentExamplesComponent } from './routes/combine-filter-component-examples/combine-filter-component-examples.component';
import { CombineFilterComponent } from './routes/combine-filter/combine-filter.component';;
import { CombineAttributeWithMeasureFilterComponentComponent } from './components/combine-attribute-with-measure-filter-component/combine-attribute-with-measure-filter-component.component';
import { CombineDateWithMeasureFilterComponentComponent } from './components/combine-date-with-measure-filter-component/combine-date-with-measure-filter-component.component';
import { CombineDateAndAttributeWithMeasureFilterComponentComponent } from './components/combine-date-and-attribute-with-measure-filter-component/combine-date-and-attribute-with-measure-filter-component.component'


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRouting,
        MatTabsModule,
        RouterModule.forRoot([{
            path: '', redirectTo: '/basic-components', pathMatch: 'full'
        }])
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        KpiComponent,
        PivotTableComponent,
        TableComponent,
        PieChartComponent,
        BarChartComponent,
        ColumnChartComponent,
        LineChartComponent,
        LineChartHasSegmentByComponent,
        AreaChartComponent,
        AreaChartHasColorPaletteComponent,
        ComboChartComponent,
        HeatMapComponent,
        DonutChartComponent,
        TreemapComponent,
        DualColumnChartComponent,
        ScatterPlotComponent,
        BubbleChartComponent,
        VisualizationTableComponent,
        VisualizationAreaChartComponent,
        VisualizationAreaChartByUriComponent,
        VisualizationPivotTableByUriComponent,
        VisualizationColumnChartByUriComponent,
        VisualizationColumnChartComponent,
        VisualizationBarChartComponent,
        VisualizationBarChartByUriComponent,
        VisualizationLineChartComponent,
        VisualizationLineChartByUriComponent,
        VisualizationApplyMeasureValueFilterComponent,
        VisualizationApplyMeasureValueFilterUriComponent,
        PivotTableTotalsComponent,
        MeasureSortingExampleComponent,
        AttributeSortingExampleComponent,
        SamePeriodColumnChartExampleComponent,
        PreviousPeriodHeadLineExampleComponent,
        PreviousPeriodColumnChartExampleComponent,
        AttributeFilterExampleComponent,
        AttributeFilterComponent,
        BasicComponentsComponent,
        PivotTableComponentsComponent,
        SortingComponentsComponent,
        AttributeFilterComponentsComponent,
        TimeOverTimeComparisonComponent,
        TableDrillExampleComponent,
        ArithmeticMeasureChangeComponent,
        ArithmeticMeasuresRatioComponent,
        ArithmeticMeasureSumComponent,
        ArithmeticMeasureMultiplicationComponent,
        ArithmeticMeasureDrillingComponent,
        PieChartColorMappingComponent,
        ArithmeticMeasureComponentsComponent,
        HeadlineComponent,
        DrillWithExternalDataComponent,
        DrillingComponentsComponent,
        PivotTableDrillExampleComponent,
        VisualizationHeadlineByUriComponent,
        VisualizationScatterPlotByUriComponent,
        VisualizationBubbleChartByUriComponent,
        VisualizationTreemapByIdentifierComponent,
        VisualizationHeatmapByIdentifierComponent,
        VisualizationDonutChartByIdentifierComponent,
        VisualizationPieChartByIdentifierComponent,
        VisualizationDonutChartByUriComponent,
        VisualizationPieChartByUriComponent,
        HeaderComponent,
        NewAttributeFilterComponent,
        AttributeFilterDefinitionByURIComponent,
        DateFilterConfigComponent,
        DateFilterComponent,
        DateFilterConfigExampleComponent,
        DateFilterVisComponent,
        AdvancedUseCasesComponent,
        GlobalFiltersComponent,
        GlobalFiltersExampleComponent,
        ParentFilterComponent,
        ParentFilterExampleComponent,
        VisualizationBulletChartByUriComponent,
        VisualizationByUriComponent,
        VisualizationByIdentifierComponent,
        VisualizationComponent ,
        VisualizationBulletChartByIdentifierComponent ,
        BulletChartComponent ,
        BulletChartHasAmMeasureComponent ,
        BulletChartHasMeasureValueFilterComponent,
        ResponsiveExampleComponent,
        ResponsiveChartComponent,
        SaveAsDashboardComponent ,
        SaveAsDashboardComponentComponent,
        PivotTableSizingComponent,    
        MeasureValueFilterExamplesComponent ,
        MeasureValueFilterComponent,
        MeasureValueFilterShownInPercentComponent,
        MeasureValueFilterStackTo100PercentComponent,
        MeasureValueFilterFormattedInPercentComponent,
        FilterByMeasureValueComponent,
        MeasureValueFilterComponentComponent,
        MeasureValueFilterDropdownComponent,
        MeasureValueFilterRatioDropdownComponent ,
        MeasureValueFilterPercentDropdownComponent,
        ExampleWithExportComponent,
        PivotTableExportExampleComponent ,
        HeadlineExportExampleComponent ,
        VisualizationColumnChartExportExampleComponent ,
        TableExportExampleComponent ,
        BarChartExportExampleComponent,
        ExportChartComponent,
        ExportHeadlineComponent,
        ExportPivotTableComponent,
        ExportTableComponent,
        ExportVisualizationComponent,
        DatePickerComponent,
        MonthPickerComponent,
        DatepickerComponent,
        DynamicSortingComponent,
        BarchartConfigComponent,
        DualAxisColumnChartComponent,
        DualAxisBarChartComponent,
        ColumnChartConfigComponent,
        PieChartWithColorMappingComponent,
        ChartConfigComponentsComponent,
        ExampleWithSourceComponent,
        DynamicMeasureComponent,
        DynamicMeasureComponentComponent,
        AttributeElementComponent,
        MeasureValueFilterComponentExampleComponent,
        MeasureValueFilterComponentPercentageExampleComponent,
        MeasureValueFilterComponentShowInPercentComponent,
        VisualizationHasMvfComponent,
        CombineAttributeWithMeasureFilterComponent,
        CombineDateWithMeasureFilterComponent,
        CombineDateAndAttributeWithMeasureFilterComponent,
        CombineFilterExamplesComponent,
        CombineFilterComponentExamplesComponent,
        CombineFilterComponent,
        CombineAttributeWithMeasureFilterComponentComponent,
        CombineDateWithMeasureFilterComponentComponent ,
        CombineDateAndAttributeWithMeasureFilterComponentComponent
    
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        CookieService,
        AppToolbarService,
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        KpiComponent,
        HeadlineComponent,
        PieChartComponent,
        TableComponent,
        BarChartComponent,
        ColumnChartComponent,
        LineChartComponent,
        LineChartHasSegmentByComponent,
        AreaChartComponent,
        AreaChartHasColorPaletteComponent,
        ComboChartComponent,
        HeatMapComponent,
        TreemapComponent,
        DonutChartComponent,
        ScatterPlotComponent,
        BubbleChartComponent,
        DualColumnChartComponent,
        PieChartColorMappingComponent,
        BulletChartComponent,
        BulletChartHasAmMeasureComponent,
        BulletChartHasMeasureValueFilterComponent,
        ArithmeticMeasuresRatioComponent,
        ArithmeticMeasureChangeComponent,
        ArithmeticMeasureSumComponent,
        ArithmeticMeasureMultiplicationComponent,
        ArithmeticMeasureDrillingComponent,
        AttributeFilterComponent,
        AttributeFilterExampleComponent,
        NewAttributeFilterComponent,
        AttributeFilterDefinitionByURIComponent,
        BarchartConfigComponent,
        DualAxisColumnChartComponent,
        DualAxisBarChartComponent,
        ColumnChartConfigComponent,
        PieChartWithColorMappingComponent,
        DateFilterConfigComponent,
        DateFilterConfigExampleComponent,
        DateFilterVisComponent,
        DatePickerComponent,
        MonthPickerComponent,
        TableDrillExampleComponent,
        DrillWithExternalDataComponent,
        BarChartExportExampleComponent,
        HeadlineExportExampleComponent,
        PivotTableExportExampleComponent,
        TableExportExampleComponent,
        VisualizationColumnChartExportExampleComponent,
        MeasureValueFilterExamplesComponent,
        MeasureValueFilterShownInPercentComponent,
        MeasureValueFilterStackTo100PercentComponent,
        MeasureValueFilterFormattedInPercentComponent,
        GlobalFiltersExampleComponent,
        MeasureValueFilterDropdownComponent,
        MeasureValueFilterRatioDropdownComponent,
        MeasureValueFilterPercentDropdownComponent,
        ParentFilterExampleComponent,
        PivotTableComponent,
        PivotTableTotalsComponent,
        PivotTableDrillExampleComponent,
        PivotTableSizingComponent,
        ResponsiveExampleComponent,
        SaveAsDashboardComponent,
        MeasureSortingExampleComponent,
        AttributeSortingExampleComponent,
        DynamicSortingComponent,
        SamePeriodColumnChartExampleComponent,
        PreviousPeriodColumnChartExampleComponent,
        PreviousPeriodHeadLineExampleComponent,
        VisualizationAreaChartComponent,
        VisualizationTableComponent,
        VisualizationBarChartComponent,
        VisualizationColumnChartComponent,
        VisualizationLineChartComponent,
        VisualizationTreemapByIdentifierComponent,
        VisualizationHeatmapByIdentifierComponent,
        VisualizationPieChartByIdentifierComponent,
        VisualizationDonutChartByIdentifierComponent,
        VisualizationBulletChartByIdentifierComponent,
        VisualizationAreaChartByUriComponent,
        VisualizationColumnChartByUriComponent,
        VisualizationLineChartByUriComponent,
        VisualizationHeadlineByUriComponent,
        VisualizationBubbleChartByUriComponent,
        VisualizationScatterPlotByUriComponent,
        VisualizationPieChartByUriComponent,
        VisualizationDonutChartByUriComponent,
        VisualizationBulletChartByUriComponent,
        DynamicMeasureComponent,
        AttributeElementComponent,
        MeasureValueFilterComponentExampleComponent,
        MeasureValueFilterComponentPercentageExampleComponent,
        MeasureValueFilterComponentShowInPercentComponent,
        VisualizationHasMvfComponent,
        CombineAttributeWithMeasureFilterComponent,
        CombineDateAndAttributeWithMeasureFilterComponent,
        CombineDateWithMeasureFilterComponent,
        CombineAttributeWithMeasureFilterComponentComponent,
        CombineDateWithMeasureFilterComponentComponent ,
        CombineDateAndAttributeWithMeasureFilterComponentComponent

    ]
})

export class AppModule { }
