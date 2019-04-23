import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import lodLogo from './lod.png'
import About from './about';
import Datasets from './datasets';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.getdatasetsState();
  }

  getdatasetsState() {
    fetch('/api/getData')
      .then(res => res.json())
      .then(data => this.setState({ data: data.datasets }));
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <header>
          <h1>
            <a href="#">
              <img src={lodLogo} alt="LOD" />
            </a>
          </h1>
        </header>
        <hr />
        <Tabs>
          <TabList>
            <Tab>About</Tab>
            <Tab>Datasets</Tab>
            <Tab>Visualization</Tab>
          </TabList>

          <TabPanel>
            <About />
          </TabPanel>
          <TabPanel>
            <Datasets data={data}/>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
