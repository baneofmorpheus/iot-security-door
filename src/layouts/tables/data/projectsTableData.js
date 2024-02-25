/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

const projectsTableData = {
  columns: [
    { name: "name", align: "left" },
    { name: "method", align: "left" },
    { name: "status", align: "left" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      name: <SoftTypography variant="caption" color="text" fontWeight="medium">
        John Doe
      </SoftTypography>,
      method: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
        PIN <br/>
        FiNGERPRINT
        </SoftTypography>
      ),
      status: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          Active
        </SoftTypography>
      ),
      action,
    },
    {
      name: <SoftTypography variant="caption" color="text" fontWeight="medium">
        Jane Doe
      </SoftTypography>,
      method: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
        PIN <br/>
        FiNGERPRINT
        </SoftTypography>
      ),
      status: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          InActive
        </SoftTypography>
      ),
      action,
    },

  ],
};

export default projectsTableData;
