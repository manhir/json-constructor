import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { Input, Form, Button } from "antd"
import { PlusOutlined } from '@ant-design/icons'

interface IConstructorProps {
    // fields: any
}

export const Constructor: React.FC<IConstructorProps> = props => {

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: 'editor', // from useForm({ defaultValues })
    })

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}> 
            <Button
                icon={<PlusOutlined />}
                onClick={() => {append({field: "NEW ITEM"})}}
            >ADD</Button>
            {fields.map((field, index) => (
                <Form.Item
                    key={field.id}
                    label={`${field.id}`}
                >
                    <Controller
                        as={<Input />}
                        name={`editor[${index}].field`}
                        defaultValue={field.field} // to populate items added in constructor
                    />
                    <Button
                        danger
                        onClick={() => remove(index)}
                    >DELETE</Button>
                </Form.Item>
            ))}
        </div>
    )
}