import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';
import { BasicComponentsComponent } from './routes/basic-components/basic-components.component';
import { PivotTableComponentsComponent } from './routes/pivot-table-components/pivot-table-components.component';
import { SortingComponentsComponent } from './routes/sorting-components/sorting-components.component';
import { TimeOverTimeComparisonComponent } from './routes/time-over-time-comparison/time-over-time-comparison.component';
import { AttributeFilterComponentsComponent } from './routes/attribut-filter-components/attribut-filter-components.component';
import { ArithmeticMeasureComponentsComponent } from './routes/arithmetic-measure-components/arithmetic-measure-components.component';
import { DrillingComponentsComponent } from './routes/drilling-components/drilling-components.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateFilterComponent } from './routes/date-filter/date-filter.component';
import { GlobalFiltersComponent } from './routes/global-filters/global-filters.component';
import { ParentFilterComponent } from './routes/parent-filter/parent-filter.component';
import { VisualizationByUriComponent } from './routes/visualization-by-uri/visualization-by-uri.component';
import { VisualizationByIdentifierComponent } from './routes/visualization-by-identifier/visualization-by-identifier.component';
import { ResponsiveChartComponent } from './routes/responsive-chart/responsive-chart.component';
import { SaveAsDashboardComponentComponent } from './routes/save-as-dashboard-component/save-as-dashboard-component.component';
import { MeasureValueFilterComponentComponent } from './routes/measure-value-filter-component/measure-value-filter-component.component';
import { FilterByMeasureValueComponent } from './routes/filter-by-measure-value/filter-by-measure-value.component';
import { ExportChartComponent } from './routes/export-chart/export-chart.component';
import { ExportHeadlineComponent } from './routes/export-headline/export-headline.component';
import { ExportPivotTableComponent } from './routes/export-pivot-table/export-pivot-table.component';
import { ExportTableComponent } from './routes/export-table/export-table.component';
import { ExportVisualizationComponent } from './routes/export-visualization/export-visualization.component';
import { DatepickerComponent } from './routes/datepicker/datepicker.component';
import { ChartConfigComponentsComponent } from './routes/chart-config-components/chart-config-components.component';
import { DynamicMeasureComponentComponent } from './routes/dynamic-measure-component/dynamic-measure-component.component';
import { CombineFilterExamplesComponent } from './routes/combine-filter-examples/combine-filter-examples.component';
import { CombineFilterComponentExamplesComponent } from './routes/combine-filter-component-examples/combine-filter-component-examples.component'


const appRoutes: Routes = [
    { path: '', component: BasicComponentsComponent , canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'pivot-table', component: PivotTableComponentsComponent },
    { path: 'sorting', component: SortingComponentsComponent },
    { path: 'time-over-time-comparison', component: TimeOverTimeComparisonComponent },
    { path: 'attribute-filter-components', component: AttributeFilterComponentsComponent },
    { path: 'drilling', component: DrillingComponentsComponent },
    { path: 'visualization/visualization-by-uri', component: VisualizationByUriComponent },
    { path: 'visualization/visualization-by-identifier', component: VisualizationByIdentifierComponent },
    { path: 'measure-value-filter/filter-by-measure-value', component: FilterByMeasureValueComponent },
    { path: 'measure-value-filter/measure-value-filter-component', component: MeasureValueFilterComponentComponent },
    { path: 'arithmetic-measures', component: ArithmeticMeasureComponentsComponent },
    { path: 'date-filter-component', component: DateFilterComponent },
    { path: 'advanced/global-filters', component: GlobalFiltersComponent},
    { path: 'advanced/parent-filter', component: ParentFilterComponent},
    { path: 'advanced/responsive', component: ResponsiveChartComponent},
    { path: 'advanced/save-as-kpi-dashboard', component: SaveAsDashboardComponentComponent},
    { path: 'advanced/chart-config-components', component: ChartConfigComponentsComponent},
    { path: 'export/chart', component: ExportChartComponent},
    { path: 'export/headline', component: ExportHeadlineComponent},
    { path: 'export/pivot-table', component: ExportPivotTableComponent},
    { path: 'export/table', component: ExportTableComponent},
    { path: 'export/visualization', component: ExportVisualizationComponent},
    { path: 'advanced/date-picker', component: DatepickerComponent},
    { path: 'advanced/dynamic-measures', component: DynamicMeasureComponentComponent},
    { path: 'combine/examples', component: CombineFilterExamplesComponent},
    { path: 'combine/component-examples', component: CombineFilterComponentExamplesComponent},


    // otherwise redirect to home
    { path: '**', redirectTo: '' }

];

// export const routing = RouterModule.forRoot(appRoutes);
@NgModule({
    imports: [RouterModule.forChild(appRoutes), CommonModule],
    exports: [RouterModule],
})
export class AppRouting { }
