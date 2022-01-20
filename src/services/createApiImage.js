
const defultAvatarUrl = 'https://d29fhpw069ctt2.cloudfront.net/icon/image/84587/preview.svg' 

const url = (urlImg) => `http://test-blog-api.ficuslife.com${urlImg}`;
//var oReq = new XMLHttpRequest();

const imageExists = (image_url) => {
  let http = new XMLHttpRequest()
  
  http.open('GET', image_url, false)
  
  http.send()

  return http.status !== 404
}

const createAvatarUrl = (userAvatar) =>{
  const newUrl = url(userAvatar)
  return userAvatar ? ( imageExists(newUrl) ? newUrl : defultAvatarUrl ) : defultAvatarUrl
}

export default createAvatarUrl;
