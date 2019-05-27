import React from "react";
import { Card, Icon } from "semantic-ui-react";

import getFriendlyCoreName from "./getFriendlyCoreName";

const FileCard = ({ name, href }) => (
  <Card href={href} fluid>
    <Card.Content>
      <Icon name="computer" style={{ float: "right" }} />
      <Card.Header>{getFriendlyCoreName(name)}</Card.Header>
    </Card.Content>

    <Card.Content style={{ color: "#bababa" }}>{name}</Card.Content>
  </Card>
);

export default FileCard;
