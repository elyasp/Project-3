import React, { Component } from "react";
import { Link } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default class ItemView extends Component {
  render() {
    return (
      <Card
        className="mt-5 border-0 mx-auto text-center"
        style={{ width: "90%" }}
      >
        <Carousel className="mx-auto" style={{ width: "100%" }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/1600x900/?key"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/1600x900/?key"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/1600x900/?key"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <Card.Body className="px-0">
          <Card.Title className="mt-3" style={{ fontSize: "2.6rem" }}>
            Card Title
          </Card.Title>
          <Card.Subtitle className="mt-3" style={{ fontSize: "1.5rem" }}>
            Location Found: Somewhere
          </Card.Subtitle>
          <Card.Text className="mt-3" style={{ fontSize: "1.25rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Card.Text>
          <Link className="mx-3 btn btn-danger" variant="primary">
            Claim!
          </Link>
          <div>
            <Link
              to="/item/:id/edit"
              className="mx-3 btn btn-danger"
              variant="primary"
            >
              Edit
            </Link>
            <Link className="mx-3 btn btn-danger" variant="primary">
              Mark as Resolved
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
