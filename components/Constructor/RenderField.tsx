import { Controller, useFieldArray } from 'react-hook-form'
import { Input, Select, Divider, List, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

export const RenderField: React.FC<any> = ({ field, index }) => {

    const fieldType = field?.view?.[0]

    const [state, setState] = useState(null)

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: `editor[${index}].view[1]`,
    })
    
    switch (fieldType) {
        case 'value': // value should not submit to view[1]
            return (
                null
                // <Controller
                //     as={<Input />}
                //     name={`editor[${index}].view[1]`}
                //     defaultValue={''}
                // />
            )
            break
            
        case 'select':
            return (
                <>
                <List
                    itemLayout="horizontal"
                    dataSource={fields}
                    renderItem={(subField, subIndex) => (
                        <List.Item
                            key={subField.id}
                        >
                            <Controller
                                as={<Input />}
                                name={`editor[${index}].view[1][${subIndex}]`}
                                defaultValue={subField.value}
                            />
                            <Button
                                danger
                                onClick={() => remove(subIndex)}
                            >Delete</Button>
                        </List.Item>
                    )}
                    footer={(
                        <Input.Search
                            value={state}
                            onChange={e => setState(e.target.value)}
                            onSearch={(value, e) => {append({value}); setState(null)}}
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