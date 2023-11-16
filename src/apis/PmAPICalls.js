import {
    GET_MEMBER,
    GET_TREEVIEW_ONE,
} from '../modules/TreeModule';
import {
    GET_TREEVIEW_TWO
} from '../modules/SecondTreeModule';
import {
    GET_MANAGEMENT,
    POST_PM_MANAGEMENT,
    POST_PM_END,
} from '../modules/ManageMentModule';
import{
    GET_PM_MEMBER,
    POST_PM_INSERT,
} from '../modules/PmMemberModule';
import{
    GET_ANNUAL,
    GET_PM_ANNUAL
} from '../modules/AnnualModule';

import{
    GET_PM_SEARCHNAME
} from '../modules/PmMeModule'
import jwt_Decode from 'jwt-decode';

import { async } from '@dabeng/react-orgchart';
import { Gesture } from '@mui/icons-material';

export const callEmployeeAPI = ({ currentPage  }) => {

    console.log('[PmAPICalls] callEmployeeAPI Call');

    const requestURL = `${process.env.REACT_APP_BASIC_URL}/api/pm/all?offset=${currentPage}`;
    
    
    return async (dispatch, getState) => {

        try{
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => {
            console.log(response);
            return response.json()
        });

        console.log('[PmAPICalls] callEmployeeAPI RESULT : ', result.data);

        dispatch({ type: GET_MEMBER,  payload: result.data });
    } catch (error) {
        console.error('[PmAPICalls] Error in callEmployeeAPI: ', error);
    }
        
    };    
};

export const callTreeviewOneAPI = () => {
console.log('[PmAPICalls] callTreeviewOneAPI Call');

const requestURL = `${process.env.REACT_APP_BASIC_URL}/api/pm/secondDept`;

return async (dispatch, getState) => {

    try{
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => {
            console.log('-----------------> \n', response);
            return response.json()
        });

        console.log('[PmAPICalls] callTreeviewOneAPI RESULT :>>>>>>>>>>>>>>>> ', result.data);

        dispatch({type: GET_TREEVIEW_ONE, payload: result.data});
    } catch(error) {
        console.error('[PmAPICalls] Error in callTreeviewOneAPI: ', error);
    }
    };
};


export const callTreeviewTwoAPI = () => {
    console.log('[PmAPICalls] callTreeviewTwoAPI Call');
    
    const requestURL = `${process.env.REACT_APP_BASIC_URL}/api/pm/selectDept`;
    
    return async (dispatch, getState) => {
    
        try{
            const result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                }
            })
            .then(response => {
                return response.json()
            });
    
            dispatch({type: GET_TREEVIEW_TWO, payload: result.data});
        } catch(error) {
            console.error('[PmAPICalls] Error in callTreeviewTwoAPI: ', error);
        }
        };
    };

export const callManagementAPI = ({ currentPage }) => {
        console.log('[PmAPICalls] callManagementAPI Call');
        
        const token = jwt_Decode(window.localStorage.getItem("accessToken"));
        console.log('============token=>', token);

        const empNo = token.sub;

   
        const requestURL = `${process.env.REACT_APP_BASIC_URL}/api/pm/management/${empNo}?offset=${currentPage}`;
        
        return async (dispatch, getState) => {
        
            try{
                const result = await fetch(requestURL, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                        "Content-Type": "application/json",
                        "Accept": "*/*"
                    }
                })
                .then(response => {
                    console.log('-----------------> \n', response);
                    return response.json()
                });
        
                console.log('[PmAPICalls] callManagementAPI RESULT :>>>>>>>>>>>>>>>> ', result.data);
        
                dispatch({type: GET_MANAGEMENT, payload: result.data});
            } catch(error) {
                console.error('[PmAPICalls] Error in callManagementAPI: ', error);
            }
            };
        };

export const callMgStartAPI = ({ formData }) => {
    console.log('[PmAPICalls] callMgStartAPI Call');
    
    const requestURL = `${process.env.REACT_APP_BASIC_URL}/api/pm/management/insert`;
    console.log('check1 ', formData);
    return async (dispatch, getState) => {

        console.log('[PmAPICalls] callMgStartAPI formData : ', formData);
        try{
            const result = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                    "Accept": "*/*",
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*", 
                },
                body: JSON.stringify(formData),
            })
            // .then(response => {
            //     console.log('-----------------> \n', response);
            //     return response.json()
            // });
            .then(response => response.json());

            console.log('[ApprovalAPICalls] callMgEndtAPI RESULT : ', result.data);

            dispatch({ type: POST_PM_MANAGEMENT, payload: result.data });
            return result;

        } catch (error) {
            console.error('[ApprovalAPICalls] Error in callMgEndtAPI: ', error);
            throw error;
        }

    };
};

export const callMgEndAPI = ({ formData }) => {
    console.log('[PmAPICalls] callMgEndAPI Call');
    
    const requestURL = `${process.env.REACT_APP_BASIC_URL}/api/pm/management/update`;
    console.log('check2',formData)
    return async (dispatch, getState) => {

        console.log('[PmAPICalls] callMgEndAPI formData : ',formData );
        try{
            const result = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                    "Accept": "*/*",
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                console.log('-----------------> \n', response);
                return response.json()
            });
            // .then(response => response.json());

            console.log('[ApprovalAPICalls] callMgEndAPI RESULT : ', result);

            dispatch({ type: POST_PM_END, payload: result });
            return result;

        } catch (error) {
            console.error('[ApprovalAPICalls] Error in callMgEndAPI: ', error);
            throw error;
        }

    };
};


