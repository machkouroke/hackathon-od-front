import "./style.scss"
const LdsRing = ({center, color, className}) => {

    const cssClass = `lds-ring ${center && "center"} ${color || "primary"} ${className}`
    return (
        <div className={cssClass}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default LdsRing;