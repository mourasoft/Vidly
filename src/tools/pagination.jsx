import React from "react";
import _ from "lodash";

const Pagination = (props) => {
	const { itemCount, pageSize, onPageChange, currentPage } = props;
	const pageCount = Math.ceil(itemCount / pageSize);
	if (pageCount === 1) return null;
	const pages = _.range(1, pageCount + 1);
	console.log(currentPage);

	return (
		<nav>
			<ul className="pagination">
				{pages.map((p) => {
					return (
						<li key={p} className={(currentPage === p) ? "page-item active" : "page-item"}>
							<a onClick={()=>onPageChange(p)} className="page-link">{p}</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
export default Pagination;