export const callPmMemberAPI = (empNo) => {
    console.log('[PmAPICalls] callPmMemberAPI Call');
    
    const requestURL = `${process.env.REACT_APP_BASIC_URL}/api/pm/member/detail/${empNo}`;
    

    console.log('[PmAPICalls] callPmMemberAPI Call empNo', empNo);
    
    return async (dispatch, getState) => {
    
        try{
            const result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            })
            .then(response => {
                console.log('-----------------> \n', response);
                return response.json()
            });
    
            console.log('[PmAPICalls] callPmMemberAPI RESULT :>>>>>>>>>>>>>>>> ', result.data);
    
            dispatch({type: GET_PM_MEMBER, payload: result.data});
        } catch(error) {
            console.error('[PmAPICalls] Error in callPmMemberAPI: ', error);
        }
        };
    };

export const callPmInsertAPI = ({ formData }) => {
    console.log('[PmAPICalls] callPmInsertAPI Call');
    
    const requestURL = `${process.env.REACT_APP_BASIC_URL}/api/pm/member/all`;
    console.log('insert ', formData);
    return async (dispatch, getState) => {

        console.log('[PmAPICalls] callPmInsertAPI formData : ', formData);
        try{
            const result = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                },
                body: formData,
            })
            // .then(response => {
            //     console.log('-----------------> \n', response);
            //     return response.json()
            // });
            .then(response => response.json());

            if(result.status !==200){
                alert(result.message);
            }
            console.log('[ApprovalAPICalls] callPmInsertAPI RESULT : ', result);

            dispatch({ type: POST_PM_INSERT, payload: result });
            return result;

        } catch (error) {
            console.error('[ApprovalAPICalls] Error in callPmInsertAPI: ', error);
            throw error;
        }

    };
};



export const callAnnualAPI = ({currentPage}) => {
    console.log('[PmAPICalls] callAnnualAPI Call');
    
    const requestURL = `${process.env.REACT_APP_BASIC_URL}/api/pm/annual?offset=${currentPage}`;
 
    return async (dispatch, getState) => {

        try{
            const result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            })
            .then(response => {
                console.log(response);
                return response.json()
            });
    
            console.log('[PmAPICalls] callAnnualAPI RESULT : ', result);

            dispatch({ type: GET_ANNUAL, payload: result.data });
            return result;

        } catch (error) {
            console.error('[ApprovalAPICalls] Error in callAnnualAPI: ', error);
            throw error;
        }

    };
};
export const callPmAnnualAPI = (empNo) => {
    console.log('[PmAPICalls] callPmAnnualAPI Call');
    
    const requestURL = `${process.env.REACT_APP_BASIC_URL}/api/pm/annual/detail/${empNo}`;
    

    console.log('[PmAPICalls] callPmAnnualAPI Call empNo', empNo);
    
    return async (dispatch, getState) => {
    
        try{
            const result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            })
            .then(response => {
                console.log('-----------------> \n', response);
                return response.json()
            });
    
            console.log('[PmAPICalls] callPmAnnualAPI RESULT :>>>>>>>>>>>>>>>> ', result.data);
    
            dispatch({type: GET_PM_ANNUAL, payload: result.data});
        } catch(error) {
            console.error('[PmAPICalls] Error in callPmAnnualAPI: ', error);
        }
        };
    };

// export const callSearchNameAPI = (empName) => {
//     console.log('[PmAPICalls] callSearchNameAPI Call');

//     // const requestURL = `${process.env.REACT_APP_BASIC_URL}/api/pm/search`;
//     const requestURL = `${process.env.REACT_APP_BASIC_URL_FRONT}/api/pm/search?empName=${empName}`;

//     console.log('Das ist empName===========>', empName);

//     return async (dispatch, getState) => {

//         try {
//             const result = await fetch(requestURL, {
//                 method: "GET",
//                 headers: {
//                     "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
//                     "Content-Type": "application/json",
//                     "Accept": "*/*"
//                 }
//             })
//             .then(response => {
//                 console.log('-----------------> \n', response);
//                 return response.json()
//             });
    
//             console.log('[PmAPICalls] callSearchNameAPI RESULT :>>>>>>>>>>>>>>>> ', result);

//             dispatch({type: GET_PM_SEARCHNAME, payload: result});
//         } catch (error) {

//             console.error('[PmAPICalls] Error in callSearchNameAPI: ', error);
            
//         }
//     }
// }


export const callSearchNameAPI = (empName) => {
    console.log('[PmAPICalls] callSearchNameAPI Call');

    const requestURL = `${process.env.REACT_APP_BASIC_URL}/api/pm/search?empName=${empName}`;

    console.log('Das ist empName===========>', empName);

    return async (dispatch, getState) => {

        try {
            const result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            })
            .then(response => {
                console.log('-----------------> \n', response);
                return response.json()
            });
    
            console.log('[PmAPICalls] callSearchNameAPI RESULT :>>>>>>>>>>>>>>>> ', result);

            dispatch({type: GET_PM_SEARCHNAME, payload: result});
        } catch (error) {

            console.error('[PmAPICalls] Error in callSearchNameAPI: ', error);
            
        }
    }
}






