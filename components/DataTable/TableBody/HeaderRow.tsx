import * as React from 'react'


interface AnyObject {
    [key: string]: any
  }
interface headerConfig{
    row:AnyObject,
    colSortState:{col:number,dir:number}[]
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

    const sortColumn = (col:boolean,dir:number)=>{
        console.log(dir)
    }
    const renderHeader = ()=> {
        if (config.row!=null){  //The passed object will be null on the first render 
            let ascChar = "˄"
            let descChar = "˅"
            let content: JSX.Element[]=[];

            let colID = 0
            const columns = Object.keys(config.row);
            columns.forEach((key)=>{
                        let elProps:AnyObject = {className:"cellStyle",key:`cell-${key}`}
                        if (config.colSortState[colID].col) {
                            elProps["onChange"] = sortColumn 
                        }
                        let spanEL = React.createElement("span",elProps,key)
                        content.push( 
                            spanEL
                            )
                        colID += 1
                    })
            return content;
        }
    }

    React.useEffect(()=> {
        console.log(config.colSortState)
    },[])

    return (
        <div id="header-row" className="headerRow rowStyle">  
            {renderHeader()}
        </div> 
    )
}

export default HeaderRow;