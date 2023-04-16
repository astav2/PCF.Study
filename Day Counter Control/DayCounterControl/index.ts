import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import renderDate,{Iprops} from "./Extensions/DayCounterComponent"; 
import { ColorFormat } from "react-countdown-circle-timer";

export class DayCounterControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private value: string
    private container: HTMLDivElement
   private Notify:()=>void

    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {      
        this.Notify=notifyOutputChanged
        // const props:Iprops={
        //     context:context,
        //     endDateTime:context.parameters.EndDate.raw!.getTime(),       
        //     showHours:context.parameters.showHours.raw=="1",
        //     showMinutes:context.parameters.showMinutes.raw=="1",
        //     showSeconds:context.parameters.showSeconds.raw=="1",
        //     initialColour:context.parameters.InitialColor.raw||"#006DFF",
        //     warningColour:context.parameters.WarningColor.raw||"#EC0051" ,
        //     AlertDays:context.parameters.AlertmeDays.raw||10,
        //     NotifyOutputChanged:()=>{this.Notify()}      
        //   }
        this.container = container
        // Add control initialization code
        //this.Render(props);
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    { 
        
        const props:Iprops={
            context:context,
            endDateTime:context.parameters.EndDate.raw?.getTime()||0,       
            showHours:context.parameters.showHours.raw,
            showMinutes:context.parameters.showMinutes.raw,
            showSeconds:context.parameters.showSeconds.raw,
            initialColour:context.parameters.InitialColor.raw||"#006DFF",
            warningColour:context.parameters.WarningColor.raw||"#EC0051" ,
            AlertDays:context.parameters.AlertmeDays.raw||10,
            NotifyOutputChanged:()=>{this.Notify()} ,
            NeedAnimation:context.parameters.runAnimation.raw?? false      
          }
          this.Render(props);
          this.Notify();
        // Add code to update control view
       
    }

    private Render(props:Iprops):void
    {
        ReactDOM.render(React.createElement(renderDate,props),this.container);
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
