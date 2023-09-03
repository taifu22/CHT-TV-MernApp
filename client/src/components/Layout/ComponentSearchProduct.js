import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from "../../lib/service/service";
import { returnProductsArrays } from "../../lib/service/service";
import { getProductsSuccess } from "../../lib/state/features/products.slice";
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../../lib/hooks/useScreenSize';

function ComponentSearchProduct(props) {

    const {items} = useSelector((state) => ({...state.cart}));
    const products = useSelector(state => ({...state.products}))
    const [valueInput, setValueInput] = useState("");

    const naviagte = useNavigate(); 
    const dispatch = useDispatch();

    //variable for store the product sorted with reacrh input
    const productsSorted = []

    //in this useEffect we sort the store redux of produits by ration of input's value
    useEffect(() => { 
        products.items.map(item => {
            item.map(item1 => {
            if (item1.name.toLowerCase().includes(valueInput)) {
                productsSorted.push(item1)
            }
            })
        })
        if (valueInput.length === 0 && valueInput === "") {
            getProducts()
            .then((response) => returnProductsArrays(response.data.data))
            .then((productData) => dispatch(getProductsSuccess(productData)))
        } else {
            const productsArrayPagination = returnProductsArrays(productsSorted);
            dispatch(getProductsSuccess(productsArrayPagination));
        }
    },[valueInput])

    //function to sorted gallery products with the value of input
    function onChangeInput(e) {
        setValueInput(e.target.value.toLowerCase())
    }
    function onClickButton(params) {
        /*si on click sur le button de research car on est pas dans la page home, on sera redirectionné vers /Home donc la racine du projet
        et on aura un state dans le location, du coup on va afficher directement nos produits rechercé (voir /Home)*/
        return naviagte('/', {state:{state: true}}); 
    }

    const screenWidth = useWindowSize().width;

    return (
        <div className={screenWidth > 600 ?"input-group-prepend input-responsive mr-3" : "input-group-prepend input-responsive-max600px mr-3"}>
            <div className="form-outline">
                <input onChange={e => onChangeInput(e)} value={valueInput} id="search-focus" type="search" placeholder="search product" className="form-control" />
            </div>
            <button onClick={()=>onClickButton()} type="button" className="btn text-light">
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
}

export default ComponentSearchProduct;