import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
//import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Workouts() {
  const { auth } = useAuth();
  const WORKOUTS_URL = "/workouts";
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [workoutsData, setWorkoutsData] = useState([]);
  const allowedRoles = ["Admin", ""];
  useEffect(() => {
    axiosPrivate.get(WORKOUTS_URL).then((getData) => {
      setWorkoutsData(getData.data);
    });
  }, []);

  const setData = (id, name, type, description, userEmail) => {
    localStorage.setItem("ID", id);
    localStorage.setItem("name", name);
    localStorage.setItem("type", type);
    localStorage.setItem("description", description);
    localStorage.setItem("useremail", userEmail);
  };

  const getData = () => {
    axiosPrivate.get(WORKOUTS_URL).then((getData) => {
      setWorkoutsData(getData.data);
    });
  };

  function handleClick(id) {
    if (window.confirm("Are you sure you want to delete this?")) {
      onDelete(id);
    }
  }

  const onDelete = (id) => {
    axiosPrivate.delete(WORKOUTS_URL + `/${id}`).then(() => {
      getData();
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
      backgroundColor: "rgba(0,0,0,0.1)",
    },
    td: {
      border: "1px solid #333",
      padding: 8,
    },
  };
  return (
    <div>
      <h1>Workouts</h1>
      <br></br>
      <Table celled style={styles.table}>
        <Table.Header style={styles.th}>
          <Table.Row style={styles.th}>
            <Table.HeaderCell style={styles.th}>Name</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Type</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Description</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Email</Table.HeaderCell>
            <Table.HeaderCell style={styles.th}>Exercises</Table.HeaderCell>
            {auth?.roles?.find((role) => allowedRoles?.includes(role)) && (
              <Table.HeaderCell style={styles.th}>Edit</Table.HeaderCell>
            )}
            {auth?.roles?.find((role) => allowedRoles?.includes(role)) && (
              <Table.HeaderCell style={styles.th}>Delete</Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>

        <Table.Body style={styles.td}>
          {workoutsData.map((data) => {
            return (
              <Table.Row style={styles.td}>
                <Table.Cell style={styles.td}>{data.name}</Table.Cell>
                <Table.Cell style={styles.td}>{data.type}</Table.Cell>
                <Table.Cell style={styles.td}>{data.description}</Table.Cell>
                <Table.Cell style={styles.td}>{data.userEmail}</Table.Cell>
                <Table.Cell style={styles.td}>
                  <Link to="/exercises">
                    <Button
                      style={{ backgroundColor: "#A9A9A9", color: "#fff" }}
                      onClick={() => setData(data.id, data.name)}
                    >
                      Open Exercises
                    </Button>
                  </Link>
                </Table.Cell>
                {auth?.roles?.find((role) => allowedRoles?.includes(role)) && (
                  <Table.Cell style={styles.td}>
                    <Link to="/workouts/edit">
                      <Button
                        style={{ backgroundColor: "#008B8B", color: "#fff" }}
                        onClick={() => setData(data.id, data.name)}
                      >
                        Edit
                      </Button>
                    </Link>
                  </Table.Cell>
                )}
                {auth?.roles?.find((role) => allowedRoles?.includes(role)) && (
                  <Table.Cell style={styles.td}>
                    <Button
                      style={{ backgroundColor: "red", color: "#fff" }}
                      onClick={() => handleClick(data.id)}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                )}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <br></br>
      {auth?.roles?.find((role) => allowedRoles?.includes(role)) && (
        <Link to="/workouts/add">
          <Button style={{ backgroundColor: "green", color: "#fff" }}>
            Add Exercise
          </Button>
        </Link>
      )}
    </div>
  );
}
