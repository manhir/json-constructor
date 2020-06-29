import { Select } from "antd"
import { Controller, useFormContext } from "react-hook-form"
import { useEffect } from "react"


export const Test: React.FC<any> = ({ field, index }) => {
    
    const { setValue, reset, getValues, watch, unregister, register } = useFormContext()

    const name = `editor[${index}]`

    useEffect(() => {
        if (watch(`${name}[1][0]`) !== 'select') {
            console.log('mode clear')
            setValue(`${name}[1][1].mode`, undefined)
        }
    }, [field.id, watch(`${name}[1][0]`)])

    return (
        <Controller // mode
            as={<Select />}
            name={`editor[${index}][1][1].mode`}
            options={[{label: 'multiple', value: 'multiple'}, {label: 'tags', value: 'tags'}].map(x => ({label: x.label, value: x.value}))} // should not be from local array 
            defaultValue={field.value[1]?.[1]?.mode}
            style={{display: watch(`${name}[1][0]`) === 'select' ? null : 'none'}}
        />
    )
}