import { useFormContext, Controller, useFieldArray } from "react-hook-form"
import { Input, Form } from "antd"

interface IConstructorProps {
    // json: object
}

export const Constructor: React.FC<IConstructorProps> = props => {

    const { control } = useFormContext()
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: 'editor', // from useForm({ defaultValues })
    })
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {fields.map((field, index) => (
                <Form.Item
                    key={field.id}
                    label={`${index}`}
                >
                    <Controller
                        as={Input}
                        name={`editor[${index}].field`}
                    />
                </Form.Item>
            ))}
        </div>
    )
}