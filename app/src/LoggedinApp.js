import { LinkContainer } from "react-router-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import "antd/dist/antd.css";

function App(props) {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/welcomePage">Calendar and booking system</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/activities">
              <NavItem>Add Activities</NavItem>
            </LinkContainer>
            <LinkContainer to="/activitiesView">
              <NavItem>View Activities</NavItem>
            </LinkContainer>
            <LinkContainer to="/tags">
              <NavItem>Tags</NavItem>
            </LinkContainer>
            <LinkContainer to="/Calendar">
              <NavItem>Calendar</NavItem>
            </LinkContainer>
            <LinkContainer to="/goodbyePage">
              <NavItem onClick={() => { localStorage.clear(); this.props.history.push('/') }}>Log out</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;