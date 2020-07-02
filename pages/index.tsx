import { SchemaConstructor } from '../components/SchemaConstructor'
import { Form } from '../components/Form'
import { useCallback, useRef, useState, useEffect } from 'react'
import { FormProvider, useForm, Controller, useFormContext } from 'react-hook-form'
import { Button, Input, Form as FormAntd, ConfigProvider, Modal } from 'antd'
import AceEditor from 'react-ace'
import json5 from 'json5'
import { ViewForm } from '../components/ViewForm'

export default function Home() {
  const ref = useRef<HTMLFormElement>()
  const [layerName, setLayerName] = useState('name of layer') // placeholder data for regular form fields
  const [schemaContent, setSchemaContent] = useState(`
{
  "version": 3,
  "editor": [
    ['comment', ['text', { label: 'Комментарий', rows: 4 }]],
    ['groupSize', ['input', { label: 'Количество' }]],
    [
      'male', 
      [
        'select', { label: 'М', mode: 'multiple' }, 
        [
          ['option', { value: 'молодежь (18-30)' }],
          ['option', { value: 'взрослый (30-50)' }],
          ['option', { value: 'пенсионного возраста' }],
        ]
      ]
    ],
  ]
}
  `)

  const [editor, setEditor] = useState<any>(json5.parse(schemaContent).editor) // no validate, cause its from server
  
  const formMethods = useForm({
      reValidateMode: 'onBlur', // onSubmit
      defaultValues: {
        editor,
        // layerName
      }
  })

  const [submitted, setSubmitted] = useState()

  const onSubmit = useCallback(data => {
    // let result = data
    // if(typeof data.editor === 'object') {
    //   const editor = JSON.stringify(data.editor)
    //   result.editor = editor
    // }
    // console.log('result', result)
    console.log('data', data)
    setSubmitted(data)
  }, [setSubmitted])

  return (
    <>
    <div style={{
      display: 'flex',
      justifyContent: 'space-around'
    }}>
      <FormProvider {...formMethods}>
      <ConfigProvider componentSize='small'>
        <Form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          layout='vertical'
          ref={ref}
          style={{
            width: '400px'
          }}
        >
          <h1>CONSTRUCTOR</h1>
          <Button 
            htmlType="submit"
            style={{width: '100%', height: '50px'}}
            type='primary'  
          >
            Submit
          </Button>
          {/* <FormAntd.Item label='regular form field' > 
            <Controller
              as={<Input />}
              name={`layerName`}
            />
          </FormAntd.Item> */}
          <FormAntd.Item
            label={'SCHEMA COMPONENT'}
            style={{border: 'solid 1px grey'}}
          >
            <SchemaConstructor />
          </FormAntd.Item>
        </Form>
      </ConfigProvider>
      </FormProvider>

      <div>
        <h1>
          DATA
        </h1>
        <AceEditor
          minLines={50}
          value={schemaContent + 'SUBMITTED\n' + (!submitted ? 'nothing' : json5.stringify(submitted, null, '   '))} 
        />
      </div>
      <div>
        <h1>
          FORM
        </h1>
        {false ? null : (  
          <ViewForm
            style={{
              width: '400px'
            }}
            schema={(submitted as any)?.editor ?? []}
          />
        )}
      </div>
    </div>
    </>
  )
}
