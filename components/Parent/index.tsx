import AceEditor from "react-ace";
import { Tabs, Button, Input } from 'antd';
import { Constructor } from "../Constructor";
import { useFormContext, Controller } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { Code } from "../Code";

const { TabPane } = Tabs 

interface IParentProps {
    
}

export const Parent: React.FC<IParentProps> = props => {

    const { watch, reset, setValue, control } = useFormContext()
    const [state, setState] = useState(JSON.stringify(watch('editor')))

    return (
        <>
            <Tabs 
                defaultActiveKey="1"
                style={{
                    width: '100%'
                }}
                onChange={key => key !== 'code' ? null : setState(JSON.stringify(watch('editor'), null, '   '))}
            >
                <TabPane tab="CONSTRUCTOR" key="constructor">
                    <Constructor
                    
                    />
                </TabPane>
                <TabPane tab="CODE" key="code">
                <Code key='2' 
                    state={state}
                    setState={setState}
                />
                </TabPane>
            </Tabs>
        </>
    )
}