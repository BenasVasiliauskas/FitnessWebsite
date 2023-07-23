import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import "../ValidButton.css";

export default function AddComment() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const [createdDate, setcreatedDate] = useState("");
  const [updatedDate, setupdatedDate] = useState("");
  const [workoutId, setWorkoutId] = useState(null);
  const [exerciseId, setExerciseId] = useState(null);

  useEffect(() => {
    const storedWorkoutId = localStorage.getItem("ID");
    setWorkoutId(storedWorkoutId);
    const storedExerciseId = localStorage.getItem("exerciseID");
    setExerciseId(storedExerciseId);
    setcreatedDate(Date.now());
    setupdatedDate(Date.now());
  }, []);

  const isFormValid = () => {
    return body.trim() !== "";
  };
  const sendDataToAPI = () => {
    const payload = {
      body: body,
    };

    axiosPrivate
      .post(
        "/workouts/" + workoutId + "/exercises/" + exerciseId + "/comments",
        payload
      )
      .then(() => {
        navigate("/comments");
      })
      .catch((error) => {
        console.log("API Error:", error);
        // Handle the error, such as logging or displaying an error message
      });
  };
  return (
    <section>
      <h1>Add a comment</h1>
      <br></br>
      <Form>
        <Form.Field>
          <label>Comment text</label>
          <br></br>
          <input
            name="fcomment"
            type="text"
            autoComplete="off"
            required
            onChange={(e) => setBody(e.target.value)}
            placeholder="Comment text"
          />
        </Form.Field>

        <Button
          style={{ color: "#fff" }}
          type="submit"
          onClick={sendDataToAPI}
          className={isFormValid() ? "submitButton" : "invalidButton"}
          disabled={!isFormValid()}
        >
          Add
        </Button>
        <Link to={-1}>
          <Button style={{ backgroundColor: "gray", color: "#fff" }}>
            Back
          </Button>
        </Link>
      </Form>
    </section>
  );
}
