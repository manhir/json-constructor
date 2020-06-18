import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Input, Form, Button, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { RenderField } from './RenderField'

export const Constructor: React.FC = props => {

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: 'editor', // from useForm({ defaultValues })
    })

    const { watch } = useFormContext()

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{
                paddingBottom: '5%'
            }}>
                <Button
                    icon={<PlusOutlined />}
                    onClick={() => {append({
                        field: "NEW ITEM",
                        view: ['value'],
                    })}}
                >ADD</Button>
            </div>
            {fields.map((field, index) => (
                <div key={field.id}
                    style={{ border: 'solid 1px black' }}
                >
                    <Form.Item
                        label={`${field.field}`}
                    >
                        <Controller
                            as={<Input />}
                            name={`editor[${index}].field`}
                            defaultValue={field.field}
                        />    
                    </Form.Item>
                    <Form.Item
                        label='type'
                    >
                        <Controller
                            as={<Select />}
                            name={`editor[${index}].view[0]`}
                            defaultValue={field.view[0] ?? 'select'} // should be from field types directly
                            options={['value', 'select'].map(x => ({label: x, value: x}))} // field type options from 1 place !!
                        />
                    </Form.Item>

                    <Form.Item
                        label='field settings'
                    >
                        <RenderField
                            index={index}
                            field={watch(`editor[${index}]`)}
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