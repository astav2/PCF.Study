import * as React from "react";
import {useState} from 'react';
import { IInputs, IOutputs } from "../generated/ManifestTypes";
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection, IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { useBoolean, useId } from '@fluentui/react-hooks';
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Link, IIconProps } from '@fluentui/react';
import { IconButton } from "office-ui-fabric-react"
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';;
import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
export interface IDetailsListBasicExampleItem {
    key: number;
    name: string;
    value: number;
}

export interface IDetailsListBasicExampleState {
    items: any;
}



export class DetailsListGrid extends React.Component<
    any,
    IDetailsListBasicExampleState
> {

    private _selection: Selection;

    
    private _allItems: any = this.props.pageRows;

    private _columns: any = this.props.mappedcolumns;

    public _pcfContext = this.props.pcfContext;

    private _allSelectedCards: any = [];

    constructor(props: {}) {

        super(props);
       
        this._selection = new Selection({

            onSelectionChanged: () => {

                // @ts-ignore

                this.onRowSelection(this._selection._anchoredIndex);

            }

        });

        // Populate with items for demos.

        this.state = {

            items: this._allItems

        };

    }

    public render(): JSX.Element {

        const { items } = this.state;

        return (

            <Fabric>

                <MarqueeSelection selection={this._selection}>

                    <DetailsList
                        items={items}
                        columns={this._columns}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="Row checkbox"
                        onItemInvoked={this._onItemInvoked}
                        onRenderItemColumn={this._onRenderItemColumn.bind(this)}
                    />

                </MarqueeSelection>

            </Fabric>

        );

    }


    private onRowSelection = (rowIndex: number) => {

        let functionName: string = "onRowSelection";

        let selectedRowId: string;

        let selectedCardIndex: number;

        try {

            selectedRowId = this.props.pageRows[rowIndex].key;

            // check if selected row is alrady seelected

            selectedCardIndex = this._allSelectedCards.findIndex((element: any) => {

                return element == selectedRowId;

            });

            // if card is already clicked remove card id

            if (selectedCardIndex >= 0) {

                this._allSelectedCards.splice(selectedCardIndex, 1);

            } else {

                // store all selected card in array

                this._allSelectedCards.push(selectedRowId);

            }

            // update ribbon bar

            this._pcfContext.parameters.sampleDataSet.setSelectedRecordIds(

                this._allSelectedCards

            );

        } catch (error) {

            console.log(functionName + "" + error);

        }

    };



    private _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {

        // function to open entity record

        this.openEntityRecord(item.key);

    };



    private openEntityRecord(recordID: any): void {

        let functionName: string = "onCardDoubleClick";

        try {

            if (recordID != null || recordID != undefined) {

                let entityreference = this._pcfContext.parameters.sampleDataSet.records[

                    recordID

                ].getNamedReference();

                let entityFormOptions = {

                    entityName: entityreference.LogicalName,

                    entityId: entityreference.id

                };

                /** Using navigation method */

                this._pcfContext.navigation
                    .openForm(entityFormOptions)
                    .then((success: any) => {
                        console.log(success);
                    })

                    .catch((error: any) => {

                        console.log(error);

                    });

            }

        } catch (error) {

            console.log(functionName + "" + error);

        }

    };
    private  _onRenderItemColumn(item: any, index: number | any, column: IColumn | any): JSX.Element {
        console.log(item);
        if (column.fieldName === 'Expand') {
            var buttonId = useId();   
            return (<div>
                {
                    <TeachingBubbleBasicExample buttonid={buttonId}
                    pcfContext={this._pcfContext}
                    id={item.key}
                    />
                }
            </div>);
           
        }
        return item[column.fieldName];
    };

  

    private getData = (key:string):any => {         
        var req = new XMLHttpRequest();
            req.open("GET",  `https://org49252038.crm.dynamics.com/api/data/v9.2/accounts(${key})?$select=name,accountnumber,address1_composite`, false);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Prefer", "odata.include-annotations=*");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var result = JSON.parse(this.response);
                        console.log(result);
                        // Columns
                        var accountid = result["accountid"]; // Guid
                        var name = result["name"]; // Text
                        var accountnumber = result["accountnumber"]; // Text
                        var address1_composite = result["address1_composite"]; // Multiline Text
                     var   itemdetail = { accountid: accountid, name: name, accountnumber: accountnumber, address1_composite: address1_composite };
                     return itemdetail;
                      
                    } else {
                        console.log(this.responseText);
                    }
                }
            };
            req.send();          
    }


}



const TeachingBubbleBasicExample = (props: any): JSX.Element => {
    const buttonId: string = props.buttonid;
    const id= props.id;
    let _pcfContext:ComponentFramework.Context<IInputs> = props.pcfContext;
   // const { accountid, name, accountnumber, address1_composite } =props.details;
    //  { accountid: "abc", name: "abc", accountnumber: "abc", address1_composite: "abc" };
    var   itemdetail ={};
    const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);
    const [data, setData]= useState({accountid: "", name: "", accountnumber: "", address1_composite: ""});
    const [showBubble, setShowBubble]= useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr]=useState('');
    const onClose= ()=>setShowBubble(!showBubble);
    const handleClick:any=async ()=>{
        setIsLoading(true);
        try{
           var result= await _pcfContext.webAPI.retrieveRecord("account",id, "?$select=name,accountnumber,address1_composite")
           var accountid = result["accountid"]; // Guid
           var name = result["name"]; // Text
           var accountnumber = result["accountnumber"]; // Text
           var address1_composite = result["address1_composite"]; // Multiline Text
           var   itemdetail = { accountid: accountid, name: name, accountnumber: accountnumber, address1_composite: address1_composite };
          // var   itemdetail =  { accountid: "abc", name: "abc", accountnumber: "abc", address1_composite: "abc" };
           setData(itemdetail);
           setShowBubble(true);
        }
        catch (err:any) {
            setErr(err.message);
          } finally {
            setIsLoading(false);
          }
    }
    return (
        <div>
            <DefaultButton
                id={buttonId}
                onClick={handleClick}
                text={teachingBubbleVisible ? 'Hide Details' : 'Show Details'}
            />

            {!isLoading && showBubble && (
                <TeachingBubble
                    target={`#${buttonId}`}
                    onDismiss={onClose}
                    headline="Account Details"
                    hasCloseButton={true}
                    closeButtonAriaLabel="Close"
                >

                    <label>Id :{data.accountid}</label><br />
                    <label>Name :{data.name}</label><br />
                    <label>Account Number :{data.accountnumber}</label><br />
                    <label>Address :{data.address1_composite}</label><br />

                </TeachingBubble>
            )}
        </div>
    );
};

