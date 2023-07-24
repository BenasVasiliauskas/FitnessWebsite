import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function DetailedExercise() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [exerciseData, setExerciseData] = useState([]);
  const [workoutID, setWorkoutID] = useState(null);
  const [exerciseID, setExerciseID] = useState(null);
  const [comments, setComments] = useState(null);

  const [workoutName, setWorkoutName] = useState("");
  const allowedRoles = ["Admin"];
  useEffect(() => {
    getComments();
    setWorkoutID(localStorage.getItem("ID"));
    setWorkoutName(localStorage.getItem("name"));
    setExerciseID(localStorage.getItem("exerciseID"));
    axiosPrivate
      .get(
        "/workouts/" +
          `${localStorage.getItem("ID")}` +
          "/exercises/" +
          `${localStorage.getItem("exerciseID")}`
      )
      .then((getData) => {
        setExerciseData(getData.data);
      });
  }, []);

  const setData = (exerciseData) => {
    localStorage.setItem("exerciseID", exerciseData.id);
    localStorage.setItem("exerciseName", exerciseData.name);
    localStorage.setItem("description", exerciseData.description);
    localStorage.setItem("exerciseAmountOfReps", exerciseData.amountOfReps);
    localStorage.setItem("exerciseAmountOfSets", exerciseData.amountOfSets);
    localStorage.setItem("category", exerciseData.category);
    localStorage.setItem("videoUrl", exerciseData.videoUrl);
    localStorage.setItem("imageUrl", exerciseData.imageUrl);
  };
  const getComments = () => {
    axiosPrivate
      .get(
        "/workouts/" +
          `${localStorage.getItem("ID")}` +
          "/exercises/" +
          `${localStorage.getItem("exerciseID")}` +
          "/comments"
      )
      .then((response) => {
        setComments(response.data); // Store the fetched comments in the state
      });
  };

  function handleClick(id) {
    if (window.confirm("Are you sure you want to delete this?")) {
      onDelete(id);
    }
  }

  const onDelete = (id) => {
    axiosPrivate
      .delete(
        "/workouts/" +
          `${localStorage.getItem("ID")}` +
          "/exercises/" +
          `${localStorage.getItem("exerciseID")}`
      )
      .then(() => {
        navigate("/exercises");
      });
  };
  const styles = {
    table: {
      borderCollapse: "collapse",
      marginLeft: "10vh",
      marginRight: "10vh",
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
  };
  const isAdmin = allowedRoles.includes(auth.roles);
  const shouldRenderDeleteButton = comments === null || comments.length === 0;

  return (
    <section2>
      <h1> {workoutName} Exercise details</h1>
      <br></br>
      <Table celled style={styles.table}>
        <Table.Header>
          <Table.Row>
            {isAdmin && (
              <Table.HeaderCell style={styles.th}>ID</Table.HeaderCell>
            )}
            <Table.HeaderCell style={styles.th}>Name</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Description</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>
              Amount of reps
            </Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>
              Amount of sets
            </Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Video</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Image</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Category</Table.HeaderCell>
            {isAdmin && (
              <Table.HeaderCell style={styles.th}>Edit</Table.HeaderCell>
            )}
            {isAdmin && (
              <Table.HeaderCell style={styles.th}>Delete</Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            {isAdmin && (
              <Table.Cell style={styles.td}>{exerciseData.id}</Table.Cell>
            )}
            <Table.Cell style={styles.td}>{exerciseData.name}</Table.Cell>
            <Table.Cell style={styles.td}>
              {exerciseData.description}
            </Table.Cell>
            <Table.Cell style={styles.td}>
              {exerciseData.amountOfReps}
            </Table.Cell>
            <Table.Cell style={styles.td}>
              {exerciseData.amountOfSets}
            </Table.Cell>
            <Table.Cell style={styles.td}>
              <iframe
                src={exerciseData.videoUrl}
                alt="Video"
                width="300"
                height="200"
              />
            </Table.Cell>
            <Table.Cell style={styles.td}>
              <img
                src={exerciseData.imageUrl}
                alt="Image"
                width="300"
                height="200"
              />
            </Table.Cell>
            <Table.Cell style={styles.td}>{exerciseData.category}</Table.Cell>
            {isAdmin && (
              <Table.Cell style={styles.td}>
                <Link to="/exercises/edit">
                  <Button
                    style={{ backgroundColor: "#008B8B", color: "#fff" }}
                    onClick={() => setData(exerciseData)}
                  >
                    Edit
                  </Button>
                </Link>
              </Table.Cell>
            )}
            {isAdmin && (
              <Table.Cell style={styles.td}>
                {shouldRenderDeleteButton ? (
                  <Button
                    style={{ backgroundColor: "red", color: "#fff" }}
                    onClick={() => handleClick()}
                  >
                    Delete
                  </Button>
                ) : (
                  "Comments attached"
                )}
              </Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
      <br></br>
      <Link to="/comments">
        <Button
          style={{ backgroundColor: "#a9a9a9", color: "#fff" }}
          onClick={() => setData(exerciseData)}
        >
          Comments
        </Button>
      </Link>

      <br></br>
      <Link to={"/exercises"}>
        <Button style={{ backgroundColor: "#a9a9a9", color: "#fff" }}>
          Back
        </Button>
      </Link>
    </section2>
  );
}
