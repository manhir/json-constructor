import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Input, Form, Button, Select, Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useCallback } from 'react'
import { ResolveField } from './ResolveField'

export const Constructor: React.FC = () => {

    const { watch } = useFormContext() 

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: 'editor', // from useForm({ defaultValues })
    })

    const fieldTypes = [
        'input',
        'select',
    ]

    const onAdd = useCallback(item => { // !! make name & label unique
        switch (item.key) {
            case fieldTypes[0]: // input
                append([ ['New field', [fieldTypes[0], { label: 'Field label' }]] ])
                break

            case fieldTypes[1]: // select
                append([
                    ['New field', [
                        fieldTypes[1], { label: 'Field label', mode: 'default' }, [] // [] default values are in <ResolveField>
                    ]]
                ])
                break
        
            default:
                break
        }
    }, [])

    const onDelete = useCallback(index => {
        remove(index)
    }, [remove])

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
                            onClick={onAdd}
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
                    onClick={() => {
                        console.log(watch('editor'))
                    }}
                >
                    LOG WATCH
                </Button>
            </div>
            {fields.map((field, index) => (
                <div key={field.id}
                    style={{ border: 'solid 1px black' }}
                >
                    <Form.Item
                        label={`name & label`}
                    >
                        <Controller // field name
                            as={<Input />}
                            name={`editor[${index}][0]`}
                            defaultValue={field.value[0]}
                        />
                        <Controller // label name
                            as={<Input />}
                            name={`editor[${index}][1][1].label`}
                            defaultValue={field.value[1]?.[1]?.label}
                        />
                    </Form.Item>
                    <Form.Item
                        label='type'
                    >
                        <Controller // field type
                            render={props => (
                                <Select
                                    {...props}
                                    options={fieldTypes.map(x => ({label: x, value: x}))}
                                />
                            )}
                            name={`editor[${index}][1][0]`}
                            defaultValue={field.value[1]?.[0] ?? fieldTypes[0]} // maybe without ??
                        />
                    </Form.Item>

                    <Form.Item
                        label='type settings'
                    >
                        <ResolveField
                            key={field.id}
                            field={field}
                            index={index}
                        />
                        <Button
                            danger
                            onClick={() => onDelete(index)}
                        >DELETE</Button>
                    </Form.Item>
                </div>
            ))}
        </div>
    )
}