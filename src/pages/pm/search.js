import React, { useEffect, useState } from "react";
import "./pm-member.css";
import PmNav from "./pmNav";
import { useDispatch, useSelector } from "react-redux";
import { callEmployeeAPI } from "../../apis/PmAPICalls";
import { Link } from "react-router-dom";
import { callSearchNameAPI } from "../../apis/PmAPICalls";
import { Search } from "@mui/icons-material";
import { GET_PM_SEARCHNAME } from "../../modules/PmMeModule";

function PmMenu() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const dispatch = useDispatch();
  const results = useSelector((state) => state.treeview);
  const [selectedStatus, setSelectedStatus] = useState("사원조회");

  const [pageEnd, setPageEnd] = useState(1);
  const pageInfo = results.pageInfo;

  const [empName, setSearchName] = useState(""); // 검색어를 저장하는 상태 추가

  const updateSearchResults = (data) => {
    return {
      type: "GET_PM_SEARCHNAME",
      payload: data,
    };
  };

  const searchResults = useSelector((state) => state.serchName?.data);
  console.log(searchResults);
  const handleSearch = async () => {
    // 검색어가 비어있으면 아무 작업도 수행하지 않습니다.
    if (!empName) {
            
            dispatch({type: GET_PM_SEARCHNAME, payload: () => {}})
            return;
    }

    try {
      // 검색 API 호출
      // const response = await dispatch(callSearchNameAPI({ name: empName }));
      const response = await dispatch(callSearchNameAPI(empName));
      console.log("-이건호출결과를위한거---------------------1--", searchResults.data)
      // API 호출 결과를 처리합니다.
      if (response.data && response.data.length > 1) {
        // 검색 결과가 있을 경우, 결과를 상태에 업데이트합니다.
        // (Redux state를 업데이트하는 부분을 확인해야 합니다.)
       

        console.log("-이건호출결과를위한거----------------222-------", response.data)
      } else {
        // 검색 결과가 없을 경우에 대한 처리
      }
    } catch (error) {
      // 에러 처리
    }
  };

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
      console.log("page----->>", pageInfo);
    }
  }

  useEffect(() => {
    console.log("--------------------->>>>>>>>>", currentPage);

    dispatch(callEmployeeAPI({ currentPage }));
  }, [currentPage]);

  // const history = useHistory();
  // const handleEmployeeClick = (empNo) => {
  //     // 선택된 사원의 정보를 URL 파라미터로 전달하면서 PmMemberResist로 이동
  //     history.push(`/pm-resist/${empNo}`);
  //   }

  return (
    <div>
      <section>
        <PmNav />
        <div className="apv-navibox">
          <div className="pm-de-top" style={{ margin: "auto" }}>
            <div className="pm-div-font">
              사원 조회
              <input
                className="pm-department-search"
                type="text"
                name="name"
                placeholder="사원이름을 입력하세요."
                value={empName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button className="pm-department-button" onClick={handleSearch}>
                검색
              </button>
              {/* <input
                                className="pm-department-search"
                                type="text"
                                name="name"
                                placeholder="사원이름을 입력하세요."
                                value={empName} // 상태값을 입력값에 바인딩합니다.
                                onChange={(e) => setSearchName(e.target.value)} // 입력값이 변경될 때마다 상태를 업데이트합니다.
                            /> */}
              {/* <input className="pm-department-search" type="text" name="name" placeholder="사원이름을 입력하세요."/> */}
              {/* <button className="pm-department-button">검색</button> */}
            </div>
          </div>
          <br />

          <div className="pm-divbox">
            <table className="pm-boxresult-table">
              <tbody>
                <tr>
                  <th className="columnpm1">사원명</th>
                  <th className="columnpm2">직급</th>
                  <th className="columnpm3">휴대폰</th>
                  <th className="columnpm4">부서</th>
                  <th className="columnpm5">내선전화</th>
                  <th className="columnpm6">입사일</th>
                  <th className="columnpm7">이메일</th>
                </tr>
                {
//       (searchResults.data && searchResults.data.length > 0 ? searchResults.data : results.data).map((result) => (
    (searchResults?.data && searchResults.data.length > 0 ? searchResults.data : results?.data)?.map((result) => (
    <tr key={result.empNo}>
      <td>
        <Link to={`/pm/pm-resist/${result.empNo}`}>
          {result.empName}
        </Link>
      </td>
      <td>{result.job.name}</td>
      <td>{result.phone}</td>
      <td>{result.dt.name}</td>
      <td>{result.telephone}</td>
      <td>{result.startDate}</td>
      <td>{result.empEmail}</td>
    </tr>
  ))
}
                {/* {Array.isArray(results.data) && results.data
                        .map((result) => (
                            // <tr key={result.empNo} onClick={() => handleEmployeeClick(result.empNo)}>
                            <tr key={result.empNo} >
                                <td> <Link to={`/pm/pm-resist/${result.empNo}`}>
                                    {result.empName}
                                    </Link>
                                </td>
                                <td>{result.job.name}</td>
                                <td>{result.phone}</td>
                                <td>{result.dt.name}</td>
                                <td>{result.telephone}</td>
                                <td>{result.startDate}</td>
                                <td>{result.empEmail}</td>
                            </tr>
                        ))
                    }
                    { console.log('================>',results.data)} */}
              </tbody>
            </table>
          </div>
          <div style={{ width: "auto" }}></div>

          {/* 페이징 처리를 위한 버튼  */}
          <div
            style={{
              listStyleType: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {Array.isArray(results) && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
            )}
            {pageNumber.map((num) => (
              <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                  style={
                    currentPage === num ? { backgroundColor: "orange" } : null
                  }
                >
                  {num}
                </button>
              </li>
            ))}
            {Array.isArray(results) && pageInfo != null && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage === pageInfo.pageEnd || pageInfo.total == 0
                }
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      </section>
      <br></br>
      <br></br>
    </div>
  );
}

export default PmMenu;
