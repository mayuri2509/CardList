import React from "react";
 
 class Filter extends React.Component {
   handleCategoryChange = (event) => {
     this.props.onCategoryChange(event.target.value);
   };
 
   handleSortChange = (event) => {
     this.props.onSortChange(event.target.value);
   };
 
   render() {
     const { categories, sortOption } = this.props;
 
     return (
       <div>
         <label>
           Filter by Category : {" "}
           <select id="select" onChange={this.handleCategoryChange}>
             <option value="">All</option>
             {categories.map((category, index) => (
               <option key={index} value={category.slug}>
                 {category.name}
               </option>
             ))}
           </select>
         </label>
         
         <label>
           Sort by :{"  "}
           <select id="select" onChange={this.handleSortChange} value={sortOption}>
             <option value="">Sort By</option>
             <option value="price-asc">Price: Low to High</option>
             <option value="price-desc">Price: High to Low</option>
             <option value="rating-asc">Rating: Low to High</option>
             <option value="rating-desc">Rating: High to Low</option>
           </select>
         </label>
       </div>
     );
   }
 }
 
 export default Filter;