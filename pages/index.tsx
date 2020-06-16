import { Parent } from '../components/Parent'
import { Form } from '../components/Form'
import { useCallback, useRef, useState, useEffect } from 'react'
import { FormProvider, useForm, Controller, useFormContext } from 'react-hook-form'
import { Button, Input, Form as FormAntd } from 'antd'

export default function Home() {
  const ref = useRef<HTMLFormElement>()
  const [layerName, setLayerName] = useState('name of layer') // placeholder data for layer
  const [schemaContent, setSchemaContent] = useState(`
    {
      "version": 3,
      "editor": [
        {
          "field": "comment"
        },
        {
          "field": "name"
        }
      ]
    }
  `)

  const [editor, setEditor] = useState<any>(JSON.parse(schemaContent).editor) // validate ?!
  
  const formMethods = useForm({
      reValidateMode: 'onSubmit',
      defaultValues: {
        editor,
        layerName
      }
  })

  const onSubmit = useCallback(data => {
    // let result = data
    // if(typeof data.editor === 'object') {
    //   const editor = JSON.stringify(data.editor)
    //   result.editor = editor
    // }
    // console.log('result', result)
    console.log('data', data)
    console.log(data?.editor?.[1])
  }, [])

  return (
    <FormProvider {...formMethods}>
      <Form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        layout='vertical'
        ref={ref}
        style={{
          width: '900px'
        }}
      >
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
        >
          <Parent 

          />
        </FormAntd.Item>

        <Button 
          htmlType="submit"
          style={{width: '100%', height: '50px'}}
          type='primary'  
        >
          Submit
        </Button>
      </Form>
    </FormProvider>
  )
}
