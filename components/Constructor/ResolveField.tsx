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

    const { watch, errors } = useFormContext()

    const name = `editor[${index}]`
    const fieldType = watch(`${name}[1][0]`)

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: `${name}[1][2]`,
    })
    
    // ADD DEFAULT SELECT FIELD ON CREATE
    useEffect(() => {
        if (fieldType === 'select' && fields.length <= 0) {
            append([ ['option', { value: 'Option 1' }] ])
        }
    }, [fields.length, fieldType])

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
                {'mode & options'}
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
                    help={errors?.editor?.[index]?.[1]?.[1]?.rows?.message}
                >
                    <Controller // rows
                        as={<InputNumber />}
                        name={`${name}[1][1].rows`}
                        defaultValue={field.value[1]?.[1]?.rows}
                        min={1}
                        rules={{
                            required: watch(`${name}[1][0]`) === 'text' ? 'field required' : false
                        }}
                    />
                </Form.Item>
            </div>
        </>
    )
}