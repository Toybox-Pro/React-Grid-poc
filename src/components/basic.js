import { LightningElement, track } from 'lwc';
import React, { Component } from 'react';
class multi
{
	// Inherit method to create base classes.
	static inherit(..._bases)
	{
		class classes {

			// The base classes
  			get base() { return _bases; }

			constructor(..._args)
			{
				var index = 0;

				for (let b of this.base) 
				{
					let obj = new b(_args[index++]);
   					multi.copy(this, obj);
				}
			}
		
		}

		// Copy over properties and methods
		for (let base of _bases) 
		{
   			multi.copy(classes, base);
   			multi.copy(classes.prototype, base.prototype);
		}

		return classes;
	}

	// Copies the properties from one class to another
	static copy(_target, _source) 
	{
    		for (let key of Reflect.ownKeys(_source)) 
			{
        		if (key !== "constructor" && key !== "prototype" && key !== "name") 
				{
	        	    let desc = Object.getOwnPropertyDescriptor(_source, key);
	        	    Object.defineProperty(_target, key, desc);
        		}
    		}
	}
}

export class LightningExampleAccordionBasic extends multi.inherit(LightningElement, Component) {
    activeSectionMessage = '';

    handleToggleSection(event) {
        this.activeSectionMessage =
            'Open section name:  ' + event.detail.openSections;
    }

    handleSetActiveSectionC() {
        const accordion = this.template.querySelector('.example-accordion');

        accordion.activeSectionName = 'C';
    }
    render() {
        return (
            <div>
                <p className="slds-text-heading_small">{this.activeSectionMessage}</p>

                <lightning-button onclick={this.handleSetActiveSectionC} label="Open Section C"></lightning-button>

                <lightning-accordion className="example-accordion"
                    onsectiontoggle={this.handleToggleSection}
                    active-section-name="B">
                    <lightning-accordion-section name="A" label="Accordion Title A">
                        <lightning-button-menu slot="actions"
                            alternative-text="Show menu"
                            icon-size="x-small"
                            menu-alignment="right">
                            <lightning-menu-item value="New" label="Menu Item One"></lightning-menu-item>
                            <lightning-menu-item value="Edit" label="Menu Item Two"></lightning-menu-item>
                        </lightning-button-menu>
                        <p>This is the content area for section A.</p>
                        <p>.</p>
                        <p>.</p>
                        <p>.</p>
                        <p>The section height expands to fit your content.</p>
                    </lightning-accordion-section>

                    <lightning-accordion-section name="B" label="Accordion Title B">
                        <p>This is the content area for section B.</p>
                        <p>.</p>
                        <p>.</p>
                        <p>.</p>
                        <p>The section height expands to fit your content.</p>
                    </lightning-accordion-section>

                    <lightning-accordion-section name="C" label="Accordion Title C">
                        <p>This is the content area for section C.</p>
                        <p>.</p>
                        <p>.</p>
                        <p>.</p>
                        <p>The section height expands to fit your content.</p>
                    </lightning-accordion-section>
                </lightning-accordion>
            </div>

        )
    }
}