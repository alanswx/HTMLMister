import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../config.js";
import queryString from "query-string";
import { withRouter } from "react-router";

class RomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manifest: null,
      rom: null
    };
  }

  loadDirectoryListing = (dir, rom) => {
    console.log(SERVER_URL);
    let url;
    if (dir)
      url =
        SERVER_URL + "/api/filesearch?ext=" + rom + "&name=/media/fat/" + dir;
    else url = SERVER_URL + "/api/filesearch?ext=" + rom + "&name=/media/fat/";
    window
      .fetch(url)
      .then(response => response.text())
      .then(manifest => {
        const json = JSON.parse(manifest);
        console.log(json);
        this.setState({
          manifest: json
        });
      });
  };

  componentWillReceiveProps(newProps) {
    if (this.props.dir !== newProps.dir) {
      this.loadDirectoryListing(newProps.dir, this.state.rom);
    }
  }
  componentWillMount() {
    console.log(this.props);
    console.log(this.props.location.search);
    const values = queryString.parse(this.props.location.search);
    console.log(values.rom); // "top"
    this.setState({ rom: values.rom });
    this.loadDirectoryListing(this.props.dir, values.rom);
  }
  render() {
    const { manifest } = this.state;
    console.log(this.props);
    if (manifest) {
      console.log(manifest);
      console.log(manifest["files"]);
    }
    const coreList = manifest
      ? Object.keys(manifest["files"]).map((val, index, arr) => {
          const name = manifest["files"][val]["name"];
          const type = manifest["files"][val]["type"];

          if (type === "dir") {
            return (
              <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>
                  <Link to={name + "/?rom=" + this.state.rom}>Dir</Link>
                </Table.Cell>
              </Table.Row>
            );
          } else {
            let load_url;
            if (this.props.dir)
              load_url =
                SERVER_URL +
                "/api/loadfile?name=" +
                this.props.dir +
                "/" +
                name;
            else load_url = SERVER_URL + "/api/loadfile?name=" + name;

            return (
              <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>
                  <a href={load_url}>Load File</a>
                </Table.Cell>
              </Table.Row>
            );
          }
        })
      : null;

    return (
      <div>
        <h1>Roms List</h1>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Title </Table.HeaderCell>
              <Table.HeaderCell> Action </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{coreList}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default withRouter(RomList);
