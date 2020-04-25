import React, { Component } from "react";
import MDAnswer from "../components/MDAnswer";
import MDQuestion from "../components/MDQuestion";
import fakeResults from "../data/results.json";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      data: false,
      offset: 0,
    };
  }

  componentDidMount() {
      const cuisine = "asian";
      const maxReadyTime = "20";
      const mealType = "breakfast";

    //get totalResults of query, generate random offset, use offset to get array of 10 recipes, add results to state. If 404, use fakedata
    fetch( //very waste points just to get totalResults, maybe do sort=popularity to get top popularity and heck the offset?
      `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&&maxReadyTime=${maxReadyTime}&instructionsRequired=true&type=${mealType}&apiKey=${process.env.REACT_APP_APIKEY}`
    )
      .then((res) => {
        return res.status === 404 ? 0 : res.json();
      })
      .then((json) => {
        const offSet = Math.floor(
          Math.random() * Math.min(json.totalResults, 990)
        );
        return fetch(
          `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&maxReadyTime=${maxReadyTime}&instructionsRequired=true&type=${mealType}&offset=${offSet}&apiKey=${process.env.REACT_APP_APIKEY}`
        );
      })
      .then((res) => {
        return res.status === 404 ? fakeResults : res.json();
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

    return <div>{recipe ? <MDAnswer recipe={recipe} /> : <MDQuestion />}</div>;
  }
}

export default Main;
