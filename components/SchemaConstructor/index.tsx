import { Tabs } from 'antd'
import { Constructor } from '../Constructor'
import { useFormContext } from 'react-hook-form'
import { useState, useCallback } from 'react'
import { Code } from '../Code'

const { TabPane } = Tabs 

export const SchemaConstructor: React.FC = props => {

    const { watch } = useFormContext()
    const [state, setState] = useState(JSON.stringify(watch('editor')))
    const onChange = useCallback(key => 
        key !== 'code' 
            ? null 
            : setState(JSON.stringify(watch('editor'), null, '   ')),
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