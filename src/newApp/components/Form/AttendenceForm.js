import React from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import {createAttendence} from '../../../graphql/mutations';
import {useHistory} from 'react-router'
import XLSX from 'xlsx';
function AttendenceForm() {
    const history = useHistory();
    const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wbname = wb.SheetNames[0];
        const ws = wb.Sheets[wbname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
    promise.then((d) => {
      d.map(async (emp) => {
        await API.graphql(graphqlOperation(
            createAttendence,{input:
                {
                 employee_id:emp.employee_id,
                 date:emp.date,
                 in_time:emp.in_time,
                 out_time:emp.out_time
                }})) .then((data) => {
          console.log('opration successfull');
          window.setTimeout(() => {
            history.push('/admin/attendence');
          }, 2000)
        }
        ).catch((err) => {
          console.log(err);
        });
      })
    });
}
const cancelHandler = () => {
    history.push('/admin/attendence');
  }
    return (
        <Form>
        <div className='px-5' style={{ display: 'flex', flexDirection: 'row', gap: '3vw', marginLeft: '13vw' }}>
                <Form.Group as={Row}>
                  <Col sm={{ span: 10, offset: 2 }} className="form-input">
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        readExcel(file);
                      }}
                      required
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} id="form-submit-button" >
                  <Col sm={{ span: 10, offset: 2 }} >
                    <Button  className='bg-light' onClick={cancelHandler}>Cancel</Button>
                  </Col>
                </Form.Group>
              </div>
              </Form>
    )
}

export default AttendenceForm
