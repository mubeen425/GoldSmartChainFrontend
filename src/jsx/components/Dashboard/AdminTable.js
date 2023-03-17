import React from "react";
import { Badge, Button, Card, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminTable() {
  return (
    <div>
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Users Request</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Deposit Amount</th>
                  <th>Time</th>
                  <th>Confirm</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to="/table-bootstrap-basic">Airi Satou</Link>
                  </td>

                  <td>
                    <span className="text-muted">$162,700</span>
                  </td>
                  <td>2008/11/28</td>
                  <td>
                    <Button className="me-2" variant="outline-primary">
                      Confirm
                    </Button>
                  </td>
                  <td>
                    <Button className="me-2" variant="outline-danger">
                      Cancel
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/table-bootstrap-basic">Angelica Ramos</Link>
                  </td>
                  <td>
                    <span className="text-muted">$1,200,000</span>
                  </td>
                  <td>2009/10/09</td>
                  <td>
                    <Button className="me-2" variant="outline-primary">
                      Confirm
                    </Button>
                  </td>
                  <td>
                    <Button className="me-2" variant="outline-danger">
                      Cancel
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/table-bootstrap-basic">Bradley Greer</Link>
                  </td>

                  <td>
                    <span className="text-muted">$86,000</span>
                  </td>
                  <td>2009/01/12</td>
                  <td>
                    <Button className="me-2" variant="outline-primary">
                      Confirm
                    </Button>
                  </td>
                  <td>
                    <Button className="me-2" variant="outline-danger">
                      Cancel
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/table-bootstrap-basic">Cedric Kelly</Link>
                  </td>
                  <td>
                    <span className="text-muted">$132,000</span>
                  </td>
                  <td>2012/10/13</td>
                  <td>
                    <Button className="me-2" variant="outline-primary">
                      Confirm
                    </Button>
                  </td>
                  <td>
                    <Button className="me-2" variant="outline-danger">
                      Cancel
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default AdminTable;
