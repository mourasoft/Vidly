import React from "react";
const ListGroup = (props) => {
	const { items, textProperty, valueProperty ,selectedGenre } = props;
	// console.log(items);
	return (
		<ul style={{cursor : "pointer"}}className="list-group">
			{items.map((item) => (
				<li onClick={()=>props.onItemSelect(item)} key={item[valueProperty]} className={selectedGenre === item ? "list-group-item active" : "list-group-item"}>
					{item[textProperty]}
				</li>
			))}
		</ul>
	);
};
ListGroup.defaultProps = {
	textProperty : 'name',
	valueProperty : '_id'
}
export default ListGroup;
