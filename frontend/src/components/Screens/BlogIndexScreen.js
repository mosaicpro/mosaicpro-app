import React, { useState, useEffect } from "react";
import { isMobile, isMobileOnly } from "react-device-detect";
import Banner from "../Elements/Banner";
import axios from "axios";
import ReadMoreLinkToPage from "../Elements/ReadMoreLinktoPage";
import BlogCard from "../Elements/BlogCard";
import Filter from "../Elements/Filter";

function BlogIndexScreen({ setSelect, setNavbar }) {
  const [posts, setPosts] = useState([]);
  const [item, setItem] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  let tagList = ''

  const filterItem = (curcat) => {
    const newItem = posts.filter((newVal) => {
      return newVal.tags.includes(curcat);
    });
    setItem(newItem);
  };

  useEffect(() => {
    setNavbar(true);
    setSelect(5);
    axios.get("/api/posts").then((resp) => {
        setPosts(resp.data);
        setItem(resp.data);
        resp.data.map((post) => tagList = tagList +','+ post.tags)
        let tagArr = Array.from(new Set(tagList.split(',').filter((tag) => tag.trim().length > 0 )))
        setMenuItems(tagArr);
      });
  }, []);

  const bannerStyling = {
    background: isMobileOnly
      ? "../static/images/blog_mobile.jpg"
      : "../static/images/orange_purple.png",
    width: "80vw",
    height: isMobile ? "50vh" : "80vh",
    opacity: "100%",
    layerColor: "rgba(0,0,0,0.1)",
  };

  const filterStyling = {
    classListButtons:
      "mt-3 mb-0 rounded-pill bg-primary text-white p-1 px-2 mx-2 btn fw-bold dark-select",
  };

  const blogCardStyling = {
    classList:
      "d-flex justify-content-center  d-flex " + (isMobile && "w-100 m-auto"),
    classListCard:
      "rounded-0 " + isMobile
        ? "m-3  pb-2 pt-2  w-90  d-flex "
        : "mt-4 mb-4 justify-content-around",
    classListCardLayout:
      "d-flex justify-content-between " + (isMobile ? "p-0" : "p-3"),
    classListTitle: "avalon fw-bold " + (isMobile ? "h6" : "h4 mb-0 ps-3"),
    classListText: "h6 fw-normal lh-xl",
    classListImage: "rounded-0 " + (isMobile ? "p-3" : "pb-2  ml-3"),
    imageSize: "125px",
    classListAuthorLayout:
      "d-flex mb-3 border-top border-2 border-gray mx-3 mt-3",
    authorImageSize: "40px",
    authorImageClassList: "m-3 rounded-circle",
    cardWidthClass: isMobile ? "w-100" : "w-50",
    tagLayoutClassList: isMobile
      ? "mb-3 d-flex justify-content-center"
      : "mb-4 d-flex justify-content-end",
    tagClassList:
      "text-center border border-primary text-primary border-1 text-sm rounded p-1 me-3",
    classListImageLayout: "d-flex justify-content-center",
  };
  return (
    <div>
      <div className="navbar-spacer">&nbsp;</div>
      <Banner
        background={bannerStyling.background}
        width={bannerStyling.width}
        height={bannerStyling.height}
        opacity={bannerStyling.opacity}
        layerColor={bannerStyling.layerColor}
      >
        <div className="ms-3 border-3 border-start text-light pt-5 ps-3 fw-bold avalon h2">
          blog
        </div>
      </Banner>
      <div>
        {!isMobile && (
          <Filter
            filterItem={filterItem}
            setItem={setItem}
            menuItems={menuItems}
            posts={posts}
            classListButtons={filterStyling.classListButtons}
          />
        )}

        {item.map((post) => (
          <BlogCard
            styling={blogCardStyling}
            cardTitle={post.title}
            source={post.image}
            authorName={post.authorName}
            thumbnail={post.authorThumbnail}
            createdAt={post.createdAt}
            tags={post.tags}
            key={post._id}
          >
            <ReadMoreLinkToPage charShow={255} to={`/blog/${post._id}`}>
              {post.description}
            </ReadMoreLinkToPage>
          </BlogCard>
        ))}
      </div>
    </div>
  );
}

export default BlogIndexScreen;
