import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./../Store/hooks";
import { fetchSingleProduct } from "../features/product/SingleProductSlice";
import Navigation from "../components/Navigation";
import { Button, Box, Typography } from "@mui/material";
import { STATUS } from "../constants/Status";

import { formatPrice } from "../utils/helper";
import DoneIcon from "@mui/icons-material/Done";

import React from "react";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import {
  addToCartAsync,
  getCartItemAsync,
} from "../features/product/CartSlice";

const SingleProduct = () => {
  const dispatch = useAppDispatch();
  const { singleProduct, status, colors } = useAppSelector(
    (store) => store.singleProduct
  );

  const { id } = useParams();

  const { name, description, price, stock, image, categories, companies } =
    singleProduct;

  // const [imageThumbnail, setImageThumbnail] = useState(product?.image || "");
  const { cart } = useAppSelector((store) => store.cart);

  const { user, isAuthenticated } = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  const [initialColorIndex, setInitialColorIndex] = useState(0);
  // if (imageThumbnail === undefined) {
  //   setImageThumbnail(product?.image!);
  // }

  // useEffect(() => {
  //   if (product && product.image) {
  //     setImageThumbnail(product.image);
  //   }
  // }, [product]);

  useEffect(() => {
    if (singleProduct?.colors) {
      setMainColor(singleProduct.colors[initialColorIndex]);
    }
  }, [singleProduct, initialColorIndex]);

  const [mainColor, setMainColor] = useState(colors![0]);

  if (status !== STATUS.LOADING && status === STATUS.ERROR) {
    return <h2>{status}</h2>;
  }

  console.log(cart);

  return (
    <>
      <Navigation title={name} product={singleProduct} />

      <Box
        paddingY="30px"
        sx={{
          paddingX: {
            xs: "10px",
            sm: "50px",
            md: "50px",
            lg: "50px",
            xl: "60px",
          },
        }}
      >
        {status === STATUS.LOADING ? (
          <Skeleton
            variant="rectangular"
            width="140px"
            height="28px"
            sx={{
              marginBottom: "30px",
              marginX: "30px",
              paddingX: "10px",
              paddingY: "4px",
            }}
          />
        ) : (
          <Link to="/products">
            <Button
              variant="contained"
              size="small"
              color="success"
              sx={{
                marginBottom: "30px",
                // marginX: { xs:'10px',sm:"30px"},
              }}
            >
              BACK TO PRODUCTS
            </Button>
          </Link>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "center", sm: "flex-start" },
            justifyContent: "space-evenly",
            flexDirection: { xs: "column", sm: "row", md: "row" },
            gap: { xs: "2rem", sm: "3rem", md: "4rem" },
          }}
        >
          {singleProduct && (
            <Box display="flex" gap="1rem">
              {/* <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {product?.thumbnailImage != "" &&
                  product?.thumbnailImage?.map((img: string, index: number) => {
                    return (
                      <>
                        <Box
                          key={img}
                          sx={{
                            width: { xs: "65px", md: "100px" },
                            height: { xs: "60px", md: "85px" },
                            cursor: "pointer",
                          }}
                        >
                          {status === STATUS.LOADING ? (
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height="100%"
                              sx={{
                                bgcolor: `${
                                  darkMode && "rgba(255, 255, 255, 0.1)"
                                }`,
                              }}
                            />
                          ) : (
                            <img
                              src={img}
                              alt=""
                              width="100%"
                              height="100%"
                              style={{
                                borderRadius: "5px",
                                border:
                                  imageThumbnail === img
                                    ? "3px solid blue"
                                    : "none",
                              }}
                              onMouseOver={() => {
                                setImageThumbnail(img);
                              }}
                            />
                          )}
                        </Box>
                      </>
                    );
                  })}
              </Box> */}
              <Box
                sx={{
                  width: { xs: "340px", sm: "552px", lg: "480px" },
                  height: {
                    xs: "300px",
                    sm: "400px",
                    md: "400px",
                    lg: "490px",
                  },
                }}
              >
                {status === STATUS.LOADING ? (
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                ) : (
                  <img
                    src={image}
                    alt="productImage"
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "5px", objectFit: "fill" }}
                  />
                )}
              </Box>
            </Box>
          )}

          <Box
            sx={{
              gap: { xs: "15px", sm: "15px", md: "15px", lg: "17px" },
              display: "flex",
              flexDirection: "column",
              width: { xs: "340px", sm: "600px" },
            }}
          >
            {status === STATUS.LOADING ? (
              <>
                <Skeleton variant="text" width="50%" height={60} />
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="text" width="90%" height={200} />
                <Skeleton variant="text" width="40%" height={20} />
                <Skeleton variant="text" width="95%" height={20} />
                <Skeleton variant="text" width="30%" height={80} />
              </>
            ) : (
              <>
                <Typography variant="h5" fontWeight="bold">
                  {name?.toUpperCase()}
                </Typography>

                <Typography variant="h6">
                  <span style={{ fontWeight: "bold" }}>Price : </span>
                  <span style={{ color: "crimson" }}>
                    {formatPrice(price!)}
                  </span>
                </Typography>
                <Typography component="p">
                  <span style={{ fontWeight: "bold" }}>Description : </span>
                  {description}
                </Typography>
                <Typography component="p">
                  <span style={{ fontWeight: "bold" }}>Available</span> :{" "}
                  {stock! >= 1 ? (
                    <Chip label="In stock" color="success" />
                  ) : (
                    <Chip label="Out of stock" color="error" />
                  )}
                </Typography>

                <Typography component="p">
                  <span style={{ fontWeight: "bold" }}>Company</span> :{" "}
                  {companies?.company_name}
                </Typography>

                <Typography component="p">
                  <span style={{ fontWeight: "bold" }}>Category</span> :{" "}
                  {categories?.name!}
                </Typography>
                <hr />
                <Typography component="p" display="flex" gap="10px">
                  <span style={{ fontWeight: "bold" }}>Colors</span> :{" "}
                  {colors?.map((color, index) => {
                    return (
                      <div
                        key={color}
                        onClick={() => setMainColor(color)}
                        style={{
                          borderRadius: "50%",
                          backgroundColor: `${color}`,
                          height: "24px",
                          width: "24px",
                          cursor: "pointer",
                        }}
                      >
                        {mainColor === color ? (
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              textAlign: "center",
                            }}
                          >
                            <DoneIcon
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </Typography>

                <Link to="/cart">
                  {cart.some((c) => c?.product_id === id) ? (
                    <Button
                      variant="contained"
                      color="success"
                      disableRipple={true}
                      onClick={() => {
                        dispatch(getCartItemAsync(user?.user_id!));
                      }}
                    >
                      Go to Cart
                    </Button>
                  ) : stock! >= 1 ? (
                    <Button
                      variant="contained"
                      color="success"
                      disableRipple={true}
                      onClick={async () => {
                        const { id } = singleProduct;
                        await dispatch(
                          addToCartAsync({
                            product_id: id,
                            quantity: 1,
                            user_id: user?.user_id!,
                            color: mainColor,
                          })
                        );
                        dispatch(getCartItemAsync(user?.user_id!));
                      }}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    ""
                  )}
                </Link>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleProduct;
