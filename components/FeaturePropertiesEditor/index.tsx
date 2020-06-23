import { memo, useCallback, useMemo } from 'react'

import { FeaturePropertyForm } from './PropertyTable'

export interface IFeaturePropertiesEditorProps {
    style?: React.CSSProperties
}

export const FeaturePropertiesEditor: React.FC<any> = memo(props => {
    console.log(props.data)
    const fields = props.data // null // useSelector(activeFeatureLayerSchemaFieldsSelector)
    const feature = null
    // {
    //     properties: {
    //         groupSize: 'TEST',
    //         male: 'молодежь (18-30)'
    //     }
    // }
    const featureId = 123 // useSelector(activeFeatureIdSelector)
    const onSubmit = () => null
    // const validateFeatureForm = React.useCallback((values, formProps) => {
    //     return Object.entries(values).reduce(
    //         (acc, item: [string, any]) => {
    //             const [key, value] = item
    //             const field = getField(key, formProps.fields)
    //             const type = field ? field.type : null

    //             if (type === 'number') {
    //                 if (isNaN(value)) {
    //                     return { ...acc, [key]: `should be number` }
    //                 }
    //             }

    //             if (value !== undefined) {
    //                 dispatch(changeFeatureProperty(featureId, key, value))
    //             }

    //             return { ...acc }
    //         },
    //         {},
    //     )
    // }, [featureId])

    const initialValues = useMemo(() => {
        return fields.reduce((acc, { field }) => ({
            ...acc,
            [field]: feature?.properties?.[field] ?? null,
        }), {})
    }, [feature, fields])
    console.log(fields)

    return (
        <FeaturePropertyForm
            key={featureId}
            style={props.style}
            fields={fields}
            initialValues={initialValues}
            onSubmit={onSubmit}
        />
    )
})
