import {IInputs, IOutputs} from "./generated/ManifestTypes";
import {DataGrid,IDataGridProps,TaskDetails} from './Components/DataGrid';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ErrorBoundary} from './Components/ErrorBoundaries'
export class MyTaskList implements ComponentFramework.StandardControl<IInputs, IOutputs> {

   private _container:HTMLDivElement;
   private _context:ComponentFramework.Context<IInputs>; 
   private _props:IDataGridProps={
       context: undefined,
       getTaskDetails: function (): Promise<TaskDetails[]> {
           throw new Error("Function not implemented.");
       }
   }
    constructor()
    {

    }

 
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        // Add control initialization code
        this._container= container;
        this._props.getTaskDetails=this.getTasks.bind(this);
        this._props.context=this._context=context;
        
    }


   
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
        ReactDOM.render(React.createElement(DataGrid,this._props),this._container);


    }

   
    public getOutputs(): IOutputs
    {
        return {};
    }

    
    public destroy(): void
    {
        ReactDOM.unmountComponentAtNode(this._container);
    }

    private async getTasks():Promise<TaskDetails[]>{
        console.log('getTasks called');
        let TaskDetails:TaskDetails[]=[];
      const results:any=  await this._context.webAPI.retrieveMultipleRecords("task", "?$select=scheduledend,scheduledstart,subject");
      console.log(results);
      debugger;
      results.entities.forEach((result: { [x: string]: any; }) => {
            TaskDetails.push({
                subject:result["subject"],
                duedate:result["scheduledend@OData.Community.Display.V1.FormattedValue"],
                startdate:result["scheduledstart@OData.Community.Display.V1.FormattedValue"]
            })
        });
                    // // Columns
                    // var activityid = result["activityid"]; // Guid
                    // var scheduledend = result["scheduledend"]; // Date Time
                    // var scheduledend_formatted = result["scheduledend@OData.Community.Display.V1.FormattedValue"];
                    // var scheduledstart = result["scheduledstart"]; // Date Time
                    // var scheduledstart_formatted = result["scheduledstart@OData.Community.Display.V1.FormattedValue"];
                    // var subject = result["subject"]; // Text
                
           
        console.log(TaskDetails);
        return TaskDetails;
    }
}
