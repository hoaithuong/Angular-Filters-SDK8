import { Component, OnInit } from '@angular/core';
import { DateFilterConfigComponent } from '../../components/date-filter-config/date-filter-config.component';
import  DateFilterConfigComponentSRC  from '!!raw-loader!../../components/date-filter-config/date-filter-config.component.ts';
import  DateFilterConfigComponentHTML  from '!!raw-loader!../../components/date-filter-config/date-filter-config.component.html';
import  DateFilterConfigComponentCSS  from '!!raw-loader!../../components/date-filter-config/date-filter-config.component.css';

import { DateFilterConfigExampleComponent } from '../../components/date-filter-config-example/date-filter-config-example.component';
import  DateFilterConfigExampleComponentSRC  from '!!raw-loader!../../components/date-filter-config-example/date-filter-config-example.component.ts';
import  DateFilterConfigExampleComponentHTML  from '!!raw-loader!../../components/date-filter-config-example/date-filter-config-example.component.html';
import  DateFilterConfigExampleComponentCSS  from '!!raw-loader!../../components/date-filter-config-example/date-filter-config-example.component.css';

import { DateFilterVisComponent } from '../../visualizations/visualization-date-filter/visualization-date-filter.component';
import  DateFilterVisComponentSRC  from '!!raw-loader!../../visualizations/visualization-date-filter/visualization-date-filter.component.ts';
import  DateFilterVisComponentHTML  from '!!raw-loader!../../visualizations/visualization-date-filter/visualization-date-filter.component.html';
import  DateFilterVisComponentCSS  from '!!raw-loader!../../visualizations/visualization-date-filter/visualization-date-filter.component.css';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {
  constructor() { }

  dateFilterComponentArray = [
    {
      title: 'Date Filter',
      content: [
        'This example shows a full-featured date filter component.'
      ],
      for: DateFilterConfigComponent,
      ts: DateFilterConfigComponentSRC,
      html: DateFilterConfigComponentHTML,
      css: DateFilterConfigComponentCSS
    },
    {
      title: 'Filtering a report',
      content: [
        `This example shows how to add date filter component into a report. Presets and floating range form
      is restricted to years.`
      ],
      for: DateFilterConfigExampleComponent,
      ts: DateFilterConfigExampleComponentSRC,
      html: DateFilterConfigExampleComponentHTML,
      css: DateFilterConfigExampleComponentCSS
    },
    // {
    //   title: 'Apply date filter for Visualization',
    //   content: [],
    //   for: DateFilterVisComponent,
    //   ts: DateFilterVisComponentSRC,
    //   html: DateFilterVisComponentHTML,
    //   css: DateFilterVisComponentCSS
    // }
  ]

  ngOnInit() {
  }
}
