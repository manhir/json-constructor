import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Input, Select, Divider, List, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

export const RenderField: React.FC<any> = ({ field, index }) => {

    const fieldType = field?.[1]?.[0]

    const [state, setState] = useState(null)

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: `editor[${index}][1][2]`,
    })

    const { setValue } = useFormContext()
    
    switch (fieldType) {
        case 'input': // value should not submit to view[1]
            return null
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
                                name={`editor[${index}][1][2][${subIndex}][0]`}
                                style={{ display: 'none' }}
                            />
                            <Controller
                                as={<Input />}
                                name={`editor[${index}][1][2][${subIndex}][1].value`}
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