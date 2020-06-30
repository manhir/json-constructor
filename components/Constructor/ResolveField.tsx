import { useState, useCallback, useEffect } from "react"
import { useFieldArray, useFormContext, Controller } from "react-hook-form"
import { Select, Input, Button, InputNumber, Form } from "antd"
import { List } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import { ArrayField } from "react-hook-form/dist/types/form"

interface IResolveFieldProps {
    field: Partial<ArrayField<Record<string, any>, "id">>,
    index: number
}

export const ResolveField: React.FC<IResolveFieldProps> = ({ field, index }) => {

    const { setValue, watch } = useFormContext()

    const name = `editor[${index}]`
    const fieldType = watch(`${name}[1][0]`)

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: `${name}[1][2]`,
    })

    // CLEAR SELECT OPTIONS ON TYPE CHANGE
    useEffect(() => {
        if (watch(`${name}[1][0]`) !== 'select') {
            remove()
        }
    }, [watch(`${name}[1][0]`)])
    
    // ADD DEFAULT SELECT FIELD ON CREATE OR TYPE CHANGE
    useEffect(() => {
        if (fieldType === 'select' && fields.length <= 0) {
            append([ ['option', { value: 'Option 1' }] ])
        }
    }, [fields.length, fieldType])

    // CLEAR SELECT MODE ON TYPE CHANGE ||| SET SELECT MODE ON TYPE CHANGE
    useEffect(() => {
        if (watch(`${name}[1][0]`) !== 'select') {
            setValue(`${name}[1][1].mode`, undefined)
        } else if (watch().editor[index][1][1].mode === undefined) {
            setValue(`${name}[1][1].mode`, 'default')
        }
    }, [name, watch(`${name}[1][0]`)])

    // CLEAR TEXT ROWS ON TYPE CHANGE ||| SET TEXT ROWS ON TYPE CHANGE
    useEffect(() => {
        if (fieldType !== 'text') {
            setValue(`${name}[1][1].rows`, undefined)
        } else if (watch().editor[index][1][1].rows === undefined) {
            setValue(`${name}[1][1].rows`, 4)
        }
    }, [fieldType])

    const renderSelectOptionsList = useCallback((subField, subIndex) => (
        <List.Item
            key={subField.id}
        >
            <Controller // is invisible, for ['option', {!@#}]
                as={<Input />}
                name={`${name}[1][2][${subIndex}][0]`}
                style={{ display: 'none' }}
                defaultValue={'option'}
            />
            <Controller // option label
                as={<Input />}
                name={`${name}[1][2][${subIndex}][1].value`}
                defaultValue={subField.value[1]?.value}
            />
            <Button
                disabled={fields.length <= 1}
                danger
                onClick={() => remove(subIndex)}
            >Delete</Button>
        </List.Item>
    ), [fields.length, remove])
    
    const [state, setState] = useState(null) // new select option name value

    const onAddOption = useCallback((value, e) => {
        append([ ['option', {value}] ])
        setState(null)
    }, [setState])

    const onAddOptionName = useCallback(e => setState(e.target.value), [setState])

    return (
        <>
            <div style={{
                display: fieldType === 'input' ? null : 'none',
                paddingBottom: '12px'
            }}>
                this type has no settings
            </div>

            <div style={{ display: fieldType === 'select' ? null : 'none' }}>
                <List
                    header={(
                        <Controller // select mode
                            as={<Select />}
                            name={`editor[${index}][1][1].mode`}
                            options={[
                                {label: 'default', value: ''},
                                {label: 'multiple', value: 'multiple'}, 
                                {label: 'tags', value: 'tags'},
                            ]}
                            defaultValue={field.value[1]?.[1]?.mode}
                        />
                    )}
                    itemLayout="horizontal"
                    dataSource={fields}
                    renderItem={renderSelectOptionsList}
                    footer={(
                        <Input.Search
                            value={state}
                            onChange={onAddOptionName}
                            onSearch={onAddOption}
                            enterButton={<><PlusOutlined />Add</>} 
                        />
                    )}
                />
            </div>
            <div style={{ display: fieldType === 'text' ? null : 'none' }}>
                <Form.Item
                    label={`rows`}
                >
                    <Controller // rows
                        as={<InputNumber />}
                        name={`editor[${index}][1][1].rows`}
                        defaultValue={field.value[1]?.[1]?.rows}
                        min={1}
                    />
                </Form.Item>
            </div>
        </>
    )
}