import React, { useEffect,useContext,useReducer, useState } from 'react';
import reducer from './reducer';
 // Context created
let API="https://hn.algolia.com/api/v1/search?";

const initialState =  {
    isLoading:true,
    query:" ",
    nbPages:0,
    page:0,
    hits:[],
    popularNews:[],
};
const AppContext = React.createContext();
// Now the provider function
const AppProvider = ({ children }) => {
    const [state,dispatch]=useReducer(reducer,initialState);
    const [showPopularNews, setShowPopularNews] = useState(false);
    const [bookMark, setBookMark] = useState([]);
   

    const fetchApiData= async (url)=>{

        dispatch({type:"SET_LOADING"});
        try{
            const res= await fetch(url);
            const data = await res.json();
            console.log(data);
            dispatch({type:"GET_STORIES",
                payload:{
                    hits:data.hits,
                    nbPages:data.nbPages,
                }
            })
           
       }
       catch(error){
             console.log(error);
          }
    };
    const fetchPopularNews = async () => {
        try {
            dispatch({type:"SET_LOADING"});
            const res = await fetch(`${API}query=technology&tags=story`);
            const data = await res.json();

            const sortedNews = data.hits
                .filter((item) => item.num_comments) 
                .sort((a, b) => (b.num_comments || 0) - (a.num_comments || 0));

            dispatch({
                type: "GET_POPULAR_NEWS",
                payload: sortedNews.slice(0, 7),
            });

        } catch (error) {
            console.log(error);
        }
    };

     
    const searchFn= (searchQuery) =>{
        dispatch({type:"SEARCH_QUERY",
            payload:searchQuery,
        });
    };
    const getNextPage=()=>{
        dispatch({
           type:"NEXT_PAGE", 
        })
    }
    const getPrevPage=()=>{
        dispatch({
           type:"PREV_PAGE", 
        })
    }

    const addBookMark = (news) => {
        const newBookMark = [...bookMark, news];
        setBookMark(newBookMark);
        localStorage.setItem('bookmarks', JSON.stringify(newBookMark));
    }

    useEffect(()=>{
        fetchApiData(`${API}query=${state.query}&{state.page}`);
    },[state.query,state.page]);

    useEffect(() => {
        fetchPopularNews(); 
    }, []);

    useEffect(() => {
        let storedData = localStorage.getItem('bookmarks')
        if(storedData){
            setBookMark(JSON.parse(storedData))
        }
    },[])

    
    return (
        <AppContext.Provider value={{...state,searchFn,getNextPage,getPrevPage,showPopularNews,setShowPopularNews,addBookMark,bookMark,setBookMark}}>
            {children}
        </AppContext.Provider>
    );
};


const useGlobalContext =()=>
{
    return useContext(AppContext);
};

export { AppContext, AppProvider,useGlobalContext  };
