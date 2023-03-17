
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Modal, Table } from "react-bootstrap";
import { baseURL, depositRequests } from "../../../Strings/Strings";
import PageTitle from "../../layouts/PageTitle";

function DepositHistory() {
  const [data, setData] = useState([]);

  
  return (
    <div>
      <PageTitle motherMenu="Admin" activeMenu="Deposit History" />
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Deposit History</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th className="width80">
                    <strong>#</strong>
                  </th>

                  <th>
                    <strong>DEPOSIT AMOUNT</strong>
                  </th>
                  <th>
                    <strong>DATE</strong>
                  </th>
                  <th>
                    <strong>STATUS</strong>
                  </th>
                  <th>
                    <strong>REASON</strong>
                  </th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((req, ind) => {
                  return (
                    <tr>
                      <td>
                        <strong>{ind + 1}</strong>
                      </td>
                      <td>$ {req?.amount?.toFixed(2)}</td>
                      <td>
                        {req?.request_status == "Pending"
                          ? moment(req?.requested_at).format(
                              "YYYY-MM-DD hh:mm a"
                            )
                          : moment(req?.updated_at).format(
                              "YYYY-MM-DD hh:mm a"
                            )}
                      </td>
                      <td>
                        <Badge
                          variant={`${
                            req?.request_status === "Rejected"
                              ? "danger light"
                              : req?.request_status === "Approved"
                              ? "success light"
                              : "warning light"
                          }`}
                        >
                          {" "}
                          {req?.request_status}
                        </Badge>
                      </td>
                      <td>
                        {req?.request_status === "Rejected" &&
                          req?.status_description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default DepositHistory;
