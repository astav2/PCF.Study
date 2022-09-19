import * as React from "react";
import {
  Stack,
  ScrollablePane,
  DetailsList,
  TooltipHost,
  IRenderFunction,
  IDetailsColumnRenderTooltipProps,
  IDetailsHeaderProps,
  StickyPositionType,
  Sticky,
  ScrollbarVisibility,
} from "@fluentui/react";
import {IInputs, IOutputs} from "../generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
export interface appProps{
    pcfContext:ComponentFramework.Context<IInputs>
}
export class DatasetLayout extends React.Component<appProps,{dataSet:[]}> {
    constructor(props:appProps)
    {
        super(props);
        
    }

    public getAllPageRecords(columnsOnView: DataSetInterfaces.Column[],
        gridParam: DataSet) {
        let functionName = 'loadPagingRecords';
        let pagingDataRows: any = [];
        let currentPageRecordsID = gridParam.sortedRecordIds;
        try {

            for (const pointer in currentPageRecordsID) {
                pagingDataRows[pointer] = {}
                pagingDataRows[pointer]["key"] = currentPageRecordsID[pointer];
                columnsOnView.forEach((columnItem: any, index) => {
                    pagingDataRows[pointer][columnItem.name] = gridParam.records[currentPageRecordsID[pointer]].getFormattedValue(columnItem.name);

                });

            }

        } catch (error) {

            console.log(functionName + "" + error);

        }
        return pagingDataRows;
    }
  private onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (props, defaultRender) => {
    if (!props) {
      return null;
    }
    const onRenderColumnHeaderTooltip: IRenderFunction<IDetailsColumnRenderTooltipProps> = tooltipHostProps => (
      <TooltipHost {...tooltipHostProps} />
    );
    return (
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
        {defaultRender!({
          ...props,
          onRenderColumnHeaderTooltip,
        })}
      </Sticky>
    );
  };
  private columns = [
    {
      key: "name",
      name: "Name",
      isResizable: true,
      minWidth: 100,
      onRender: (item: string) => {
        return <span>{item}</span>;
      },
    },
  ];
  render() {
    let columnsOnView = this.props.pcfContext.parameters.sampleDataSet.columns;
 
    let pageRows = this.getAllPageRecords(columnsOnView, this.props.pcfContext.parameters.sampleDataSet)
    return (
      <>
        <Stack horizontal styles={{ root: { height: "100%" } }}>
          <Stack.Item>
            {/*Left column*/}
            <Stack verticalFill>
              <Stack.Item
                verticalFill
                styles={{
                  root: {
                    textAlign: "left",
                    width: "150px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "100%",
                    background: "#DBADB1",
                  },
                }}
              >
                <Stack>
                  <Stack.Item>Left Item 1</Stack.Item>
                  <Stack.Item>Left Item 2</Stack.Item>
                </Stack>
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item styles={{ root: { width: "100%" } }}>
            {/*Right column*/}
            <Stack
              grow
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                },
              }}
            >
              <Stack.Item verticalFill>
                <Stack
                  grow
                  styles={{
                    root: {
                      height: "100%",
                      width: "100%",
                      background: "#65A3DB",
                    },
                  }}
                >
                  <Stack.Item>Top Bar</Stack.Item>
                  <Stack.Item
                    verticalFill
                    styles={{
                      root: {
                        height: "100%",
                        overflowY: "auto",
                        overflowX: "auto",
                      },
                    }}
                  >
                    <div style={{ position: "relative", height: "100%" }}>
                      <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
                        <DetailsList
                          onRenderDetailsHeader={this.onRenderDetailsHeader}
                          compact={true}
                          items={pageRows}
                          columns={this.columns}
                        ></DetailsList>
                      </ScrollablePane>
                    </div>
                  </Stack.Item>
                  <Stack.Item align="center">Footer</Stack.Item>
                </Stack>
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </>
    );
  }
}