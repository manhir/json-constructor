import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Input, Form, Button, Select, Dropdown, Menu } from 'antd'
import { PlusOutlined, DownOutlined } from '@ant-design/icons'
import { RenderField } from './RenderField'
import { useCallback } from 'react'

export const Constructor: React.FC = props => {

    const { watch } = useFormContext() 

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: 'editor', // from useForm({ defaultValues })
    })

    const fieldTypes = [
        'value',
        'select',
    ]

    const onClick = useCallback(item => {
        switch (item.key) {
            case 'value':
                append({
                    field: "New field",
                    view: [
                        "value"
                    ]
                })
                break

            case 'select':
                append({
                    field: "New field",
                    view: [
                        "select",
                        [
                            "Option 1",
                            "Option 2"
                        ]
                    ]
                })
                break
        
            default:
                break
        }
    }, [append])

    console.log(fields)

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{
                paddingBottom: '5%'
            }}>
                <Dropdown 
                    overlay={(
                        <Menu
                            onClick={onClick}
                        >
                            {fieldTypes.map(type => (
                                <Menu.Item
                                    key={type}
                                >
                                    {type}
                                </Menu.Item>
                            ))}
                        </Menu>
                    )}
                >
                    <Button>
                    ADD <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            {fields.map((field, index) => (
                <div key={field.id}
                    style={{ border: 'solid 1px black' }}
                >
                    <Form.Item
                        label={`${field.value[0]}`}
                    >
                        <Controller
                            as={<Input />}
                            name={`editor[${index}][0]`}
                            defaultValue={field.field}
                        />    
                    </Form.Item>
                    <Form.Item
                        label='type'
                    >
                        <Controller
                            as={<Select />}
                            name={`editor[${index}].view[0]`}
                            defaultValue={field.view?.[0] ?? 'value'} // should be from field types directly
                            options={['value', 'select'].map(x => ({label: x, value: x}))} // field type options from 1 place !!
                        />
                    </Form.Item>

                    <Form.Item
                        label='field settings'
                    >
                        <RenderField
                            index={index}
                            field={watch(`editor[${index}]`)}
                        />
                        
                        <Button
                            danger
                            onClick={() => remove(index)}
                        >DELETE</Button>
                    </Form.Item>
                </div>
            ))}
        </div>
    )
}