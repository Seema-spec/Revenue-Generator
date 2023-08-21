import './Pagination.css'
const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                href="#"
                className={`page-link ${currentPage === number ? 'active' : ''}`}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Pagination;