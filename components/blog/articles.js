import React,{useState} from "react";
import "./blog.css"
import Link from 'next/link'
import {Col, Container, Row} from "react-bootstrap";
import Pagination from "react-js-pagination";
import img from "../../assets/images/img.jpg"

export default function Articles() {
    const [activePage, setActivePage] = useState(1);
    const [total, setTotal] = useState(3);
    const [noDataMsg, setNoDataMsg] = useState("");
    const handlePageChange = (pageNumber)=> {

    }
    return (
        <React.Fragment>
            <div className="articles">
                <Container>
                    <Row>
                        <Col xl={4} lg={4} md={6} sm={1} xs={1} className="article">
                            <Link href="/">
                                <a>
                                    <img src={img}/>
                                    <h3>
                                        کارواش
                                    </h3>
                                    <p>
                                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                                    </p>
                                </a>
                            </Link>
                        </Col>
                        <Col xl={4} lg={4} md={6} sm={1} xs={1} className="article">
                            <Link href="/">
                                <a>
                                    <img src={img}/>
                                    <h3>
                                        کارواش
                                    </h3>
                                    <p>
                                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                                    </p>
                                </a>
                            </Link>
                        </Col>
                        <Col xl={4} lg={4} md={6} sm={1} xs={1} className="article">
                            <Link href="/">
                                <a>
                                    <img src={img}/>
                                    <h3>
                                        کارواش
                                    </h3>
                                    <p>
                                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                                    </p>
                                </a>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="12" lg="12" md="12" xs="12">
                            {total>0?
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={12}
                                    totalItemsCount={total}
                                    pageRangeDisplayed={3}
                                    onChange={handlePageChange}
                                />
                                : <h5 className="no-data">{noDataMsg}</h5>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
