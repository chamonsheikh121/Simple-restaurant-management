import { useState } from "react";
import useMenu from "../../Hooks/useMenu";
import defaultImage from './../../assets/Bb.png'
import UseAuthContext from "../../Hooks/UseAuthContext";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks/UseAxios";
import { useLocation, useNavigate } from "react-router-dom";
import UseCart from "../../Hooks/UseCart";
import './FoodCard.css'


const FoodCard = ({ salads }) => {
    const [addToCart, setAddToCart] = useState(false)
    const {user} = UseAuthContext()
    const axiosHook = UseAxios()
    const location = useLocation()
    const [,refetch] = UseCart()
    const navigate = useNavigate()
    // console.log(refetch);
    const { _id, name, recipe, image, price } = salads;


    const handleAddToCart = (item) => {


        if (user && user?.email) {
            const { name, image, category, price } = item;
            const { displayName, email, photoURL } = user

            const cartInfo = {
                menuId: _id,
                CustomerName: displayName,
                CustomerEmail: email,
                CustomerPhoto: photoURL || null,
                FoodName: name,
                FoodImage: image,
                FoodCategory: category,
                FoodPrice: price


            }

            axiosHook.post('/api/v1/cartItems', cartInfo)
                .then(res => {
                    refetch()

                    if (res.data.insertedId) {
                        Swal.fire({
                            title: `${name}`,
                            html: "added to the cart",
                            timer: 1000,
                            icon:'success',
                            timerProgressBar: true
                        })

                    
                       

                    }

                })

        }
        else {
            Swal.fire({
                title: "You are not logged In",
                text: "To add this item to the cart you have to login first",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login now!",
                cancelButtonText: 'letter'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: location.pathname })
                }
            });
        }

    }


    return (
        <div className="food-card transition-transform  text-gray-600 flex flex-col flex-grow-0 ">
            <figure className="relative h-[270px]"><img className="w-full h-full object-cover object-center" src={image ? image : defaultImage} />
                <p className="bg-black absolute top-5 right-5 px-4 py-1  inline text-white font-bold text-xl">${price}</p>
            </figure>

            <div className="card-content space-y-3">
                <h2 className="mt-3 break-words text-start font-bold text-2xl">{name}</h2>
                <p className="text-start text-sm">{recipe}</p>
                <div onClick={() => setAddToCart(true)}>
                    <button onClick={() => handleAddToCart(salads)} className={`btn w-full hover:border-purple-700 hover:text-purple-700  hover:bg-white   ${addToCart ? 'text-purple-700 bg-white border-purple-700 border-2':'bg-purple-700 text-white'}`}>{addToCart ? 'Added to the cart' : 'Add to cart'}</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;