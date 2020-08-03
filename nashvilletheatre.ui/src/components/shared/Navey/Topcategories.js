import React from 'react';
import { getTopCategories } from '../../../helpers/data/categoryData';
import Category from '../Category/Category';
import { Nav } from 'react-bootstrap';

import './Navey.scss';

class Topcategories extends React.Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    getTopCategories()
    .then((categories) => {
      this.setState({ categories: categories })
    })
  }


  render() {
    const { categories } = this.state;
    return (
      <Nav fill className="mr-auto">
        { categories.map(category => <Category key={category.categoryId} category={category} />)}
      </Nav>
    );
  }
}

export default Topcategories;