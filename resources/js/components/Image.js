import React from 'react';

const Image = (props) => {
    console.log(props);
    const { image } = props;
    //I'm feeding those imgs from a website so I made a little search if it's coming from
    //the backend or from the website and adding the correct link if it's coming from the backend
    var str = image;
    //search for the dir images
    var isImgWithin = str.search("images");
    //if theres any then add dir storage before it
    if (isImgWithin > 0) {
        var img = '/storage/' + image;
    } else {
        //if not just get the website url
        var img = image;
    }
    return (
        { img }
    );
}

export default Image;
