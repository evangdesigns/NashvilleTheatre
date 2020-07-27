import React from 'react';
import ShowCard from '../../shared/ShowCard/ShowCard';

import { getShowsByCategory } from '../../../helpers/data/categoryData';
import './Category.scss';

class Category extends React.Component {
  state = {
    showsByCategory: []
  }

  componentDidMount() {
    const { categoryId } = this.props.match.params;
    this.getCategoryData(categoryId)
  }

  getCategoryData(categoryId) {
    getShowsByCategory(categoryId)
    .then(showsByCategory => {
      this.setState({showsByCategory: showsByCategory})
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.categoryId !== this.state.showsByCategory[0].categoryId) {
      const nextProp = nextProps.match.params.categoryId;
      this.getCategoryData(nextProp);
    }
  }

  render() {
    const { showsByCategory } = this.state;
     const ShowsByCat = showsByCategory.map((show) => <ShowCard key={show.showId} show={show}/>)
    return (
     <section>
      <h1 className="text-center cat-header">{showsByCategory.map((show) => show.categoryName).slice(0, 1)}</h1>
       <div className="show-by-cat d-flex flex-wrap justify-content-center">{ShowsByCat}</div>
     </section>
    )
  }
}

export default Category;