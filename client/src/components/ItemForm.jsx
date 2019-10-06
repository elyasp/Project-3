import React, { Component } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { uploadImage } from "./../services/itemApi";

//;'[]

export default class ItemFormView extends Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.onButtonValueChange = this.onButtonValueChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.onValueChange({
      [name]: value
    });
  }

  onButtonValueChange(event) {
    const name = event.target.name;
    const value = event.target.id;
    this.props.onValueChange({
      [name]: value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit();
  }

  handleFileUpload = e => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    console.log("The file to be uploaded is: ");

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    uploadImage(uploadData)
      .then(response => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Form.Group>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input "
              type="radio"
              name="itemStatus"
              id="Found"
              onChange={this.onButtonValueChange}
            />
            <label className="form-check-label" for="exampleRadios1">
              Found Item
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="itemStatus"
              id="Lost"
              onChange={this.onButtonValueChange}
            />
            <label className="form-check-label" for="exampleRadios2">
              Lost Item
            </label>
          </div>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Post Title"
            value={this.props.value.title}
            onChange={this.onValueChange}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            name="description"
            placeholder="Add a detailed description"
            size="lg"
            value={this.props.value.description}
            onChange={this.onValueChange}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Upload Your Images</Form.Label>
          <Form.Control
            as="input"
            type="file"
            name="imageUrl"
            size="lg"
            className="btn-lg pl-0"
            onChange={e => this.handleFileUpload(e)}
            value={this.props.value.imageUrl}
          />
        </Form.Group>
        {this.props.children}
      </Form>
    );
  }
}
