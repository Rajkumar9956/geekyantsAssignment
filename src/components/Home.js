import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Pagination from "pagination-component";

const itemStyle = {
    float: "left",
    marginLeft: "5px",
    marginRight: "5px",
    backgroundColor: "white",
    color: "black",
    cursor: "pointer",
    width: "50px",
    textAlign: "center",
    borderRadius: "5px",
    fontSize: "30px"
};
const Home = () => {
    const [allData, setAllData] = useState([])
    const [allDataCopy, setAllDataCopy] = useState([])
    const [searchKeyword, setSearchKeyword] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

// ############# Here We are Using For Searching Data ###############
    const filterSearchData = (data) => {
        let temp = allDataCopy.filter((item) => {
            console.log("s", item.name);
            return item.name.toLowerCase().includes(searchKeyword.toLowerCase())
        })
        setAllData(temp)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setSearchKeyword(e.target.value)
    }

// ############# Here We are Getting Data from Api ###############
    const usersData = () => {
        let checkExist = sessionStorage.getItem("data")
        console.log("checkExist", checkExist);
        const url = `https://api.instantwebtools.net/v1/passenger?page=${currentPage}&size=10`

        axios.get(url).then((res) => {
          
            if (searchKeyword) {
                filterSearchData(res?.data?.data)
            } else {
                setAllData(res?.data?.data);
                setAllDataCopy(res?.data?.data);
            }
        })
        axios.get(url).then((res) => {
            setTotalCount(res?.data?.data?.length);
        })
    }

    useEffect(() => {
        usersData()
    }, [searchKeyword, currentPage])



    return (
        <>
            <div className='container my-5 pb-5'>

                <h3 >Employees</h3>
                <div  >
                    <form>
                        <input onChange={handleChange} className="form-control col-md-3 offset-md-9 my-3" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
                <table class="table" style={{"border": "1px solid #dee2e6"}}>
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Trips</th>
                            <th scope="col">Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allData?.length > 0 && allData?.map((item, index) => (
                                <tr>
                                    <th scope="row">{(((currentPage - 1) * 10)) + (index + 1)}</th>
                                    <td>{item?.name}</td>
                                    <td>{item?.trips}</td>
                                    <td>{item?.airline[0]?.country}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <div className='my-3'>
                    <Pagination initialPage={1} show={10} pageCount={totalCount / 10 + 1} onChange={page => setCurrentPage(page)}>
                        {({ setPage, page, index, currentPage, isPrev, isNext, isCurrentPage }) => {
                            if (isPrev)
                                return (
                                    <div style={itemStyle} onClick={() => setPage({ prev: true })}>
                                        Previous
                                    </div>
                                );

                            if (isNext)
                                return (
                                    <div style={itemStyle} onClick={() => setPage({ next: true })}>
                                        Next
                                    </div>
                                );

                            return (
                                <div
                                    key={index}
                                    style={{ ...itemStyle, backgroundColor: isCurrentPage ? "yellow" : "white" }}
                                    onClick={() => {
                                        console.log(`Navigating from page ${currentPage} to page ${page}`);
                                        setPage({ page });
                                    }}>
                                    <h1 style={{ fontSize: "1.5rem" }}>{page}</h1>
                                </div>
                            );
                        }}
                    </Pagination>
                </div>
            </div>
        </>
    )
}

export default Home