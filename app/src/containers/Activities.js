import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Activities.css";

export default function NewActivity(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");

  function validateForm() {
    return title.length > 0 && description.length > 0 && url.length > 0 && location.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Box">
        <div className="NewActivity">
        <form onSubmit={handleSubmit}>
            <FormGroup controlId="title" bsSize="large">
            <ControlLabel>Title</ControlLabel>
            <FormControl
                autoFocus
                type="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            </FormGroup>
            <FormGroup controlId="description" bsSize="large">
            <ControlLabel>Description</ControlLabel>
            <FormControl
                value={description}
                onChange={e => setDescription(e.target.value)}
                type="description"
            />
            </FormGroup>
            <FormGroup controlId="url" bsSize="large">
            <ControlLabel>URL</ControlLabel>
            <FormControl
                value={url}
                onChange={e => setUrl(e.target.value)}
                type="url"
            />
            </FormGroup>
            <FormGroup controlId="location" bsSize="large">
            <ControlLabel>Location</ControlLabel>
            <FormControl
                value={location}
                onChange={e => setLocation(e.target.value)}
                type="location"
            />
            </FormGroup>
            <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Add Activity
            </Button>
        </form>
        </div>

        <div className="ViewActivity">
        <form onSubmit={handleSubmit}>
            <FormGroup controlId="title" bsSize="large">
            <ControlLabel>Title</ControlLabel>
            <FormControl
                autoFocus
                type="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            </FormGroup>
            <FormGroup controlId="description" bsSize="large">
            <ControlLabel>Description</ControlLabel>
            <FormControl
                value={description}
                onChange={e => setDescription(e.target.value)}
                type="description"
            />
            </FormGroup>
            <FormGroup controlId="url" bsSize="large">
            <ControlLabel>URL</ControlLabel>
            <FormControl
                value={url}
                onChange={e => setUrl(e.target.value)}
                type="url"
            />
            </FormGroup>
            <FormGroup controlId="location" bsSize="large">
            <ControlLabel>Location</ControlLabel>
            <FormControl
                value={location}
                onChange={e => setLocation(e.target.value)}
                type="location"
            />
            </FormGroup>
            <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Edit Activity
            </Button>
        </form>
        </div>
    </div>
  );
  
  
}