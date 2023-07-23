import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
//import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Workouts.css";

export default function Workouts() {
  const { auth } = useAuth();
  const WORKOUTS_URL = "/workouts";
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [workoutsData, setWorkoutsData] = useState([]);
  const allowedRoles = ["Admin"];
  useEffect(() => {
    axiosPrivate.get(WORKOUTS_URL).then((getData) => {
      setWorkoutsData(getData.data);
    });
  }, []);

  const setData = (id, name, type, description) => {
    localStorage.setItem("ID", id);
    localStorage.setItem("name", name);
    localStorage.setItem("type", type);
    localStorage.setItem("description", description);
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
    try {
      axiosPrivate.delete(WORKOUTS_URL + `/${id}`).then(() => {
        getData();
      });
    } catch (e) {
      console.log(e);
    }
  };

  const isAdmin = allowedRoles.includes(auth.roles);

  return (
    <div>
      <h1>Workouts</h1>
      <br></br>
      <div className="table-container">
        {" "}
        {/* Add a container to wrap the table */}
        <Table celled className="responsive-table">
          {" "}
          {/* Add the 'responsive-table' class */}
          <Table.Header>
            <Table.Row>
              {isAdmin && <Table.HeaderCell>Workout Id</Table.HeaderCell>}
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Exercises</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              {isAdmin && <Table.HeaderCell>Delete</Table.HeaderCell>}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {workoutsData.map((data) => {
              return (
                <Table.Row>
                  {isAdmin && <Table.Cell>{data.id}</Table.Cell>}
                  <Table.Cell>{data.name}</Table.Cell>
                  <Table.Cell>{data.type}</Table.Cell>
                  <Table.Cell>{data.description}</Table.Cell>

                  <Table.Cell>
                    <Link to="/exercises">
                      <Button
                        style={{ backgroundColor: "#A9A9A9", color: "#fff" }}
                        onClick={() =>
                          setData(
                            data.id,
                            data.name,
                            data.type,
                            data.description
                          )
                        }
                      >
                        Open Exercises
                      </Button>
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    <Link to="/workouts/edit">
                      <Button
                        style={{ backgroundColor: "#008B8B", color: "#fff" }}
                        onClick={() =>
                          setData(
                            data.id,
                            data.name,
                            data.type,
                            data.description
                          )
                        }
                      >
                        Edit
                      </Button>
                    </Link>
                  </Table.Cell>

                  {isAdmin && ( // Only render if user is admin
                    <Table.Cell>
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
      </div>
      <br></br>
      <Link to="/workouts/add">
        <Button style={{ backgroundColor: "green", color: "#fff" }}>
          Add a workout
        </Button>
      </Link>
    </div>
  );
}
