import React, { Component } from "react";
import { Table, Menu, Button, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SERVER_URL = `http://${process.env.REACT_APP_MISTER_HOST}`;

class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: null
    };
  }

  loadCurrentInfo = () => {
    const url = SERVER_URL + "/api/getconfig";

    window
      .fetch(url)
      .then(response => response.text())
      .then(config => {
        const json = JSON.parse(config);
        console.log(json);
        // should we clean up the config here?
        this.setState({
          config: json
        });
      });
  };

  componentWillMount() {
    this.loadCurrentInfo();
  }
  render() {
    const { config } = this.state;
    if (config) {
      console.log(config);
    }
    let Code = "";

    const configList = config
      ? Object.keys(config).map((val, index, arr) => {
          const config_line = config[index][index];
          let cell = <Table.Cell>{config_line}</Table.Cell>;
          let parts;

          if (index === 0) {
            Code = config_line;
            cell = (
              <Table.Cell>
                <b>{config_line}</b>
              </Table.Cell>
            );
          } else if (config_line === "(null)") {
            return;
          } else {
            switch (config_line[0]) {
              case "-":
                cell = <Table.Cell />;
                break;
              case "F":
                parts = config_line.split(",");
                //let url = SERVER_URL+'/api/filesearch?ext='+parts[1]+'&name=/media/fat/'+Code;
                let url = "/roms/" + Code + "/?rom=" + parts[1];
                return (
                  <Table.Row>
                    <Table.Cell>{"File Load"}</Table.Cell>
                    <Table.Cell>
                      <Button as={Link} name="Rom List" to={url}>
                        {parts[1]}
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
                break;
              case "O":
                parts = config_line.split(",");
                let dropdown = parts.slice(2).map(value => {
                  return { key: value, text: value, value: value };
                });
                let drop_title = parts[1];
                return (
                  <Table.Row>
                    <Table.Cell>{"Option: " + drop_title}</Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder={drop_title}
                        fluid
                        labeled
                        selection
                        options={dropdown}
                      />
                    </Table.Cell>
                  </Table.Row>
                );

                break;
              case "J":
                cell = <Table.Cell>{"Joystick"}</Table.Cell>;
                break;
              case "V":
                cell = <Table.Cell>{"Version:" + config_line}</Table.Cell>;
                break;
              case "R":
                cell = <Table.Cell>{"Reset"}</Table.Cell>;
                break;
            }
          }

          return <Table.Row>{cell}</Table.Row>;
        })
      : null;

    return (
      <div>
        <h1>Core Information</h1>
        <Menu>
          <Menu.Item as={Link} name="Core List" to="/cores/">
            Core List
          </Menu.Item>
        </Menu>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Title </Table.HeaderCell>
              <Table.HeaderCell> Action </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{configList}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default Current;
