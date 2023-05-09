import React from "react";
import s from "./style.scss"
import {
    Container,
    Row,
    Col,
    Button,
    FormGroup,
    FormText,

} from "reactstrap";
import Widget from "../components/Widget/Widget.js";
import Footer from "../components/Footer/Footer.js";
import {useForm} from 'react-hook-form'
import {UrgenceKind, UrgenceLevel} from "./mock/data";
import {getLocation} from "../utilities/geo";
import logo from "../assets/urgencia.svg";
import Itinerary from "../components/Maps/Itinerary";

const Main = () => {


    const {
        register,
        handleSubmit,
        control
    } = useForm();
    const [sideShow, setSideShow] = React.useState(false)


    const submitForm = (data) => {
        let geoError = null
        setSideShow(true)
        getLocation().then((res) => {
            data['longitude'] = res[1].longitude
            data['latitude'] = res[1].latitude

        }).catch((err) => {
            geoError = err[1].errorMessage
        })
        if (geoError) {
            alert(geoError)
            return
        } else {
            console.log(data)
        }


    }

    return (
        <div className="auth-page">
            <Container className="col-12">
                <Row className="d-flex align-items-center">
                    <Col xs={12} lg={6} className="left-column">
                        <Widget className="widget-auth widget-p-lg">
                            <div className="d-flex align-items-center justify-content-between py-3">
                                <div className="logo-block">
                                    <p className="mb-0">Signaler une urgence</p>
                                </div>
                            </div>
                            <div className="auth-info my-2">
                                <p className="mb-0">
                                    ⚠️
                                    Veuillez noter que votre localisation nous seras envoyé automatiquement
                                    pour qu'on puisse déléguer une équipe de secours.

                                </p>
                            </div>


                            <form onSubmit={handleSubmit(submitForm)}>

                                <div className={"d-flex my-4"}>
                                    <FormGroup className=" mr-3">
                                        <FormText>Quelle est votre type d'urgence ?</FormText>
                                        <select name="urgenceKind" id="urgenceKind" {...register('urgenceKind')}
                                                className={"form-control mt-2"}>
                                            {UrgenceKind.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormText>Quelle est votre niveau d'urgence ?</FormText>
                                        <select name="" id="" {...register('urgenceLevel')}
                                                className={"form-control mt-2"}>
                                            {UrgenceLevel.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                </div>

                                <FormGroup>
                                    <FormText>Donner une description de votre urgence</FormText>
                                    <textarea className={"form-control mt-2"} name="" id=""
                                              {...register('content')} required/>
                                </FormGroup>
                                <div className="bg-widget d-flex justify-content-center">
                                    <Button className="rounded-pill my-3" type="submit"
                                            color="danger">Demander une urgence</Button>
                                </div>


                            </form>
                        </Widget>
                    </Col>
                    <Col xs={0} lg={6} className="right-column">
                        <div className="flip-card">
                            <div className={`flip-card-inner ${sideShow && "flip"}`}>
                                <Itinerary className={`flip-card-back rounded shadow`}/>
                                <div className={` flip-card-front`}>
                                    <img src={logo} alt="Error page"/>

                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}


export default Main;
