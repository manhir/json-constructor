import { Button, Input, Select } from 'antd'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
// import * as F from '../F'
import { Form } from '../Form'
// import { FormItem } from '../FormItem'
import { Form as FormAntd } from 'antd'

export function askItemFactory(ask: any) {
    const field = ask[0]
    const weactItem = ask[1]
    const defaultValue = weactItem[1].defaultValue

    const defaultOptions = {
        label: field, // capitalize()
        required: false,
    }

    return {
        field,
        defaultValue,
        input: askInputFactory(weactItem, defaultOptions),
    }
}

export function askInputFactory(item: any, defaultOptions: any) {
    const [type, props] = item
    const options = {
        ...defaultOptions,
        ...props,
        // ...ask[2],
    }

    // if (Array.isArray(value)) {
    //     return {
    //         type: ASK_SELECT_INPUT,
    //         label,
    //         options: value.map(x => ({
    //             key: x,
    //             value: x,
    //             label: x,
    //         })),
    //     }
    // }

    if (type === 'text') {
        return {
            type: 'ASK_TEXT',
            label: options.label,
            placeholder: options.placeholder,
            rows: options.rows,
            required: options.required,
            pattern: options.pattern,
        }
    }

    if (type === 'input') {
        return {
            type: 'ASK_INPUT',
            label: options.label,
            placeholder: options.placeholder,
            required: options.required,
            pattern: options.pattern,
        }
    }

    return {
        type: 'ASK_INPUT',
        // type,
        label: options.label,
        placeholder: options.placeholder,
        required: options.required,
        pattern: options.pattern,
    }
}

export const ViewForm: React.FC<any> = props => {

    const form = props.schema.map(askItemFactory)
    const initialValues: object = form.reduce((acc, item) => ({
        ...acc,
        [item.field]: item.defaultValue,
    }), {})

    const { errors, control } = useForm<FormData>()

    return (
        <Form
            onSubmit={() => null}
            layout={'vertical'}
            style={props.style}
        >
            {form.map(item => {
                const { field } = item
                const isRequired = item.input?.required ? true : false

                switch (item.input.type) {
                    case 'ASK_INPUT':
                        return (
                            <FormAntd.Item
                                key={field}
                                label={item.input.label}
                                help={errors[field]}
                                required={isRequired}
                            >
                                <Controller
                                    as={Input}
                                    name={field}
                                    defaultValue={initialValues[field]}
                                    control={control}
                                    placeholder={item.input.placeholder}
                                    // required={isRequired}
                                    rules={{
                                        required: item.input.required,
                                        pattern: item.input.pattern,
                                    }}
                                />
                            </FormAntd.Item>
                        )
                    case 'ASK_TEXT':
                        return (
                            <FormAntd.Item
                                key={field}
                                label={item.input.label}
                                help={errors[field]}
                                required={isRequired}
                            >
                                <Controller
                                    as={Input.TextArea}
                                    name={field}
                                    defaultValue={initialValues[field]}
                                    control={control}
                                    placeholder={item.input.placeholder}
                                    rows={item.input.rows}
                                    // required={isRequired}
                                    rules={{
                                        required: item.input.required,
                                        pattern: item.input.pattern,
                                    }}
                                />
                            </FormAntd.Item>
                        )
                    
                    case 'ASK_SELECT_INPUT':
                        return (
                            <FormAntd.Item
                                key={field}
                                label={item.input.label}
                                help={errors[field]}
                                required={isRequired}
                            >
                                <Controller
                                    as={Select}
                                    name={field}
                                    defaultValue={initialValues[field]}
                                    control={control}
                                    placeholder={item.input.placeholder}
                                    options={item.input.options}
                                    // required={isRequired}
                                    rules={{
                                        required: item.input.required,
                                        pattern: item.input.pattern,
                                    }}
                                />
                            </FormAntd.Item>
                        )

                    // case ASK_SELECT_INPUT:
                    //     return (
                    //         <Field
                    //             key={field}
                    //             name={field}
                    //             props={{
                    //                 label: item.input.label,
                    //                 options: item.input.options,
                    //             }}
                    //             component={F.Select}
                    //         />
                    //     )
                }
            })}
        </Form>
    )
}
