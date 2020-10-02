import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#007EA7',
    },
    secondary: {
      main: '#003249',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#CCDBDC',
      paper: "#fff"
    },
  },
  
});

export default theme;
