import React from "react";
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";
import ReactTable from "react-table";

// @material-ui/icons
import Business from "@material-ui/icons/Business";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Copyright from "@material-ui/icons/Copyright";
import FindInPage from "@material-ui/icons/FindInPage";
import CompareArrows from "@material-ui/icons/CompareArrows";
import TableChart from "@material-ui/icons/TableChart";
// core components
import Tabs from "components/CustomTabs/CustomTabs.jsx";

export default function AnalitycsView(props) {
  return (
    <React.Fragment>
      <h4>Select one option</h4>
      {renderOptionTabs(props)}
    </React.Fragment>
  );
}

function renderOptionTabs(props) {
  return (
    <Tabs
      title="Options:"
      headerColor="info"
      tabs={createTabsByOptions(props)}
    />
  );
}

function createTabsByOptions(props) {
  const options = [
    {
      name: "Organization description",
      value: "organization_description",
      icon: Business
    },
    {
      name: "Authors",
      value: "author",
      icon: AssignmentInd
    },
    {
      name: "Licenses",
      value: "license",
      icon: Copyright
    },
    {
      name: "Resource formats",
      value: "resources",
      icon: FindInPage
    },
    {
      name: "Relationships",
      value: "relationships",
      icon: CompareArrows
    },
    {
      name: "All data",
      value: "gen_table",
      icon: TableChart
    }
  ];
  return options.map(option => {
    return {
      tabName: option.name,
      tabIcon: option.icon,
      tabContent: (
        <div>
          <br /> {getCharts(props, option)}
        </div>
      )
    };
  });
}

function getCharts(props, option) {
  switch (option.value) {
    case "author":
    case "organization_description":
      return <PieChart data={props.instanceMetadata} option={option.value} />;
    case "license":
    case "resources":
    case "relationships":
      return <BarChart data={props.instanceMetadata} option={option.value} />;
    case "gen_table":
      return (
        <ReactTable
          data={props.instanceMetadata}
          columns={[
            {
              Header: "Titulo",
              accessor: "title"
            },
            {
              Header: "Autor",
              accessor: "author"
            },
            {
              Header: "Fecha modificacion",
              accessor: "metadata_modified"
            },
            {
              Header: "Organizacion",
              accessor: "organization_description"
            },
            {
              Header: "Numero de recursos",
              accessor: "resources.length"
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      );
    default:
      break;
  }
}
