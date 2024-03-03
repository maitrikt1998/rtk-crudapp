import axios from "axios";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { Button, Container } from "react-bootstrap";
// import { getAllCars, getLoading, allCarsReceived, allCarsLoading } from "../features/cars/carslice";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchALLCars,getAllCars,getLoading } from "../features/cars/carslice";
import { useNavigate } from "react-router-dom";

const AllCars = () => {
    const navigate = useNavigate();
    const allCars = useSelector(getAllCars);
    const apiStatus = useSelector(getLoading);
    const dispatch = useDispatch();
    let contentToRender = "";

//     useEffect(()=> {
//         const invokeAllCarsAPI = async() => {
//                 dispatch(allCarsLoading);
//                 const apiResponse = await axios.get("http://localhost:4000/cars");
//                 dispatch(allCarsReceived(apiResponse.data));
//         };
        
//         invokeAllCarsAPI();
//     }, [dispatch]);
    useEffect(() => {
        dispatch(fetchALLCars());
    }, [dispatch]);
    
   contentToRender =  
    apiStatus === "pending" ? (
        <>
          <div className="d-flex align-items-center justify-content-center">
                <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                </Spinner>
          </div>
        
        </>
    ):(
        <>
        <Row xs={1} md={3} className="g-4">
                {allCars.map((car)=>(
                        <Col key={car.id}>
                        <Card>
                                <Card.Img variant="top" src={car.imageUrl} />

                                <Card.Body>
                                        <Card.Title>{car.name}</Card.Title>
                                        <Card.Text>Model Year - {car.year}</Card.Text>
                                </Card.Body>
                        </Card>
                        </Col>
                ))}
        </Row>
        </>
    );
    return(
        <Container className="mt-2">
                <Row>
                        <Col className="col-md-4 offset-md-4">
                                <Button variant="dark" type="button" onClick={()=>{navigate("/add-car")}}>Add New Car</Button>
                        </Col>
                </Row>
                <Row>{contentToRender}</Row>
        </Container>
    );
        
};

export default AllCars;