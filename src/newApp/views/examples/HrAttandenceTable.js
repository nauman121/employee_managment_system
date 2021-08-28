import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listAttendences } from "../../../graphql/queries";
// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  InputGroupText,
  InputGroup,
  InputGroupAddon,
  UncontrolledTooltip,
} from "reactstrap";
import "react-bootstrap";
// core components
import Header from "../../components/Headers/Header.js";
import { useHistory } from "react-router";

const HrAttendenceTable = () => {
  const [getAttendence, setGetAttendence] = React.useState([]);
  const history = useHistory();
  const fetchData = async () => {
    try {
      const attendenceData = await API.graphql(
        graphqlOperation(listAttendences)
      );
      const Ldata = attendenceData.data.listAttendences.items;
      setGetAttendence(Ldata);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  const clickHandler = (e) => {
    e.preventDefault();
    history.push("/addattendence");
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--5" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader
                className="border-5"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <button
                  id='button1'
                  class="btn btn-white mx-2"
                  type="submit"
                  onClick={clickHandler}
                >
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
                <UncontrolledTooltip
                  style={{ backgroundColor: "yellow",color:'black' }}
                  placement="right"
                  target="button1"
                >
                  Add new employee
                </UncontrolledTooltip>
                <InputGroup
                  className="input-group-alternative"
                  style={{ width: "30vw", boxShadow: "1px 1px 2px lightGray" }}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">In Time</th>
                    <th scope="col">Out Time</th>
                    <th scope="col" />
                  </tr>
                </thead>

                <tbody>
                  {getAttendence.map((atten, i) => {
                    return (
                      <>
                        <tr key={i}>
                          <td style={{ fontSize: "12px" }}>
                            {atten.employee.full_name}
                          </td>
                          <td style={{ fontSize: "12px" }}>{atten.date}</td>
                          <td style={{ fontSize: "12px" }}>{atten.in_time}</td>
                          <td style={{ fontSize: "12px" }}>{atten.out_time}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default HrAttendenceTable;
