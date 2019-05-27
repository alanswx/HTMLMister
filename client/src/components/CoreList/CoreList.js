import React, { Component } from "react";
import { Card, Table } from "semantic-ui-react";
import axios from "axios";

import "./CoreLink.css";
import FileCard from "./FileCard";
import DirectoryRow from "./DirectoryRow";

// Hide dotfiles in case any Mac users haven't removed them
const removeDotFiles = ([fileKey]) => !fileKey.startsWith(".");

const filterDirectories = ([fileKey, file]) => file.type === "dir";
const filterNonDirectories = ([fileKey, file]) => file.type !== "dir";

class CoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadDirectoryListing = dir => {
    const url = dir
      ? `/api/filesearch?ext=rbf&name=/media/fat/${dir}`
      : "/api/filesearch?ext=rbf&name=/media/fat/";

    axios(url).then(({ data }) => {
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
    const { manifest = {} } = this.state;
    const { files = {} } = manifest;

    const filesEntries = Object.entries(files).filter(removeDotFiles);
    const filesDirectories = filesEntries.filter(filterDirectories);
    const filesNonDirectories = filesEntries.filter(filterNonDirectories);

    return (
      <div>
        <h1>Core List</h1>

        {!!filesDirectories.length && (
          <Table celled style={{ marginBottom: "30px" }}>
            <Table.Body>
              {filesDirectories.map(([fileKey, file]) => (
                <DirectoryRow name={file.name} key={fileKey} />
              ))}
            </Table.Body>
          </Table>
        )}

        {!!filesNonDirectories.length && (
          <Card.Group>
            {filesNonDirectories.map(([fileKey, file]) => {
              const { name } = file;
              const load_url = this.props.dir
                ? `/api/loadcore?name=${this.props.dir}/${name}`
                : `/api/loadcore?name=${name}`;

              return <FileCard name={name} href={load_url} key={fileKey} />;
            })}
          </Card.Group>
        )}
      </div>
    );
  }
}

export default CoreList;
