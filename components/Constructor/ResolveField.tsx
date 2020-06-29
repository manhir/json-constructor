import { useState, useCallback, useMemo, useEffect } from "react"
import { useFieldArray, useFormContext, Controller } from "react-hook-form"
import { Select, Input, Button } from "antd"
import { List } from "antd"
import { PlusOutlined } from '@ant-design/icons'

export const ResolveField: React.FC<any> = ({ watchField, fieldValue, name, fieldId, index }) => {
    
    const [state, setState] = useState(null) // add option value

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: `${name}[1][2]`,
    })

    const { setValue, reset, getValues, watch, unregister, register } = useFormContext()

    // CLEAR OPTIONS ON TYPE CHANGE
    useEffect(() => {
        if (watch(`${name}[1][0]`) !== 'select') {
            remove()
        }
    }, [fieldId, watch(`${name}[1][0]`)])

    // CLEAR SELECT MODE ON TYPE CHANGE ||| SET SELECT MODE ON TYPE CHANGE
    useEffect(() => {
        if (watch(`${name}[1][0]`) !== 'select') {
            setValue(`${name}[1][1].mode`, undefined)
        } else {
            setValue(`${name}[1][1].mode`, 'multiple')
        }
    }, [watch(`${name}[1][0]`)])

    // ADD DEFAULT SELECT FIELD ON CREATE OR TYPE CHANGE
    useEffect(() => {
        if (watch(`${name}[1][0]`) === 'select' && fields.length <= 0) {
            append([ ['option', { value: 'Option 1' }] ])
        }
    }, [fields.length, watch(`${name}[1][0]`)])

    const onAddOption = useCallback((value, e) => {
        append([ ['option', {value}] ])
        setState(null)
    }, [setState])

    const onAddOptionName = useCallback(e => setState(e.target.value), [setState])

    function renderSelectFields() {
        switch (watch(`${name}[1][0]`)) {
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
        
            default:
                return null
        }
    }

    return (
        <>
            <Controller // select mode
                as={<Select />}
                name={`editor[${index}][1][1].mode`}
                options={[{label: 'multiple', value: 'multiple'}, {label: 'tags', value: 'tags'}].map(x => ({label: x.label, value: x.value}))} // should not be from local array 
                defaultValue={fieldValue[1]?.[1]?.mode}
                style={{display: watch(`editor[${index}][1][0]`) === 'select' ? null : 'none'}}
            />

            {renderSelectFields()}
            
            {watch(`${name}[1][0]`) !== 'input' ? null : (
                <div>
                    this type has no settings
                </div>
            )}
        </>
    )
}