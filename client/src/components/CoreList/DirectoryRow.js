import React, { Fragment } from "react";
import { Icon, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

const BlockLink = props => <Link className="BlockLink" {...props} />;

const DirectoryName = ({ children: directoryName }) => (
  <Fragment>{directoryName.replace(/^_/g, "")}</Fragment>
);

const DirectoryRow = ({ name }) => (
  <Table.Row>
    <Table.Cell>
      <BlockLink to={name}>
        <Icon name="folder outline" /> <DirectoryName>{name}</DirectoryName>
      </BlockLink>
    </Table.Cell>
  </Table.Row>
);

export default DirectoryRow;
