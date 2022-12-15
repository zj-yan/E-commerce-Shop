import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { IconButton, InputBase } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import ProductDataService from '../../services/product.js';
import '../HomePage.css';

const NavbarContent = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  const retrieveProducts = useCallback(() => {
    ProductDataService.getAll()
      .then((response) => {
        //console.log(response.data.products);
        setProducts(response.data.products);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const find = useCallback(
    (query, by) => {
      ProductDataService.find(query, by, currentPage)
        .then((response) => {
          //console.log(response.data.products);
          setProducts(response.data.products);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [currentPage]
  );

  const findByTitle = useCallback(() => {
    setCurrentSearchMode('findByTitle');
    find(searchTitle, 'name');
  }, [find, searchTitle]);

  const retrieveNextPage = useCallback(() => {
    if (currentSearchMode === 'findByTitle') {
      findByTitle();
    } else {
      retrieveProducts();
    }
  }, [currentSearchMode, findByTitle, retrieveProducts]);

  //Retrieve the next page if currentPage value changes
  useEffect(() => {
    retrieveNextPage();
  }, [currentPage, retrieveNextPage]);

  useEffect(() => {
    retrieveProducts();
  }, [retrieveProducts]);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onSearch = (searchItem, searchID) => {
    setSearchName(searchItem);
    navigate(`/products/${searchID}`);
    console.log('search', searchItem);
    console.log('searchId', searchID);
  };

  //for clear buttom
  const clearButton = () => {
    setSearchName('');
  };
  //console.log(user);

  function handleLogin() {
    if (user) {
      //console.log(`user`);
      navigate('/profile');
    } else {
      navigate('/login');
    }
  }

  function handleShoppingCart() {
    if (user) {
      //console.log(`user`);
      navigate('/cart');
    } else {
      navigate('/login');
    }
  }

  return (
    <div>
      <Navbar variant="light" className="App" sticky="top">
        <Container fluid>
          <Navbar.Brand className="Brand" href="/">
            The Signal
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
              <Nav.Link className="NavLink" as={Link} to={'/products'}>
                Home
              </Nav.Link>
            </Nav>
            <Nav className="searchBar">
              <div className="searchBarForm">
                <div>
                  <InputBase
                    type="text"
                    className="searchBar-input"
                    placeholder=" Search Product"
                    value={searchName}
                    onChange={onChangeSearchName}
                  />
                  <IconButton
                    className="Form-Button"
                    //onClick={() => onSearch()}
                    type="button">
                    {searchName.length === 0 ? (
                      <SearchIcon />
                    ) : (
                      <ClearIcon onClick={clearButton} />
                    )}
                  </IconButton>
                </div>
                <div className="dropdown">
                  {products
                    .filter((item) => {
                      const searchItem = searchName.toLowerCase();
                      const productName = item.name.toLowerCase();
                      return (
                        searchItem &&
                        productName.startsWith(searchItem) &&
                        productName !== searchItem
                      );
                    })
                    .slice(0, 5)
                    .map((item) => (
                      <div
                        key={item._id}
                        onClick={() => onSearch(item.name, item._id)}
                        className="dropdown-row">
                        {item.name}
                      </div>
                    ))}
                </div>
              </div>
            </Nav>

            <Nav>
              <IconButton className="Icon" aria-label="add to shopping cart">
                <AddShoppingCartIcon
                  onClick={() => {
                    handleShoppingCart();
                  }}
                />
              </IconButton>
              <IconButton className="Icon" aria-label="account">
                <AccountCircleIcon
                  onClick={() => {
                    handleLogin();
                  }}
                />
              </IconButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarContent;
