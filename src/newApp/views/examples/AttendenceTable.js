import React from "react";
import {getEmployee} from '../../../graphql/queries'
import {API,graphqlOperation} from "aws-amplify";
import {id} from '../../../App'
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
      const [attendence,setAttendence]=React.useState([]);
  const fetchData= async ()=>{
  try{
const LeavesData=await API.graphql(graphqlOperation(getEmployee,{id:id[id.length-1]}))
console.log(LeavesData);
 const data = LeavesData.data.getEmployee.attendences.items;
 setAttendence(data);
  }
  catch(error){
    console.log('error on fetching data',error);
  }
}

React.useEffect(()=>{
    fetchData();
},[])
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
                    <th scope="col">Dattte</th>
                    <th scope="col">In Time</th>
                    <th scope="col">Out Time</th>
                    <th scope="col" />
                  </tr>
                </thead>
             
                <tbody>
           {
                 attendence.map((atten,i)=>{
              return (<>  
               <tr>
                   <td style={{fontSize:'12px'}}>{atten.date}</td>
                    <td style={{fontSize:'12px'}}>{atten.in_time}</td>
                    <td style={{fontSize:'12px'}}>{atten.out_time}</td>
               </tr>
                    </>)
                 })
                }
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