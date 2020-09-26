import React from "react";

import { Button } from "@material-ui/core";
const style = {
    img: {
        objectFit: "cover",
        height: "100%",
        height: "100%",
        filter: "brightness(80%)"
    },
    carouselInner: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    carouselInnerContainer: {
        position: "relative",
        paddingBottom: "66.67%"
    }
};
const Carousel = () => {
    return (
        <>
            <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
            >
                <ol className="carousel-indicators">
                    <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="0"
                        className="active"
                    ></li>
                    <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="1"
                    ></li>
                    <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="2"
                    ></li>
                </ol>
                <div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div style={style.carouselInnerContainer}>
                                <div style={style.carouselInner}>
                                    <img
                                        className="d-block w-100"
                                        style={style.img}
                                        src="/storage/home/carousel_images/carousel_burgers.jpg"
                                        alt="First slide"
                                    />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h1>CAPTION </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div style={style.carouselInnerContainer}>
                                <div style={style.carouselInner}>
                                    <img
                                        className="d-block w-100"
                                        style={style.img}
                                        src="/storage/home/carousel_images/carousel_beverages.jpg"
                                        alt="First slide"
                                    />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h1>CAPTION </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div style={style.carouselInnerContainer}>
                                <div style={style.carouselInner}>
                                    <img
                                        className="d-block w-100"
                                        style={style.img}
                                        src="/storage/home/carousel_images/carousel_combo.jpg"
                                        alt="First slide"
                                    />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h1>CAPTION </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </>
    );
};

export default Carousel;
