import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Link, useHistory, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav , Card, Button, Form } from 'react-bootstrap';
import blogsData from './blogsData';
import { useState } from 'react';

// Header Component
function Header(){
  return(
    <header>
    <div className="container">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link to="/" style={{textDecoration:'none', color:'#fff'}}><h1>Everyone's Blog</h1></Link></Navbar.Brand>
          <Nav className="me-auto">
            <Nav><Link to="/" style={{marginRight:'12px', textDecoration:'none', color:'#fff'}}>Home</Link></Nav>
            <Nav><Link to="/Blog" style={{textDecoration:'none', color:'#fff'}}>Blog</Link></Nav>
          </Nav>
        </Container>
      </Navbar>
    </div>
  </header>
  );
}

// Banner Component
function Banner(){
  return(
    <section className="banner">
        <div className="container">
          <div className="background-banner">
            <h2>Everyone's Blog</h2> 
          </div>
        </div>
      </section>
  );
}

{/* 
// SectionHome Component
function SectionHome(props){
  return(
    <section className="blog">
      <div className="container">
        <div className="blogs-box">
          {
            props.blogs.map((item, idx)=>{
              if(idx >= props.viewCnt ){
                return false;
              }else{
                return(
                  <Blogs key={item.id} blogs={item} idx={idx}/>      
                );
              }
            })
          }
        </div>
        <div className="buttons-box">
          <Button variant="dark" style={{ marginRight:'28px'}} onClick={(e)=>{
            props.viewCntChange(e.target += [3]);
            
          }}>더 보기</Button>
          <Button variant="dark">블로그 작성</Button>
        </div>
      </div>
    </section>
  );
}

// SectionBlog Component
function SectionBlog(props){
  return(
    <section className="blog">
      <div className="container">
        <div className="blogs-box">
          {
            props.blogs.map((item, idx)=>{
              if(idx >= props.viewCnt ){
                return false;
              }else{
                return(
                  <Blogs key={item.id} blogs={item} idx={idx}/>      
                );
              }
            })
          }
        </div>
        <div className="buttons-box">
          <Button variant="dark" style={{ marginRight:'28px'}} onClick={()=>{
            props.viewCntChange(props.viewCnt += 3);
          }}>더 보기</Button>
          <Button variant="dark" style={{ marginRight:'28px'}}>블로그 작성</Button>
          <Button variant="dark" onClick={()=>{
            props.Bannerhistory.go(-1);
          }}>뒤로가기</Button>
        </div>
      </div>
    </section>
  );
}
*/}

// Blogs Component
function Blogs(props){
  return(
      <Card style={{ marginBottom:'28px', cursor:'pointer'}}>
        <Card.Body>
          <Card.Title>{props.blogs.title}</Card.Title>
          <p className='card-text'>{props.blogs.content}</p>
        </Card.Body>
      </Card>
  );
}

// BlogsIdPage Component
function BlogIdPage(props){
  let {id} = useParams();
  return(
      <Card style={{ width:'50%', margin:'0 auto', marginBottom:'28px', cursor:'pointer' }} >
        <Card.Body>
          <Card.Title style={{textAlign:'center', padding:'28px', fontSize:'28px'}}>{props.blogs[id - 1].title}</Card.Title>
          <p>{props.blogs[id - 1].content}</p>
        </Card.Body>
      </Card>
  );
}

// Footer Component
function Footer(){
  return(
    <footer>
      <div className="container">
        <address>
          Copyright by Park
        </address>
      </div>
    </footer>
  );
}


function App() {
  let [blogs, blogsChange] = useState(blogsData);
  let [viewCnt, viewCntChange] = useState(3);
  let history = useHistory();

  return (
    <Router>
      <div className="App">
        {/* HOME PAGE */}
        <Route exact path="/">
          <Header />
          <Banner />
          <section className="blog">
            <div className="container">
              <div className="blogs-box">
                {
                  blogs.map((item, idx)=>{
                    if(idx >= viewCnt ){
                      return false;
                    }else{
                      return(
                        <Link to={`/blogid/${item.id + 1}`} key={item.id} style={{textDecoration:'none', color:'inherit'}}>
                          <Blogs blogs={item} idx={idx}/>  
                        </Link>
                      );
                    }
                  })
                }
              </div>
              <div className="buttons-box">
                <Button variant="dark" style={{ marginRight:'28px'}} onClick={()=>{
                  viewCntChange(viewCnt += 3);
                }}>더 보기</Button>
                <Link to="/write">
                  <Button variant="dark">블로그 작성</Button>
                </Link>
              </div>
            </div>
          </section>
          {/* <SectionHome blogs={blogs} viewCnt={viewCnt} viewCntChange={viewCntChange}/>  */}
          <Footer />
        </Route>
       
       {/* BLOG PAGE */}
        <Route exact path="/blog">
          <Header />
          <section className="blog">
            <div className="container">
              <div className="blogs-box">
                {
                  blogs.map((item, idx)=>{
                    if(idx >= viewCnt ){
                      return false;
                    }else{
                      return(
                        <Link to={`/blogid/${item.id + 1}`} key={item.id} style={{textDecoration:'none', color:'inherit'}}>
                          <Blogs blogs={item} idx={idx}/>  
                        </Link>      
                      );
                    }
                  })
                }
              </div>
              <div className="buttons-box">
                <Button variant="dark" style={{ marginRight:'28px'}} onClick={()=>{
                  viewCntChange(viewCnt += 3);
                }}>더 보기</Button>
                <Link to="/write">
                  <Button variant="dark" style={{ marginRight:'28px'}}>블로그 작성</Button>
                </Link>
                <Button variant="dark" onClick={()=>{
                  history.go(-1);
                }}>뒤로가기</Button>
              </div>
            </div>
          </section>
          {/* <SectionBlog blogs={blogs} viewCnt={viewCnt} viewCntChange={viewCntChange} history={history}/> */}
          <Footer />
        </Route>
        
        {/* BLOGID PAGE */}
        <Route exact path="/blogid/:id">
          <Header />
          <BlogIdPage blogs={blogs} />
          <div className="buttons-box">
            <Button variant="dark" style={{margin:'0 auto', marginBottom:'28px'}}onClick={()=>{
              history.go(-1);
            }}>뒤로가기</Button>
          </div>
          <Footer />
        </Route>

        {/* WRITE PAGE */}
        <Route exact path="/write">
          <Header />
          <Form className="container">
            <Form.Group className="mb-4 w-75" controlId="exampleForm.ControlInput1" style={{ margin:'0 auto' }}>
              <Form.Label>블로그 제목</Form.Label>
              <Form.Control type="text" placeholder="제목을 입력해주세요" />
            </Form.Group>
            <Form.Group className="mb-4 w-75 " controlId="exampleForm.ControlTextarea1" style={{ margin:'0 auto' }}>
              <Form.Label>블로그 내용</Form.Label>
              <Form.Control as="textarea" rows={10} placeholder="내용을 입력해주세요" />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-4 w-75" style={{ margin:'0 auto' }}>
              <Form.Label>파일 첨부하기</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
            <div className="buttons-box">
              <Button variant="dark" style={{ marginRight:'28px'}}>작성</Button>
              <Button variant="dark" onClick={()=>{
                history.go(-1);
              }}>뒤로가기</Button>
            </div>
          </Form>
          <Footer />
        </Route>
      </div>
    </Router>
  );
}

export default App;
