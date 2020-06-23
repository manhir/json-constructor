import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Input, Select, List, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState, useEffect, useCallback } from 'react'

export const RenderField: React.FC<any> = ({ field, index, fieldValue }) => {

    const fieldType = field?.[1]?.[0]

    const [state, setState] = useState(null) // add option value

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: `editor[${index}][1][2]`,
    })


    // FILL ON CREATE
    // const { watch, reset } = useFormContext() 

    // useEffect(() => { 
    //     if (fieldValue[1]?.[2] !== field?.[1]?.[2] && fieldValue[1][0] === 'select') {
    //         let editor = watch('editor')
    //         editor[index][1][2] = [ ['option', { value: 'Option 1' }] ]
    //         reset({ 'editor': editor })
    //     }
    // }, [])

    const onAddOption = useCallback(
        (value, e) => {
            append([ ['option', {value}] ])
            setState(null)
        }, [append, setState]
    )
    const onAddOptionName = useCallback(e => setState(e.target.value), [setState])
    
    switch (fieldType) {
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
                    options={['multiple', 'tags'].map(x => ({label: x, value: x}))} // should not be from local array 
                    defaultValue={fieldValue[1][1]?.mode ?? 'multiple'} // should be from array
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
                                defaultValue={subField.value?.[1]?.value} // {fieldValue?.[1]?.value}
                            />
                            <Button
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