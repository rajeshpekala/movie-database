import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/slices/authSlice";
import { RootState } from "./redux/store";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect } from "react";
import Switch from "@mui/material/Switch";
import { toggleMode } from "./redux/slices/themeSlice";
import { useTranslation } from "react-i18next";



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state: RootState) => state.auth.email);
  const watchlist = useSelector((state: RootState) => state.movie.watchlist);
  const mode = useSelector((state: RootState) => state.theme.mode);
  // const theme = useTheme();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleViewWatchlist = () => {
    navigate("/watchlist");
  };

  const handleChange = () => {
    dispatch(toggleMode());
  };

  const handleLanguageChange = (e: SelectChangeEvent<string>) => {
    const language = e.target.value as string;
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    function1();
  }, []);

  const function1 = () => {
    console.log("Header rendered");
  };
  if (!email) {
    return null;
  }

  return (
    <AppBar
      position="fixed"

      // sx={{
      //   backgroundColor: theme.palette.primary.main,
      // }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer",}}
          onClick={() => navigate("/home")}
        >
          Movie Database
        </Typography>

        <Switch
          checked={mode}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography
          variant="h6"
          sx={{ cursor: "pointer",  marginRight:2 }}
          onClick={() => navigate("/menu")}
        >
          Menu
        </Typography>
        <FormControl sx={{ mr: 2 }}>
          <InputLabel id="language-select-label">{t("language")}</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={i18n.language || 'en'}
            label={t("language")}
            onChange={handleLanguageChange}
          >
            <MenuItem value="en">{t("English")}</MenuItem>
            <MenuItem value="te">{t("Telugu")}</MenuItem>
            <MenuItem value="hi">{t("Hindi")}</MenuItem>
            <MenuItem value="ta">{t("Tamil")}</MenuItem>
            <MenuItem value="ka">{t("Kannada")}</MenuItem>
          </Select>
        </FormControl>

        <IconButton
          color="inherit"
          onClick={handleViewWatchlist}
          sx={{ marginLeft: "auto" }}
        >
          <AddShoppingCartIcon fontSize="large" />
          {watchlist.length}
        </IconButton>
        <Typography variant="body1" sx={{ marginRight: 2 }}>
          {email}
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
