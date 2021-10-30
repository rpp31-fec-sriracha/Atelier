import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import ReviewsList from './ReviewsList.jsx';
const axios = require('axios');


class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // productReviews: {
      //   reviews: {},
      //   meta: {},
      // }

      reviews: [ //sample data
        {
          "review_id": 1016932,
          "rating": 4,
          "summary": "These pants are fine",
          "recommend": true,
          "response": "",
          "body": "I do like these pants",
          "date": "2019-03-21T00:00:00.000Z",
          "reviewer_name": "shopaddict",
          "helpfulness": 2,
          "photos": []
        },
        {
          "review_id": 1016933,
          "rating": 5,
          "summary": "These pants are great!",
          "recommend": true,
          "response": "",
          "body": "I really like these pants. Best fit ever!",
          "date": "2019-02-18T00:00:00.000Z",
          "reviewer_name": "figuringitout",
          "helpfulness": 2,
          "photos": [
            {
              "id": 1945565,
              "url": "https://images.unsplash.com/photo-1542574621-e088a4464f7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3028&q=80"
            },
            {
              "id": 1945566,
              "url": "https://images.unsplash.com/photo-1560294559-1774a164fb0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
            },
            {
              "id": 1945567,
              "url": "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
            }
          ]
        },
        {
          "review_id": 1016934,
          "rating": 2,
          "summary": "These pants are ok!",
          "recommend": false,
          "response": "",
          "body": "A little tight on the waist.",
          "date": "2019-01-05T00:00:00.000Z",
          "reviewer_name": "bigbrother",
          "helpfulness": 2,
          "photos": [
            {
              "id": 1945568,
              "url": "https://images.unsplash.com/photo-1560829675-11dec1d78930?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
            },
            {
              "id": 1945569,
              "url": "https://images.unsplash.com/photo-1549812474-c3cbd9a42eb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
            },
            {
              "id": 1945570,
              "url": "https://images.unsplash.com/photo-1559709319-3ae960cda614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
            }
          ]
        }
      ],
      meta: {  //sample data
        "product_id": "59556",
        "ratings": {
          "2": "1",
          "4": "1",
          "5": "1"
        },
        "recommended": {
          "false": "1",
          "true": "2"
        },
        "characteristics": {
          "Fit": {
            "id": 199854,
            "value": "3.6666666666666667"
          },
          "Length": {
            "id": 199855,
            "value": "3.6666666666666667"
          },
          "Comfort": {
            "id": 199856,
            "value": "3.6666666666666667"
          },
          "Quality": {
            "id": 199857,
            "value": "3.6666666666666667"
          }
        }
      }

    };
  }

  render() {
    return (<div className="reviewsContainer">
      <div>'Reviews Container'</div>
      <div><RatingBreakdown metadata={this.state.meta}/></div>
      <div><ProductBreakdown metadata={this.state.meta}/></div>
      <div><ReviewsList reviews={this.state.reviews}/></div>
    </div>);
  }
}

// const Reviews = function(props) {
//   return (<div className="reviews">
//     'Reviews';
//   </div>);
// };

export default Reviews;