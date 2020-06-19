import { Tabs } from 'antd'
import { Constructor } from '../Constructor'
import { useFormContext } from 'react-hook-form'
import { useState, useCallback } from 'react'
import { Code } from '../Code'
import json5 from 'json5'

const { TabPane } = Tabs 

export const SchemaConstructor: React.FC = props => {

    const { watch } = useFormContext()
    const [state, setState] = useState(typeof watch('editor') === 'string' 
        ? watch('editor')
        : json5.stringify(watch('editor')))
    const onChange = useCallback(key => 
        key !== 'code' 
            ? null 
            : setState(json5.stringify(watch('editor'), null, '    ')), 
        [setState, watch]
    )

    return (
        <>
            <Tabs 
                defaultActiveKey="1"
                style={{
                    width: '100%'
                }}
                onChange={onChange}
            >
                <TabPane tab="CONSTRUCTOR" key="constructor">
                    <Constructor />
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