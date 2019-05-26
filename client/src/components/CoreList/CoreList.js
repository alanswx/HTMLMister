import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class CoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manifest: null
    };
  }

  loadDirectoryListing = dir => {
    const url = dir
      ? `/api/filesearch?ext=rbf&name=/media/fat/${dir}`
      : "/api/filesearch?ext=rbf&name=/media/fat/";

    axios(url).then(({ data }) => {
      console.log(data);
      this.setState({
        manifest: data
      });
    });
  };

  componentWillReceiveProps(newProps) {
    if (this.props.dir !== newProps.dir) {
      this.loadDirectoryListing(newProps.dir);
    }
  }
  componentWillMount() {
    this.loadDirectoryListing(this.props.dir);
  }
  render() {
    const { manifest } = this.state;
    console.log(this.props);

    if (manifest) {
      console.log(manifest);
      console.log(manifest["files"]);
    }

    const coreList = manifest
      ? Object.keys(manifest["files"]).map(val => {
          const name = manifest["files"][val]["name"];
          const type = manifest["files"][val]["type"];
          if (type === "dir") {
            return (
              <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>
                  <Link to={name}>Dir</Link>
                </Table.Cell>
              </Table.Row>
            );
          } else {
            const load_url = this.props.dir
              ? `/api/loadcore?name=${this.props.dir}/${name}`
              : `/api/loadcore?name=${name}`;

            return (
              <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>
                  <a href={load_url}>Launch Core</a>
                </Table.Cell>
              </Table.Row>
            );
          }
        })
      : null;

    return (
      <div>
        <h1>Core List</h1>

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

export default CoreList;
