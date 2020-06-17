import { Controller } from "react-hook-form"
import { Input, Select } from "antd"


export const RenderField: React.FC<any> = ({ field, index }) => {

    const type = field.view[0]
    
    switch (type) {
        case 'value': 
            return (
                <Controller
                    as={<Input />}
                    name={`editor[${index}].view[1]`}
                    defaultValue={''}
                />
            )
            break
            
        case 'select':
            return (
                <Controller
                    as={<Select />}
                    name={`editor[${index}].view[1]`}
                    defaultValue={''}
                    placeholder=''
                    options={(Array.isArray(field.view[1]) ? field.view[1] : Array(field.view[1])).map(x => ({label:x, value: x}))}
                />
            )
            break
    
        default: 
            return null
 
    }
}