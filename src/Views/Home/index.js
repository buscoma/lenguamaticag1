// Librerias
import React, { useState } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withRouter } from "react-router-dom";


// Componentes internos
import Login from "./Components/Login";
import { Background } from "./Assets";
import { TitleH1, ButtomDefualt, ContainerCenter } from "./Styles";

const root = {
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  height: "100vh",
  display: "flex",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
};

const useStyles = makeStyles({
  root,
  TitleH1,
  label: ButtomDefualt,
  container: ContainerCenter,
});

export default withRouter(function Home(props) {
  const [dialogLogin, setDialogLogin] = useState(false);
  const handleLoginClick = () => {
    setDialogLogin(!dialogLogin);
  };

  const classes = useStyles(props);
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container className={classes.container}>
        <ThemeProvider>
          <Typography className={classes.TitleH1}>LenguaMática</Typography>
        </ThemeProvider>
        <Button
          onClick={handleLoginClick}
          variant="contained"
          className={classes.label}
          color="primary"
        >
          Ingresar
        </Button>
        {dialogLogin ? (
          <Login show={handleLoginClick} />
        ) : null}
      </Container>
    </div>
  );
});

