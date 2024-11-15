import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Exercises() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [workoutID, setWorkoutID] = useState(null);
  const [exerciseData, setExerciseData] = useState([]);
  const [exerciseID, setExerciseID] = useState([]);
  const [workoutsName, setWorkoutName] = useState("");
  const allowedRoles = ["Admin"];
  useEffect(() => {
    setWorkoutID(localStorage.getItem("ID"));
    setWorkoutName(localStorage.getItem("name"));
    setExerciseID(localStorage.getItem("exerciseID"));
    axiosPrivate
      .get("/workouts/" + `${localStorage.getItem("ID")}` + "/exercises")
      .then((getData) => {
        setExerciseData(getData.data);
      });
  }, []);

  const setData = (
    id,
    name,
    description,
    amountOfReps,
    amountOfSets,
    category
  ) => {
    localStorage.setItem("exerciseID", id);
    localStorage.setItem("name", name);
    localStorage.setItem("description", description);
    localStorage.setItem("amountOfReps", amountOfReps);
    localStorage.setItem("amountOfSets", amountOfSets);
    localStorage.setItem("category", category);
  };
  const isAdmin = allowedRoles.includes(auth.roles);

  const getData = () => {
    axiosPrivate
      .get("/workouts/" + `${localStorage.getItem("ID")}` + "/exercises")

      .then((getData) => {
        setExerciseData(getData.data);
      });
  };

  const onDelete = (id) => {
    axiosPrivate
      .delete("/workouts/" + `${localStorage.getItem("ID")}` + "/exercises")
      .then(() => {
        getData();
      });
  };
  const styles = {
    table: {
      borderCollapse: "collapse",
      marginLeft: "10vh",
      marginRight: "10vh",
      alignSelf: "center",
    },
    th: {
      border: "1px solid #333",
      padding: 8,
      fontWeight: "bold",
      textAlign: "left",
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    td: {
      border: "1px solid #333",
      padding: 8,
      width: "150px",
    },
    tr: {
      textAlign: "left",
    },
  };
  return (
    <section2>
      <h1> {workoutsName} Exercises</h1>

      <br></br>
      <Table celled style={styles.table}>
        <Table.Header>
          <Table.Row>
            {isAdmin && (
              <Table.HeaderCell style={styles.th}>Id</Table.HeaderCell>
            )}
            <Table.HeaderCell style={styles.th}>
              Name of exercise
            </Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Description</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>
              Amount of reps
            </Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>
              Amount of sets
            </Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Category</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {exerciseData.map((data) => {
            return (
              <Table.Row>
                {isAdmin && (
                  <Table.Cell style={styles.td}>{data.id}</Table.Cell>
                )}
                <Table.Cell style={styles.td}>{data.name}</Table.Cell>
                <Table.Cell style={styles.td}>{data.description}</Table.Cell>
                <Table.Cell style={styles.td}>{data.amountOfReps}</Table.Cell>
                <Table.Cell style={styles.td}>{data.amountOfSets}</Table.Cell>
                <Table.Cell style={styles.td}>{data.category}</Table.Cell>
                <Table.Cell style={styles.tr}>
                  <Link to="detailed">
                    <Button
                      style={{ backgroundColor: "#A9A9A9", color: "#fff" }}
                      onClick={() => setData(data.id)}
                    >
                      Details
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <br></br>
      {isAdmin && (
        <Link to="add">
          <Button style={{ backgroundColor: "green", color: "#fff" }}>
            Create Exercise
          </Button>
        </Link>
      )}
      <Link to={"/workouts"}>
        <Button style={{ backgroundColor: "#A9A9A9", color: "#fff" }}>
          Back
        </Button>
      </Link>
    </section2>
  );
}
