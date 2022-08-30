import * as React from "react";
import { useState } from 'react';
import { IInputs, IOutputs } from "../generated/ManifestTypes";
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection, IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { useBoolean, useId } from '@fluentui/react-hooks';
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { IIconProps } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric-react';

export interface IDetailsListBasicExampleItem {
    key: number;
    name: string;
    value: number;
}

export interface IDetailsListBasicExampleState {
    items: any;
}

//const emojiIcon: IIconProps = { iconName: 'CaretRightSolid8' };

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
            <>
                <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}  >
                <h1 style={{textAlign:'center'}}>Single Landing Page PCF Grid</h1>
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
                {/* <h1>The Single Landing Page</h1> */}
                </ScrollablePane>
            </>
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
    private _onRenderItemColumn(item: any, index: number | any, column: IColumn | any): JSX.Element {
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


}



const TeachingBubbleBasicExample = (props: any): JSX.Element => {
    const buttonId: string = props.buttonid;
    const id = props.id;
    let _pcfContext: ComponentFramework.Context<IInputs> = props.pcfContext;
    // const { accountid, name, accountnumber, address1_composite } =props.details;
    //  { accountid: "abc", name: "abc", accountnumber: "abc", address1_composite: "abc" };
    var itemdetail = {};
    const _getBubbleStyles = () => {
        return {
            closeButton: {
                color: 'red',
                selectors: {
                    ':hover': {
                        background: 'gainsboro',
                        color: 'red'
                    },
                    ':active': {
                        background: 'darkGray',
                        color: 'red'
                    }
                }
            },
            content: {
                border: '1px solid black',
                background: 'white',
            },
            headline: {
                color: 'black'
            },
            subText: {
                color: 'black'
            }
        }
    }
    const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);
    const [data, setData] = useState({ accountid: "", name: "", accountnumber: "", address1_composite: "" });
    const [showBubble, setShowBubble] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [_iconname, setIconName] = useState(_pcfContext.parameters.icon.raw?.toLocaleLowerCase().includes('val') ? "Settings" : _pcfContext.parameters.icon.raw?.toString());
    const [err, setErr] = useState('');
    const onClose = () => setShowBubble(!showBubble);
    const handleClicktest: any = () => {
        var itemdetail = { accountid: "abc", name: "abc", accountnumber: "abc", address1_composite: "abc" };
        setData(itemdetail);
        setShowBubble(true);
    }
    const handleClick: any = async () => {
        setIsLoading(true);
        try {
            var result = await _pcfContext.webAPI.retrieveRecord("account", id, "?$select=name,accountnumber,address1_composite")
            var accountid = result["accountid"]; // Guid
            var name = result["name"]; // Text
            var accountnumber = result["accountnumber"]; // Text
            var address1_composite = result["address1_composite"]; // Multiline Text
            var itemdetail = { accountid: accountid, name: name, accountnumber: accountnumber, address1_composite: address1_composite };
            // var   itemdetail =  { accountid: "abc", name: "abc", accountnumber: "abc", address1_composite: "abc" };
            setData(itemdetail);
            setShowBubble(true);
        }
        catch (err: any) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div>
            {/* <DefaultButton
                id={buttonId}
                onClick={handleClick}
                text={showBubble ? 'Hide Details' : 'Show Details'}
            /> */}
            <IconButton iconProps={{ iconName: _iconname }}
                title={showBubble ? 'Hide Details' : 'Show Details'}
                ariaLabel={showBubble ? 'Hide Details' : 'Show Details'}
                onClick={handleClick}
                id={buttonId}
                checked={showBubble} />
            {!isLoading && showBubble && (
                <TeachingBubble
                    target={`#${buttonId}`}
                    onDismiss={onClose}
                    headline={`${data.name} Details`}
                    hasCloseButton={true}
                    closeButtonAriaLabel="Close"
                    styles={_getBubbleStyles}
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

