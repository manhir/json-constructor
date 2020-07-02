import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Input, Form, Button, Select, Dropdown, Menu } from 'antd'
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons'
import { useCallback } from 'react'
import { ResolveField } from './ResolveField'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export const Constructor: React.FC = () => {

    const { watch, errors } = useFormContext()

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: 'editor', // from useForm({ defaultValues })
    })

    const fieldTypes = [
        'input',
        'select',
        'text',
    ]

    const onAdd = useCallback(item => { // !! make name & label unique
        switch (item.key) {
            case fieldTypes[0]: // input
                append([ ['New field', [fieldTypes[0], { label: 'Field label' }]] ])
                break

            case fieldTypes[1]: // select
                append([
                    ['New field', [
                        fieldTypes[1], { label: 'Field label', mode: 'default' }, [] // [] default values are in <ResolveField>
                    ]]
                ])
                break
        
            case fieldTypes[2]: // text
                append([ ['New field', [fieldTypes[2], { label: 'Field label', rows: 4 }]] ])
                break

            default:
                break
        }
    }, [])

    const onDelete = useCallback(index => {
        remove(index)
    }, [remove])

    const onDragEnd = useCallback(props => !props.destination ? null : move(props.source.index, props.destination.index), [])

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{
                    paddingBottom: '5%'
                }}>
                    <Dropdown 
                        overlay={(
                            <Menu
                                onClick={onAdd}
                            >
                                {fieldTypes.map(type => (
                                    <Menu.Item
                                        key={type}
                                    >
                                        {type}
                                    </Menu.Item>
                                ))}
                            </Menu>
                        )}
                    >
                        <Button>
                            ADD <DownOutlined />
                        </Button>
                    </Dropdown>
                    <Button
                        onClick={() => {
                            console.log(watch('editor'))
                        }}
                        type='dashed'
                    >
                        LOG WATCH
                    </Button>
                    <Button
                        onClick={() => console.log('errors', errors)}
                        type='dashed'
                    >
                        LOG ERRORS
                    </Button>
                </div>
                
                <Droppable droppableId='constructor'>
                    {(provided, snapshot) => (
                        <div 
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                            style={{
                                backgroundColor: snapshot.isDraggingOver ? 'darkgrey' : null,
                                transition: 'background-color .5s',
                                padding: 4,
                            }}
                        >
                            {fields.map((field, index) => (
                                <Draggable draggableId={field.id} index={index} key={field.id}>
                                    {(provided, snapshot) => (
                                        <div 
                                            key={field.id}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={{ 
                                                ...provided.draggableProps.style,
                                                border: `solid 1px ${errors?.editor?.[index] ? 'red' : 'black'}`,
                                                backgroundColor: snapshot.isDragging ? 'grey' : 'white',
                                            }}
                                        >
                                            <EllipsisOutlined 
                                                {...provided.dragHandleProps}
                                                style={{
                                                    backgroundColor: 'lightgrey',
                                                    padding: '4px',
                                                    width: '100%',
                                                }}
                                            />
                                            <Form.Item
                                                label={`name & label`}
                                                help={errors.editor?.[index]?.[0]?.message}
                                            >
                                                <Controller // field name
                                                    as={<Input />}
                                                    name={`editor[${index}][0]`}
                                                    defaultValue={field.value[0]}
                                                    placeholder='empty'
                                                    rules={{
                                                        required: 'name required'
                                                    }}
                                                />
                                                <Controller // label name
                                                    as={<Input />}
                                                    name={`editor[${index}][1][1].label`}
                                                    defaultValue={field.value[1]?.[1]?.label}
                                                    placeholder='empty'
                                                    rules={{
                                                        required: 'label required'
                                                    }}
                                                />
                                            </Form.Item>
                                            <Controller // field type
                                                as={<Input />}
                                                style={{ display: 'none' }}
                                                options={fieldTypes.map(x => ({label: x, value: x}))}
                                                name={`editor[${index}][1][0]`}
                                                defaultValue={field.value[1]?.[0] ?? fieldTypes[0]}
                                            />

                                            <Form.Item
                                                label='type settings'
                                            >
                                                <ResolveField
                                                    key={field.id}
                                                    field={field}
                                                    index={index}
                                                />
                                                <Button
                                                    danger
                                                    onClick={() => onDelete(index)}
                                                >DELETE</Button>
                                            </Form.Item>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                    
                </Droppable>
            </div>
        </DragDropContext>
    )
}