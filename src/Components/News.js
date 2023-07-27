import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    console.log(props.apiKey); // Check if apiKey is received properly

    const capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalresults, setTotalResults] = useState(0)
    // document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;

   

    const updateNews =async ()=>{
        props.setprogress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setloading(true)
        let data = await fetch(url);
        props.setprogress(30);
        let parsedData = await data.json();
        props.setprogress(70);
        // console.log(parsedData)
        setarticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setloading(false)
        props.setprogress(100); 
    }
    // async componentDidMount(){
    //     this.setState({page: 1}) 
    //     updateNews()
    // }
    useEffect(() => {
        updateNews(); 
    }, [])

   const getPreviousPage = async () => {
        setPage(page-1);
        updateNews(); 
      };
    

   const getNextPage = async () => {
        setPage(page+1);
        updateNews(); 
      };
    
    // const fetchMoreData= async () => {
    //    setPage(page + 1)
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     // setarticles(articles.concat(parsedData.totalResults))
    //     setarticles((prevArticles) => prevArticles.concat(parsedData.articles));
    //     setTotalResults(parsedData.totalResults)
    // };
    const fetchMoreData = async () => {
        const nextPage = page + 1; // Increment the page here
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles((prevArticles) => prevArticles.concat(parsedData.articles)); // Concatenate to the existing articles
        setTotalResults(parsedData.totalResults);
        setPage(nextPage); // Update the page state
      };
      
 
   
    return (
        <>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {/* {this.state.loading && <Spinner/>} */}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalresults}
                loader={<Spinner/>}
            >
            

            <div className="container ">

            <div className="row ">
                { articles.map((element)=>{
                 return   <div className="col-md-4 my-3" key={element.url}>
                    <NewsItem title = {element.title ? element.title.slice(0,45) : ""} description = { element.description ? element.description.slice(0,88) : ""} imageUrl = {element.urlToImage} newsUrl ={element.url} author = {element.author} date = {element.publishedAt} source={element.source ? element.source.name || "Unknown" : "Unknown"}  />
                </div>
                })}
              
            </div> 
        </div>

        </InfiniteScroll>
        </>

    )
  
}

News.defaultProps = {
    country : 'in',
    pageSize : 6,
    category : 'general'
}

News.propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
    apiKey: PropTypes.string.isRequired, // Add the apiKey prop to propTypes and mark it as required

}
export default News;