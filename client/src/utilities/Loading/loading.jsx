import React from "react";
import Progress from "@material-ui/core/CircularProgress";
import { loading } from "./loading.module.css";

export default function Loading() {
  return <div className={loading}><Progress/></div>;
}
