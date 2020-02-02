import React from "react";
// @material-ui/core components
import Radio from "@material-ui/core/Radio";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
//core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { list, addInstance, instanceName, instances } from "./instancesView.module.css";
export default function InstancesView(props) {
  return (
    <div className={instances}>
      <h3>Add new instance</h3>
      {renderAddInstance(props)}
      <br />
      <h3>Current instances</h3>
      {renderInstances(props)}
    </div>
  );
}

function renderInstances(props) {
  const { instances, classes } = props;
  return (
    <div className={list}>
      <li>
        {instances.map((instance, index) => {
          return (
            <ul key={index}>
              <span className={instanceName}>
                <Radio
                  checked={
                    props.selectedInstance
                      ? props.selectedInstance.name === instance.name
                      : false
                  }
                  onChange={() => props.updateInstance(instance)}
                  value={instance}
                  name="selectedInstance"
                  aria-label="A"
                  icon={
                    <FiberManualRecord className={classes.radioUnchecked} />
                  }
                  checkedIcon={
                    <FiberManualRecord className={classes.radioChecked} />
                  }
                  classes={{
                    checked: classes.radio
                  }}
                />
                {instance.name}
              </span>
            </ul>
          );
        })}
      </li>
    </div>
  );
}

function renderAddInstance(props) {
  return (
    <div className={addInstance}>
      <CustomInput
        labelText="Instance URL"
        id="float"
        inputProps={{
          onChange: props.updateField,
          name: "instanceUrl"
        }}
        formControlProps={{
          fullWidth: true
        }}
      />
      <br/>
      <CustomInput
        labelText="Instance name"
        id="float"
        inputProps={{
          onChange: props.updateField,
          name: "instanceName"
        }}
        formControlProps={{
          fullWidth: true
        }}
      />
      <br/>
      <br/>
      <Button onClick={props.postInstance} color="info">
        Add instance
      </Button>
    </div>
  );
}
