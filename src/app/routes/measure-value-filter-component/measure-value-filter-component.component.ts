import { Component, OnInit } from '@angular/core';
import { MeasureValueFilterDropdownComponent } from '../../components/measure-value-filter-dropdown/measure-value-filter-dropdown.component';
import  MeasureValueFilterDropdownComponentSRC  from '!!raw-loader!../../components/measure-value-filter-dropdown/measure-value-filter-dropdown.component.ts';
import  MeasureValueFilterDropdownComponentHTML  from '!!raw-loader!../../components/measure-value-filter-dropdown/measure-value-filter-dropdown.component.html';
import  MeasureValueFilterDropdownComponentCSS  from '!!raw-loader!../../components/measure-value-filter-dropdown/measure-value-filter-dropdown.component.css';

import { MeasureValueFilterComponentExampleComponent } from '../../components/measure-value-filter-component-example/measure-value-filter-component-example.component';
import  MeasureValueFilterComponentExampleComponentSRC  from '!!raw-loader!../../components/measure-value-filter-component-example/measure-value-filter-component-example.component.ts';
import  MeasureValueFilterComponentExampleComponentHTML  from '!!raw-loader!../../components/measure-value-filter-component-example/measure-value-filter-component-example.component.html';
import  MeasureValueFilterComponentExampleComponentCSS  from '!!raw-loader!../../components/measure-value-filter-component-example/measure-value-filter-component-example.component.css';

import { MeasureValueFilterComponentPercentageExampleComponent } from '../../components/measure-value-filter-component-percentage-example/measure-value-filter-component-percentage-example.component';
import  MeasureValueFilterComponentPercentageExampleComponentSRC  from '!!raw-loader!../../components/measure-value-filter-component-percentage-example/measure-value-filter-component-percentage-example.component.ts';
import  MeasureValueFilterComponentPercentageExampleComponentHTML  from '!!raw-loader!../../components/measure-value-filter-component-percentage-example/measure-value-filter-component-percentage-example.component.html';
import  MeasureValueFilterComponentPercentageExampleComponentCSS  from '!!raw-loader!../../components/measure-value-filter-component-percentage-example/measure-value-filter-component-percentage-example.component.css';

import { MeasureValueFilterComponentShowInPercentComponent } from '../../components/measure-value-filter-component-show-in-percent/measure-value-filter-component-show-in-percent.component';
import  MeasureValueFilterComponentShowInPercentComponentSRC  from '!!raw-loader!../../components/measure-value-filter-component-show-in-percent/measure-value-filter-component-show-in-percent.component.ts';
import  MeasureValueFilterComponentShowInPercentComponentHTML  from '!!raw-loader!../../components/measure-value-filter-component-show-in-percent/measure-value-filter-component-show-in-percent.component.html';
import  MeasureValueFilterComponentShowInPercentComponentCSS  from '!!raw-loader!../../components/measure-value-filter-component-show-in-percent/measure-value-filter-component-show-in-percent.component.css';

import { VisualizationHasMvfComponent } from '../../visualizations/visualization-has-mvf/visualization-has-mvf.component'
import  VisualizationHasMfvComponentSRC  from '!!raw-loader!../../visualizations/visualization-has-mvf/visualization-has-mvf.component.ts';
import  VisualizationHasMfvComponentHTML  from '!!raw-loader!../../visualizations/visualization-has-mvf/visualization-has-mvf.component.html';
import  VisualizationHasMfvComponentCSS  from '!!raw-loader!../../visualizations/visualization-has-mvf/visualization-has-mvf.component.css';

@Component({
  selector: 'app-measure-value-filter-component',
  templateUrl: './measure-value-filter-component.component.html',
  styleUrls: ['./measure-value-filter-component.component.css']
})
export class MeasureValueFilterComponentComponent implements OnInit {

  measureValueFilterComponentArray = [
    {
      content: 'The example below shows general usage of the component for managing the measure value filter.',
      for: MeasureValueFilterComponentExampleComponent,
      ts: MeasureValueFilterComponentExampleComponentSRC,
      html: MeasureValueFilterComponentExampleComponentHTML,
      css: MeasureValueFilterComponentExampleComponentCSS
    },
    {
      content: 'This example shows the component for setting up a measure value filter with a measure formatted as a percentage.',
      for: MeasureValueFilterComponentPercentageExampleComponent,
      ts: MeasureValueFilterComponentPercentageExampleComponentSRC,
      html:MeasureValueFilterComponentPercentageExampleComponentHTML,
      css: MeasureValueFilterComponentPercentageExampleComponentCSS
    },
    {
      content: 'This example shows the component for setting up a measure value filter with a measure shown as a percentage.',
      for: MeasureValueFilterComponentShowInPercentComponent,
      ts: MeasureValueFilterComponentShowInPercentComponentSRC,
      html:MeasureValueFilterComponentShowInPercentComponentHTML,
      css: MeasureValueFilterComponentShowInPercentComponentCSS
    },
    // {
    //   content: 'This example shows the visualization for setting up a measure value filter.',
    //   for: VisualizationHasMvfComponent,
    //   ts: VisualizationHasMfvComponentSRC,
    //   html:VisualizationHasMfvComponentHTML,
    //   css: VisualizationHasMfvComponentCSS
    // }
  ];

  measureValueFilterCustomArray = [
    {
      content: 'Following example shows the dropdown component to be handled on your own using a custom button.      ',
      for: MeasureValueFilterDropdownComponent,
      ts: MeasureValueFilterDropdownComponentSRC,
      html: MeasureValueFilterDropdownComponentHTML,
      css: MeasureValueFilterDropdownComponentCSS
    },
  ];

  ngOnInit() {
  }
}
