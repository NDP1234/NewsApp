import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props
    return (
        <>
            <div className="card" style={{backgroundColor:"#2F3C7E", color:"#FBEAEB"}}>
                {/* <img src={imageUrl} className="card-img-top" height={"200px"}  alt="..."/> */}
                <img src={imageUrl? imageUrl : "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="} className="card-img-top" alt="..." height={"250px"}/>
                    <div className="card-body">
                        <h5 className="card-title">{title}..</h5>
                        <p className="card-text">{description}..</p>
                        <a href={newsUrl} target = "_blank" className="btn " style={{backgroundColor:"#024ebf", color:"white"}}>Read More..</a>
                        <strong ><p className="card-text my-2" >By {author? author:"Unknown"} on {new Date(date).toGMTString()}</p></strong>

                    </div>
                    <div className="card-footer text-muted d-flex justify-content-between" style={{backgroundColor:"#7579c4"}}>
                      <span className="text-light"> Published By :</span> <span className="badge bg-light text-dark py-2 px-2">{source}</span>
                    </div>
            </div>
        </>
    )
  }
}
