import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Input, Form, Button, Select, Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { ResolveField } from './ResolveField'
import { useCallback } from 'react'

export const Constructor: React.FC = props => {

    const { watch, reset, setValue, unregister } = useFormContext() 

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: 'editor', // from useForm({ defaultValues })
    })

    const fieldTypes = [
        'input',
        'select',
    ]

    const onAdd = useCallback(item => {
        switch (item.key) {
            case fieldTypes[0]: // input
                append([ ['New field', [fieldTypes[0], { label: 'Field label' }]] ])
                break

            case fieldTypes[1]: // select
                append([
                    ['New field', [
                        fieldTypes[1], { label: 'Field label', mode: 'multiple' }, [
                            // ['option', { value: 'Option 1' }],
                        ]
                    ]]
                ])
                break
        
            default:
                break
        }
    }, [])

    const onTypeChange = useCallback((type, index) => {
        // const optionsValue = () => {
        //     switch (value) {
        //         case fieldTypes[0]: // input
        //             return []
    
        //         case fieldTypes[1]: // select
        //             return []
            
        //         default:
        //             return [] // [] is for nothing -> clear data
        //     }
        // }

        // const modeValue = () => {
        //     switch (value) {
        //         case fieldTypes[0]: // input
        //             return null
            
        //         default:
        //             return null
        //     }
        // }
        
        // for now just cleans field
        let editor = watch('editor')
        reset({ editor })
    }, [])

    const onDelete = useCallback(index => {
        remove(index)
    }, [])

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
                        label={`field name & field label`}
                    >
                        <Controller // data field name
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
                        <Controller
                            render={props => (
                                <Select
                                    {...props}            
                                    onChange={value => {
                                        props.onChange(value)
                                        onTypeChange(value, index)
                                    }} 
                                    options={fieldTypes.map(x => ({label: x, value: x}))}
                                />
                            )}
                            name={`editor[${index}][1][0]`}
                            defaultValue={field.value[1]?.[0] ?? fieldTypes[0]} // maybe without ??
                        />
                    </Form.Item>

                    <Form.Item
                        label='field settings'
                    >
                        <ResolveField
                            index={index}
                            watchField={watch(`editor[${index}]`)}
                            fieldValue={field.value}
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