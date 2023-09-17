import React from "react";
import "./header.scss";
import "../App.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const UserCard = (props) => {
  const {
    id,
    name,
    age,
    dob,
    gender,
    food,
    hobbies,
    handleDelete,
    handleView,
    handleEdit,
  } = props;

  const getAgeColor = () => {
    if (age <= 25) return "colored-dot-green";
    if (age <= 50) return "colored-dot-purple";
    return "colored-dot-orange";
  };

  const handleDeleteChild = () => {
    handleDelete(id);
  };

  const handleEditChild = () => {
    handleEdit({
      id,
      name,
      age,
      dob,
      gender,
      food,
      hobbies,
    });
  };

  const handleViewChild = () => {
    console.log("Reached here");
    handleView({
      id,
      name,
      age,
      dob,
      gender,
      food,
      hobbies,
    });
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <div className="top_div">
        <div className="left">
          <h3>{name}</h3>
        </div>
        <div className={`right ${getAgeColor()}`}></div>
      </div>
      <hr />

      <CardContent>
        <p>
          <b>Age:</b> {age}
        </p>
        <p>
          <b>DOB:</b> {dob}
        </p>
        <p>
          <b>Gender:</b> {gender}
        </p>
        <p>
          <b>Food:</b> {food}
        </p>
        <p>
          <b>Hobbies:</b> {hobbies}
        </p>
      </CardContent>
      <hr />
      <CardActions>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={4}
            className="action-button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={handleDeleteChild}
            >
              <DeleteIcon />
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            className="action-button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button size="small" variant="contained" onClick={handleEditChild}>
              <EditIcon />
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            className="action-button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button size="small" variant="contained" onClick={handleViewChild}>
              <RemoveRedEyeIcon />
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default UserCard;
