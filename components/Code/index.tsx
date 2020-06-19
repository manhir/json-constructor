import { useFormContext } from 'react-hook-form'
import AceEditor from 'react-ace'
import { useCallback, useState } from 'react'
import { Alert } from 'antd'

export const Code: React.FC<any> = ({ state, setState}) => {
    
    const { reset } = useFormContext()
    const [synced, setSynced] = useState(true)

    const onChange = useCallback((value, e) => {
        setState(value)
        try {
            const valueObj = JSON.parse(value)
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
                message={synced ? 'Synced' : 'Not synced'}
                type={synced ? 'info' : 'warning'}
                showIcon
            />
        </>
    )
}