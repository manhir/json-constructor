import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { Input, Form, Button } from "antd"

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
            {/* <Button
                onClick={() => {append({field: "TEXT"})}}
            >ADD ITEM</Button> */}
            {fields.map((field, index) => (
                <Form.Item
                    key={field.id}
                    label={`${index}`}
                >
                    <Controller
                        as={<Input />}
                        name={`editor[${index}].field`}
                    />
                </Form.Item>
            ))}
        </div>
    )
}