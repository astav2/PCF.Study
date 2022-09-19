import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class Trial implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    /**
     * Empty constructor.
     */

    constructor()
    {
        
    }

    private context: ComponentFramework.Context<IInputs>;
    private widget02: any;
    private container: HTMLDivElement;
    private gridHTML: string;
    private instanceID: string;

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public async init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): Promise<void>
    {
        // Add control initialization code
        this.context = context;
        this.widget02 = this.context.parameters.widget02Property.raw;
        const jsonStr = JSON.parse(this.widget02);
        this.instanceID = jsonStr.InstanceID;

      //  const gridHTML = '`' + this.retrieveHTML(instanceID) + '`';
        this.container = document.createElement("div");
        this.container.id = 'GridContainer';
        this.retrieveHTML=this.retrieveHTML.bind(this);
      
       // this.container.innerHTML = gridHTML;
        container.appendChild(this.container);
       
    }

    public async retrieveHTML(instanceID: string) {
        let result = await this.context.webAPI.retrieveRecord("scbslp_landingpageconfig",instanceID);
        const grid= document.getElementById('GridContainer');
        grid!.innerHTML=result.scbslp_value;
       // return result.scbslp_value;
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        this.retrieveHTML(this.instanceID);
        // Add code to update control view
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
