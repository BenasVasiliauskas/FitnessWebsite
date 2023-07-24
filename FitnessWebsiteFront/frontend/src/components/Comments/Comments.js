import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Comments() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [commentsData, setCommentsData] = useState([]);
  const [workoutID, setWorkoutID] = useState(null);
  const [exerciseID, setExerciseID] = useState(null);
  const [exerciseName, setExerciseName] = useState();
  const allowedRoles = ["Admin"];
  const excName = localStorage.getItem("exerciseName");
  useEffect(() => {
    setWorkoutID(localStorage.getItem("ID"));
    setExerciseID(localStorage.getItem("exerciseID"));
    setExerciseName(localStorage.getItem("exerciseName"));
    axiosPrivate

      .get(
        "/workouts/" +
          `${localStorage.getItem("ID")}` +
          "/exercises/" +
          `${localStorage.getItem("exerciseID")}` +
          "/comments"
      )
      .then((getData) => {
        setCommentsData(getData.data);
      });
  }, []);

  const setData = (data) => {
    localStorage.setItem("commentID", data.id);
    localStorage.setItem("commentBody", data.body);
    localStorage.setItem("createdDate", data.createdDate);
    localStorage.setItem("updatedDate", data.updatedDate);
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
    <div>
      <h1>{excName} Exercise's comments</h1>
      <br></br>
      <Table celled style={styles.table}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={styles.th}>ID</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Body</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {commentsData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell style={styles.td}>{data.id}</Table.Cell>
                <Table.Cell style={styles.td}>{data.body}</Table.Cell>

                <Table.Cell style={styles.tr}>
                  <Link to="detailed">
                    <Button
                      style={{ backgroundColor: "#a9a9a9", color: "#fff" }}
                      onClick={() => setData(data)}
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
      <Link to="add">
        <Button style={{ backgroundColor: "green", color: "#fff" }}>
          Create comment
        </Button>
      </Link>
      <Link to="/exercises/detailed">
        <Button style={{ backgroundColor: "red", color: "#fff" }}>Back</Button>
      </Link>
    </div>
  );
}
