"use client";
import { styled } from "@mui/material/styles";
import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

const StyledToolbarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(1, 2),
}));

const ActionsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center",
}));

const CampaignsTableToolbar = () => {
  const router = useRouter();
  return (
    <StyledToolbarContainer>
      <ActionsContainer>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => router.push("/dashboard/create-campaign")}
        >
          New Campaign
        </Button>
      </ActionsContainer>
    </StyledToolbarContainer>
  );
};

export default CampaignsTableToolbar;
