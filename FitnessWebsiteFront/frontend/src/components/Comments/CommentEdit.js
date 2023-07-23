import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import "../ValidButton.css";
export default function EditComment() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const moment = require("moment");
  const sendDataToAPI = () => {
    const formattedDate = updatedTime.toISOString().split("T")[0] + "T00:00:00";
    axiosPrivate
      .put(
        "/workouts/" +
          `${localStorage.getItem("ID")}` +
          "/exercises/" +
          `${localStorage.getItem("exerciseID")}` +
          "/comments/" +
          `${localStorage.getItem("commentID")}`,
        {
          body,
          updatedTime: formattedDate,
        }
      )
      .then(() => {
        navigate("/comments/detailed");
      });
  };

  useEffect(() => {
    setBody(localStorage.getItem("commentBody"));
    setUpdatedTime(new Date());
  }, []);

  const isFormValid = () => {
    return body.trim() !== "";
  };

  return (
    <section>
      <h1>Edit comment</h1>
      <br></br>
      <Form>
        <Form.Field>
          <label>Comment</label>
          <br></br>
          <input
            name="fname"
            type="text"
            autoComplete="off"
            required
            value={body}
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
          Edit
        </Button>
        <Link to="/comments/detailed">
          <Button style={{ backgroundColor: "#a9a9a9", color: "#fff" }}>
            Back
          </Button>
        </Link>
      </Form>
    </section>
  );
}
