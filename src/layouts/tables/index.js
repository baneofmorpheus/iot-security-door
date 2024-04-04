/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import mqtt from 'mqtt';
import SoftBadge from "components/SoftBadge";
import team2 from "assets/images/team-2.jpg";

// Data
import { Author, Function } from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";
function Tables() {
  const { columns: prCols, rows: prRows } = projectsTableData;

  const [accessControlLog, setAccessControlLog] = useState([])
  const [accessControlRows, setAccessControlRows] = useState([])


  const accessControlColumns = [
    { name: "user", align: "left" },
    { name: "method", align: "left" },
    { name: "status", align: "center" },
    { name: "timestamp", align: "center" },
    { name: "action", align: "center" },
  ]


  useEffect(() => {

    const newRows = accessControlLog.map((singleLog) => {

      return {
        user: <Author image={team2} name={singleLog[1]} />,
        method: <Function job={singleLog[2]} />,
        status: (
          <SoftBadge variant="gradient" badgeContent={parseInt(singleLog[3]) == 1 ? "Successful" : "Unsuccessful"} color={parseInt(singleLog[3]) == 1 ? "success" : "error"} size="xs" container />
        ),
        timestamp: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {singleLog[4]}
          </SoftTypography>
        ),
        action: (
          <SoftTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            {/* Edit */}
          </SoftTypography>
        ),
      }
    })

    setAccessControlRows(newRows)

  }, [accessControlLog])
  useEffect(() => {

  


    const client = mqtt.connect('wss://77c65c2c917f4380a4d5420b70681b45.s2.eu.hivemq.cloud:8884/mqtt', {
      username: 'genii',
      // protocol: 'mqtts',
      password: '#7Z8vWvi!ywsfM6',
      // port: 8883,
    });


    client.on('message', (topic, message) => {
      console.log('received new msg');

      const formattedMsg = JSON.parse(message.toString())
      console.log(formattedMsg);
      setAccessControlLog(formattedMsg)



    });
    client.on('connect', () => {

      console.log(`Connected to client`);

      client.subscribe('raspberry/update');
      client.publish('raspberry/init', '1');
    });

    client.on('error', (error) => {
      console.log(`Error to`);
      console.log(error);
    });
  }, [])


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Recent Logins</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={accessControlColumns} rows={accessControlRows} />
            </SoftBox>
          </Card>
        </SoftBox>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Users</SoftTypography>
          </SoftBox>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
