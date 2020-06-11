import AceEditor from "react-ace";
import { Tabs } from 'antd';
import { Constructor } from "../Constructor";
import { useFormContext } from "react-hook-form";

const { TabPane } = Tabs 

interface IParentProps {
    initial?: any
}

export const Parent: React.FC<IParentProps> = props => {

    const { watch, getValues, reset } = useFormContext()

    return (
        <>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <AceEditor
                style={{
                    border: '1px solid black'
                }}
                mode='json'
                value={JSON.stringify(watch({nest: true}).editor, null, '   ')} // watch('editor') is 1 action behind
                onChange={(value, e) => reset({ editor: JSON.parse(value) })} // VALIDATE ! ! !
            />
            <Tabs defaultActiveKey="1">
                <TabPane tab="FORM" key="1">
                    <Constructor />
                </TabPane>
            </Tabs>
            
            <div>
                INITIAL FORM SATATE <br/><br/>
                {JSON.stringify(props.initial, null, ' ')}
            </div>
        </div>
        </>
    )
}