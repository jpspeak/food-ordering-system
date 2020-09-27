import React, { useState, useEffect, useContext } from "react";

import { ProductsContext } from "../../contexts/products/ProductsContext";

import { Box, ButtonBase } from "@material-ui/core";

import { useHistory, useLocation } from "react-router-dom";

const CategoryNav = () => {
    const productsContext = useContext(ProductsContext);
    const history = useHistory();
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [categories, setCategories] = useState([]);

    const loadCategories = () => {
        axios({
            method: "GET",
            url: "/api/categories"
        }).then(({ data }) => {
            setCategories(data);
        });
    };
    const handleClick = categoryId => {
        history.replace(`menu?category=${categoryId}`);
    };
    const loadMenu = () => {
        axios({
            method: "GET",
            url: `/api/menu${location.search}`
        }).then(({ data }) => {
            productsContext.dispatch({
                type: "UPDATE_PRODUCTS",
                payload: data
            });
        });
    };
    useEffect(() => {
        loadMenu();
    }, [location.search]);
    useEffect(() => {
        loadCategories();
    }, []);
    return (
        <>
            <Box display="flex" justifyContent="center">
                {categories.map(category => (
                    <Box key={category.id}>
                        <ButtonBase
                            className={`p-2 ${params.get("category") ==
                                category.id && "font-weight-bold"}`}
                            onClick={() => handleClick(category.id)}
                        >
                            {category.name == "All Products"
                                ? "All"
                                : category.name}
                        </ButtonBase>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default CategoryNav;
