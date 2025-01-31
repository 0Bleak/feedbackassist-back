import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useGuestPageStore from "../stores/guestStore";
import Questionnaire from "../guestcomponents/Questionnaire";
import PickTopic from "../guestcomponents/PickTopic";
import UserInfo from "../guestcomponents/UserInfo";
import ConsentForm from "../guestcomponents/ConsentForm";
import Results from "../guestcomponents/Results";

const GuestPage = () => {
  const theme = useTheme();
  const { currentPage } = useGuestPageStore();
  
  const renderComponent = () => {
    switch (currentPage) {
      case "PickTopic":
        return <PickTopic />;
      case "UserInfo":
        return <UserInfo />;
      case "Questionnaire":
        return <Questionnaire />;
      case "ConsentForm":
        return <ConsentForm />;
      case "Results":
        return <Results />;
      default:
        return <PickTopic />;
    }
  };

  return (
    <Box
    sx={{
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    }}
    >
      {renderComponent()}
    </Box>
  );
};

export default GuestPage;