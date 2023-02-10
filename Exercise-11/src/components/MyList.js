function MyList({ header, items, updateItem }) {

  const listItems = items.map((item) => {
      return <li 
        key={item.id.toString()} 
        style={ { textDecoration: item.clicked ? 'line-through' : '' } }
        onClick={ () => {(updateItem(item.id))} }
      >
        {item.text}
      </li>
  });

  return (
    <div>
      <h1>{header}</h1>
      <ol>
        {listItems}
      </ol>
    </div>
  );

}

export default MyList;
