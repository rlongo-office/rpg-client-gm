import * as React from 'react'

interface colSortObj {
    col:boolean,
    dir:number
  }

interface AnyObject {
    [key: string]: any
  }

interface headerConfig{
    row:AnyObject,
    colSortState:{col:boolean,dir:number}[]
    sortColumn: Function
}

interface eProps{
    className:string,
    key:string,
    onchange:Function
}

function HeaderRow(
config: headerConfig
)
{

    const [colSortArray, setColSortArray] = React.useState<colSortObj[]>([]);
    
    const sortTable=(event: any)=>{
        const columnKey = event.target.innerText.slice(0,-2)
        const columnID = parseInt(event.target.id)
        config.sortColumn(columnKey,columnID)

    }

    const renderHeader = ()=> {
        if (config.row!=null){  //The passed object will be null on the first render 
            let ascChar = " ˄"
            let descChar = " ˅"
            let content: JSX.Element[]=[];

            let colID = 0
            const columns = Object.keys(config.row);
            columns.forEach((key)=>{
                        let colText = key
                        let elProps:AnyObject = {className:"cellStyle",key:`cell-${key}`,id:`${colID}`}
                        if (config.colSortState[colID].col) {
                            elProps["onClick"] = sortTable
                            //colText += colSortArray[colID].dir > 0 ? ascChar : descChar
                        }
                        colText += config.colSortState[colID].dir > 0 ? ascChar : descChar
                        let spanEL = React.createElement("span",elProps,colText)
                        content.push( 
                            spanEL
                            )
                        colID += 1
                    })
            return content;
        }
    }

    React.useEffect(()=> {
    },[])

    React.useEffect(()=> {
        setColSortArray(config.colSortState)
    },[config.colSortState])

    return (
        <div id="header-row" className="headerRow rowStyle">  
            {renderHeader()}
        </div> 
    )
}

export default HeaderRow;