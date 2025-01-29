import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useAuthStore from "../stores/authStore";
import useQuestionPageStore from "../stores/superAdminPageStore";
import AddQuestion from "../superadmincomponents/AddQuestion";
import AddQuestionToTopic from "../superadmincomponents/AddQuestionToTopic"; // Imported AddQuestionToTopic
import GetAllQuestions from "../superadmincomponents/GetAllQuestions";
import GetQuestionById from "../superadmincomponents/GetQuestionById";
import UpdateQuestion from "../superadmincomponents/UpdateQuestion";
import DeleteQuestion from "../superadmincomponents/DeleteQuestion";
import DeleteAllQuestions from "../superadmincomponents/DeleteAllQuestions";
import CreateAdmin from "../superadmincomponents/CreateAdmin";
import Picker from "../superadmincomponents/Picker";
// Import topic components
import CreateTopic from "../superadmincomponents/CreateTopic";
import DeleteTopic from "../superadmincomponents/DeleteTopic";
import EditTopic from "../superadmincomponents/EditTopic";
import GetAllTopics from "../superadmincomponents/GetAllTopics";
import TopicDetails from "../superadmincomponents/TopicDetails";

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
      case "AddQuestionToTopic": // Render the "Add Question to Topic" component
        return <AddQuestionToTopic />;
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
        return <CreateAdmin />;
      // Add topic cases
      case "AddTopic":
        return <CreateTopic />;
      case "DeleteTopic":
        return <DeleteTopic />;
      case "UpdateTopic":
        return <EditTopic topicId="" />;
      case "GetAllTopics":
        return <GetAllTopics />;
      case "GetTopicById":
        return <TopicDetails />;
      case "DeleteAllTopics":
        // Add your DeleteAllTopics component here
        return null;
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
