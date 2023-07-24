import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function CommentDetailed() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [commentData, setCommentData] = useState([]);
  const [workoutID, setWorkoutID] = useState(null);
  const [exerciseID, setExerciseID] = useState(null);
  const [commentID, setCommentID] = useState(null);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const allowedRoles = ["Admin"];
  useEffect(() => {
    setWorkoutID(localStorage.getItem("ID"));
    setExerciseID(localStorage.getItem("exerciseID"));
    setCommentID(localStorage.getItem("commentID"));

    axiosPrivate
      .get(
        "/workouts/" +
          `${localStorage.getItem("ID")}` +
          "/exercises/" +
          `${localStorage.getItem("exerciseID")}` +
          "/comments/" +
          `${localStorage.getItem("commentID")}`
      )
      .then((getData) => {
        setCommentData(getData.data);
      });
  }, []);
  const setData = (commentData) => {
    localStorage.setItem("commentID", commentData.id);
  };

  const getData = () => {
    axiosPrivate
      .get(
        "/workouts/" +
          `${localStorage.getItem("ID")}` +
          "/exercises/" +
          `${localStorage.getItem("exerciseID")}` +
          "/comments" +
          `${localStorage.getItem("commentID")}`
      )

      .then((getData) => {
        setCommentData(getData.data);
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
          `${localStorage.getItem("exerciseID")}` +
          "/comments/" +
          `${localStorage.getItem("commentID")}`
      )
      .then(() => {
        navigate(-1);
      });
  };
  const IsAdmin = allowedRoles.includes(auth.roles);

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
  };
  return (
    <section2>
      <h1> Details</h1>
      <br></br>
      <Table celled style={styles.table}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={styles.th}>ID</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Comment</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Edit</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell style={styles.td}>{commentData.id}</Table.Cell>
            <Table.Cell style={styles.td}>{commentData.body}</Table.Cell>
            {IsAdmin && (
              <Table.Cell>
                <Link to="/comments/edit">
                  <Button
                    style={{ backgroundColor: "#008b8b", color: "#fff" }}
                    onClick={() => setData(commentData)}
                  >
                    Edit
                  </Button>
                </Link>
              </Table.Cell>
            )}
            {IsAdmin && (
              <Table.Cell>
                <Button
                  style={{ backgroundColor: "red", color: "#fff" }}
                  onClick={() => handleClick(commentData.id)}
                >
                  Delete
                </Button>
              </Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
      <br></br>
      <Link to="/comments">
        <Button style={{ backgroundColor: "#a9a9a9", color: "#fff" }}>
          Back
        </Button>
      </Link>
    </section2>
  );
}
