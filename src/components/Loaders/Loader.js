import LdsRing from "./Lds-ring/Lds-ring";


export const Loader = ({center, color, kind, className}) => {
    const s = className || '';

    switch (kind) {

        case 'lds-ring':
            return <LdsRing center={!!center} color={color} className={s}/>

        default:
            return <LdsRing center={!!center} color={color} className={s}/>
    }

};