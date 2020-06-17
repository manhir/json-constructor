import { useFormContext } from 'react-hook-form'
import AceEditor from 'react-ace'

export const Code: React.FC<any> = ({ state, setState}) => {
    
    const { reset } = useFormContext()    
    
    return (
        <>
            <AceEditor
                value={state}
                debounceChangePeriod={300}
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