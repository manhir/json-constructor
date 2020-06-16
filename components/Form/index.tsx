
import cx from 'classnames'
import { FormEvent, forwardRef } from 'react'

export interface IFormProps {
    children?: React.ReactNode
    style?: React.CSSProperties
    onSubmit: (event: FormEvent) => void
    layout: 'vertical'
}

export const Form = forwardRef<HTMLFormElement, IFormProps>((props, ref) => {
    return (
        <form
            ref={ref}
            onSubmit={props.onSubmit}
            className={cx('ant-form', 'ant-form-vertical')}
            style={props.style}
        >
            {props.children}
        </form>
    )
})