import { useFormContext } from 'react-hook-form'
import AceEditor from 'react-ace'
import { useCallback } from 'react'

export const Code: React.FC<any> = ({ state, setState}) => {
    
    const { reset } = useFormContext()    

    const onChange = useCallback((value, e) => {
        setState(value)
        try {
            const valueObj = JSON.parse(value)
            reset({editor: valueObj})
        } catch {
            null
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
        </>
    )
}