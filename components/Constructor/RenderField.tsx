import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Input, Select, List, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

export const RenderField: React.FC<any> = ({ field, index, fieldValue }) => {

    const fieldType = field?.[1]?.[0]

    const [state, setState] = useState(null)

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: `editor[${index}][1][2]`,
    })
    
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
                <Controller 
                    as={<Select />}
                    name={`editor[${index}][1][1].mode`}
                    options={['multiple', 'tags'].map(x => ({label: x, value: x}))} // should not be from local array 
                    defaultValue={fieldValue[1][1].mode ?? 'multiple'} // should be from array
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
                            <Controller // option
                                as={<Input />}
                                name={`editor[${index}][1][2][${subIndex}][1].value`}
                                defaultValue={subField.value?.[1]?.value}
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
                            onChange={e => setState(e.target.value)}
                            onSearch={(value, e) => {append([['option', {value}]]); setState(null)}}
                            enterButton={<><PlusOutlined />Add</>} 
                        />
                    )}
                />
                </>
            )
            break
    
        default: 
            return null
 
    }
}