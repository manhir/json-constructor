import { useState, useCallback, useMemo, useEffect } from "react"
import { useFieldArray, useFormContext, Controller } from "react-hook-form"
import { Select, Input, Button } from "antd"
import { List } from "antd"
import { PlusOutlined } from '@ant-design/icons'

export const ResolveField: React.FC<any> = ({ field, index }) => {

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
    }, [watch(`${name}[1][0]`)]) // dosen't work with fieldType
    
    // ADD DEFAULT SELECT FIELD ON CREATE OR TYPE CHANGE
    useEffect(() => {
        if (fieldType === 'select' && fields.length <= 0) {
            append([ ['option', { value: 'Option 1' }] ])
        }
    }, [fields.length, fieldType])

    // CLEAR SELECT MODE ON TYPE CHANGE ||| SET SELECT MODE ON TYPE CHANGE
    useEffect(() => {
        if (fieldType !== 'select') {
            setValue(`${name}[1][1].mode`, undefined)
        } else {
            setValue(`${name}[1][1].mode`, 'multiple')
        }
    }, [fieldType])

    
    const [state, setState] = useState(null) // add option value

    const onAddOption = useCallback((value, e) => {
        append([ ['option', {value}] ])
        setState(null)
    }, [setState])

    const onAddOptionName = useCallback(e => setState(e.target.value), [setState])

    return (
        <>
            {fieldType !== 'input' ? null : (
                <div>
                    this type has no settings
                </div>
            )}

            <Controller // select mode
                as={<Select />}
                name={`editor[${index}][1][1].mode`}
                options={[{label: 'multiple', value: 'multiple'}, {label: 'tags', value: 'tags'}].map(x => ({label: x.label, value: x.value}))} // should not be from local array 
                defaultValue={field.value[1]?.[1]?.mode}
                style={{display: fieldType === 'select' ? null : 'none'}}
            />
            <List
                style={{
                    display: fieldType === 'select' ? null : 'none'
                }}
                itemLayout="horizontal"
                dataSource={fields}
                renderItem={(subField, subIndex) => (
                    <List.Item
                        key={subField.id}
                    >
                        <Controller // invisible, for ['option', {!@#}]
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
                )}
                footer={(
                    <Input.Search
                        value={state}
                        onChange={onAddOptionName}
                        onSearch={onAddOption}
                        enterButton={<><PlusOutlined />Add</>} 
                    />
                )}
            />
        </>
    )
}