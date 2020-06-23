import { Input, Select, Switch, Button } from 'antd'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form' // FieldError
// import { IFeatureProperties, IUserFeatureField } from 'src/app/types'
// import * as F from '../F'
import { Form } from '../Form'
// import { FormItem } from '../FormItem'
import { Form as FormAntd } from 'antd'

function resolveView(field: any): { name: string, options?: any, key?: string } { // IUserFeatureField
    if (field) {
        const name = field.view[0]
        const key = field.field

        if (['text', 'input', 'switch', 'select', 'image', 'select-table', 'value'].includes(name)) {
            return {
                name,
                options: field.view[1],
                key,
            }
        }

        return {
            name: 'input',
        }
    }

    return {
        name: 'input',
    }
}

export interface IFeaturePropertyForm {
    style?: React.CSSProperties
    fields: any[] // IUserFeatureField
    initialValues: {
        [name: string]: any,
    }
    onSubmit: (values: object) => void
}

const Field: React.FC<{ field: any }> = ({ field, ...props }) => { // IUserFeatureField
    const view = resolveView(field)
    const viewName = view.name

    switch (viewName) {
        case 'input':
            return (
                <Input
                    {...props}
                />
            )

        case 'text':
            return (
                <Input.TextArea
                    {...props}
                />
            )

        case 'switch':
            const { value: checked, ...otherProps } = props as any

            return (
                <Switch
                    {...props}
                    onChange={(checked) => {
                        otherProps.onChange(checked)
                    }}
                />
            )

        case 'select':
            const options = view.options.map((option: string) => ({
                key: option,
                value: option,
            }))

            return (
                <Select
                    {...props}
                    options={options}
                />
            )
    }
}

export const FeaturePropertyForm: React.FC<IFeaturePropertyForm> = props => {
    const { handleSubmit, errors, setError, reset, control, watch } = useForm<any>() // IFeatureProperties
    const onSubmit = useMemo(
        () => handleSubmit(props.onSubmit), [props.onSubmit],
    )

    return (
        <Form
            onSubmit={onSubmit}
            layout={'vertical'}
        >
            {props.fields.map(item => {
                const name = item.field
                const label = item.label ?? name
                const error = errors[name] as any // FieldError

                return (
                    <FormAntd.Item
                        key={name}
                        label={label}
                        //error={error}
                    >
                        <Controller
                            as={(
                                <Field field={item} />
                            )}
                            name={name}
                            defaultValue={props.initialValues[name]}
                            control={control}
                        />
                    </FormAntd.Item>
                )
            })}
            <Button 
                htmlType="submit"
                // style={{width: '100%', height: '50px'}}
                type='primary'  
            >
                SUBMIT
          </Button>
        </Form>
    )
}
