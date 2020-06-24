import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {authFetch} from '../../../../AuthProvider';

const useStylesAutoGridNoWrap = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    textAlign: "center",
  },
  topo: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.2rem",
    },
  },
}));

function ColorRanking(posicion) {
  console.log(posicion);
  if (posicion === 1) {
    return "rgb(212,175,55)";
  }
  if (posicion === 2) {
    return "rgb(192,192,192)";
  }
  if (posicion === 3) {
    return "rgb(224, 155, 91)";
  }
}

function AutoGridNoWrap(props) {
  const classes = useStylesAutoGridNoWrap();
  const [data] = useState(props);
  const backgroundColorPosition = ColorRanking(data.posicion);
  return (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        style={{ backgroundColor: backgroundColorPosition }}
        elevation={3}
      >
        <Grid container wrap="wrap" spacing={2}>
          <Grid item xs={4} sm={4} md={2}>
            <Typography className={classes.topo} noWrap>
              {" "}
              #{data.posicion}
            </Typography>
          </Grid>
          <Grid item xs={8} sm={4} md={6} zeroMinWidth>
            <Typography className={classes.topo} noWrap>
              {data.nombre}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4} zeroMinWidth>
            <Typography className={classes.topo} noWrap>
              {data.puntos}pts
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

const useStylesRanking = makeStyles((theme) => ({
  font: {
    fontWeight: "bolder",
    textAlign: "Left",
  },
}));

export default function TableResponsive(props) {
  const classes = useStylesRanking();

  const [refresh, setRefresh] = useState(false);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState([]);


  const orderArray = (array) => {
    array.sort((a, b) => (a.points < b.points) ? 1 : -1)
    for (var i = 0; i < array.length; i++) {
      console.log(i)
      array[i]["posicion"] = i + 1
    }

    return array;
  }

  useEffect(() => {
		async function fetchApi() {
			try {
				setLoading(true);
				
        await authFetch(
            "https://backendlenguamaticag1.herokuapp.com/api/player/ranking"
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setRow(orderArray(data.data));
            });

			} catch (e) {
				setErrors(e);
			} finally {
				setLoading(false);
			}
		}

		fetchApi();
		setRefresh(false);
	}, [refresh]);


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }}
    >
      {loading ? (
        "Loading"
      ) : (
          <Container maxWidth="md">
            <Grid container wrap="wrap" spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography className={classes.font} variant="h3" noWrap>
                  {" "}
                Mi Ranking{" "}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {/*  <AutoGridNoWrap
                posicion={row[2].posicion}
                nombre={row[2].nombre}
                puntos={row[2].puntos}
              /> */}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography className={classes.font} variant="h3" noWrap>
                  {" "}
                Ranking{" "}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} style={{ textAlign: "Left" }}>
                <Grid
                  container
                  justify="center"
                  alignItems="flex-end"
                  wrap="wrap"
                  spacing={2}
                >
                  <Grid item xs={9}>
                    <TextField
                      id="standard-search"
                      label="Buscate a tus amigos"
                      fullWidth
                      type="search"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="outlined"  size="medium" color="primary">
                      BUSCAR
                  </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {row ? row.map((data) => (
                  <AutoGridNoWrap
                    posicion={data.posicion}
                    nombre={data.name}
                    puntos={data.points}
                  />
                )) : ''}
              </Grid>
            </Grid>
          </Container>
        )}
    </div>
  );
}
