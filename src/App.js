import './categories.styles.scss';
const App = () => {

  const categories = [{
    id: 1,
    title: 'Hats'
  }, {
    id: 2,
    title: 'Jackets'
  }, {
    id: 3,
    title: 'Sneakers'
  }, {
    id: 4,
    title: 'Womens'
  }, {
    id: 5,
    title: 'Mens'
  },];

  return (
    <div className="App">
      <div className="categories-container">
        {categories.map(categorie => {
          return (
            <div key={categorie.id} className="category-container">
              <div className="background-image" />
              <div className="category-body-container">
                <h2>{categorie.title}</h2>
                <p>Shop Now</p>
              </div>
            </div>
          );
        })}

      </div>
    </div>

  );
}

export default App;
