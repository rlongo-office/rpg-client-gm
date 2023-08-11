import { z } from "zod";
import { FormElement, createInputArray } from "metadata/schema-player";
import { useState,useEffect } from "react";

 
 interface GeneralInputProps {
    isVisible: boolean
    source: object
    validation: z.ZodObject<any>
}

const GeneralInput=({ isVisible, source, validation }:GeneralInputProps) => {
    const [elemArray,setElemArray] = useState<FormElement[]>([])

    //use the appropriate zod schema to build input element array

    useEffect(()=>{
        setElemArray(createInputArray(source,validation))
    },[validation])

    return (
      <div style={{ display: isVisible ? 'block' : 'none' }}>
        <input type="text" placeholder="Enter text" />
      </div>
    )
  }

  export default GeneralInput