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
        'input',
        'select',
    ]

    const onClick = useCallback(item => {
        switch (item.key) {
            case fieldTypes[0]: // input
                append([['New field', [fieldTypes[0], { label: 'Field label' }]]])
                break

            case fieldTypes[1]: // select
                append([
                    ['New field', [fieldTypes[1], { label: 'Field label', mode: 'multiple' }, [
                        ['option', { value: 'Option 1' }],
                        ['option', { value: 'Option 2' }],
                    ]]]
                ])
                break
        
            default:
                break
        }
    }, [append])

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
                <Button
                    onClick={() => console.log(watch('editor'))}
                >
                    LOG WATCH
                </Button>
            </div>
            {fields.map((field, index) => (
                <div key={field.id}
                    style={{ border: 'solid 1px black' }}
                >
                    <Form.Item
                        label={`field name & field label`}
                    >
                        <Controller
                            as={<Input />}
                            name={`editor[${index}][0]`}
                            defaultValue={field.value[0]}
                        />
                        <Controller
                            as={<Input />}
                            name={`editor[${index}][1][1].label`}
                            defaultValue={field.value[1][1].label}
                        />
                    </Form.Item>
                    <Form.Item
                        label='type'
                    >
                        <Controller
                            as={<Select />}
                            name={`editor[${index}][1][0]`}
                            defaultValue={field.value[1][0] ?? fieldTypes[0]}
                            options={fieldTypes.map(x => ({label: x, value: x}))}
                            onChange={value => console.log(value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label='field settings'
                    >
                        <RenderField
                            index={index}
                            field={watch(`editor[${index}]`)}
                            fieldValue={field.value} // needs better name OR implementation
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