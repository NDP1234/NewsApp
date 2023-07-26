import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        country : 'in',
        pageSize : 6,
        category : 'general'
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }

    capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props)
        console.log("Heelo I am a constructor from News component!..")
        this.state = {
            articles : [],
            loading : true,
            page : 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews(){
        this.props.setprogress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading : true
        })
        let data = await fetch(url);
        this.props.setprogress(30);
        let parsedData = await data.json();
        this.props.setprogress(70);
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading : false}) 
        this.props.setprogress(100); 
    }
    async componentDidMount(){
        this.setState({page: 1}) 
        this.updateNews()
    }

    getPreviousPage = async () => {
        this.setState({ page: this.state.page - 1 }, () => {
          this.updateNews(); // Pass the updateNews function as a callback
        });
      };
    

    getNextPage = async () => {
        this.setState({ page: this.state.page + 1 }, () => {
          this.updateNews(); // Pass the updateNews function as a callback
        });
      };
    
    fetchMoreData= async () => {
        this.setState({page : this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        })
    }
  render() {
    
    return (
        <>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
            {/* {this.state.loading && <Spinner/>} */}

            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>}
            >

            <div className="container ">

            <div className="row ">
                { this.state.articles.map((element)=>{
                 return   <div className="col-md-4 my-3" key={element.url}>
                    <NewsItem title = {element.title ? element.title.slice(0,45) : ""} description = { element.description ? element.description.slice(0,88) : ""} imageUrl = {element.urlToImage} newsUrl ={element.url} author = {element.author} date = {element.publishedAt} source={element.source.name} />
                </div>
                })}
              
            </div> 
        </div>

        </InfiniteScroll>
        </>

    )
  }
}
