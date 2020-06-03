import { Component, OnInit } from '@angular/core';
import { CombineAttributeWithMeasureFilterComponentComponent } from '../../components/combine-attribute-with-measure-filter-component/combine-attribute-with-measure-filter-component.component';
import  CombineAttributeWithMeasureFilterComponentComponentSRC  from '!!raw-loader!../../components/combine-attribute-with-measure-filter-component/combine-attribute-with-measure-filter-component.component.ts';
import  CombineAttributeWithMeasureFilterComponentComponentHTML  from '!!raw-loader!../../components/combine-attribute-with-measure-filter-component/combine-attribute-with-measure-filter-component.component.html';
import  CombineAttributeWithMeasureFilterComponentComponentCSS  from '!!raw-loader!../../components/combine-attribute-with-measure-filter-component/combine-attribute-with-measure-filter-component.component.css';

import { CombineDateWithMeasureFilterComponentComponent } from '../../components/combine-date-with-measure-filter-component/combine-date-with-measure-filter-component.component';
import  CombineDateWithMeasureFilterComponentComponentSRC  from '!!raw-loader!../../components/combine-date-with-measure-filter-component/combine-date-with-measure-filter-component.component.ts';
import  CombineDateWithMeasureFilterComponentComponentHTML  from '!!raw-loader!../../components/combine-date-with-measure-filter-component/combine-date-with-measure-filter-component.component.html';
import  CombineDateWithMeasureFilterComponentComponentCSS  from '!!raw-loader!../../components/combine-date-with-measure-filter-component/combine-date-with-measure-filter-component.component.css';

import { CombineDateAndAttributeWithMeasureFilterComponentComponent } from '../../components/combine-date-and-attribute-with-measure-filter-component/combine-date-and-attribute-with-measure-filter-component.component';
import  CombineDateAndAttributeWithMeasureFilterComponentComponentSRC  from '!!raw-loader!../../components/combine-date-and-attribute-with-measure-filter-component/combine-date-and-attribute-with-measure-filter-component.component.ts';
import  CombineDateAndAttributeWithMeasureFilterComponentComponentHTML  from '!!raw-loader!../../components/combine-date-and-attribute-with-measure-filter-component/combine-date-and-attribute-with-measure-filter-component.component.html';
import  CombineDateAndAttributeWithMeasureFilterComponentComponentCSS  from '!!raw-loader!../../components/combine-date-and-attribute-with-measure-filter-component/combine-date-and-attribute-with-measure-filter-component.component.css';


@Component({
  selector: 'app-combine-filter-component-examples',
  templateUrl: './combine-filter-component-examples.component.html',
  styleUrls: ['./combine-filter-component-examples.component.css']
})
export class CombineFilterComponentExamplesComponent implements OnInit {
  constructor() { }

  combineFilterComponentArray = [
    {
      title: 'Attribute and Measure Value Filter Component',
      content: [
        'Combine Filter with Attribute Filter and Measure Value Filter Component'
      ],
      for: CombineAttributeWithMeasureFilterComponentComponent,
      ts: CombineAttributeWithMeasureFilterComponentComponentSRC,
      html: CombineAttributeWithMeasureFilterComponentComponentHTML,
      css: CombineAttributeWithMeasureFilterComponentComponentCSS
    },
    {
      title: 'Date and Measure Value Filter Component',
      content: [
        'Combine Filter with Date Filter and Measure Value Filter Component'
      ],
      for: CombineDateWithMeasureFilterComponentComponent,
      ts: CombineDateWithMeasureFilterComponentComponentSRC,
      html: CombineDateWithMeasureFilterComponentComponentHTML,
      css: CombineDateWithMeasureFilterComponentComponentCSS
    },
    {
      title: 'Date, Attribute and Measure Value Filter Component',
      content: [
        'Combine Filter with Date Filter, Attribute Filter and Measure Value Filter Component'
      ],
      for: CombineDateAndAttributeWithMeasureFilterComponentComponent,
      ts: CombineDateAndAttributeWithMeasureFilterComponentComponentSRC,
      html: CombineDateAndAttributeWithMeasureFilterComponentComponentHTML,
      css: CombineDateAndAttributeWithMeasureFilterComponentComponentCSS
    },
  ]
  ngOnInit() {
  }

}
