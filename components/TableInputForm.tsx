import * as React from 'react'
import creatures from '../data/collections/creatures.json'
import {iterateObjEntries,getObjValue} from '../components/DataTable/TableBody/utils'

function TableInputForm(
    {
    }
) {

    const [currentRecord, setCurrentRecord] = React.useState<Object>([]);

    const renderKeyInputs = (parent:string,level:number,key:string,value:any)=>{
        const spacer = "●"
        let colID:string = ""
    }

    const renderInputForm =()=>{
        let content: JSX.Element[] = []
        const inputObj = creatures[0]
        let inputLabels:Array<string> = []
        iterateObjEntries("",inputObj,inputLabels)
        //Get array of paths to all entries in Object
        //Iterate through each path
        let idCount = 0
        inputLabels.forEach((attr:string)=>{
            let labelProps:Object = {key:`label-${attr}-${idCount}`} //id:`${attr}-${idCount}`}
            //let inputProps:Object = {key:`input-${attr}-${idCount}`} //,id:`${attr}`}
            console.log(attr)
            let labelEL = React.createElement("span",labelProps,attr)
            content.push(labelEL)
            //let inputEL = React.createElement("input",inputProps,getObjValue(inputObj,attr,"none"))
            let inputEl = React.createElement('input', { placeholder: getObjValue(inputObj,attr,"none"), type: 'text', autoFocus: true }); 
            content.push(inputEl)
            //console.log(attr + getObjValue(inputObj,attr,"none"))
        })
        return content;
    }
    
    React.useEffect(()=>{
        setCurrentRecord(creatures[0])
    },[])


    return (
      <div className="InputPage">
         {renderInputForm()}
      </div>  
    );
}

export default TableInputForm;