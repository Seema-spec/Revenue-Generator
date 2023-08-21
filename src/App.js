import React, { useState, useEffect } from 'react';
import { formatNumber } from './helpers/formatNumber'; 
import SearchInput from './components/SearchInput';
import Branch1 from './api/branch1.json';
import Branch2 from './api/branch2.json';
import Branch3 from './api/branch3.json';
import Pagination from './components/Pagination';
import './App.css'

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const mergeBranchProducts = (branchDataArray) => {
    const mergedProducts = {};
  
    branchDataArray.forEach(branchData => {
      branchData.products.forEach(product => {
        if (mergedProducts.hasOwnProperty(product.id)) {
          mergedProducts[product.id].sold += product.sold;
        } else {
          mergedProducts[product.id] = { ...product };
        }
      });
    });
  
    return Object.values(mergedProducts);
  };
  

  useEffect(() => {
    const branchDataArray = [Branch1, Branch2, Branch3];
    const mergedProducts = mergeBranchProducts(branchDataArray);
    mergedProducts.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(mergedProducts);
  
    const total = mergedProducts.reduce((acc, product) => acc + product.unitPrice * product.sold, 0);
    setTotalRevenue(total);
  }, []);
  
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    const total = filtered.reduce((acc, product) => acc + product.unitPrice * product.sold, 0);
    setTotalRevenue(total);
  }, [products, searchTerm]);

  return (
    <div>
      <h1>Revenue Aggregator Application</h1>
      <SearchInput setSearchTerm={setSearchTerm} />
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.unitPrice * product.sold}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total Revenue:</td>
            <td>${formatNumber(totalRevenue)}</td>
          </tr>
        </tfoot>
      </table>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
