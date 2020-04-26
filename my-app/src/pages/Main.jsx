import React, { Component } from "react";
import MDAnswer from "../components/MDAnswer";
import MDQuestion from "../components/MDQuestion";
import fakeResults from "../data/results.json";
import { Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      offset: 0,
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.setState({
      data: false,
      offset: 0,
    });
  }

  componentDidMount() {
    const cuisine = "asian";
    const maxReadyTime = "20";
    const mealType = "breakfast";

    //get totalResults of query, generate random offset, use offset to get array of 10 recipes, add results to state. If 404, use fakedata
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&maxReadyTime=${maxReadyTime}&instructionsRequired=true&type=${mealType}&sort=popularity&apiKey=${process.env.REACT_APP_APIKEY}`
    )
      .then((res) => {
        return res.status > 300 ? fakeResults : res.json();
      })
      .then((json) => {
        let data = {};
        data = json || fakeResults;
        this.setState({
          data: data.results,
        });
      });
  }

  render() {
    const { data } = this.state;
    const recipe = data[Math.floor(Math.random() * 10)];
    const url = this.props.url;

    return (
      <div>
        {recipe ? (
          <div>
            <Redirect to={{ pathname: `${url}/answer` }} />
            <Route path={`${url}/answer`}>
              <MDAnswer recipe={recipe} onEdit={this.handleEdit} />
            </Route>
          </div>
        ) : (
          <div>
            <Route path={url}>
              <MDQuestion />
            </Route>
          </div>
        )}
      </div>
    );
  }
}

export default Main;
