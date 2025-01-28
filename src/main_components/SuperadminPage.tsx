import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useAuthStore from "../stores/authStore";
import useQuestionPageStore from "../stores/questionPageStore";
import AddQuestion from "../questions components/AddQuestion";
import GetAllQuestions from "../questions components/GetAllQuestions";
import GetQuestionById from "../questions components/GetQuestionById";
import UpdateQuestion from "../questions components/UpdateQuestion";
import DeleteQuestion from "../questions components/DeleteQuestion";
import DeleteAllQuestions from "../questions components/DeleteAllQuestions";
import Picker from "../questions components/Picker";

const SuperadminPage = () => {
  const theme = useTheme();
  const { role } = useAuthStore();
  const { currentPage } = useQuestionPageStore();

  const renderComponent = () => {
    switch (currentPage) {
      case "Picker":
        return <Picker />;
      case "AddQuestion":
        return <AddQuestion />;
      case "GetAllQuestions":
        return <GetAllQuestions />;
      case "GetQuestionById":
        return <GetQuestionById />;
      case "UpdateQuestion":
        return <UpdateQuestion />;
      case "DeleteQuestion":
        return <DeleteQuestion />;
      case "DeleteAllQuestions":
        return <DeleteAllQuestions />;
      default:
        return null;
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
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3">Welcome, Superadmin!</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          You have full control over the system.
        </Typography>
      </Box>

      {role === "superadmin" && renderComponent()}
    </Box>
  );
};

export default SuperadminPage;