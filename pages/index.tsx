import { Parent } from '../components/Parent'
import { Form } from '../components/Form'
import { useCallback, useRef, useState } from 'react'
import { FormContext, useForm, Controller } from 'react-hook-form'
import { Button } from 'antd'

export default function Home() {
  const ref = useRef<HTMLFormElement>()
  const [editor, setEditor] = useState(
    [
      {
        "field": "comment",
      },
      {
        "field": "name",
      }
    ]
  )
  
  // {
  //   "field": "comment",
  //   "label": "Comment",
  //   "view": [
  //       "text"
  //   ]
  // },
  // {
  //   "field": "name",
  //   "view": [
  //       "input"
  //   ]
  // }
  
  const formMethods = useForm({
      reValidateMode: 'onSubmit',
      defaultValues: {
        editor: editor
      }
  })

  const onSubmit = useCallback(data => console.log(JSON.stringify(data, null, '  ')), [])

  return (
    <FormContext {...formMethods}>
      <Form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        layout='vertical'
        ref={ref}
      >
        <Controller
          as={<Parent initial={editor} />}
          name='editor'
        />

        <Button htmlType="submit" style={{width: '500px', height: '50px'}}>
          Submit
        </Button>
      </Form>
    </FormContext>
  )
}
