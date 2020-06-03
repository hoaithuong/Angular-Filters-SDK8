import { Component, OnInit } from '@angular/core';
import { AttributeFilterComponent } from '../../components/attribute-filter/attribute-filter.component';
import  AttributeFilterComponentSRC  from '!!raw-loader!../../components/attribute-filter/attribute-filter.component.ts';
import  AttributeFilterComponentHTML  from '!!raw-loader!../../components/attribute-filter/attribute-filter.component.html';
import  AttributeFilterComponentCSS  from '!!raw-loader!../../components/attribute-filter/attribute-filter.component.css';

import { AttributeFilterExampleComponent } from '../../components/attribute-filter-example/attribute-filter-example.component';
import  AttributeFilterExampleComponentSRC  from '!!raw-loader!../../components/attribute-filter-example/attribute-filter-example.component.ts';
import  AttributeFilterExampleComponentHTML  from '!!raw-loader!../../components/attribute-filter-example/attribute-filter-example.component.html';
import  AttributeFilterExampleComponentCSS  from '!!raw-loader!../../components/attribute-filter-example/attribute-filter-example.component.css';

import { NewAttributeFilterComponent } from '../../components/new-attribute-filter/new-attribute-filter.component';
import  NewAttributeFilterComponentSRC  from '!!raw-loader!../../components/new-attribute-filter/new-attribute-filter.component.ts';
import  NewAttributeFilterComponentHTML  from '!!raw-loader!../../components/new-attribute-filter/new-attribute-filter.component.html';
import  NewAttributeFilterComponentCSS  from '!!raw-loader!../../components/new-attribute-filter/new-attribute-filter.component.css';

import { AttributeFilterDefinitionByURIComponent } from '../../components/attribute-filter-definition-by-uri/attribute-filter-definition-by-uri.component';
import  AttributeFilterDefinitionByURIComponentSRC  from '!!raw-loader!../../components/attribute-filter-definition-by-uri/attribute-filter-definition-by-uri.component.ts';
import  AttributeFilterDefinitionByURIComponentHTML  from '!!raw-loader!../../components/attribute-filter-definition-by-uri/attribute-filter-definition-by-uri.component.html';
import  AttributeFilterDefinitionByURIComponentCSS  from '!!raw-loader!../../components/attribute-filter-definition-by-uri/attribute-filter-definition-by-uri.component.css';

import { AttributeElementComponent } from '../../components/attribute-element/attribute-element.component';
import  AttributeElementComponentSRC  from '!!raw-loader!../../components/attribute-element/attribute-element.component.ts';
import  AttributeElementComponentHTML  from '!!raw-loader!../../components/attribute-element/attribute-element.component.html';
import  AttributeElementComponentCSS  from '!!raw-loader!../../components/attribute-element/attribute-element.component.css';

@Component({
  selector: 'app-attribute-filter-components',
  templateUrl: './attribut-filter-components.component.html',
  styleUrls: ['./attribut-filter-components.component.css']
})

export class AttributeFilterComponentsComponent implements OnInit {
  constructor() { }

  attributeFilterComponentArray = [
    {
      title: 'Attribute Filter',
      description: [
        `You can render a styled dropdown with selectable attribute values using this Attribute Filter
        component.
        Pass a custom onApply function to this component to handle what happens when the user clicks the
        Apply button.`
      ],
      for: AttributeFilterComponent,
      ts: AttributeFilterComponentSRC,
      html: AttributeFilterComponentHTML,
      css: AttributeFilterComponentCSS
    },
    {
      title: 'Attribute Filter Example',
      description: [
        'This example shows how to add attribute filter component into a report.'
      ],
      for: AttributeFilterExampleComponent,
      ts: AttributeFilterExampleComponentSRC,
      html: AttributeFilterExampleComponentHTML,
      css: AttributeFilterExampleComponentCSS
    },
    {
      title: 'Attribute filter example using new onApplyWithFilterDefinition',
      description: [],
      for: NewAttributeFilterComponent,
      ts: NewAttributeFilterComponentSRC,
      html: NewAttributeFilterComponentHTML,
      css: NewAttributeFilterComponentCSS
    },
    // {
    //   title: 'Attribute filter example defined by filter definition, including selection',
    //   description: [],
    //   for: AttributeFilterDefinitionByURIComponent,
    //   ts: AttributeFilterDefinitionByURIComponentSRC,
    //   html: AttributeFilterDefinitionByURIComponentHTML,
    //   css: AttributeFilterDefinitionByURIComponentCSS
    // },
    {
      title: 'Custom Attribute Filter using Attribute Elements component',
      description: [
        `Pass a custom children function to this component to render the returned data using your custom components.`,
        `The children function will receive isLoading state, possible error state, attribute metadata, paging, attribute values and a loadMore function.`
      ],
      for: AttributeElementComponent,
      ts: AttributeElementComponentSRC,
      html: AttributeElementComponentHTML,
      css: AttributeElementComponentCSS
    }
  ]

  ngOnInit() {
  }
}
