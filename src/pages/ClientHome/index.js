import {DefaultClient} from '../DefaultClient'
import { PlatesCarousel } from '../../components/PlatesCarousel'

export const ClientHome = (props) => {
    return <DefaultClient>
        <PlatesCarousel categories={props.categories} admin={false}/>
    </DefaultClient>
}