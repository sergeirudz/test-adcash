"use client";
import { useCreateCampaign } from "@/components/dashboard/campaigns/create/CreateCampaignContextProvider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CreateCampaign from "@/components/dashboard/campaigns/create/step5/CreateCampaign";
import { countries } from "../config";

const Overview = () => {
  const { campaignData } = useCreateCampaign();
  const { campaignName, adCreatives = [], campaignGoals = [] } = campaignData;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader title="Campaign Overview" />
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1">
            <strong>Campaign Name:</strong> {campaignName || "Not specified"}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Ad Creatives
        </Typography>
        {adCreatives && adCreatives.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>URL</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Creative Type</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adCreatives.map((creative, index) => (
                  <TableRow key={index}>
                    <TableCell>{creative.url}</TableCell>
                    <TableCell>{creative.creativeType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography color="text.secondary">No ad creatives added</Typography>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Campaign Goals
        </Typography>
        {campaignGoals && campaignGoals.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Country</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Payout</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaignGoals.map((goal, index) => {
                  const countryInfo = countries.find(
                    (country) => country.code === goal.countryCode,
                  );

                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {goal.countryCode === "WW" ? (
                          "Worldwide"
                        ) : (
                          <Box display="flex" alignItems="center">
                            <img
                              loading="lazy"
                              width="20"
                              height="14"
                              src={`https://flagcdn.com/w20/${goal.countryCode.toLowerCase()}.png`}
                              alt=""
                              style={{ marginRight: 8 }}
                            />
                            {countryInfo ? countryInfo.label : goal.countryCode}
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>${goal.payoutSum.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography color="text.secondary">
            No campaign goals added
          </Typography>
        )}
      </CardContent>

      <CreateCampaign />
    </Card>
  );
};

export default Overview;
