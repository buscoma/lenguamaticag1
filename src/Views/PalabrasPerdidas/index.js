// Librerias
import React, { useState } from "react";
import {
  Grid,
  Paper,
  Divider
} from "@material-ui/core";

// Componentes externos
import LayoutGame from "../../Components/Layout/LayaoutContainer";

// Componentes internos
import "./Styles/palabrasPerdidas.css";
import Board from "./Components/Board";
import Card from "./Components/Card";
import BackgroundImage from "./Assets/background.jpg";
import {
  useStylesPaper,
  useStylesCard,
} from './Styles';

const row = [
  {
    id: "1",
    palabra: "busca",
    frase_frente: "Mi hermano",
    frase_atras: "sus gafas",
  },
  {
    id: "2",
    palabra: "hizo",
    frase_frente: "El pintor",
    frase_atras: "su primera exposición",
  },
  {
    id: "3",
    palabra: "gusta",
    frase_frente: "A la niña le",
    frase_atras: "ir al jardín",
  },
  {
    id: "4",
    palabra: "gusta",
    frase_frente: "A la niña le",
    frase_atras: "ir al jardín",
  },
];

function PalabrasPerdidas() {

  const clasessPaper = useStylesPaper();
  const clasessCard = useStylesCard();

  const [state, setState] = useState({
    level : 1,
    posints : 0,
    winner: false,
    loser: false,
  });

  return (
    <LayoutGame
      level={state.level}
      points={state.posints}
      winner={state.winner}
      loser={state.loser}
      game="PalabrasPerdidas"
      backgroundImage={BackgroundImage}
    >
      <Paper classes={clasessPaper}>
        <Grid container spacing={3} className="row">
          <Grid item lg={3} md={3} xs={12} className="center">
            <Paper className={clasessPaper.rootBlack}>
              <Board id="board-0" className="board">
                {row.map((item) => (
                  <Card id={item.id} draggable="true" empty={false} classes={clasessCard}>
                    {" "}
                    <p> {item.palabra} </p>{" "}
                  </Card>
                ))}
              </Board>
            </Paper>
          </Grid>

          <Grid item lg={9} md={9} xs={12}>
            <div>
              <Divider />
              {row.map((item) => (
                <div>
                  <div className="clearfix">
                    <p>
                      {" "}
                      {item.frase_frente}
                    </p>
                    <div className="flexbox">
                      <Board id="board-1" empty={true} className="board" />
                    </div>
                    <p>
                      {item.frase_atras}{" "}
                    </p>
                    
                  </div>
                  <Divider />
                  </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Paper>

    </LayoutGame>
  );
}

export default PalabrasPerdidas;
