import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Input, Select, List, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState, useEffect, useCallback } from 'react'

export const ResolveField: React.FC<any> = ({ watchField, index, fieldValue }) => {

    const fieldType = watchField?.[1]?.[0]

    const [state, setState] = useState(null) // add option value

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: `editor[${index}][1][2]`,
    })

    const { setValue } = useFormContext() 

    // FILL SELECT OPTIONS ON CREATE OR TYPE CHANGE
    useEffect(() => {
        if (fields.length <= 0 && fieldValue[1][0] === 'select') {
            append([ ['option', {value: 'Option 1'}] ])
        }
    }, [])

    // SET SELECT MODE ON TYPE CHANGE
    useEffect(() => {
        if (fieldValue[1][0] === 'select') {
            setValue(`editor[${index}][1][1].mode`, 'multiple')
        }
    }, [fieldValue[1][0]])

    const onAddOption = useCallback((value, e) => {
        append([ ['option', {value}] ])
        setState(null)
    }, [append, setState])

    const onAddOptionName = useCallback(e => setState(e.target.value), [setState])
    
    switch (fieldType) { // cases should be from array
        case 'input':
            return (
                <div>
                    this type has no settings
                </div>
            )
            
        case 'select':
            return (
                <>
                <Controller // mode
                    as={<Select />}
                    name={`editor[${index}][1][1].mode`}
                    options={[{label: 'multiple', value: 'multiple'}, {label: 'tags', value: 'tags'}].map(x => ({label: x.label, value: x.value}))} // should not be from local array 
                    defaultValue={fieldValue[1][1].mode}
                />
                <List
                    itemLayout="horizontal"
                    dataSource={fields}
                    renderItem={(subField, subIndex) => (
                        <List.Item
                            key={subField.id}
                        >
                            <Controller // invisible, for ['option', {!@#}]
                                as={<Input />}
                                name={`editor[${index}][1][2][${subIndex}][0]`}
                                style={{ display: 'none' }}
                                defaultValue={'option'} // subField.value[0]
                            />
                            <Controller // option label
                                as={<Input />}
                                name={`editor[${index}][1][2][${subIndex}][1].value`}
                                defaultValue={subField.value?.[1]?.value}
                            />
                            <Button
                                disabled={fields.length <= 1}
                                danger
                                onClick={() => remove([subIndex])}
                            >Delete</Button>
                        </List.Item>
                    )}
                    footer={(
                        <Input.Search
                            value={state}
                            onChange={onAddOptionName}
                            onSearch={onAddOption}
                            enterButton={<><PlusOutlined />Add</>} 
                        />
                    )}
                />
                </>
            )
    
        default: 
            return null
 
    }
}