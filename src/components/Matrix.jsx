// App.js
import React from 'react';
import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Test.css';

const ItemType = 'ITEM';

const initialItems = [
{ nom: "poma", caixa: "caixa1" },
{ nom: "pera", caixa: "caixa1" },
{ nom: "patata", caixa: "caixa2" },
{ nom: "ceba", caixa: "caixa2" },
{ nom: "préssec", caixa: "caixa1" },
{ nom: "maduixa", caixa: "caixa3" },
]


const Item = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, name },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {name}
    </div>
  );
};

const Box = ({ children, title, mouItem }) => {
    const [{ isOver }, drop] = useDrop({
      accept: ItemType,
      drop: (item, monitor) => {
        // Obtain the dragged item's name
        const itemName = item.name;
        // Obtain the container's title where the item is dropped
        const containerTitle = title;
        // Move the item to the new container (if necessary)
        //console.log(`Item "${itemName}" was dropped into "${containerTitle}"`);
        mouItem(itemName, containerTitle)
        // You can implement your logic to actually move the item here
      },
      collect: monitor => ({
        isOver: !!monitor.isOver(),
      }),
    });
  
    return (
      <div ref={drop} className={`container ${isOver ? 'highlight' : ''}`}>
        <h2>{title}</h2>
        {children}
      </div>
    );
  };
  

const Test = () => {

    const [items, setItems] = useState(initialItems)
    const caixes = Array.from(new Set(items.map(e=>e.caixa)))

    const mouItem = (item, caixa) => {
        const nousItems = items.map(it => {
            if (it.nom === item){
                it.caixa = caixa;
            }
            return it;
        })
        setItems(nousItems)

    }


  return (
    <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-2">

     
        {
            caixes.map(caixa => (
                <Box key={caixa} title = {caixa} mouItem = {mouItem}  >
                    {
                        items.filter(e => e.caixa==caixa).map(e => <Item key={e.nom} name={e.nom}/>)
                    }
                </Box>
            ))
        }
        </div>
    </DndProvider>
  );
};

export default Test;
