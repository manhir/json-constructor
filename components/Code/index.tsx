import { useFormContext } from 'react-hook-form'
import AceEditor from 'react-ace'
import { useCallback, useState } from 'react'
import { Alert, Button } from 'antd'
import json5 from 'json5'

export const Code: React.FC<any> = ({ state, setState}) => {
    
    const { reset } = useFormContext()
    const [synced, setSynced] = useState(true)

    const onChange = useCallback((value, e) => {
        setState(value)
        try {
            const valueObj = json5.parse(value)
            reset({editor: valueObj})
            setSynced(true)
        } catch {
            setSynced(false)
        }
    }, [setState])
    
    return (
        <>
            <AceEditor
                value={state}
                debounceChangePeriod={300}
                onChange={onChange}
                mode='json'
            />
            <Alert
                message={(
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        {synced ? 'Synced' : 'Not synced'}
                    </div>
                )}
                type={synced ? 'info' : 'warning'}
                showIcon
            />
        </>
    )
}