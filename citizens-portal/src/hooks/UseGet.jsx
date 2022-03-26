import {useState, useCallback} from "react";
import API from "../utils/api";
import {generateUrl} from "./utils";

function UseGet(application) {
    const [response, setResponse] = useState({
        data: null,
        loading: false,
        error: null,
    });

    const apiCall = useCallback((url, actionCallback = ()=>{}, errorCallback = ()=>{}) => {
            setResponse((prevState) => ({...prevState, loading: true, error: null}));

            API.get(generateUrl(url, application))
                .then(res => {
                    setResponse({data: res.data, loading: false, error: null})
                    actionCallback();
                })
                .catch(error => {
                    setResponse({data: null, loading: false, error: error.response?.data.error[0] || error});
                    errorCallback();
                });
        }
        , [application]);

    return [apiCall, response];
}

export default UseGet;