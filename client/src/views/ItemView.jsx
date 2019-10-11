import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import MessageSent from "./MessageSentView";

import Carousel from "react-bootstrap/Carousel";
import { Card, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import { remove } from "./../services/itemApi";
import { edit } from "../services/itemApi";
import { load } from "../services/itemApi";
import Map from "../components/ItemMap";

import LostContactForm from "../components/LostContactForm";
import FoundContactForm from "../components/FoundContactForm";
import styled from "styled-components";

//////////////////////// STYLE ////////////////////////

const PageWrapper = styled.div`
  font-weight: 400;
  margin-bottom: 10vh;

  .accessdenied {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

const CardWrapper = styled.div`
  color: black;
  width: 80%;
  border-radius: 2px;
  margin: 0 auto;
  box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
    10px 10px 30px 15px rgba(0, 0, 0, 0.22);

  .map {
    display: flex;
    justify-content: center;
  }

  .editbutton {
    max-height: 4em;
  }
  .markbutton {
    padding: 1em 3em;
    min-height: 4em;
    max-height: 4em;
  }
`;

const MailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  font-weight: 600;
`;

const Button = styled.button`
  width: 100%;
  border: 1px solid black;

  min-height: 3em;
  margin: 1em 0;
  border-radius: 5px;
  background-color: white;
  color: black;

  &:hover {
    color: black;
    background: hsla(360, 100%, 49%, 0.34);
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30vh;

  h3 {
    font-size: 50px;
    font-weight: 200;
  }
`;
const TextStyler = styled.div`
  text-shadow: 1px 1px 9px #000;
  text-align: center;
`;

const FoundCardHeader = styled.div`
  background: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h4 {
    margin-top: 0.2em;
    color: #5bf7a9;
    font-family: "Courier New", Courier, monospace;
    letter-spacing: 0.3em;
  }
`;

const LostCardHeader = styled.div`
  background: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h4 {
    margin-top: 0.2em;
    color: #ff3c00;
    font-family: "Courier New", Courier, monospace;
    letter-spacing: 0.3em;
  }
`;

//////////////////// END OF STYLE ////////////////////

export default class FoundItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      contactnumber: "",
      email: "",
      message: "",
      ownerCheckAns: "",
      sent: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loadItem() {
    load(this.props.match.params.id)
      .then(item => {
        this.setState({
          item
        });
      })
      .catch(error => {
        this.props.history.push(
          `/error/${error.response ? error.response.status : "404"}`
        );
      });
  }

  deleteItem(event) {
    event.preventDefault();
    const id = this.props.match.params.id;
    remove(id)
      .then(item => {
        this.props.history.push(`/`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { contactnumber, email, message, ownerCheckAns } = this.state;
    const receiver = this.state.item && this.state.item.user.email;
    const verifQuestion = this.state.item && this.state.item.ownerCheck;
    const name = this.props.user.name;
    const form = await axios
      .post("/api/mailsent", {
        name,
        email,
        message,
        receiver,
        contactnumber,
        ownerCheckAns,
        verifQuestion
      })
      .then(() => {
        this.setState({
          sent: true
        });
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  }

  componentDidMount() {
    this.loadItem();
  }

  render() {
    const containerStyle = { height: "200px", width: "85%" };
    const item = this.state.item && this.state.item;
    const user = this.props.user;

    return (
      (item && (
        <PageWrapper className="container">
          {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
          <CardWrapper>
            <Card className="mt-5 border-0 mx-auto text-center">
              {item.itemStatus === "Found" ? (
                <FoundCardHeader>
                  <h4>᛫ FOUND ᛫</h4>
                </FoundCardHeader>
              ) : (
                <LostCardHeader>
                  <h4>᛫ LOST ᛫</h4>
                </LostCardHeader>
              )}
              <Carousel className="mx-auto" style={{ width: "100%" }}>
                {item.imageUrl.map(item => (
                  <Carousel.Item key={item._id}>
                    <img
                      className="d-block w-100"
                      src={item.image}
                      alt="First slide"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <Card.Body className="px-0">
                <Card.Title className="" style={{ fontSize: "2.6rem" }}>
                  {item.title}
                </Card.Title>

                <Card.Text className="mt-3" style={{ fontSize: "1.25rem" }}>
                  {item.description}
                </Card.Text>

                {user && item && item.user._id === user._id && (
                  <div className="container">
                    <Row>
                      <Col m={6}>
                        <Button className="h-100 editbutton">
                          <Link
                            to={`/item/${item._id}/edit`}
                            className="w-100 text-body"
                          >
                            Edit
                          </Link>
                        </Button>
                      </Col>
                      <Col m={6}>
                        <Button
                          className="markbutton"
                          onClick={this.deleteItem}
                        >
                          Mark As Resolved
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Card.Body>
            </Card>
          </CardWrapper>
          <br />
          <br />
          <h5 className="mt-4 text-center">
            Approximate Location {item.itemStatus}
          </h5>
          <br />

          <div className="mx-auto mt-3 map" style={{ width: "100%" }}>
            <Map item={item.location} />
          </div>

          {this.props.user &&
          this.props.user.email !== this.state.item.user.email ? (
            <div className="container">
              {!this.state.sent ? (
                <MailWrapper>
                  {this.state.item.itemStatus === "Found" ? (
                    <LostContactForm
                      form={this.handleSubmit}
                      change={this.handleChange}
                      check={this.state.item.ownerCheck}
                    />
                  ) : (
                    <FoundContactForm
                      form={this.handleSubmit}
                      change={this.handleChange}
                    />
                  )}
                </MailWrapper>
              ) : (
                <div>
                  <br />
                  <MessageSent />
                  <br />
                  <br />
                  <br />
                </div>
              )}
            </div>
          ) : this.props.user &&
            this.props.user.email === this.state.item.user.email ? (
            <div className="accessdenied mt-4">
              <TextStyler>
                <h5>
                  Your object has been published and is waiting to be spotted!
                </h5>
              </TextStyler>
            </div>
          ) : (
            <div className="accessdenied">
              <h5 className="text-center">Login or sign up to contact </h5>
              <Link to="/login">
                <Button>LOG IN</Button>
              </Link>
              <Link to="/register">
                <Button>REGISTER</Button>
              </Link>
            </div>
          )}
        </PageWrapper>
      )) || (
        <Center>
          <h3> Item Loading...</h3>
        </Center>
      )
    );
  }
}
