import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useAuthStore from "../stores/authStore";
import useAdminPageStore from "../stores/adminPageStore";
import AdminPicker from "../admincomponents/AdminPicker";

// Import admin components
import AddQuestion from "../admincomponents/AddQuestion";
import DeleteQuestion from "../admincomponents/DeleteQuestion";
import GetAllQuestions from "../admincomponents/GetAllQuestions";
import GetQuestionById from "../admincomponents/GetQuestionById";
import TopicDetails from "../admincomponents/TopicDetails";
import GetAllTopics from "../admincomponents/GetAllTopics";
import UpdateQuestion from "../admincomponents/UpdateQuestion";

const AdminPage = () => {
  const theme = useTheme();
  const { role } = useAuthStore();
  const { currentPage } = useAdminPageStore();

  const renderComponent = () => {
    switch (currentPage) {
      case "Picker":
        return <AdminPicker />;
      case "AddQuestion":
        return <AddQuestion />;
      case "DeleteQuestion":
        return <DeleteQuestion />;
      case "GetAllQuestions":
        return <GetAllQuestions />;
      case "GetQuestionById":
        return <GetQuestionById />;
      case "TopicDetails":
        return <TopicDetails />;
      case "GetAllTopics":
        return <GetAllTopics />;
      case "UpdateQuestion":
        return <UpdateQuestion />;
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
      {role === "admin" && renderComponent()}
    </Box>
  );
};

export default AdminPage;
