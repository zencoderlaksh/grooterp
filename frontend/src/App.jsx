import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./theme/muiTheme";
import { ThemeProviderCustom } from "./components/ThemeContext";

function App() {
  return (
   
    <ThemeProvider theme={muiTheme}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </ThemeProvider>
 
  );
}

export default App;
