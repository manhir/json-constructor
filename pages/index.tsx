import { SchemaConstructor } from '../components/SchemaConstructor'
import { Form } from '../components/Form'
import { useCallback, useRef, useState, useEffect } from 'react'
import { FormProvider, useForm, Controller, useFormContext } from 'react-hook-form'
import { Button, Input, Form as FormAntd, ConfigProvider } from 'antd'
import AceEditor from 'react-ace'

export default function Home() {
  const ref = useRef<HTMLFormElement>()
  const [layerName, setLayerName] = useState('name of layer') // placeholder data for layer
  const [schemaContent, setSchemaContent] = useState(`
{
  "version": 3,
  "editor": [
    { "field": "dateCreated", "view": ["value"] },
    { "field": "age", "view": ["select", [
        "Дети", "Молодежь", "Взрослые", "Пенсионеры"
    ]] }
  ]
}
  `)
//   "editor": [
//     {
//       "field": "comment"
//     },
//     {
//       "field": "name"
//     }
//   ]
// }

  const [editor, setEditor] = useState<any>(JSON.parse(schemaContent).editor) // validate ?!
  
  const formMethods = useForm({
      reValidateMode: 'onSubmit',
      defaultValues: {
        editor,
        layerName
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
  }, [])

  return (
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
          <h1>FORM</h1>
          <FormAntd.Item
            label={'layer name'}
          >
            <Controller
              as={Input}
              name='layerName'
              control={formMethods.control}
            />
          </FormAntd.Item>

          <FormAntd.Item
            label={'SCHEMA COMPONENT'}
            style={{border: 'solid 1px grey'}}
          >
            <SchemaConstructor />
          </FormAntd.Item>

          <Button 
            htmlType="submit"
            style={{width: '100%', height: '50px'}}
            type='primary'  
          >
            Submit
          </Button>
        </Form>
      </ConfigProvider>
      </FormProvider>

      <div>
        <h1>
          DATA
        </h1>
        <AceEditor
          value={'ORIGINAL SCHEMA' + schemaContent + 'SUBMITTED\n' + (!submitted ? 'nothing' : JSON.stringify(submitted, null, '   '))}
        />
      </div>
    </div>
  )
}
