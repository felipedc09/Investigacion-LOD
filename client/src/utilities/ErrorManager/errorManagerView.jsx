import React from "react";
// @material-ui/icons
import ErrorIcon from "@material-ui/icons/Error";
//core components
import Snackbar from "components/Snackbar/Snackbar.jsx";
export default function ErorManagerView(props) {
  console.log(props);
  return (
    <React.Fragment>
      <Snackbar
        place={props.error.place}
        color={props.error.color}
        message={props.error.message ? props.error.message : props.error.title}
        icon={ErrorIcon}
        open={props.error.open}
        closeNotification={() => props.closeNotification()}
        close
      />
      <h4>Try again or contact the administrator</h4>
    </React.Fragment>
  );
}
