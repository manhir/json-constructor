import { Controller, useFormContext } from "react-hook-form"
import AceEditor from "react-ace";
import { useState, useEffect } from "react";
import { Button } from "antd";

export const Code: React.FC<any> = ({ state, setState}) => {
    
    const { watch, reset } = useFormContext()    
    
    return (
        <>
            {/* <Button
                onClick={() => {setState(JSON.stringify(watch().editor, null, '   '))}}
            >SYNC CONSTRUCTOR TO CODE</Button> */}
            <AceEditor
                value={state}
                onChange={(value, e) => {
                    setState(value)
                    try {
                        const valueObj = JSON.parse(value)
                        reset({editor: valueObj})
                    } catch {
                        null
                    }
                }}
                mode='json'
            />
        </>
    )
}