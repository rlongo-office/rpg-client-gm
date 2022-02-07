import * as React from 'react'
import creatures from '../data/collections/creatures.json'
import {iterateObjEntries,getObjValue,setObjValue} from '../components/DataTable/TableBody/utils'
import { useAppContext } from '../context/AppProvider';
import {deepCopy} from '../components/DataTable/TableBody/utils'

interface AnyObject {
    [key: string]: any
  }

interface props {
    source: object
}

function TableInputForm(
  {
    source
  }:props    

) {
    let {state, dispatch} = useAppContext()

    const formRef = React.useRef(null)
    const [currentRecord, setCurrentRecord] = React.useState<object>([]);
    const [recordPaths, setRecordPaths] = React.useState<string[]>([])
    const [inputValues,setInputValues] = React.useState<object>({})

    const createActor = ()=>{
      let actor:object = deepCopy(source)
      let current:object ={}
      Object.entries(inputValues).forEach(([key,value])=>{
        setObjValue(actor,key,value)
      })
    }

    const storeInput = (event:any)=>{
      if (event.key === "Enter") {
        event.preventDefault();
        let inputUpdate:AnyObject = inputValues
        inputUpdate[event.target.id] = event.target.value
        setInputValues(inputUpdate)
        console.log(inputUpdate)
      }
      console.log(inputValues)
    }

    const renderInputForm =(record:object)=>{
        let content: JSX.Element[] = []
        let inputLabels:Array<string> = []
        iterateObjEntries("",record,inputLabels)
        let idCount = 0
        inputLabels.forEach((path:string)=>{
            let labelText = path.toUpperCase()
            let labelProps:Object = {className:"InputLabel",key:`label-${path}`} //id:`${attr}-${idCount}`}
            let inputProps:Object = {id:`${path}`,
                                    key:`input-${path}`, 
                                    placeholder: getObjValue(record,path,"none"),
                                    onKeyPress:storeInput,
                                    type: 'text',
                                    autoFocus: true } //,id:`${attr}`}
            //console.log(attr)
            let labelEL = React.createElement("span",labelProps,labelText)
            content.push(labelEL)
            //let inputEL = React.createElement("input",inputProps,getObjValue(inputObj,attr,"none"))
            let inputEl = React.createElement('input',inputProps); 
            content.push(inputEl)
            //console.log(attr + getObjValue(inputObj,attr,"none"))
        })
        return content;
    }
    
    React.useEffect(()=>{
        window.scrollTo(0, 0)
        let inputLabels:Array<string> = []
        iterateObjEntries("",source,inputLabels)
        setRecordPaths(inputLabels)   //will need this array of paths for later use
        setCurrentRecord(source)
    },[source])

    return (
      <>
      <button onClick={createActor}>Create Actor</button>
      <div className="InputPage inputStriped" ref={formRef}>
         {renderInputForm(source)}
      </div>
      </>  
    );
}

export default TableInputForm;