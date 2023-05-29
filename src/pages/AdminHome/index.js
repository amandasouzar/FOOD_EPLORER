import {DefaultAdmin} from '../DefaultAdmin'
import { PlatesCarousel } from '../../components/PlatesCarousel'

export const AdminHome = (props) => {
    return <DefaultAdmin>
        <PlatesCarousel categories={props.categories} admin={true}/>
    </DefaultAdmin>
}