import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useAuthStore from "../stores/authStore";
import useQuestionPageStore from "../stores/superAdminPageStore";
import AddQuestion from "../superadmincomponents/AddQuestion";
import GetAllQuestions from "../superadmincomponents/GetAllQuestions";
import GetQuestionById from "../superadmincomponents/GetQuestionById";
import UpdateQuestion from "../superadmincomponents/UpdateQuestion";
import DeleteQuestion from "../superadmincomponents/DeleteQuestion";
import DeleteAllQuestions from "../superadmincomponents/DeleteAllQuestions";
import CreateAdmin from "../superadmincomponents/CreateAdmin";
import Picker from "../superadmincomponents/Picker";

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
      case "CreateAdmin":
        return <CreateAdmin/>
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
      {role === "superadmin" && renderComponent()}
    </Box>
  );
};

export default SuperadminPage;