import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Input, Form, Button, Select, Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { RenderField } from './RenderField'
import { useCallback } from 'react'

export const Constructor: React.FC = props => {

    const { watch, reset } = useFormContext() 

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
                append([ ['New field', [fieldTypes[0], { label: 'Field label' }]] ])
                break

            case fieldTypes[1]: // select
                append([
                    ['New field', [
                        fieldTypes[1], { label: 'Field label', mode: 'multiple' }, []
                    ]]
                ])
                break
        
            default:
                break
        }
    }, [append])

    const onTypeChange = useCallback((value, index) => {
        // clear some values
        const optionsValue = () => {
            switch (value) {
                case fieldTypes[0]: // input
                    return []
    
                case fieldTypes[1]: // select
                    return []
                    // return([
                    //     ['option', { value: 'Option 1' }],
                    // ])
            
                default:
                    return []
            }
        }

        const modeValue = () => {
            switch (value) {
                case fieldTypes[0]: // input
                    return null
            
                default:
                    return null
            }
        }
        
        let editor = watch('editor')
        editor[index][1][2] = optionsValue() // set options
        editor[index][1][1].mode = modeValue() // set mode
        reset({ 'editor': editor })
        
    }, [watch, reset])

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
                            defaultValue={field.value[1]?.[0] ?? fieldTypes[0]}
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