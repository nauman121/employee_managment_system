import React from "react";
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
    // UncontrolledTooltip,
   
} from "reactstrap";
import 'react-bootstrap';
 // core components
import Header from "../../components/Headers/Header.js";
const AttendenceTable = () => {
  
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--5" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-5" style={{display:'flex',flexDirection:'row'}}>
              <InputGroup className="input-group-alternative" style={{width:'30vw',boxShadow:'1px 1px 2px lightGray'}}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText >
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">In Time</th>
                    <th scope="col">Out Time</th>
                    <th scope="col" />
                  </tr>
                </thead>
                   <td style={{fontSize:'12px'}}> </td>
                    <td style={{fontSize:'12px'}}></td>
                    <td style={{fontSize:'12px'}}></td>
                <tbody>
        
                </tbody>
              </Table>
             
            </Card>
          </div>
        </Row>   
      </Container>
    </>
  );
};

export default AttendenceTable;