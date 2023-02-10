import { useState } from "react";
import MyList from "./MyList";

function MyContainer() {
  const [items, setItems] = useState([
    {
      id: '1',
      text: 'This is an item',
      clicked: false
    },
    {
      id: '2',
      text: 'Also this',
      clicked: false
    }
  ]);
  
  const updateItem = (id) => {
    setTimeout(() => {
      setItems(
        items.map((item) => {
          if (item.id.toString() === id.toString()) {
            return { ...item, clicked: !item.clicked };
          }
          return item;
        })
      ); 
    }, 0);
  }

  const [text, setText] = useState('');

  const submitText = (e) => {
    e.preventDefault();
    if (!text) {
      return;
    }
    setItems([...items, { id: Date.now().toString(), text }]);
    setText('');
  };

  return (
    <div>
      <MyList
        header="Reactive item list"
        items={items}
        updateItem={updateItem}
      />
      <textarea 
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}/>
      <button type="button" onClick={submitText}>Add item</button>
    </div>
  )
}

export default MyContainer;
