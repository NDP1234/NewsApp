import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

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

    constructor(){
        super()
        console.log("Heelo I am a constructor from News component!..")
        this.state = {
            articles : [],
            loading : false,
            page : 1
        }
    }

    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcc82437226649ce9ea90003b889977a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading : true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading : false})  
    }
    async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcc82437226649ce9ea90003b889977a&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading : true
        // })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading : false}) 
        this.setState({page: 1}) 
        this.updateNews()
    }

    getPreviousPage = async () => {
        this.setState({ page: this.state.page - 1 }, () => {
          this.updateNews(); // Pass the updateNews function as a callback
        });
      };
    //  getPrevoiusPage = async() => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcc82437226649ce9ea90003b889977a&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading : true
        // })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page : this.state.page - 1,
        //     articles : parsedData.articles,
        //     loading : false
        // })

        // this.setState({page:this.state.page - 1})
        // this.updateNews()
    // }

    getNextPage = async () => {
        this.setState({ page: this.state.page + 1 }, () => {
          this.updateNews(); // Pass the updateNews function as a callback
        });
      };
    // getNextPage = async() => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcc82437226649ce9ea90003b889977a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading : true
        // })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page : this.state.page + 1,
        //     articles : parsedData.articles,
        //     loading : false
        // })  

        // this.setState({page:this.state.page + 1})
        // this.updateNews()
    // }
      
  render() {
    
    return (
        <>
        <div className="container ">
            <h2 className="my-5">Top Headlines - NewsMonkey</h2>
            {this.state.loading && <Spinner/>}
            <div className="row ">
                {!this.state.loading && this.state.articles.map((element)=>{
                 return   <div className="col-md-4 my-3" key={element.url}>
                    <NewsItem title = {element.title ? element.title.slice(0,45) : ""} description = { element.description ? element.description.slice(0,88) : ""} imageUrl = {element.urlToImage} newsUrl ={element.url} author = {element.author} date = {element.publishedAt} source={element.source.name} />
                </div>
                })}
              
            </div> 
        </div>
        <div className="container d-flex justify-content-between my-5">
            <button type="button" disabled={this.state.page<=1} onClick={this.getPreviousPage} class="btn btn-dark">&laquo; Previous</button>
            <button type="button" disabled={(this.state.page + 1)>Math.ceil(this.state.totalResults/this.props.pageSize )}  onClick={this.getNextPage} class="btn btn-dark">Next &raquo;</button>
        </div>
        </>
        

        
    )
  }
}
