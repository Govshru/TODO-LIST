
import react from 'react';




const List = ({items,removeItem,editItem}) => {
  return (
    <div>
      {
        items.map(((item)=>{
            const{id,title}=item;
            return(
                <div key={id}>
                    <p>{title}</p>
                    <div  >
                        <button onClick={()=>editItem(id)}>Edit</button>
                        <button  onClick={()=>removeItem(id)}> Delete </button>
                    </div>

                    </div>
            )
        }))
      }
    </div>
  )
}

export default List;
